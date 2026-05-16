/**
 * Shared API types for the Kairos web app.
 *
 * These mirror the FastAPI contract under /v1/* and are used by both the
 * server-side proxy (apps/web/lib/api/server.ts + Next route handlers) and
 * the browser-side client (apps/web/lib/api/client.ts).
 */

import type { UserProfile } from "@/lib/onboarding/types";

export type { UserProfile };

export type ApiError = {
  error: string;
  message?: string;
  fieldErrors?: Record<string, string[]>;
};

// ---------- Matches ----------

export type Match = {
  id: string;
  company: string;
  role: string;
  location: string;
  /** ISO 8601 timestamp the role was posted at. */
  postedAt: string;
  /** 0-100 match score. */
  score: number;
  skills: string[];
  saved?: boolean;
  applied?: boolean;
};

export type MatchListResponse = {
  items: Match[];
  total: number;
  page: number;
  pageSize: number;
};

export type MatchListParams = {
  tab?: "all" | "high" | "new";
  sort?: "best" | "newest" | "score";
  page?: number;
  pageSize?: number;
  q?: string;
};

// ---------- Connectors ----------

export type ConnectorCategory = "data" | "channel" | "coming_soon";

export type Connector = {
  id: string;
  name: string;
  description: string;
  category: ConnectorCategory;
};

export type ConnectorsCatalog = {
  dataSources: Connector[];
  channels: Connector[];
  comingSoon: Connector[];
};

export type ConnectorStatus = {
  connected: string[];
  activeChannel: string;
};

// ---------- Dashboard ----------

export type ActivityIconKey = "match" | "apply" | "save" | "cv" | "agent";

export type Activity = {
  id: string;
  iconKey: ActivityIconKey;
  label: string;
  /** ISO 8601 timestamp. */
  at: string;
};

export type DashboardStats = {
  matchesToday: number;
  newThisWeek: number;
  avgMatchScore: number;
  savedRoles: number;
  deltas: {
    matchesToday?: number;
    newThisWeek?: number;
    avgMatchScore?: number;
    savedRoles?: number;
  };
};

export type DashboardSummary = {
  stats: DashboardStats;
  recentMatches: Match[];
  activities: Activity[];
};

// ---------- CVs ----------

export type Cv = {
  id: string;
  name: string;
  /** ISO 8601 timestamp. */
  uploadedAt: string;
  isDefault: boolean;
  sizeBytes: number;
};

export type CvListResponse = { items: Cv[] };

// ---------- Settings ----------

export type NotificationChannel =
  | "whatsapp"
  | "telegram"
  | "slack"
  | "discord"
  | "email";

export type Settings = {
  displayName: string;
  email: string;
  notificationChannel: NotificationChannel;
};

// ---------- Job preferences ----------

export type JobTag = { id: string; label: string };

export type JobPreferencesPool = {
  tags: JobTag[];
  max: number;
};

export type JobPreferences = {
  tags: string[];
};

// ---------- Health ----------

export type HealthResponse = { ok: true; version: string };
