import {
  Briefcase,
  ExternalLink,
  FileText,
  Gift,
  GitBranch,
  MessageCircle,
  Percent,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { IconWell } from "@/components/ui/icon-well";
import { cn } from "@/lib/utils";

const STAT_ICONS = [Briefcase, Users, TrendingUp, Percent] as const;
const STAT_VALUE_COLORS = [
  "text-primary",
  "text-secondary",
  "text-accent",
  "text-foreground",
] as const;

function StatCard({
  label,
  value,
  delta,
  positive,
  accentIndex,
}: {
  label: string;
  value: string | number;
  delta?: string;
  positive?: boolean;
  accentIndex: number;
}) {
  const Icon = STAT_ICONS[accentIndex % STAT_ICONS.length];
  const valueColor = STAT_VALUE_COLORS[accentIndex % STAT_VALUE_COLORS.length];

  return (
    <Card className="p-4">
      <IconWell size="sm" className="mb-3 bg-muted">
        <Icon className="h-4 w-4 text-primary" />
      </IconWell>
      <div className="mb-1 text-[11px] font-medium uppercase tracking-[0.06em] text-muted-foreground">
        {label}
      </div>
      <div
        className={cn(
          "font-display text-[28px] font-bold leading-tight tracking-tight",
          valueColor
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
        "mt-1 flex items-center gap-1 text-[12px]",
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
  children,
}: {
  title: string;
  action?: string;
  children: React.ReactNode;
}) {
  return (
    <Card className="p-0">
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
      <div className="p-4">{children}</div>
    </Card>
  );
}

const jobMatches = [
  { company: "Stripe", initial: "S", role: "Senior Frontend Engineer", location: "San Francisco", time: "2h ago", score: 94 },
  { company: "Linear", initial: "L", role: "Staff Engineer, Platform", location: "Remote", time: "4h ago", score: 89 },
  { company: "Vercel", initial: "V", role: "Software Engineer, DX", location: "Remote", time: "6h ago", score: 86 },
  { company: "Notion", initial: "N", role: "Frontend Engineer", location: "New York", time: "1d ago", score: 78 },
];

const applications = [
  { company: "Figma", role: "Senior Engineer", score: 91, status: "interview" as const },
  { company: "Anthropic", role: "ML Engineer", score: 85, status: "applied" as const },
  { company: "OpenAI", role: "Research Engineer", score: 82, status: "offer" as const },
  { company: "Supabase", role: "Full Stack Engineer", score: 79, status: "applied" as const },
];

const activities = [
  { icon: FileText, label: "CV generated for Stripe", time: "2m ago" },
  { icon: Gift, label: "Offer received from OpenAI", time: "1h ago" },
  { icon: GitBranch, label: "GitHub synced successfully", time: "3h ago" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display mb-1 text-[24px] font-bold tracking-tight text-foreground">
          Overview
        </h1>
        <p className="text-[14px] text-muted-foreground">The right moment, applied.</p>
      </header>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Applied" value={24} delta="+3 this week" positive accentIndex={0} />
        <StatCard label="Interviews" value={5} delta="+2 this week" positive accentIndex={1} />
        <StatCard label="Avg match score" value={84} delta="+4 pts" positive accentIndex={2} />
        <StatCard label="Response rate" value="32%" delta="-2%" accentIndex={3} />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
        <div className="space-y-6">
          <Panel title="Top matches today" action="View all">
            <JobMatchesList />
          </Panel>
          <Panel title="Recent applications" action="View tracker">
            <ApplicationsTable />
          </Panel>
        </div>
        <div className="space-y-6">
          <Panel title="Kairos agent">
            <AgentPreview />
          </Panel>
          <Panel title="Activity">
            <ActivityList />
          </Panel>
        </div>
      </div>
    </div>
  );
}

function JobMatchesList() {
  return (
    <div className="space-y-3">
      {jobMatches.map((job) => (
        <div key={job.company} className="flex items-center gap-4">
          <IconWell size="sm" className="bg-muted font-display text-[14px] font-bold text-primary">
            {job.initial}
          </IconWell>
          <div className="min-w-0 flex-1">
            <div className="truncate text-[14px] font-medium text-foreground">{job.role}</div>
            <div className="text-[12px] text-muted-foreground">
              {job.company} · {job.location} · {job.time}
            </div>
          </div>
          <Badge variant={job.score >= 80 ? "high" : "medium"}>{job.score}</Badge>
          <Button variant="secondary" size="sm" className="shrink-0 gap-1">
            <MessageCircle className="h-3 w-3" />
            Apply
          </Button>
        </div>
      ))}
    </div>
  );
}

function ApplicationsTable() {
  const statusMap = {
    applied: { label: "Applied", variant: "default" as const },
    interview: { label: "Interview", variant: "accent" as const },
    offer: { label: "Offer", variant: "success" as const },
  };

  return (
    <table className="w-full">
      <thead>
        <tr className="text-left text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          <th className="pb-2">Company</th>
          <th className="pb-2">Role</th>
          <th className="pb-2">Score</th>
          <th className="pb-2">Status</th>
        </tr>
      </thead>
      <tbody>
        {applications.map((app) => (
          <tr key={app.company}>
            <td className="py-2.5 text-[13px] text-foreground">{app.company}</td>
            <td className="py-2.5 text-[13px] text-muted-foreground">{app.role}</td>
            <td className="py-2.5">
              <Badge variant={app.score >= 80 ? "high" : "medium"} className="text-[11px]">
                {app.score}
              </Badge>
            </td>
            <td className="py-2.5">
              <Badge variant={statusMap[app.status].variant} className="text-[11px]">
                {statusMap[app.status].label}
              </Badge>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function AgentPreview() {
  return (
    <div className="space-y-3">
      <ChatBubble align="left">
        87% match — Junior Full-Stack Developer @ Wise. Posted 6 mins ago. Reply 1 to generate your CV.
      </ChatBubble>
      <ChatBubble align="right">1</ChatBubble>
      <ChatBubble align="left">
        Tailoring your CV for Wise… I&apos;ll send the PDF here in about a minute.
      </ChatBubble>
      <a
        href="#"
        className="inline-flex items-center gap-1 text-[12px] font-medium text-primary transition-colors hover:text-primary-hover"
      >
        Open in WhatsApp
        <ExternalLink className="h-3 w-3" />
      </a>
    </div>
  );
}

function ChatBubble({
  children,
  align,
}: {
  children: React.ReactNode;
  align: "left" | "right";
}) {
  return (
    <div
      className={cn(
        "max-w-[95%] rounded-lg px-3 py-2 text-[12px] leading-relaxed",
        align === "left"
          ? "bg-muted text-muted-foreground"
          : "ml-auto bg-primary text-white"
      )}
    >
      {children}
    </div>
  );
}

function ActivityList() {
  return (
    <div className="space-y-3">
      {activities.map((item) => {
        const Icon = item.icon;
        return (
          <div key={item.label} className="flex items-center gap-3">
            <IconWell size="sm" className="bg-muted">
              <Icon className="h-3.5 w-3.5 text-primary" />
            </IconWell>
            <span className="flex-1 truncate text-[13px] text-foreground">{item.label}</span>
            <span className="shrink-0 text-[11px] text-muted-foreground">{item.time}</span>
          </div>
        );
      })}
    </div>
  );
}
