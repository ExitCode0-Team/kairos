import { ApiUnavailable, serverFetch } from "@/lib/api/server";

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  try {
    const { status, json } = await serverFetch(
      `/v1/cvs/${encodeURIComponent(id)}`,
      { method: "DELETE" },
    );
    if (status >= 200 && status < 300) return Response.json(json ?? { ok: true }, { status });
    return Response.json({ error: "upstream_error" }, { status });
  } catch (err) {
    if (err instanceof ApiUnavailable) {
      return Response.json({ ok: true }, { status: 200 });
    }
    return Response.json({ error: "upstream_failure" }, { status: 502 });
  }
}
