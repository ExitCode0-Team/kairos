/**
 * Bundled fixtures used when KAIROS_API_URL is unset, so dev works without
 * the upstream FastAPI service. Each fixture mirrors the shape its endpoint
 * promises.
 *
 * TODO(api): drop these once FastAPI is reachable in all environments.
 */

import { JOB_TAG_POOL } from "@/lib/preferences/job-tag-pool";
import { MAX_JOB_PREFERENCES } from "@/lib/preferences/constants";
import type {
  Activity,
  ConnectorsCatalog,
  ConnectorStatus,
  Cv,
  CvListResponse,
  DashboardSummary,
  HealthResponse,
  JobPreferences,
  JobPreferencesPool,
  Match,
  MatchListParams,
  MatchListResponse,
  Settings,
  UserProfile,
} from "./types";

// ---------- Profile ----------

export function profileFallback(): UserProfile {
  return {
    name: "",
    role: "",
    skills: [],
    experience: "",
    projects: [],
    references: [],
  };
}

// ---------- Matches ----------

const MATCH_FIXTURES: Match[] = [
  {
    id: "stripe-1",
    company: "Stripe",
    role: "Senior Frontend Engineer",
    location: "San Francisco, CA",
    score: 94,
    postedAt: hoursAgo(2),
    skills: ["React", "TypeScript", "Next.js", "GraphQL", "Design systems"],
  },
  {
    id: "linear-1",
    company: "Linear",
    role: "Staff Engineer, Platform",
    location: "Remote",
    score: 89,
    postedAt: hoursAgo(4),
    skills: ["TypeScript", "Node.js", "PostgreSQL", "AWS"],
  },
  {
    id: "vercel-1",
    company: "Vercel",
    role: "Software Engineer, DX",
    location: "Remote",
    score: 86,
    postedAt: hoursAgo(6),
    skills: ["React", "Next.js", "Developer tools"],
  },
  {
    id: "notion-1",
    company: "Notion",
    role: "Frontend Engineer",
    location: "New York, NY",
    score: 78,
    postedAt: daysAgo(1),
    skills: ["React", "TypeScript", "CSS"],
  },
  {
    id: "stripe-2",
    company: "Stripe",
    role: "Frontend Engineer",
    location: "Remote",
    score: 91,
    postedAt: daysAgo(1),
    skills: ["React", "TypeScript", "Payments"],
  },
  {
    id: "linear-2",
    company: "Linear",
    role: "Senior Product Engineer",
    location: "San Francisco, CA",
    score: 85,
    postedAt: daysAgo(2),
    skills: ["React", "TypeScript", "Product"],
  },
  {
    id: "vercel-2",
    company: "Vercel",
    role: "Senior Frontend Engineer",
    location: "Remote",
    score: 82,
    postedAt: daysAgo(2),
    skills: ["Next.js", "React", "Edge"],
  },
  {
    id: "notion-2",
    company: "Notion",
    role: "Senior Frontend Engineer",
    location: "San Francisco, CA",
    score: 80,
    postedAt: daysAgo(3),
    skills: ["React", "Performance", "Accessibility"],
  },
  {
    id: "figma-1",
    company: "Figma",
    role: "Software Engineer, UI",
    location: "San Francisco, CA",
    score: 76,
    postedAt: daysAgo(3),
    skills: ["TypeScript", "WebGL", "React"],
  },
  {
    id: "figma-2",
    company: "Figma",
    role: "Frontend Engineer",
    location: "New York, NY",
    score: 72,
    postedAt: daysAgo(4),
    skills: ["React", "C++", "Canvas"],
  },
  {
    id: "airbnb-1",
    company: "Airbnb",
    role: "Senior Software Engineer",
    location: "Remote",
    score: 68,
    postedAt: daysAgo(5),
    skills: ["React", "GraphQL", "Ruby"],
  },
  {
    id: "airbnb-2",
    company: "Airbnb",
    role: "Frontend Engineer, Host",
    location: "San Francisco, CA",
    score: 65,
    postedAt: daysAgo(7),
    skills: ["React", "TypeScript", "Mobile web"],
  },
];

function hoursAgo(h: number): string {
  return new Date(Date.now() - h * 3600 * 1000).toISOString();
}
function daysAgo(d: number): string {
  return new Date(Date.now() - d * 24 * 3600 * 1000).toISOString();
}

