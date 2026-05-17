import { ApiUnavailable, serverFetch } from "@/lib/api/server";
import { jobPreferencesPoolFallback } from "@/lib/api/fallback";
import type { JobPreferencesPool } from "@/lib/api/types";

export async function GET() {
  try {
    const { status, json } = await serverFetch<JobPreferencesPool>(
      "/v1/preferences/jobs/pool",
    );
    if (status >= 200 && status < 300) return Response.json(json, { status });
    return Response.json({ error: "upstream_error" }, { status });
  } catch (err) {
    if (err instanceof ApiUnavailable) {
      return Response.json(jobPreferencesPoolFallback(), { status: 200 });
    }
    return Response.json({ error: "upstream_failure" }, { status: 502 });
  }
}
