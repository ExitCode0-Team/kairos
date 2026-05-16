import {
  FileText,
  GitBranch,
  ArrowRight,
  Bookmark,
  Send,
  Sparkles,
  Target,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { IconWell } from "@/components/ui/icon-well";
import { PageHeader } from "@/components/ui/page-header";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getDashboardSummary } from "@/lib/api/resources";
import { formatRelativeTime } from "@/lib/matches/format-time";
import type { Activity, ActivityIconKey, Match } from "@/lib/api/types";
import { cn } from "@/lib/utils";

const ACTIVITY_ICONS: Record<ActivityIconKey, LucideIcon> = {
  match: Target,
  apply: Send,
  save: Bookmark,
  cv: FileText,
  agent: GitBranch,
};

function DashboardZone({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn("border-b border-border pb-8 last:border-b-0", className)}
    >
      {children}
    </section>
  );
}

function formatDelta(value: number | undefined, suffix?: string): string | undefined {
  if (value === undefined || value === 0) return undefined;
  const sign = value > 0 ? "+" : "";
  return `${sign}${value}${suffix ?? ""}`;
}

function StatCard({
  label,
  value,
  delta,
  positive,
  highlight,
}: {
  label: string;
  value: string | number;
  delta?: string;
  positive?: boolean;
  highlight?: boolean;
}) {
  return (
    <Card variant="elevated" padding="none" className="p-5">
      <div className="text-[11px] font-medium uppercase tracking-[0.06em] text-muted-foreground">
        {label}
      </div>
      <div
        className={cn(
          "mt-2 text-4xl font-extrabold leading-none tracking-tight tabular-nums sm:text-[2.75rem]",
          highlight ? "text-primary" : "text-foreground",
        )}
      >
        {value}
      </div>
      {delta && <StatDelta delta={delta} positive={positive} />}
    </Card>
  );
}

function StatDelta({ delta, positive }: { delta: string; positive?: boolean }) {
  return (
    <div
      className={cn(
        "mt-2 flex items-center gap-1 text-[12px]",
        positive ? "text-[var(--success)]" : "text-[var(--danger)]",
      )}
    >
      {positive ? (
        <TrendingUp className="h-3 w-3" />
      ) : (
        <TrendingDown className="h-3 w-3" />
      )}
      {delta}
    </div>
  );
}

function Panel({
  title,
  action,
  flushBody,
  children,
}: {
  title: string;
  action?: string;
  flushBody?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Card variant="default" padding="none">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <h3 className="text-[14px] font-medium text-foreground">{title}</h3>
        {action && (
          <button
            type="button"
            className="text-[11px] font-medium text-primary transition-colors hover:text-primary-hover"
          >
            {action}
          </button>
        )}
      </div>
      <div className={cn(flushBody ? "p-0" : "p-4")}>{children}</div>
    </Card>
  );
}

export default async function DashboardPage() {
  const summary = await getDashboardSummary();
  const { stats, recentMatches, activities } = summary;

  return (
    <div className="space-y-8">
      <section className="section-primary relative overflow-hidden rounded-[20px] px-6 py-8">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[var(--accent)] via-[var(--accent)] to-[color-mix(in_srgb,var(--accent)_60%,#000)]"
        />
        <div className="relative">
          <PageHeader
            title="Overview"
            description="The right moment, applied."
            inverted
            className="mb-6"
          />

          <DashboardZone className="border-b-0 pb-0">
            <div className="rounded-[16px] border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
              <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                <StatCard
                  label="Matches today"
                  value={stats.matchesToday}
                  delta={formatDelta(stats.deltas.matchesToday, " since morning")}
                  positive={(stats.deltas.matchesToday ?? 0) >= 0}
                />
                <StatCard
                  label="New this week"
                  value={stats.newThisWeek}
                  delta={formatDelta(stats.deltas.newThisWeek, " vs last week")}
                  positive={(stats.deltas.newThisWeek ?? 0) >= 0}
                />
                <StatCard
                  label="Avg match score"
                  value={stats.avgMatchScore}
                  delta={formatDelta(stats.deltas.avgMatchScore, " pts")}
                  positive={(stats.deltas.avgMatchScore ?? 0) >= 0}
                  highlight
                />
                <StatCard
                  label="Saved roles"
                  value={stats.savedRoles}
                  delta={formatDelta(stats.deltas.savedRoles, " saved")}
                  positive={(stats.deltas.savedRoles ?? 0) >= 0}
                />
              </div>
            </div>
          </DashboardZone>
        </div>
      </section>

      <div className="grid gap-8 lg:grid-cols-[1fr_300px] lg:divide-x lg:divide-border">
        <div className="space-y-6 lg:pr-8">
          <Panel title="Top matches today" action="View all" flushBody>
            <JobMatchesTable matches={recentMatches} />
          </Panel>
        </div>
        <div className="lg:pl-8">
          <Panel title="Recent activity">
            <ActivityTimeline activities={activities} />
          </Panel>
        </div>
      </div>
    </div>
  );
}

function JobMatchesTable({ matches }: { matches: Match[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-transparent">
          <TableHead>Company</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Match</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {matches.map((job) => (
          <TableRow key={job.id}>
            <TableCell>
              <div className="flex items-center gap-2">
                <IconWell size="sm" className="text-[14px] font-bold text-primary">
                  {job.company[0]}
                </IconWell>
                <span className="font-medium">{job.company}</span>
              </div>
            </TableCell>
            <TableCell className="max-w-[200px] truncate font-medium">
              {job.role}
            </TableCell>
            <TableCell className="text-muted-foreground">
              {job.location}
              <span className="text-muted-foreground/80">
                {" · "}
                {formatRelativeTime(job.postedAt)}
              </span>
            </TableCell>
            <TableCell>
              <Badge variant={job.score >= 80 ? "high" : "medium"}>{job.score}</Badge>
            </TableCell>
            <TableCell className="text-right">
              <Button variant="default" size="sm" className="h-8 gap-1">
                Apply
                <ArrowRight className="h-3 w-3" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function ActivityTimeline({ activities }: { activities: Activity[] }) {
  return (
    <div className="relative">
      <div
        className="animate-timeline-line absolute left-5 top-3 bottom-3 w-px bg-border"
        aria-hidden
      />
      <ol className="relative m-0 list-none p-0">
        {activities.map((item, index) => {
          const Icon = ACTIVITY_ICONS[item.iconKey] ?? Sparkles;
          const isLatest = index === 0;
          return (
            <li
              key={item.id}
              className="animate-timeline-in relative flex gap-4 pb-6 last:pb-0"
              style={{ animationDelay: `${index * 90}ms` }}
            >
              <div
                className={cn(
                  "relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-[var(--bg)] bg-surface-hover",
                  isLatest && "animate-timeline-dot border-[color-mix(in_srgb,var(--accent)_30%,transparent)]",
                )}
              >
                <Icon className="h-3.5 w-3.5 text-primary" />
              </div>
              <div className="min-w-0 flex-1 pt-1.5">
                <p className="text-[13px] font-medium leading-snug text-foreground">
                  {item.label}
                </p>
                <p className="mt-1 text-[11px] text-muted-foreground">
                  {formatRelativeTime(item.at)}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
