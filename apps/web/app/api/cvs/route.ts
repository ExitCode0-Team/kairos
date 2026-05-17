import { ApiUnavailable, serverFetch } from "@/lib/api/server";
import { cvsFallback } from "@/lib/api/fallback";
import { saveCv } from "@/lib/server/supabase";
import type { Cv, CvListResponse } from "@/lib/api/types";

export const runtime = "nodejs";

const ACCEPTED_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);
const MAX_BYTES = 10 * 1024 * 1024;

export async function GET() {
  try {
    const { status, json } = await serverFetch<CvListResponse>("/v1/cvs");
    if (status >= 200 && status < 300) return Response.json(json, { status });
    return Response.json({ error: "upstream_error" }, { status });
  } catch (err) {
    if (err instanceof ApiUnavailable) {
      return Response.json(cvsFallback(), { status: 200 });
    }
    return Response.json({ error: "upstream_failure" }, { status: 502 });
  }
}

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
    const { status, json } = await serverFetch<Cv>("/v1/cvs", {
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
    const cv: Cv = {
      id: `cv-${Date.now()}`,
      name: file.name.replace(/\.[^./]+$/, ""),
      uploadedAt: new Date().toISOString(),
      isDefault: false,
      sizeBytes: file.size,
    };
    return Response.json(cv);
  } catch (err) {
    return Response.json(
      { error: "cv_save_failed", message: err instanceof Error ? err.message : "Unknown" },
      { status: 500 },
    );
  }
}
