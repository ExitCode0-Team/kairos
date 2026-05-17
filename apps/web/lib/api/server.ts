/**
 * Server-only helper for proxying requests from Next route handlers to the
 * upstream FastAPI service.
 *
 * Reads two env vars:
 *   - KAIROS_API_URL   (e.g. http://localhost:8000)   -- required at runtime
 *   - KAIROS_API_TOKEN                                -- optional bearer
 *
 * If KAIROS_API_URL is unset, every helper throws ApiUnavailable so the
 * route handler can fall back to the bundled fixture in lib/api/fallback.ts.
 * This keeps local dev working without needing the Python service up.
 */

export class ApiUnavailable extends Error {
  constructor(message = "KAIROS_API_URL is not configured") {
    super(message);
    this.name = "ApiUnavailable";
  }
}

export class ApiUpstreamError extends Error {
  status: number;
  body: unknown;
  constructor(status: number, body: unknown, message?: string) {
    super(message ?? `Upstream returned ${status}`);
    this.name = "ApiUpstreamError";
    this.status = status;
    this.body = body;
  }
}

export type ServerFetchResult<T = unknown> = {
  status: number;
  json: T;
};

function getBaseUrl(): string {
  const url = process.env.KAIROS_API_URL?.trim();
  if (!url) throw new ApiUnavailable();
  return url.replace(/\/$/, "");
}

function buildHeaders(init?: RequestInit): Headers {
  const headers = new Headers(init?.headers);
  if (!headers.has("accept")) headers.set("accept", "application/json");
  const token = process.env.KAIROS_API_TOKEN?.trim();
  if (token && !headers.has("authorization")) {
    headers.set("authorization", `Bearer ${token}`);
  }
  return headers;
}

/**
 * Call FastAPI server-to-server. Returns the parsed JSON and the upstream
 * status code. Non-2xx responses are returned as-is so the calling route
 * handler can choose how to translate them.
 */
export async function serverFetch<T = unknown>(
  path: string,
  init?: RequestInit,
): Promise<ServerFetchResult<T>> {
  const base = getBaseUrl();
  const url = path.startsWith("http") ? path : `${base}${path}`;

  const res = await fetch(url, {
    ...init,
    headers: buildHeaders(init),
    cache: "no-store",
  });

  const text = await res.text();
  let json: unknown = null;
  if (text) {
    try {
      json = JSON.parse(text);
    } catch {
      json = { raw: text };
    }
  }

  return { status: res.status, json: json as T };
}

/**
 * Helper to forward a body-bearing request (JSON or multipart). Re-uses the
 * original method and content-type so we don't double-parse the body.
 */
export async function forwardRequest<T = unknown>(
  req: Request,
  upstreamPath: string,
): Promise<ServerFetchResult<T>> {
  const headers = new Headers(req.headers);
  // Strip headers that should not be forwarded.
  headers.delete("host");
  headers.delete("connection");
  headers.delete("content-length");
  const token = process.env.KAIROS_API_TOKEN?.trim();
  if (token) headers.set("authorization", `Bearer ${token}`);

  const base = getBaseUrl();
  const res = await fetch(`${base}${upstreamPath}`, {
    method: req.method,
    headers,
    body: ["GET", "HEAD"].includes(req.method) ? undefined : await req.arrayBuffer(),
    cache: "no-store",
  });

  const text = await res.text();
  let json: unknown = null;
  if (text) {
    try {
      json = JSON.parse(text);
    } catch {
      json = { raw: text };
    }
  }
  return { status: res.status, json: json as T };
}

/**
 * Convenience wrapper for route handlers: runs the proxy call; on ApiUnavailable
 * invokes the fallback factory; on any other error returns a 502.
 */
export async function withFallback<T>(
  upstream: () => Promise<ServerFetchResult<T>>,
  fallback: () => T | Promise<T>,
): Promise<Response> {
  try {
    const { status, json } = await upstream();
    return Response.json(json as unknown as T, { status });
  } catch (err) {
    if (err instanceof ApiUnavailable) {
      const data = await fallback();
      return Response.json(data, { status: 200 });
    }
    return Response.json(
      { error: "upstream_failure", message: err instanceof Error ? err.message : "unknown" },
      { status: 502 },
    );
  }
}
