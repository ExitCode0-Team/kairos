import { ApiUnavailable, serverFetch } from "@/lib/api/server";
import { connectorsFallback } from "@/lib/api/fallback";
import type { ConnectorsCatalog } from "@/lib/api/types";

export async function GET() {
  try {
    const { status, json } = await serverFetch<ConnectorsCatalog>("/v1/connectors");
    if (status >= 200 && status < 300) return Response.json(json, { status });
    return Response.json({ error: "upstream_error" }, { status });
  } catch (err) {
    if (err instanceof ApiUnavailable) {
      return Response.json(connectorsFallback(), { status: 200 });
    }
    return Response.json({ error: "upstream_failure" }, { status: 502 });
  }
}
