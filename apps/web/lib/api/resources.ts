/**
 * Resource-scoped server fetchers. Each helper hits the FastAPI upstream when
 * KAIROS_API_URL is set, and falls back to the bundled fixture otherwise.
 *
 * Use these from server components (page.tsx files) when you need data at
 * render time. Client mutations should go through lib/api/client.ts and
 * the Next route handlers.
 */

import { serverFetch, ApiUnavailable } from "./server";
import {
  connectorStatusFallback,
  connectorsFallback,
  cvsFallback,
  dashboardFallback,
  jobPreferencesFallback,
  jobPreferencesPoolFallback,
  matchesFallback,
  profileFallback,
  settingsFallback,
} from "./fallback";
import type {
  ConnectorStatus,
  ConnectorsCatalog,
  CvListResponse,
  DashboardSummary,
  JobPreferences,
  JobPreferencesPool,
  MatchListParams,
  MatchListResponse,
  Settings,
  UserProfile,
} from "./types";

async function withFallback<T>(
  fn: () => Promise<{ status: number; json: T }>,
  fb: () => T,
): Promise<T> {
  try {
    const { status, json } = await fn();
    if (status >= 200 && status < 300) return json;
    return fb();
  } catch (err) {
    if (err instanceof ApiUnavailable) return fb();
    return fb();
  }
}

export async function getProfile(): Promise<UserProfile> {
  return withFallback<UserProfile>(
    () => serverFetch("/v1/profile"),
    profileFallback,
  );
}

export async function getMatches(
  params: MatchListParams = {},
): Promise<MatchListResponse> {
  const qs = new URLSearchParams();
  if (params.tab) qs.set("tab", params.tab);
  if (params.sort) qs.set("sort", params.sort);
  if (params.page) qs.set("page", String(params.page));
  if (params.pageSize) qs.set("pageSize", String(params.pageSize));
  if (params.q) qs.set("q", params.q);
  const path = `/v1/matches${qs.size ? `?${qs.toString()}` : ""}`;
  return withFallback<MatchListResponse>(
    () => serverFetch(path),
    () => matchesFallback(params),
  );
}

export async function getConnectors(): Promise<ConnectorsCatalog> {
  return withFallback<ConnectorsCatalog>(
    () => serverFetch("/v1/connectors"),
    connectorsFallback,
  );
}

export async function getConnectorStatus(): Promise<ConnectorStatus> {
  return withFallback<ConnectorStatus>(
    () => serverFetch("/v1/connectors/status"),
    connectorStatusFallback,
  );
}

export async function getDashboardSummary(): Promise<DashboardSummary> {
  return withFallback<DashboardSummary>(
    () => serverFetch("/v1/dashboard/summary"),
    dashboardFallback,
  );
}

export async function getCvs(): Promise<CvListResponse> {
  return withFallback<CvListResponse>(() => serverFetch("/v1/cvs"), cvsFallback);
}

export async function getSettings(): Promise<Settings> {
  return withFallback<Settings>(() => serverFetch("/v1/settings"), settingsFallback);
}

export async function getJobPreferencesPool(): Promise<JobPreferencesPool> {
  return withFallback<JobPreferencesPool>(
    () => serverFetch("/v1/preferences/jobs/pool"),
    jobPreferencesPoolFallback,
  );
}

export async function getJobPreferences(): Promise<JobPreferences> {
  return withFallback<JobPreferences>(
    () => serverFetch("/v1/preferences/jobs"),
    jobPreferencesFallback,
  );
}
