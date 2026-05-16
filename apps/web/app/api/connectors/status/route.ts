import { ApiUnavailable, serverFetch } from "@/lib/api/server";
import { connectorStatusFallback } from "@/lib/api/fallback";
import type { ConnectorStatus } from "@/lib/api/types";

export async function GET() {
  try {
    const { status, json } = await serverFetch<ConnectorStatus>("/v1/connectors/status");
    if (status >= 200 && status < 300) return Response.json(json, { status });
    return Response.json({ error: "upstream_error" }, { status });
  } catch (err) {
    if (err instanceof ApiUnavailable) {
      return Response.json(connectorStatusFallback(), { status: 200 });
    }
    return Response.json({ error: "upstream_failure" }, { status: 502 });
  }
}
