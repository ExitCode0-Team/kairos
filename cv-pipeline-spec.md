# CV extraction and rendering pipeline — project spec

## Overview

A web application that lets users upload a CV in PDF format, automatically extracts and structures the content using AI, and renders a polished output PDF using RenderCV. Users authenticate via Supabase, their data is scoped to them via Row Level Security, and the entire pipeline runs serverlessly on Supabase Edge Functions.

---

## Goals

- Allow any user to upload a CV PDF and get back a cleanly formatted, RenderCV-rendered version
- Extract structured data (name, email, skills, experience, education) using the MiniMax API
- Let users review and edit parsed fields before re-rendering
- Keep all user data private and isolated without writing custom auth or access-control logic
- Run the entire backend on Supabase with no separate server to maintain

---

## Out of scope (v1)

- CV templates / theme selection (single RenderCV theme for now)
- Bulk upload or batch processing
- Public sharing or embeddable CV links
- CV builder from scratch (upload-first only)
- Mobile native app

---

## Tech stack

| Layer | Choice | Reason |
|---|---|---|
| Frontend | Next.js (App Router) | SSR, easy Supabase integration |
| Auth | Supabase Auth | Email, magic link, OAuth out of the box |
| Database | Supabase Postgres | RLS, triggers, pg_cron |
| File storage | Supabase Storage | Bucket-level access policies |
| Backend logic | Supabase Edge Functions (Deno) | Serverless, co-located with DB |
| Realtime | Supabase Realtime | Push job status to frontend |
| AI parsing | MiniMax API | Structured JSON extraction from CV text |
| PDF extraction | PyMuPDF (via Edge Function subprocess or WASM) | Fast text extraction from PDFs |
| CV rendering | RenderCV (Python CLI) | YAML → polished PDF / HTML |

---

## Architecture

### Request flow

1. User signs in via Supabase Auth (email or OAuth)
2. User uploads a PDF — stored directly to Supabase Storage bucket `cv-uploads`
3. A database webhook fires the `extract-cv` edge function automatically on insert to `cv_uploads`
4. `extract-cv` downloads the PDF, extracts raw text, triggers `parse-cv`
5. `parse-cv` sends text to MiniMax API with a structured schema prompt, validates the JSON response, and writes to `parsed_cv_data`
6. `parse-cv` triggers `render-cv`, which converts the parsed data to RenderCV YAML and runs the CLI
7. The rendered PDF is uploaded to `cv-renders` storage bucket
8. `render_jobs.status` is updated to `done`; Supabase Realtime pushes this to the frontend
9. The frontend receives the realtime event and embeds the rendered PDF via PDF.js

### Re-render flow

1. User edits parsed fields in the frontend editor
2. Frontend calls `render-cv` edge function directly with the updated JSON
3. New render job is created; same realtime flow as above

---

## Supabase data model

### `profiles`

Extends `auth.users`. Populated automatically by a Postgres trigger on `auth.users` insert.

```sql
create table profiles (
  id           uuid primary key references auth.users(id) on delete cascade,
  email        text,
  display_name text,
  avatar_url   text,
  created_at   timestamptz default now()
);
```

### `cv_uploads`

One row per uploaded PDF.

```sql
create table cv_uploads (
  id                uuid primary key default gen_random_uuid(),
  user_id           uuid not null references profiles(id) on delete cascade,
  original_filename text not null,
  storage_path      text not null,  -- e.g. {user_id}/{upload_id}.pdf
  status            text not null default 'pending',  -- pending | processing | done | error
  uploaded_at       timestamptz default now()
);
```

### `parsed_cv_data`

One row per successful parse. Linked 1:1 to an upload.

```sql
create table parsed_cv_data (
  id               uuid primary key default gen_random_uuid(),
  upload_id        uuid not null references cv_uploads(id) on delete cascade,
  structured_json  jsonb not null,   -- name, email, skills[], experience[], education[]
  rendercv_yaml    text,             -- generated YAML ready for RenderCV
  model_used       text,             -- e.g. "minimax-text-01"
  parsed_at        timestamptz default now()
);
```

### `render_jobs`

One row per render attempt (initial + every re-render).

```sql
create table render_jobs (
  id                  uuid primary key default gen_random_uuid(),
  upload_id           uuid not null references cv_uploads(id) on delete cascade,
  status              text not null default 'pending',  -- pending | processing | done | error
  output_storage_path text,   -- cv-renders/{user_id}/{job_id}.pdf
  error_message       text,
  created_at          timestamptz default now(),
  completed_at        timestamptz
);
```

---

## Row Level Security policies

All tables share the same policy shape. Users can only see and modify their own rows.

```sql
-- profiles
alter table profiles enable row level security;
create policy "own profile" on profiles
  for all using (auth.uid() = id);

-- cv_uploads
alter table cv_uploads enable row level security;
create policy "own uploads" on cv_uploads
  for all using (auth.uid() = user_id);

-- parsed_cv_data (join through cv_uploads)
alter table parsed_cv_data enable row level security;
create policy "own parsed data" on parsed_cv_data
  for all using (
    exists (
      select 1 from cv_uploads
      where cv_uploads.id = parsed_cv_data.upload_id
        and cv_uploads.user_id = auth.uid()
    )
  );

-- render_jobs (join through cv_uploads)
alter table render_jobs enable row level security;
create policy "own render jobs" on render_jobs
  for all using (
    exists (
      select 1 from cv_uploads
      where cv_uploads.id = render_jobs.upload_id
        and cv_uploads.user_id = auth.uid()
    )
  );
```

---

## Storage buckets

### `cv-uploads` (private)

- Path pattern: `{user_id}/{upload_id}.pdf`
- Policy: authenticated users can insert and read their own prefix only
- Max file size: 10 MB
- Allowed MIME types: `application/pdf`

