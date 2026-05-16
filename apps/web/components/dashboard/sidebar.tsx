"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Sparkles,
  FileText,
  Files,
  MessageCircle,
  Link2,
  Briefcase,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/logo";

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  badge?: number;
  active?: boolean;
  hasActiveDot?: boolean;
}

function NavItem({ href, icon, label, badge, active, hasActiveDot }: NavItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-2 px-2.5 py-[7px] rounded-[6px] text-[13px] transition-colors",
        active
          ? "bg-surface-active text-text-primary"
          : "text-text-secondary hover:bg-surface-hover hover:text-text-primary"
      )}
    >
      <span className="flex items-center justify-center w-4 h-4">{icon}</span>
      <span className="flex-1">{label}</span>
      {badge !== undefined && (
        <span className="text-[11px] text-text-secondary bg-panel px-1.5 py-0.5 rounded-[4px]">
          {badge}
        </span>
      )}
      {hasActiveDot && (
        <span className="w-1.5 h-1.5 rounded-full bg-success" />
      )}
    </Link>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-2.5 py-2 text-[10px] uppercase tracking-[0.08em] text-text-secondary">
      {children}
    </div>
  );
}

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-[200px] bg-shell border-r border-border flex flex-col">
      <div className="h-12 flex items-center px-4 border-b border-border">
        <Logo showMark={false} />
      </div>
      
      <nav className="flex-1 p-2 space-y-0.5">
        <NavItem
          href="/dashboard"
          icon={<LayoutDashboard className="w-4 h-4" />}
          label="Overview"
          active={pathname === "/dashboard"}
        />
        <NavItem
          href="/dashboard/matches"
          icon={<Sparkles className="w-4 h-4" />}
          label="Matches"
          badge={12}
          active={pathname === "/dashboard/matches"}
        />
        <NavItem
          href="/dashboard/applications"
          icon={<FileText className="w-4 h-4" />}
          label="Applications"
          active={pathname === "/dashboard/applications"}
        />
        <NavItem
          href="/dashboard/cvs"
          icon={<Files className="w-4 h-4" />}
          label="My CVs"
          active={pathname === "/dashboard/cvs"}
        />
        
        <div className="pt-4">
          <SectionLabel>Channels</SectionLabel>
        </div>
        
        <NavItem
          href="/dashboard/whatsapp"
          icon={<MessageCircle className="w-4 h-4" />}
          label="WhatsApp"
          hasActiveDot
          active={pathname === "/dashboard/whatsapp"}
        />
        <NavItem
          href="/connectors"
          icon={<Link2 className="w-4 h-4" />}
          label="Connectors"
          active={pathname === "/connectors"}
        />
        <NavItem
          href="/dashboard/linkedin"
          icon={<Briefcase className="w-4 h-4" />}
          label="LinkedIn posts"
          active={pathname === "/dashboard/linkedin"}
        />
      </nav>
      
      <div className="p-2 border-t border-border">
        <NavItem
          href="/dashboard/settings"
          icon={<Settings className="w-4 h-4" />}
          label="Settings"
          active={pathname === "/dashboard/settings"}
        />
      </div>
    </aside>
  );
}
