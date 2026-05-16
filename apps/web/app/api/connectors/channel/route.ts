import { ApiUnavailable, serverFetch } from "@/lib/api/server";

export async function PUT(req: Request) {
  let body: { channel?: string } = {};
  try {
    body = (await req.json()) as { channel?: string };
  } catch {
    return Response.json({ error: "invalid_body" }, { status: 400 });
  }
  const channel = String(body.channel ?? "").trim();
  if (!channel) return Response.json({ error: "missing_channel" }, { status: 400 });

  try {
    const { status, json } = await serverFetch("/v1/connectors/channel", {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ channel }),
    });
    if (status >= 200 && status < 300) return Response.json(json, { status });
    return Response.json({ error: "upstream_error" }, { status });
  } catch (err) {
    if (err instanceof ApiUnavailable) {
      return Response.json({ activeChannel: channel }, { status: 200 });
    }
    return Response.json({ error: "upstream_failure" }, { status: 502 });
  }
}