### `cv-renders` (private)

- Path pattern: `{user_id}/{job_id}.pdf`
- Policy: authenticated users can read their own prefix; only edge functions (service role) can insert
- Served via signed URLs with 1-hour expiry

---

## Edge functions

### `extract-cv`

Triggered by database webhook on `cv_uploads` insert.

1. Download PDF from `cv-uploads` storage using the service role key
2. Extract text using PyMuPDF (WASM build) or spawn a Python subprocess
3. Update `cv_uploads.status` to `processing`
4. Invoke `parse-cv` with the extracted text

### `parse-cv`

Called by `extract-cv` or directly for re-parses.

1. Build a structured prompt with the raw text and a JSON schema:
   ```
   name, email, phone, summary, skills[], experience[{company, role, dates, bullets[]}], education[{institution, degree, dates}]
   ```
2. Call MiniMax API (`minimax-text-01` model)
3. Validate response against the schema (Zod)
4. Write to `parsed_cv_data` (structured JSON + generated YAML)
5. Invoke `render-cv`

### `render-cv`

Called by `parse-cv` or directly for re-renders.

1. Create a row in `render_jobs` with `status: processing`
2. Write the YAML from `parsed_cv_data.rendercv_yaml` to a temp file
3. Shell out to `rendercv render <yaml_file> --output-format pdf`
4. Upload the output PDF to `cv-renders/{user_id}/{job_id}.pdf`
5. Update `render_jobs.status` to `done` (or `error` with message)
6. Realtime broadcasts the update to the subscribed frontend client

### `webhooks`

Handles Supabase Auth events (user created, deleted). On `user.created`, ensures a `profiles` row exists as a fallback to the DB trigger.

---

## Frontend pages

### `/` — landing / sign-in

- Supabase Auth UI component (email + OAuth buttons)
- Redirects to `/dashboard` on session

### `/dashboard`

- Lists all `cv_uploads` for the authenticated user with status badges
- Upload button → triggers file picker → uploads directly to Supabase Storage via signed upload URL
- Real-time status updates for in-progress jobs

### `/cv/[upload_id]`

- Left panel: PDF.js embed of the rendered PDF (loaded via signed URL from `cv-renders`)
- Right panel: editable parsed fields (name, email, skills, experience, education) sourced from `parsed_cv_data.structured_json`
- Re-render button → calls `render-cv` edge function → realtime refresh

---

## MiniMax API integration

```typescript
const response = await fetch("https://api.minimax.chat/v1/text/chatcompletion_v2", {
  method: "POST",
  headers: {
    "Authorization": `Bearer ${Deno.env.get("MINIMAX_API_KEY")}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    model: "minimax-text-01",
    messages: [
      {
        role: "system",
        content: "You are a CV parser. Extract structured data and return only valid JSON matching the provided schema. No markdown, no preamble.",
      },
      {
        role: "user",
        content: `Parse this CV and return JSON:\n\n${rawText}`,
      },
    ],
  }),
});
```

The JSON schema is passed in the system prompt. The response is validated with Zod before writing to the database.

---

## RenderCV integration

RenderCV is invoked as a CLI process from within the `render-cv` edge function:

```typescript
const proc = new Deno.Command("rendercv", {
  args: ["render", yamlPath, "--output-format", "pdf", "--output-folder", outputDir],
});
const { code, stderr } = await proc.output();
if (code !== 0) throw new Error(new TextDecoder().decode(stderr));
```

The YAML shape written to `parsed_cv_data.rendercv_yaml` matches RenderCV's schema exactly, so no transformation is needed at render time.

---

## Environment variables

| Variable | Where set | Description |
|---|---|---|
| `SUPABASE_URL` | Edge fn + frontend | Supabase project URL |
| `SUPABASE_ANON_KEY` | Frontend | Public anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Edge fn only | Bypasses RLS for storage writes |
| `MINIMAX_API_KEY` | Edge fn only | MiniMax API secret |

Never expose `SUPABASE_SERVICE_ROLE_KEY` or `MINIMAX_API_KEY` to the frontend.

---

## Error handling

| Failure point | Behaviour |
|---|---|
| PDF is scanned / image-only | `extract-cv` falls back to pytesseract OCR; if still empty, sets status `error` with message |
| MiniMax returns malformed JSON | Retry once with a stricter prompt; on second failure set status `error` |
| RenderCV CLI exits non-zero | Capture stderr, write to `render_jobs.error_message`, set status `error` |
| Upload exceeds 10 MB | Rejected by Supabase Storage bucket policy before hitting edge functions |
| Unauthenticated request to edge fn | Return 401; all storage and DB ops fail at RLS level regardless |

---

## Milestones

### M1 — Auth + upload (week 1)

- Supabase project setup, tables, RLS policies, storage buckets
- Next.js app with Supabase Auth UI
- File upload to `cv-uploads` storage
- Dashboard listing uploads with status

### M2 — Extraction + parsing (week 2)

- `extract-cv` edge function + PyMuPDF integration
- `parse-cv` edge function + MiniMax API call
- Database webhook wiring
- `parsed_cv_data` schema + Zod validation

### M3 — Rendering + preview (week 3)

- `render-cv` edge function + RenderCV CLI integration
- PDF.js embed on `/cv/[upload_id]`
- Realtime status updates

### M4 — Edit + re-render (week 4)

- Parsed fields editor on the CV page
- Re-render on save
- Error states and user-facing error messages

### M5 — Polish (week 5)

- Loading states and skeleton UI
- Signed URL expiry handling (auto-refresh)
- Basic rate limiting on edge functions
- Deployment to Vercel + Supabase production
