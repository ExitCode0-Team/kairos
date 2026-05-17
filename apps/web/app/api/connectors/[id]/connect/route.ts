import { ApiUnavailable, serverFetch } from "@/lib/api/server";

export async function POST(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  try {
    const { status, json } = await serverFetch(
      `/v1/connectors/${encodeURIComponent(id)}/connect`,
      { method: "POST" },
    );
    if (status >= 200 && status < 300) return Response.json(json, { status });
    return Response.json({ error: "upstream_error" }, { status });
  } catch (err) {
    if (err instanceof ApiUnavailable) {
      return Response.json({ connected: true }, { status: 200 });
    }
    return Response.json({ error: "upstream_failure" }, { status: 502 });
  }
}
