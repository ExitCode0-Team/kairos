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
        "flex min-h-[44px] items-center gap-2 rounded-md px-3 py-2.5 text-body-sm font-medium transition-all duration-200",
        active
          ? "bg-primary/15 text-primary"
          : "text-muted-foreground hover:bg-muted hover:text-foreground"
      )}
    >
      <span className="flex h-4 w-4 items-center justify-center">{icon}</span>
      <span className="flex-1">{label}</span>
      {badge !== undefined && (
        <span className="rounded-md bg-primary/20 px-2 py-0.5 text-[11px] font-bold tabular-nums text-primary">
          {badge}
        </span>
      )}
      {hasActiveDot && <span className="h-2 w-2 rounded-full bg-secondary" />}
    </Link>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <div className="px-3 py-2 text-label">{children}</div>;
}

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-[220px] shrink-0 flex-col border-r border-border bg-surface p-3 lg:flex">
      <Logo className="mb-6 px-2" />
      <nav className="flex flex-1 flex-col gap-1">
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
