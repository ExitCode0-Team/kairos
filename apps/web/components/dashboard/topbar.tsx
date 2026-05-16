import { Bell } from "lucide-react";
import { Logo } from "@/components/logo";

export function Topbar() {
  return (
    <header className="flex h-12 shrink-0 items-center justify-between border-b border-border/60 bg-surface/80 px-6">
      <Logo showMark={false} className="md:hidden" />
      <div className="hidden flex-1 md:block" />
      <div className="flex items-center gap-3">
        <span className="flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-[12px] text-text-secondary shadow-soft">
          <span className="h-1.5 w-1.5 rounded-full bg-sage" />
          Agent active
        </span>
        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-xl text-text-secondary transition-colors hover:bg-surface-hover hover:text-text-primary"
          aria-label="Notifications"
        >
          <Bell className="h-4 w-4" />
        </button>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/15 text-[12px] font-medium text-accent">
          KP
        </div>
      </div>
    </header>
  );
}