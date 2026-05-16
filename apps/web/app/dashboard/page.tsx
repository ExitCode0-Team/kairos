import {
  ExternalLink,
  FileText,
  Gift,
  GitBranch,
  MessageCircle,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

function StatCard({
  label,
  value,
  delta,
  positive,
}: {
  label: string;
  value: string | number;
  delta?: string;
  positive?: boolean;
}) {
  return (
    <div className="rounded-card bg-surface p-4 shadow-soft">
      <div className="mb-1 text-[11px] uppercase tracking-[0.06em] text-text-muted">
        {label}
      </div>
      <div className="font-display text-[28px] font-medium leading-tight text-text-primary">
        {value}
      </div>
      {delta && (
        <div
          className={cn(
            "mt-1 flex items-center gap-1 text-[12px]",
            positive ? "text-success" : "text-amber"
          )}
        >
          {positive ? (
            <TrendingUp className="h-3 w-3" />
          ) : (
            <TrendingDown className="h-3 w-3" />
          )}
          {delta}
        </div>
      )}
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
    <div className="rounded-card bg-surface shadow-soft">
      <div className="flex items-center justify-between border-b border-border/60 px-4 py-3">
        <h3 className="text-[14px] font-medium text-text-primary">{title}</h3>
        {action && (
          <button
            type="button"
            className="text-[11px] text-text-secondary transition-colors hover:text-text-primary"
          >
            {action}
          </button>
        )}
      </div>
      <div className="p-4">{children}</div>
    </div>
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
  { icon: <FileText className="h-3 w-3" />, label: "CV generated for Stripe", time: "2m ago" },
  { icon: <Gift className="h-3 w-3" />, label: "Offer received from OpenAI", time: "1h ago" },
  { icon: <GitBranch className="h-3 w-3" />, label: "GitHub synced successfully", time: "3h ago" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display mb-1 text-[24px] font-medium text-text-primary">
          Overview
        </h1>
        <p className="text-[14px] text-text-secondary">The right moment, applied.</p>
      </header>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Applied" value={24} delta="+3 this week" positive />
        <StatCard label="Interviews" value={5} delta="+2 this week" positive />
        <StatCard label="Avg match score" value={84} delta="+4 pts" positive />
        <StatCard label="Response rate" value="32%" delta="-2%" />
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
    <div className="divide-y divide-border/60">
      {jobMatches.map((job) => (
        <div key={job.company} className="flex items-center gap-4 py-3 first:pt-0 last:pb-0">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-background text-[14px] font-medium">
            {job.initial}
          </div>
          <div className="min-w-0 flex-1">
            <div className="truncate text-[14px] font-medium text-text-primary">{job.role}</div>
            <JobMeta company={job.company} location={job.location} time={job.time} />
          </div>
          <Badge variant={job.score >= 80 ? "high" : "medium"}>{job.score}</Badge>
          <Button variant="outline" size="sm" className="shrink-0 gap-1">
            <MessageCircle className="h-3 w-3" />
            Apply
          </Button>
        </div>
      ))}
    </div>
  );
}

function JobMeta({
  company,
  location,
  time,
}: {
  company: string;
  location: string;
  time: string;
}) {
  return (
    <div className="text-[12px] text-text-secondary">
      {company} · {location} · {time}
    </div>
  );
}

function ApplicationsTable() {
  const statusMap = {
    applied: { label: "Applied", variant: "blue" as const },
    interview: { label: "Interview", variant: "purple" as const },
    offer: { label: "Offer", variant: "sage" as const },
  };

  return (
    <table className="w-full">
      <thead>
        <tr className="text-left text-[11px] uppercase tracking-wider text-text-muted">
          <th className="pb-2 font-medium">Company</th>
          <th className="pb-2 font-medium">Role</th>
          <th className="pb-2 font-medium">Score</th>
          <th className="pb-2 font-medium">Status</th>
        </tr>
      </thead>
      <tbody>
        {applications.map((app) => (
          <tr key={app.company} className="border-t border-border/60">
            <td className="py-2.5 text-[13px] text-text-primary">{app.company}</td>
            <td className="py-2.5 text-[13px] text-text-secondary">{app.role}</td>
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
        className="inline-flex items-center gap-1 text-[12px] text-blue hover:text-accent"
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
        "max-w-[95%] rounded-xl px-3 py-2 text-[12px] leading-relaxed",
        align === "left"
          ? "bg-background text-text-secondary"
          : "ml-auto bg-user-bubble text-text-primary"
      )}
    >
      {children}
    </div>
  );
}

function ActivityList() {
  return (
    <div className="divide-y divide-border/60">
      {activities.map((item) => (
        <div key={item.label} className="flex items-center gap-3 py-2 first:pt-0 last:pb-0">
          <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-background text-text-secondary">
            {item.icon}
          </div>
          <span className="flex-1 truncate text-[13px] text-text-primary">{item.label}</span>
          <span className="shrink-0 text-[11px] text-text-muted">{item.time}</span>
        </div>
      ))}
    </div>
  );
}
