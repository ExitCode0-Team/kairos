import { ApiUnavailable, serverFetch } from "@/lib/api/server";
import { dashboardFallback } from "@/lib/api/fallback";
import type { DashboardSummary } from "@/lib/api/types";

export async function GET() {
  try {
    const { status, json } = await serverFetch<DashboardSummary>("/v1/dashboard/summary");
    if (status >= 200 && status < 300) return Response.json(json, { status });
    return Response.json({ error: "upstream_error" }, { status });
  } catch (err) {
    if (err instanceof ApiUnavailable) {
      return Response.json(dashboardFallback(), { status: 200 });
    }
    return Response.json({ error: "upstream_failure" }, { status: 502 });
  }
}
