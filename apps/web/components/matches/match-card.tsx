"use client";

import { useState } from "react";
import { ArrowRight, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getCompanyAvatarClass } from "@/lib/matches/company-colors";
import { getMatchScoreLabel } from "@/lib/matches/score-label";
import { cn } from "@/lib/utils";

export type MatchCardData = {
  id: string;
  company: string;
  role: string;
  location: string;
  score: number;
  time: string;
  skills: string[];
  avatarClass: string;
};

export function MatchCard({ match }: { match: MatchCardData }) {
  const [saved, setSaved] = useState(false);
  const { label, className: scoreClassName } = getMatchScoreLabel(match.score);
  const visibleSkills = match.skills.slice(0, 3);
  const overflowCount = match.skills.length - visibleSkills.length;
  const avatarClass = getCompanyAvatarClass(match.company);

  return (
    <Card className="flex items-center gap-3 px-3 py-2.5">
      <div
        className={cn(
          "flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-xs font-bold",
          avatarClass
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
            {match.company} · {match.location} · {match.time}
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
              scoreClassName
            )}
          >
            {label}
          </span>
        </div>
        <Button variant="default" size="sm" className="h-8 shrink-0 gap-1 px-3 text-xs">
          Apply
          <ArrowRight className="h-3 w-3" />
        </Button>
        <button
          type="button"
          onClick={() => setSaved((s) => !s)}
          className={cn(
            "flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:bg-surface-hover hover:text-foreground",
            saved && "border-[var(--accent)]/40 bg-[var(--accent-soft)] text-[var(--accent)]"
          )}
          aria-label={saved ? "Remove bookmark" : "Bookmark role"}
        >
          <Bookmark className={cn("h-3.5 w-3.5", saved && "fill-current")} />
        </button>
      </div>
    </Card>
  );
}
