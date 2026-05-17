import { ApiUnavailable, serverFetch } from "@/lib/api/server";
import { jobPreferencesFallback } from "@/lib/api/fallback";
import type { JobPreferences } from "@/lib/api/types";

export async function GET() {
  try {
    const { status, json } = await serverFetch<JobPreferences>(
      "/v1/preferences/jobs",
    );
    if (status >= 200 && status < 300) return Response.json(json, { status });
    return Response.json({ error: "upstream_error" }, { status });
  } catch (err) {
    if (err instanceof ApiUnavailable) {
      return Response.json(jobPreferencesFallback(), { status: 200 });
    }
    return Response.json({ error: "upstream_failure" }, { status: 502 });
  }
}

export async function PUT(req: Request) {
  let body: { tags?: unknown };
  try {
    body = (await req.json()) as { tags?: unknown };
  } catch {
    return Response.json({ error: "invalid_body" }, { status: 400 });
  }
  if (!Array.isArray(body.tags) || !body.tags.every((t) => typeof t === "string")) {
    return Response.json({ error: "tags_must_be_string_array" }, { status: 400 });
  }
  const tags = body.tags as string[];

  try {
    const { status, json } = await serverFetch<JobPreferences>(
      "/v1/preferences/jobs",
      {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ tags }),
      },
    );
    if (status >= 200 && status < 300) return Response.json(json, { status });
    return Response.json({ error: "upstream_error" }, { status });
  } catch (err) {
    if (err instanceof ApiUnavailable) {
      return Response.json({ tags }, { status: 200 });
    }
    return Response.json({ error: "upstream_failure" }, { status: 502 });
  }
}
