"use client";

import { Bell } from "lucide-react";
import { usePathname } from "next/navigation";
import { SearchInput } from "@/components/ui/search-input";
import { AppMobileNav } from "./app-mobile-nav";
import { cn } from "@/lib/utils";

export function AppTopbar() {
  const pathname = usePathname();
  const isMatches = pathname === "/matches";

  return (
    <header className="flex h-14 shrink-0 items-center gap-4 border-b border-border bg-[var(--bg-elevated)] px-4 md:px-6">
      <AppMobileNav />
      <SearchInput
        placeholder={
          isMatches
            ? "Search matches, roles, companies..."
            : "Search..."
        }
        className={cn(
          "flex-1",
          isMatches ? "max-w-md md:max-w-xl" : "max-w-xs"
        )}
        suffix={
          isMatches ? (
            <kbd className="rounded border border-border bg-surface px-1.5 py-0.5 font-mono text-[11px] font-medium text-muted-foreground">
              ⌘K
            </kbd>
          ) : undefined
        }
      />
      <div className="flex flex-1 items-center justify-end gap-3">
        <span className="hidden items-center gap-2 rounded-md border border-border bg-surface-hover px-3 py-1.5 text-caption font-medium text-foreground sm:flex">
          <span className="h-2 w-2 rounded-full bg-[var(--success)]" />
          Agent active
        </span>
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-surface-hover hover:text-foreground"
          aria-label="Notifications"
        >
          <Bell className="h-4 w-4" />
        </button>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-xs font-bold text-on-primary">
          KP
        </div>
      </div>
    </header>
  );
}
