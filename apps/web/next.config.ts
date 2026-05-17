import type { NextConfig } from "next";

/**
 * Server-only env vars consumed by apps/web/lib/api/server.ts:
 *   KAIROS_API_URL   — base URL of the FastAPI service (e.g. http://localhost:8000).
 *                      When unset, every /api/* route handler falls back to the
 *                      bundled fixtures in apps/web/lib/api/fallback.ts so dev
 *                      keeps working without the upstream service.
 *   KAIROS_API_TOKEN — bearer token forwarded as `Authorization: Bearer ...`.
 *                      Optional; only forwarded when present.
 *
 * Both should live in a server-only .env(.local) file and NEVER in NEXT_PUBLIC_.
 */
const nextConfig: NextConfig = {};

export default nextConfig;
