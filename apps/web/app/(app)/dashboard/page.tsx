import {
  FileText,
  GitBranch,
  ArrowRight,
  Target,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
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
import { cn } from "@/lib/utils";

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
    <Card variant="muted" className="bg-background p-5">
      <div className="text-[11px] font-medium uppercase tracking-[0.06em] text-muted-foreground">
        {label}
      </div>
      <div
        className={cn(
          "mt-2 text-4xl font-extrabold leading-none tracking-tight tabular-nums sm:text-[2.75rem]",
          highlight ? "text-primary" : "text-foreground"
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
        positive ? "text-secondary" : "text-muted-foreground"
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

const jobMatches = [
  { company: "Stripe", initial: "S", role: "Senior Frontend Engineer", location: "San Francisco", time: "2h ago", score: 94 },
  { company: "Linear", initial: "L", role: "Staff Engineer, Platform", location: "Remote", time: "4h ago", score: 89 },
  { company: "Vercel", initial: "V", role: "Software Engineer, DX", location: "Remote", time: "6h ago", score: 86 },
  { company: "Notion", initial: "N", role: "Frontend Engineer", location: "New York", time: "1d ago", score: 78 },
];

const activities = [
  { icon: FileText, label: "CV generated for Stripe", time: "2m ago" },
  { icon: Target, label: "New high match: OpenAI", time: "1h ago" },
  { icon: GitBranch, label: "GitHub synced successfully", time: "3h ago" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <section className="section-primary rounded-lg px-6 py-8">
        <PageHeader
          title="Overview"
          description="The right moment, applied."
          inverted
          className="mb-6"
        />

        <DashboardZone className="border-b-0 pb-0">
          <div className="rounded-lg border border-border bg-muted/30 p-4">
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              <StatCard label="Matches today" value={jobMatches.length} delta="+1 since morning" positive />
              <StatCard label="New this week" value={12} delta="+4 vs last week" positive />
              <StatCard label="Avg match score" value={84} delta="+4 pts" positive highlight />
              <StatCard label="Saved roles" value={7} delta="+2 saved" positive />
            </div>
          </div>
        </DashboardZone>
      </section>

      <div className="grid gap-8 lg:grid-cols-[1fr_300px] lg:divide-x lg:divide-border">
        <div className="space-y-6 lg:pr-8">
          <Panel title="Top matches today" action="View all" flushBody>
            <JobMatchesTable />
          </Panel>
        </div>
        <div className="lg:pl-8">
          <Panel title="Recent activity">
            <ActivityTimeline />
          </Panel>
        </div>
      </div>
    </div>
  );
}

function JobMatchesTable() {
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
        {jobMatches.map((job) => (
          <TableRow key={job.company}>
            <TableCell>
              <div className="flex items-center gap-2">
                <IconWell size="sm" className="text-[14px] font-bold text-primary">
                  {job.initial}
                </IconWell>
                <span className="font-medium">{job.company}</span>
              </div>
            </TableCell>
            <TableCell className="max-w-[200px] truncate font-medium">
              {job.role}
            </TableCell>
            <TableCell className="text-muted-foreground">
              {job.location}
              <span className="text-muted-foreground/80"> · {job.time}</span>
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


function ActivityTimeline() {
  return (
    <div className="relative">
      <div
        className="animate-timeline-line absolute left-5 top-3 bottom-3 w-px bg-border"
        aria-hidden
      />
      <ol className="relative m-0 list-none p-0">
      {activities.map((item, index) => {
        const Icon = item.icon;
        const isLatest = index === 0;
        return (
          <li
            key={item.label}
            className="animate-timeline-in relative flex gap-4 pb-6 last:pb-0"
            style={{ animationDelay: `${index * 90}ms` }}
          >
            <div
              className={cn(
                "relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-background bg-muted",
                isLatest && "animate-timeline-dot border-primary/30"
              )}
            >
              <Icon className="h-3.5 w-3.5 text-primary" />
            </div>
            <div className="min-w-0 flex-1 pt-1.5">
              <p className="text-[13px] font-medium leading-snug text-foreground">
                {item.label}
              </p>
              <p className="mt-1 text-[11px] text-muted-foreground">{item.time}</p>
            </div>
          </li>
        );
      })}
      </ol>
    </div>
  );
}
