"use client";

import { useState, useTransition } from "react";
import { ArrowRight, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getCompanyAvatarClass } from "@/lib/matches/company-colors";
import { getMatchScoreLabel } from "@/lib/matches/score-label";
import { formatRelativeTime } from "@/lib/matches/format-time";
import { apiFetch } from "@/lib/api/client";
import type { Match } from "@/lib/api/types";
import { cn } from "@/lib/utils";

export type MatchCardData = Match;

export function MatchCard({ match }: { match: Match }) {
  const [saved, setSaved] = useState(Boolean(match.saved));
  const [applied, setApplied] = useState(Boolean(match.applied));
  const [, startTransition] = useTransition();
  const { label, className: scoreClassName } = getMatchScoreLabel(match.score);
  const visibleSkills = match.skills.slice(0, 3);
  const overflowCount = match.skills.length - visibleSkills.length;
  const avatarClass = getCompanyAvatarClass(match.company);
  const timeLabel = formatRelativeTime(match.postedAt);

  const toggleSaved = () => {
    const next = !saved;
    setSaved(next);
    startTransition(() => {
      void apiFetch(`/api/matches/${encodeURIComponent(match.id)}/bookmark`, {
        method: "POST",
        body: JSON.stringify({ saved: next }),
      });
    });
  };

  const onApply = () => {
    if (applied) return;
    setApplied(true);
    startTransition(() => {
      void apiFetch(`/api/matches/${encodeURIComponent(match.id)}/apply`, {
        method: "POST",
      });
    });
  };

  return (
    <Card className="flex items-center gap-3 px-3 py-2.5">
      <div
        className={cn(
          "flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-xs font-bold",
          avatarClass,
        )}
      >
        {match.company[0]}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold leading-tight text-foreground">
          {match.role}
        </p>
        <div className="mt-0.5 flex min-w-0 flex-wrap items-center gap-x-2 gap-y-0.5">
          <p className="text-xs leading-tight text-muted-foreground">
            {match.company} · {match.location}
            {timeLabel ? ` · ${timeLabel}` : ""}
          </p>
          <div className="flex flex-wrap items-center gap-1">
            {visibleSkills.map((skill) => (
              <span
                key={skill}
                className="rounded bg-muted px-1.5 py-px text-[11px] font-medium leading-none text-muted-foreground"
              >
                {skill}
              </span>
            ))}
            {overflowCount > 0 ? (
              <span className="rounded bg-muted px-1.5 py-px text-[11px] font-medium leading-none text-muted-foreground">
                +{overflowCount}
              </span>
            ) : null}
          </div>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <div className="hidden items-baseline gap-1 md:flex">
          <span className="text-lg font-bold leading-none tabular-nums text-foreground">
            {match.score}
          </span>
          <span
            className={cn(
              "max-w-[4.5rem] text-[11px] font-medium leading-tight",
              scoreClassName,
            )}
          >
            {label}
          </span>
        </div>
        <Button
          variant="default"
          size="sm"
          className="h-8 shrink-0 gap-1 px-3 text-xs"
          onClick={onApply}
          disabled={applied}
        >
          {applied ? "Applied" : "Apply"}
          {!applied && <ArrowRight className="h-3 w-3" />}
        </Button>
        <button
          type="button"
          onClick={toggleSaved}
          className={cn(
            "flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:bg-surface-hover hover:text-foreground",
            saved && "border-[var(--accent)]/40 bg-[var(--accent-soft)] text-[var(--accent)]",
          )}
          aria-label={saved ? "Remove bookmark" : "Bookmark role"}
        >
          <Bookmark className={cn("h-3.5 w-3.5", saved && "fill-current")} />
        </button>
      </div>
    </Card>
  );
}
