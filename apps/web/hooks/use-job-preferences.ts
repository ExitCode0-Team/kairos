"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  JOB_PREFERENCES_STORAGE_KEY,
  MAX_JOB_PREFERENCES,
} from "@/lib/preferences/constants";
import {
  JOB_TAG_POOL,
  type JobTagId,
  isJobTagId,
} from "@/lib/preferences/job-tag-pool";
import { PROFILE_STORAGE_KEY, type UserProfile } from "@/lib/onboarding/types";
import { apiFetch } from "@/lib/api/client";
import type { JobPreferences, JobPreferencesPool } from "@/lib/api/types";

type PoolEntry = { id: string; label: string };

function readCachedIds(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(JOB_PREFERENCES_STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((id): id is string => typeof id === "string") : [];
  } catch {
    return [];
  }
}

function writeCachedIds(ids: string[]) {
  try {
    localStorage.setItem(JOB_PREFERENCES_STORAGE_KEY, JSON.stringify(ids));
  } catch {
    // localStorage may be unavailable (private mode); writes are best-effort.
  }
}

function seedFromOnboarding(pool: PoolEntry[]): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = sessionStorage.getItem(PROFILE_STORAGE_KEY);
    if (!raw) return [];
    const profile = JSON.parse(raw) as UserProfile;
    if (!Array.isArray(profile.skills)) return [];

    const skillKeys = new Set(profile.skills.map((s) => s.trim().toLowerCase()));
    const matched: string[] = [];
    for (const tag of pool) {
      if (skillKeys.has(tag.label.toLowerCase()) && matched.length < MAX_JOB_PREFERENCES) {
        matched.push(tag.id);
      }
    }
    return matched;
  } catch {
    return [];
  }
}

export function useJobPreferences() {
  const [pool, setPool] = useState<PoolEntry[]>(JOB_TAG_POOL.map((t) => ({ id: t.id, label: t.label })));
  const [maxPreferences, setMaxPreferences] = useState<number>(MAX_JOB_PREFERENCES);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const pendingPut = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Initial load: fetch pool + persisted tags from API, fall back to localStorage cache.
  useEffect(() => {
    let cancelled = false;

    (async () => {
      const cached = readCachedIds();
      if (cached.length > 0) {
        setSelectedIds(cached);
        setHydrated(true);
      }

      const [poolRes, prefsRes] = await Promise.all([
        apiFetch<JobPreferencesPool>("/api/preferences/jobs/pool"),
        apiFetch<JobPreferences>("/api/preferences/jobs"),
      ]);

      if (cancelled) return;

      const nextPool: PoolEntry[] = poolRes.ok
        ? poolRes.data.tags
        : JOB_TAG_POOL.map((t) => ({ id: t.id, label: t.label }));
      setPool(nextPool);
      if (poolRes.ok) setMaxPreferences(poolRes.data.max ?? MAX_JOB_PREFERENCES);

      const validIds = new Set(nextPool.map((t) => t.id));
      let ids: string[] = [];
      if (prefsRes.ok && Array.isArray(prefsRes.data.tags) && prefsRes.data.tags.length > 0) {
        ids = prefsRes.data.tags.filter((t) => validIds.has(t));
      } else if (cached.length > 0) {
        ids = cached.filter((t) => validIds.has(t));
      } else {
        ids = seedFromOnboarding(nextPool);
      }

      setSelectedIds(ids);
      writeCachedIds(ids);
      setHydrated(true);
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const persist = useCallback((ids: string[]) => {
    writeCachedIds(ids);
    if (pendingPut.current) clearTimeout(pendingPut.current);
    pendingPut.current = setTimeout(() => {
      void apiFetch("/api/preferences/jobs", {
        method: "PUT",
        body: JSON.stringify({ tags: ids }),
      });
    }, 400);
  }, []);

  const addTag = useCallback(
    (id: string) => {
      setSelectedIds((current) => {
        if (current.length >= maxPreferences || current.includes(id)) return current;
        const next = [...current, id];
        persist(next);
        return next;
      });
    },
    [maxPreferences, persist],
  );

  const removeTag = useCallback(
    (id: string) => {
      setSelectedIds((current) => {
        const next = current.filter((item) => item !== id);
        persist(next);
        return next;
      });
    },
    [persist],
  );

  const poolById = useMemo(() => new Map(pool.map((tag) => [tag.id, tag])), [pool]);

  const selectedTags = useMemo(
    () =>
      selectedIds
        .map((id) => poolById.get(id))
        .filter((tag): tag is PoolEntry => Boolean(tag)),
    [selectedIds, poolById],
  );

  const availableTags = useMemo(
    () => pool.filter((tag) => !selectedIds.includes(tag.id)),
    [pool, selectedIds],
  );

  const atMax = selectedIds.length >= maxPreferences;

  // Re-export the loose JobTagId for callers that still want it.
  type JobTagIdExport = JobTagId | string;
  const _typeAnchor: JobTagIdExport | undefined = undefined;
  void _typeAnchor;

  return {
    selectedIds,
    selectedTags,
    availableTags,
    addTag,
    removeTag,
    atMax,
    hydrated,
    maxPreferences,
  };
}

export { isJobTagId };
