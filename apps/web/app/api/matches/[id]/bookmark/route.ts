import { ApiUnavailable, serverFetch } from "@/lib/api/server";
import { bookmarkFallback } from "@/lib/api/fallback";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  let body: { saved?: boolean } = {};
  try {
    body = (await req.json()) as { saved?: boolean };
  } catch {
    body = {};
  }
  const saved = Boolean(body.saved);

  try {
    const { status, json } = await serverFetch(`/v1/matches/${encodeURIComponent(id)}/bookmark`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ saved }),
    });
    if (status >= 200 && status < 300) {
      return Response.json(json ?? { saved }, { status });
    }
    return Response.json({ error: "upstream_error" }, { status });
  } catch (err) {
    if (err instanceof ApiUnavailable) {
      return Response.json(bookmarkFallback(id, saved), { status: 200 });
    }
    return Response.json({ error: "upstream_failure" }, { status: 502 });
  }
}
