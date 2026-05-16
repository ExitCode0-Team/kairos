import { Bell } from "lucide-react";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";

export function Topbar() {
  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-border bg-background px-6">
      <Logo showMark={false} className="md:hidden" />
      <div className="hidden flex-1 md:block" />
      <div className="flex items-center gap-3">
        <span className="flex min-h-[36px] items-center gap-2 rounded-lg bg-muted px-4 py-2 text-[12px] font-medium text-muted-foreground">
          <span className="h-2 w-2 rounded-full bg-secondary" />
          Agent active
        </span>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-10 w-10 rounded-lg"
          aria-label="Notifications"
        >
          <Bell className="h-4 w-4" />
        </Button>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary font-display text-[12px] font-bold text-white">
          KP
        </div>
      </div>
    </header>
  );
}
