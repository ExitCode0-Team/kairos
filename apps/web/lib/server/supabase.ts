import type { UserProfile } from "@/lib/onboarding/types";

/**
 * Single Supabase swap point for onboarding writes.
 *
 * Everything below is intentionally stubbed. When Supabase is provisioned,
 * replace these implementations with calls to the supabase-js client
 * (and add the corresponding env vars). The API routes and chat hook do not
 * need to change.
 */

// TODO(supabase): persist the onboarding profile (insert into `profiles`).
export async function saveProfile(profile: UserProfile): Promise<void> {
  if (process.env.NODE_ENV !== "production") {
    console.info("[onboarding] saveProfile (stub)", profile);
  }
}

// TODO(supabase): upload the CV file to Supabase Storage and link it to the row.
export async function saveCv(file: File): Promise<void> {
  if (process.env.NODE_ENV !== "production") {
    console.info("[onboarding] saveCv (stub)", {
      name: file.name,
      size: file.size,
      type: file.type,
    });
  }
}

// TODO(supabase): swap with real CV parsing (MiniMax / cv-pipeline).
export async function parseCvStub(_file: File): Promise<UserProfile> {
  await new Promise((r) => setTimeout(r, 600));
  return {
    name: "Alex Chen",
    role: "Senior Product Designer",
    skills: ["Figma", "User Research", "Prototyping", "Design Systems", "React"],
    experience:
      "8 years of product design experience across fintech and SaaS. Led design at two startups from 0 to 1.",
    projects: [
      "Atlas — design system used by 40+ product teams",
      "Lumen — onboarding flow that cut drop-off 38%",
      "Forge — internal tool that replaced a $200k/yr vendor",
    ],
    references: [
      "Priya Shah — VP Design, Lumen Labs",
      "Daniel Ortiz — Eng Director, Forge",
    ],
  };
}
