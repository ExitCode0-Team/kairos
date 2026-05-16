export const JOB_TAG_POOL = [
  // Work style
  { id: "remote", label: "Remote" },
  { id: "hybrid", label: "Hybrid" },
  { id: "on-site", label: "On-site" },
  // Role
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
  { id: "full-stack", label: "Full-stack" },
  { id: "product", label: "Product" },
  { id: "design", label: "Design" },
  { id: "data", label: "Data" },
  { id: "ml", label: "ML" },
  // Level
  { id: "junior", label: "Junior" },
  { id: "mid-level", label: "Mid-level" },
  { id: "senior", label: "Senior" },
  { id: "staff", label: "Staff" },
  // Other
  { id: "startup", label: "Startup" },
  { id: "enterprise", label: "Enterprise" },
  { id: "contract", label: "Contract" },
  { id: "visa-sponsorship", label: "Visa sponsorship" },
] as const;

export type JobTagId = (typeof JOB_TAG_POOL)[number]["id"];

const poolById = new Map(JOB_TAG_POOL.map((tag) => [tag.id, tag]));

const validIds = new Set<string>(JOB_TAG_POOL.map((tag) => tag.id));

export function isJobTagId(id: string): id is JobTagId {
  return validIds.has(id);
}

export function getTagLabel(id: JobTagId): string {
  return poolById.get(id)?.label ?? id;
}
