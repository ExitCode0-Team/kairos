import type { UserProfile } from "./types";

/** Mock CV parser — swap for MiniMax / cv-pipeline API later */
export async function parseCvFile(_file: File): Promise<UserProfile> {
  await new Promise((r) => setTimeout(r, 1800));

  return {
    name: "Alex Chen",
    role: "Senior Product Designer",
    skills: ["Figma", "User Research", "Prototyping", "Design Systems", "React"],
    experience:
      "8 years of product design experience across fintech and SaaS. Led design at two startups from 0 to 1.",
  };
}
