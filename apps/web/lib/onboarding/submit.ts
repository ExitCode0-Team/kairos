import type { UserProfile } from "./types";

export type FieldErrors = Partial<Record<keyof UserProfile, string[]>>;

export type SubmitResult =
  | { ok: true }
  | { ok: false; fieldErrors?: FieldErrors; message?: string };

export async function submitOnboarding(profile: UserProfile): Promise<SubmitResult> {
  try {
    const res = await fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profile),
    });

    if (res.ok) return { ok: true };

    if (res.status === 400) {
      const json = (await res.json().catch(() => ({}))) as {
        fieldErrors?: FieldErrors;
        message?: string;
      };
      return { ok: false, fieldErrors: json.fieldErrors, message: json.message };
    }

    return { ok: false, message: `Server responded ${res.status}.` };
  } catch (err) {
    return { ok: false, message: err instanceof Error ? err.message : "Network error." };
  }
}
