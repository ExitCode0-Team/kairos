import { ArrowUpRight, TrendingUp, TrendingDown, MessageCircle, GitBranch, FileText, Gift, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string | number;
  delta?: string;
  positive?: boolean;
}

function StatCard({ label, value, delta, positive }: StatCardProps) {
  return (
    <div className="p-4 rounded-[10px] bg-panel border border-border">
      <div className="text-[11px] text-text-secondary uppercase tracking-[0.06em] mb-1">
        {label}
      </div>
      <div className="text-[28px] font-medium text-text-primary leading-tight">
        {value}
      </div>
      {delta && (
        <div className={cn(
          "flex items-center gap-1 mt-1 text-[12px]",
          positive ? "text-success" : "text-amber"
        )}>
          {positive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          {delta}
        </div>
      )}
    </div>
  );
}

interface JobMatchProps {
  company: string;
  initial: string;
  role: string;
  location: string;
  timePosted: string;
  score: number;
}

function JobMatchCard({ company, initial, role, location, timePosted, score }: JobMatchProps) {
  const scoreVariant = score >= 80 ? "success" : "amber";
  
  return (
    <div className="flex items-center gap-4 py-3 border-b border-border-muted last:border-0">
      <div className="w-10 h-10 rounded-[8px] bg-main border border-border flex items-center justify-center text-[14px] font-medium text-text-primary shrink-0">
        {initial}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[14px] font-medium text-text-primary truncate">{role}</div>
        <div className="text-[12px] text-text-secondary">
          {company} · {location} · {timePosted}
        </div>
      </div>
      <Badge variant={scoreVariant} className="shrink-0">
        {score}
      </Badge>
      <Button variant="outline" size="sm" className="shrink-0 gap-1">
        <MessageCircle className="w-3 h-3" />
        Apply via WhatsApp
      </Button>
    </div>
  );
}

interface ApplicationRowProps {
  company: string;
  role: string;
  score: number;
  status: "applied" | "interview" | "offer";
}

function ApplicationRow({ company, role, score, status }: ApplicationRowProps) {
  const statusConfig = {
    applied: { label: "Applied", variant: "blue" as const },
    interview: { label: "Interview", variant: "purple" as const },
    offer: { label: "Offer", variant: "success" as const },
  };

  const { label, variant } = statusConfig[status];

  return (
    <tr className="border-b border-border-muted last:border-0">
      <td className="py-2.5 text-[13px] text-text-primary">{company}</td>
      <td className="py-2.5 text-[13px] text-text-secondary">{role}</td>
      <td className="py-2.5">
        <Badge variant={score >= 80 ? "success" : "amber"} className="text-[11px]">
          {score}
        </Badge>
      </td>
      <td className="py-2.5">
        <Badge variant={variant} className="text-[11px]">
          {label}
        </Badge>
      </td>
    </tr>
  );
}

interface ActivityItemProps {
  icon: React.ReactNode;
  label: string;
  timestamp: string;
}

function ActivityItem({ icon, label, timestamp }: ActivityItemProps) {
  return (
    <div className="flex items-center gap-3 py-2 border-b border-border-muted last:border-0">
      <div className="w-6 h-6 rounded-[6px] bg-main flex items-center justify-center text-text-secondary shrink-0">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[13px] text-text-primary truncate">{label}</div>
      </div>
      <div className="text-[11px] text-text-secondary shrink-0">{timestamp}</div>
    </div>
  );
}

function Panel({ 
  title, 
  action, 
  children 
}: { 
  title: string; 
  action?: { label: string; href?: string }; 
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-[10px] bg-panel border border-border">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border-muted">
        <h3 className="text-[14px] font-medium text-text-primary">{title}</h3>
        {action && (
          <button className="text-[11px] text-text-secondary hover:text-text-primary transition-colors">
            {action.label}
          </button>
        )}
      </div>
      <div className="p-4">
        {children}
      </div>
    </div>
  );
}

const jobMatches: JobMatchProps[] = [
  {
    company: "Stripe",
    initial: "S",
    role: "Senior Frontend Engineer",
    location: "San Francisco, CA",
    timePosted: "2h ago",
    score: 94,
  },
  {
    company: "Linear",
    initial: "L",
    role: "Staff Engineer, Platform",
    location: "Remote",
    timePosted: "4h ago",
    score: 89,
  },
  {
    company: "Vercel",
    initial: "V",
    role: "Software Engineer, DX",
    location: "Remote",
    timePosted: "6h ago",
    score: 86,
  },
  {
    company: "Notion",
    initial: "N",
    role: "Frontend Engineer",
    location: "New York, NY",
    timePosted: "1d ago",
    score: 78,
  },
];

const applications: ApplicationRowProps[] = [
  { company: "Figma", role: "Senior Engineer", score: 91, status: "interview" },
  { company: "Anthropic", role: "ML Engineer", score: 85, status: "applied" },
  { company: "OpenAI", role: "Research Engineer", score: 82, status: "offer" },
  { company: "Supabase", role: "Full Stack Engineer", score: 79, status: "applied" },
];

const activities = [
  { icon: <FileText className="w-3 h-3" />, label: "CV generated for Stripe", timestamp: "2m ago" },
  { icon: <Gift className="w-3 h-3" />, label: "Offer received from OpenAI", timestamp: "1h ago" },
  { icon: <GitBranch className="w-3 h-3" />, label: "GitHub synced successfully", timestamp: "3h ago" },
  { icon: <FileText className="w-3 h-3" />, label: "CV sent to Linear", timestamp: "5h ago" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Stats Row */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard label="Applied" value={24} delta="+3 this week" positive />
        <StatCard label="Interviews" value={6} delta="+2 this week" positive />
        <StatCard label="Avg match score" value={87} delta="+4 pts" positive />
        <StatCard label="Response rate" value="32%" delta="-2%" positive={false} />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-[1fr_300px] gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Top Matches */}
          <Panel title="Top matches today" action={{ label: "View all" }}>
            <div className="-my-1">
              {jobMatches.map((job) => (
                <JobMatchCard key={`${job.company}-${job.role}`} {...job} />
              ))}
            </div>
          </Panel>

          {/* Recent Applications */}
          <Panel title="Recent applications" action={{ label: "View all" }}>
            <table className="w-full">
              <thead>
                <tr className="text-[11px] text-text-secondary uppercase tracking-[0.06em]">
                  <th className="text-left pb-2 font-medium">Company</th>
                  <th className="text-left pb-2 font-medium">Role</th>
                  <th className="text-left pb-2 font-medium">Score</th>
                  <th className="text-left pb-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app) => (
                  <ApplicationRow key={`${app.company}-${app.role}`} {...app} />
                ))}
              </tbody>
            </table>
          </Panel>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Kairos Agent Chat Preview */}
          <Panel 
            title="Kairos agent" 
            action={{ label: "Open in WhatsApp" }}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
              <span className="text-[11px] text-text-secondary">Active now</span>
            </div>
            <div className="space-y-3">
              {/* Agent message */}
              <div className="flex gap-2">
                <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                  <span className="text-[10px] text-accent font-medium">K</span>
                </div>
                <div className="bg-main rounded-[8px] rounded-tl-none px-3 py-2 text-[13px] text-text-primary">
                  Found a 94% match at Stripe! Reply 1 to apply.
                </div>
              </div>
              {/* User message */}
              <div className="flex justify-end">
                <div className="bg-accent/10 border border-accent/20 rounded-[8px] rounded-tr-none px-3 py-2 text-[13px] text-text-primary">
                  1
                </div>
              </div>
              {/* Agent response */}
              <div className="flex gap-2">
                <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                  <span className="text-[10px] text-accent font-medium">K</span>
                </div>
                <div className="bg-main rounded-[8px] rounded-tl-none px-3 py-2 text-[13px] text-text-primary">
                  Tailoring your CV for Stripe...
                </div>
              </div>
            </div>
            <button className="flex items-center gap-1 mt-4 text-[12px] text-text-secondary hover:text-text-primary transition-colors">
              <ExternalLink className="w-3 h-3" />
              Open in WhatsApp
            </button>
          </Panel>

          {/* Activity Feed */}
          <Panel title="Activity" action={{ label: "View all" }}>
            <div className="-my-1">
              {activities.map((activity, i) => (
                <ActivityItem key={i} {...activity} />
              ))}
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}
