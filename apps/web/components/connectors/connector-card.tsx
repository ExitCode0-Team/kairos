"use client";

import { Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface ConnectorCardProps {
  icon: React.ReactNode;
  name: string;
  description: string;
  connected?: boolean;
  active?: boolean;
  loading?: boolean;
  comingSoon?: boolean;
  onConnect?: () => void;
  onSelect?: () => void;
  type: "data" | "channel";
}

export function ConnectorCard({
  icon,
  name,
  description,
  connected,
  active,
  loading,
  comingSoon,
  onConnect,
  onSelect,
  type,
}: ConnectorCardProps) {
  const isChannel = type === "channel";

  return (
    <div
      onClick={isChannel && !comingSoon ? onSelect : undefined}
      className={cn(
        "group relative cursor-pointer rounded-card bg-surface p-5 shadow-soft transition-all duration-300",
        active && "ring-2 ring-accent/40",
        connected && !isChannel && "ring-1 ring-sage/30",
        comingSoon && "opacity-60 cursor-default",
        !comingSoon && !active && "hover:shadow-soft-lg"
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <div
            className={cn(
              "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-all",
              active && "bg-accent/15 text-accent",
              connected && !isChannel && "bg-sage-bg text-sage",
              !active && !connected && "bg-background text-text-secondary group-hover:text-text-primary"
            )}
          >
            {icon}
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <span className="text-[15px] font-medium text-text-primary">{name}</span>
              {connected && !isChannel && (
                <span className="flex items-center gap-1.5 rounded-full bg-sage-bg px-2 py-0.5 text-[11px] text-sage">
                  <span className="h-1.5 w-1.5 rounded-full bg-sage" />
                  Connected
                </span>
              )}
              {active && isChannel && (
                <span className="flex items-center gap-1 rounded-full bg-accent/10 px-2 py-0.5 text-[11px] text-accent">
                  <Check className="h-3 w-3" />
                  Selected
                </span>
              )}
              {comingSoon && (
                <span className="rounded-full bg-surface-hover px-2 py-0.5 text-[11px] text-text-muted">
                  Coming soon
                </span>
              )}
            </div>
            <p className="mt-1 text-[13px] leading-relaxed text-text-secondary">
              {description}
            </p>
          </div>
        </div>
        {!isChannel && !connected && !comingSoon && (
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onConnect?.();
            }}
            disabled={loading}
            className="shrink-0"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Connect"}
          </Button>
        )}
      </div>
    </div>
  );
}
