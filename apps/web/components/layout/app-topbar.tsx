import { Bell } from "lucide-react";
import { SearchInput } from "@/components/ui/search-input";
import { AppMobileNav } from "./app-mobile-nav";

export function AppTopbar() {
  return (
    <header className="flex h-14 shrink-0 items-center gap-4 border-b border-border bg-background px-4 md:px-6">
      <AppMobileNav />
      <SearchInput placeholder="Search..." className="max-w-xs flex-1" />
      <div className="flex flex-1 items-center justify-end gap-3">
        <span className="hidden items-center gap-2 rounded-md border border-border bg-muted px-3 py-1.5 text-caption font-medium sm:flex">
          <span className="h-2 w-2 rounded-full bg-secondary" />
          Agent active
        </span>
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          aria-label="Notifications"
        >
          <Bell className="h-4 w-4" />
        </button>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
          KP
        </div>
      </div>
    </header>
  );
}
