"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/logo";
import {
  Briefcase,
  Files,
  LayoutDashboard,
  Link2,
  MessageCircle,
  Settings,
  Target,
} from "lucide-react";

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Overview" },
  { href: "/matches", icon: Target, label: "Matches" },
  { href: "/cvs", icon: Files, label: "My CVs" },
  { href: "/connectors", icon: Link2, label: "Connectors" },
  { href: "/settings", icon: Settings, label: "Settings" },
];

export function AppMobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="lg:hidden">
      <button
        type="button"
        className="flex h-10 w-10 items-center justify-center rounded-md border border-border bg-muted text-foreground"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      {open && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40 bg-black/60"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          />
          <aside className="fixed inset-y-0 left-0 z-50 flex w-[min(280px,85vw)] flex-col border-r border-border bg-background p-4 animate-modal-enter">
            <div className="mb-6 flex items-center justify-between">
              <Logo />
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-md text-muted-foreground hover:bg-muted"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex flex-col gap-1">
              {navItems.map(({ href, icon: Icon, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex min-h-[44px] items-center gap-2 rounded-md px-3 py-2.5 text-sm font-medium",
                    pathname === href
                      ? "bg-primary/15 text-primary"
                      : "text-muted-foreground hover:bg-muted"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </Link>
              ))}
              <Link
                href="/dashboard"
                onClick={() => setOpen(false)}
                className="mt-2 flex min-h-[44px] items-center gap-2 rounded-md px-3 py-2.5 text-sm text-muted-foreground hover:bg-muted"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
                <span className="ml-auto h-2 w-2 rounded-full bg-secondary" />
              </Link>
              <Link
                href="/dashboard"
                onClick={() => setOpen(false)}
                className="flex min-h-[44px] items-center gap-2 rounded-md px-3 py-2.5 text-sm text-muted-foreground hover:bg-muted"
              >
                <Briefcase className="h-4 w-4" />
                LinkedIn posts
              </Link>
            </nav>
          </aside>
        </>
      )}
    </div>
  );
}
