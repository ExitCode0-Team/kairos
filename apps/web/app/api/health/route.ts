import { ApiUnavailable, serverFetch } from "@/lib/api/server";
import { healthFallback } from "@/lib/api/fallback";
import type { HealthResponse } from "@/lib/api/types";

export async function GET() {
  try {
    const { status, json } = await serverFetch<HealthResponse>("/v1/health");
    if (status >= 200 && status < 300) return Response.json(json, { status });
    return Response.json({ ok: false, error: "upstream_error", status }, { status });
  } catch (err) {
    if (err instanceof ApiUnavailable) {
      return Response.json(healthFallback(), { status: 200 });
    }
    return Response.json(
      { ok: false, error: "upstream_failure", message: err instanceof Error ? err.message : "unknown" },
      { status: 502 },
    );
  }
}
