/**
 * Browser-side fetch wrapper. Calls the Next route handlers under /api/* and
 * shapes errors so callers get a consistent type-safe result.
 *
 * Routes are server-rendered by default; this client is meant for in-page
 * mutations and refreshes triggered by user interaction.
 */

import type { ApiError } from "./types";

export type ApiResult<T> =
  | { ok: true; data: T }
  | { ok: false; status: number; error: ApiError };

function isApiError(value: unknown): value is ApiError {
  return (
    typeof value === "object" &&
    value !== null &&
    "error" in (value as Record<string, unknown>)
  );
}

export async function apiFetch<T>(
  path: string,
  init?: RequestInit,
): Promise<ApiResult<T>> {
  try {
    const res = await fetch(path, {
      ...init,
      headers: {
        accept: "application/json",
        ...(init?.body && !(init.body instanceof FormData)
          ? { "content-type": "application/json" }
          : {}),
        ...(init?.headers ?? {}),
      },
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

    if (res.ok) {
      return { ok: true, data: json as T };
    }
    const error: ApiError = isApiError(json)
      ? json
      : { error: "request_failed", message: `HTTP ${res.status}` };
    return { ok: false, status: res.status, error };
  } catch (err) {
    return {
      ok: false,
      status: 0,
      error: {
        error: "network",
        message: err instanceof Error ? err.message : "Network error",
      },
    };
  }
}
