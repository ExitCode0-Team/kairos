"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
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

function readStoredIds(): JobTagId[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(JOB_PREFERENCES_STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((id): id is JobTagId => typeof id === "string" && isJobTagId(id));
  } catch {
    return [];
  }
}

function writeStoredIds(ids: JobTagId[]) {
  localStorage.setItem(JOB_PREFERENCES_STORAGE_KEY, JSON.stringify(ids));
}

function seedFromOnboarding(): JobTagId[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = sessionStorage.getItem(PROFILE_STORAGE_KEY);
    if (!raw) return [];
    const profile = JSON.parse(raw) as UserProfile;
    if (!Array.isArray(profile.skills)) return [];

    const skillKeys = new Set(profile.skills.map((s) => s.trim().toLowerCase()));
    const matched: JobTagId[] = [];

    for (const tag of JOB_TAG_POOL) {
      if (skillKeys.has(tag.label.toLowerCase()) && matched.length < MAX_JOB_PREFERENCES) {
        matched.push(tag.id);
      }
    }
    return matched;
  } catch {
    return [];
  }
}

function loadInitialIds(): JobTagId[] {
  const stored = readStoredIds();
  if (stored.length > 0) return stored;

  const seeded = seedFromOnboarding();
  if (seeded.length > 0) {
    writeStoredIds(seeded);
    return seeded;
  }
  return [];
}

export function useJobPreferences() {
  const [selectedIds, setSelectedIds] = useState<JobTagId[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setSelectedIds(loadInitialIds());
    setHydrated(true);
  }, []);

  const addTag = useCallback(
    (id: JobTagId) => {
      setSelectedIds((current) => {
        if (current.length >= MAX_JOB_PREFERENCES || current.includes(id)) {
          return current;
        }
        const next = [...current, id];
        writeStoredIds(next);
        return next;
      });
    },
    []
  );

  const removeTag = useCallback((id: JobTagId) => {
    setSelectedIds((current) => {
      const next = current.filter((item) => item !== id);
      writeStoredIds(next);
      return next;
    });
  }, []);

  const selectedTags = useMemo(
    () =>
      selectedIds
        .map((id) => JOB_TAG_POOL.find((tag) => tag.id === id))
        .filter((tag): tag is (typeof JOB_TAG_POOL)[number] => tag !== undefined),
    [selectedIds]
  );

  const availableTags = useMemo(
    () => JOB_TAG_POOL.filter((tag) => !selectedIds.includes(tag.id)),
    [selectedIds]
  );

  const atMax = selectedIds.length >= MAX_JOB_PREFERENCES;

  return {
    selectedIds,
    selectedTags,
    availableTags,
    addTag,
    removeTag,
    atMax,
    hydrated,
    maxPreferences: MAX_JOB_PREFERENCES,
  };
}
