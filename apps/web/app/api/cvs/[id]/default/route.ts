import { ApiUnavailable, serverFetch } from "@/lib/api/server";
import { cvsFallback } from "@/lib/api/fallback";
import type { Cv } from "@/lib/api/types";

export async function POST(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  try {
    const { status, json } = await serverFetch<Cv>(
      `/v1/cvs/${encodeURIComponent(id)}/set-default`,
      { method: "POST" },
    );
    if (status >= 200 && status < 300) return Response.json(json, { status });
    return Response.json({ error: "upstream_error" }, { status });
  } catch (err) {
    if (err instanceof ApiUnavailable) {
      const fallback = cvsFallback().items.find((c) => c.id === id);
      return Response.json(
        fallback
          ? { ...fallback, isDefault: true }
          : { error: "not_found" },
        { status: fallback ? 200 : 404 },
      );
    }
    return Response.json({ error: "upstream_failure" }, { status: 502 });
  }
}
