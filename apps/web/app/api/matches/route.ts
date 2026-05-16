import { ApiUnavailable, serverFetch } from "@/lib/api/server";
import { matchesFallback } from "@/lib/api/fallback";
import type { MatchListParams, MatchListResponse } from "@/lib/api/types";

function parseParams(url: URL): MatchListParams {
  const sp = url.searchParams;
  const tab = sp.get("tab");
  const sort = sp.get("sort");
  const page = sp.get("page");
  const pageSize = sp.get("pageSize");
  const q = sp.get("q");
  return {
    tab: tab === "high" || tab === "new" || tab === "all" ? tab : undefined,
    sort: sort === "best" || sort === "newest" || sort === "score" ? sort : undefined,
    page: page ? Math.max(1, Number(page)) : undefined,
    pageSize: pageSize ? Math.max(1, Number(pageSize)) : undefined,
    q: q ?? undefined,
  };
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const params = parseParams(url);

  try {
    const { status, json } = await serverFetch<MatchListResponse>(
      `/v1/matches${url.search}`,
    );
    if (status >= 200 && status < 300) {
      return Response.json(json, { status });
    }
    return Response.json({ error: "upstream_error" }, { status });
  } catch (err) {
    if (err instanceof ApiUnavailable) {
      return Response.json(matchesFallback(params), { status: 200 });
    }
    return Response.json({ error: "upstream_failure" }, { status: 502 });
  }
}
