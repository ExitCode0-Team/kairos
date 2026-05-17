import type { UserProfile } from "./types";

/**
 * Posts the CV file to /api/profile/cv, which proxies to FastAPI /v1/profile/cv
 * (and falls back to lib/server/supabase.parseCvStub when KAIROS_API_URL is unset).
 */
export async function parseCvFile(file: File): Promise<UserProfile> {
  const fd = new FormData();
  fd.append("file", file);

  const res = await fetch("/api/profile/cv", {
    method: "POST",
    body: fd,
  });

  if (!res.ok) {
    throw new Error(`cv_parse_failed:${res.status}`);
  }

  return (await res.json()) as UserProfile;
}
