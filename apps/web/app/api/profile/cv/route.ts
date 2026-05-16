import { ApiUnavailable, serverFetch } from "@/lib/api/server";
import { parseCvStub, saveCv } from "@/lib/server/supabase";
import type { UserProfile } from "@/lib/api/types";

export const runtime = "nodejs";

const ACCEPTED_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

const MAX_BYTES = 10 * 1024 * 1024; // 10 MB

export async function POST(req: Request) {
  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return Response.json({ error: "invalid_form" }, { status: 400 });
  }

  const file = form.get("file");
  if (!(file instanceof File)) {
    return Response.json({ error: "no_file" }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return Response.json({ error: "file_too_large" }, { status: 413 });
  }
  if (file.type && !ACCEPTED_TYPES.has(file.type)) {
    return Response.json({ error: "unsupported_type" }, { status: 415 });
  }

  try {
    const upstreamForm = new FormData();
    upstreamForm.append("file", file, file.name);
    const { status, json } = await serverFetch<UserProfile>("/v1/profile/cv", {
      method: "POST",
      body: upstreamForm,
    });
    return Response.json(json, { status });
  } catch (err) {
    if (!(err instanceof ApiUnavailable)) {
      return Response.json(
        { error: "upstream_failure", message: err instanceof Error ? err.message : "unknown" },
        { status: 502 },
      );
    }
  }

  try {
    await saveCv(file);
    const profile = await parseCvStub(file);
    return Response.json(profile);
  } catch (err) {
    return Response.json(
      {
        error: "cv_parse_failed",
        message: err instanceof Error ? err.message : "Unknown error.",
      },
      { status: 500 },
    );
  }
}