export function matchesFallback(params: MatchListParams = {}): MatchListResponse {
  const { tab = "all", sort = "best", page = 1, pageSize = 20, q } = params;
  let items = [...MATCH_FIXTURES];

  if (tab === "high") items = items.filter((m) => m.score >= 80);
  if (tab === "new") {
    const oneDayAgo = Date.now() - 24 * 3600 * 1000;
    items = items.filter((m) => Date.parse(m.postedAt) >= oneDayAgo);
  }
  if (q && q.trim()) {
    const needle = q.trim().toLowerCase();
    items = items.filter(
      (m) =>
        m.company.toLowerCase().includes(needle) ||
        m.role.toLowerCase().includes(needle) ||
        m.skills.some((s) => s.toLowerCase().includes(needle)),
    );
  }

  if (sort === "score") items.sort((a, b) => b.score - a.score);
  else if (sort === "newest")
    items.sort((a, b) => Date.parse(b.postedAt) - Date.parse(a.postedAt));
  else items.sort((a, b) => b.score - a.score);

  const total = items.length;
  const start = Math.max(0, (page - 1) * pageSize);
  return { items: items.slice(start, start + pageSize), total, page, pageSize };
}

export function bookmarkFallback(_id: string, saved: boolean): { saved: boolean } {
  return { saved };
}

export function applyFallback(id: string): { ok: true; applicationId: string } {
  return { ok: true, applicationId: `local-${id}-${Date.now()}` };
}

// ---------- Connectors ----------

export function connectorsFallback(): ConnectorsCatalog {
  return {
    dataSources: [
      { id: "notion", category: "data", name: "Notion", description: "Sync notes and docs to keep your profile current." },
      { id: "github", category: "data", name: "GitHub", description: "Pull projects and contributions automatically." },
      { id: "drive", category: "data", name: "Google Drive", description: "Connect docs and portfolios." },
      { id: "cv", category: "data", name: "Upload CV", description: "Parse your existing CV instantly." },
    ],
    channels: [
      { id: "whatsapp", category: "channel", name: "WhatsApp", description: "Get alerts and send commands via WhatsApp." },
      { id: "telegram", category: "channel", name: "Telegram", description: "Chat with Kairos on Telegram." },
      { id: "slack", category: "channel", name: "Slack", description: "Receive updates in your Slack workspace." },
      { id: "discord", category: "channel", name: "Discord", description: "Get notifications via Discord DM." },
      { id: "email", category: "channel", name: "Email", description: "Traditional email notifications." },
    ],
    comingSoon: [
      { id: "linear", category: "coming_soon", name: "Linear", description: "Sync issues and project context." },
      { id: "jira", category: "coming_soon", name: "Jira", description: "Connect sprint and ticket history." },
    ],
  };
}

export function connectorStatusFallback(): ConnectorStatus {
  return { connected: [], activeChannel: "whatsapp" };
}

// ---------- Dashboard ----------

export function dashboardFallback(): DashboardSummary {
  const recent = matchesFallback({ sort: "score", pageSize: 4 }).items;
  const activities: Activity[] = [
    { id: "act-1", iconKey: "cv", label: "CV generated for Stripe", at: hoursAgo(0.03) },
    { id: "act-2", iconKey: "match", label: "New high match: OpenAI", at: hoursAgo(1) },
    { id: "act-3", iconKey: "agent", label: "GitHub synced successfully", at: hoursAgo(3) },
  ];
  return {
    stats: {
      matchesToday: 4,
      newThisWeek: 12,
      avgMatchScore: 84,
      savedRoles: 7,
      deltas: { matchesToday: 1, newThisWeek: 4, avgMatchScore: 4, savedRoles: 2 },
    },
    recentMatches: recent,
    activities,
  };
}

// ---------- CVs ----------

const CV_FIXTURES: Cv[] = [
  { id: "cv-product", name: "Product Designer — General", uploadedAt: daysAgo(2), isDefault: true, sizeBytes: 220_000 },
  { id: "cv-frontend", name: "Frontend Engineer — Tailored", uploadedAt: daysAgo(7), isDefault: false, sizeBytes: 180_000 },
  { id: "cv-master", name: "Full CV — Master", uploadedAt: daysAgo(21), isDefault: false, sizeBytes: 260_000 },
];

export function cvsFallback(): CvListResponse {
  return { items: CV_FIXTURES };
}

// ---------- Settings ----------

export function settingsFallback(): Settings {
  return {
    displayName: "Kairos User",
    email: "you@example.com",
    notificationChannel: "whatsapp",
  };
}

// ---------- Job preferences ----------

export function jobPreferencesPoolFallback(): JobPreferencesPool {
  return {
    tags: JOB_TAG_POOL.map((t) => ({ id: t.id, label: t.label })),
    max: MAX_JOB_PREFERENCES,
  };
}

export function jobPreferencesFallback(): JobPreferences {
  return { tags: [] };
}

// ---------- Health ----------

export function healthFallback(): HealthResponse {
  return { ok: true, version: "dev-fallback" };
}
