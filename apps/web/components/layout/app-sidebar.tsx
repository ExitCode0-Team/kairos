"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Briefcase,
  Files,
  LayoutDashboard,
  Link2,
  MessageCircle,
  Settings,
  Target,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/logo";

function NavItem({
  href,
  icon,
  label,
  badge,
  active,
  hasActiveDot,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  badge?: number;
  active?: boolean;
  hasActiveDot?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "relative flex min-h-[36px] items-center gap-2.5 rounded-[10px] px-3 py-2 text-body-sm font-medium transition-all duration-150",
        active
          ? "bg-surface-active text-foreground before:absolute before:left-0 before:top-1/2 before:h-4 before:w-[2px] before:-translate-y-1/2 before:rounded-r-full before:bg-[var(--accent)]"
          : "text-muted-foreground hover:bg-surface-hover hover:text-foreground"
      )}
    >
      <span
        className={cn(
          "flex h-4 w-4 items-center justify-center transition-colors",
          active ? "text-foreground" : "text-muted-foreground"
        )}
      >
        {icon}
      </span>
      <span className="flex-1">{label}</span>
      {badge !== undefined && (
        <span className="rounded-md bg-[var(--accent-soft)] px-1.5 py-0.5 text-[10px] font-semibold tabular-nums text-[var(--accent)]">
          {badge}
        </span>
      )}
      {hasActiveDot && <span className="h-1.5 w-1.5 rounded-full bg-[var(--success)]" />}
    </Link>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <div className="mt-4 px-3 pb-1 pt-2 text-label">{children}</div>;
}

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-[220px] shrink-0 flex-col border-r border-border bg-[var(--bg-elevated)] p-3 lg:flex">
      <Logo className="mb-6 px-2" />
      <nav className="flex flex-1 flex-col gap-0.5">
        <NavItem
          href="/dashboard"
          icon={<LayoutDashboard className="h-4 w-4" />}
          label="Overview"
          active={pathname === "/dashboard"}
        />
        <NavItem
          href="/matches"
          icon={<Target className="h-4 w-4" />}
          label="Matches"
          badge={12}
          active={pathname === "/matches"}
        />
        <NavItem
          href="/cvs"
          icon={<Files className="h-4 w-4" />}
          label="My CVs"
          active={pathname === "/cvs"}
        />
        <SectionLabel>Channels</SectionLabel>
        <NavItem
          href="/dashboard"
          icon={<MessageCircle className="h-4 w-4" />}
          label="WhatsApp"
          hasActiveDot
        />
        <NavItem
          href="/connectors"
          icon={<Link2 className="h-4 w-4" />}
          label="Connectors"
          active={pathname === "/connectors"}
        />
        <NavItem
          href="/dashboard"
          icon={<Briefcase className="h-4 w-4" />}
          label="LinkedIn posts"
        />
        <div className="mt-auto pt-4">
          <NavItem
            href="/settings"
            icon={<Settings className="h-4 w-4" />}
            label="Settings"
            active={pathname === "/settings"}
          />
        </div>
      </nav>
    </aside>
  );
}
