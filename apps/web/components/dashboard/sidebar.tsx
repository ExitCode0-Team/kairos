"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Briefcase,
  FileText,
  Files,
  LayoutDashboard,
  Link2,
  MessageCircle,
  Settings,
  Sparkles,
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
        "flex items-center gap-2 rounded-xl px-3 py-2 text-[13px] transition-colors",
        active
          ? "bg-surface-active text-text-primary shadow-soft"
          : "text-text-secondary hover:bg-surface-hover hover:text-text-primary"
      )}
    >
      <span className="flex h-4 w-4 items-center justify-center">{icon}</span>
      <span className="flex-1">{label}</span>
      {badge !== undefined && (
        <span className="rounded-md bg-surface px-1.5 py-0.5 text-[11px] text-text-muted">
          {badge}
        </span>
      )}
      {hasActiveDot && <span className="h-1.5 w-1.5 rounded-full bg-sage" />}
    </Link>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-3 py-2 text-[10px] uppercase tracking-[0.08em] text-text-muted">
      {children}
    </div>
  );
}

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex w-[220px] shrink-0 flex-col border-r border-border/60 bg-surface/50 px-3 py-5">
      <Logo className="mb-8 px-2" />

      <nav className="flex flex-1 flex-col gap-0.5">
        <NavItem
          href="/dashboard"
          icon={<LayoutDashboard className="h-4 w-4" />}
          label="Overview"
          active={pathname === "/dashboard"}
        />
        <NavItem
          href="/dashboard"
          icon={<Sparkles className="h-4 w-4" />}
          label="Matches"
          badge={12}
        />
        <NavItem
          href="/dashboard"
          icon={<FileText className="h-4 w-4" />}
          label="Applications"
        />
        <NavItem
          href="/dashboard"
          icon={<Files className="h-4 w-4" />}
          label="My CVs"
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
            href="/dashboard"
            icon={<Settings className="h-4 w-4" />}
            label="Settings"
          />
        </div>
      </nav>
    </aside>
  );
}
