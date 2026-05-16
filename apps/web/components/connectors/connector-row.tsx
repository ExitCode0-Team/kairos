"use client";

import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IconWell } from "@/components/ui/icon-well";
import { cn } from "@/lib/utils";

export interface ConnectorRowProps {
  icon: React.ReactNode;
  iconClass?: string;
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

export function ConnectorRow({
  icon,
  iconClass,
  name,
  description,
  connected,
  active,
  loading,
  comingSoon,
  onConnect,
  onSelect,
  type,
}: ConnectorRowProps) {
  const isChannel = type === "channel";

  return (
    <div
      onClick={isChannel && !comingSoon ? onSelect : undefined}
      className={cn(
        "glass-2 flex items-center gap-4 p-4 transition-all duration-200",
        !comingSoon && isChannel && "cursor-pointer hover:border-white/20",
        active && "border-primary/40 ring-1 ring-primary/30",
        comingSoon && "opacity-60"
      )}
    >
      <IconWell size="md" iconClassName={iconClass}>
        {icon}
      </IconWell>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-foreground">{name}</span>
          {comingSoon && (
            <span className="text-caption rounded-md bg-muted px-2 py-0.5">Coming soon</span>
          )}
        </div>
        <p className="mt-0.5 text-body-sm text-muted-foreground">{description}</p>
      </div>
      {connected && !isChannel && (
        <span className="shrink-0 text-body-sm font-semibold text-secondary">Enabled</span>
      )}
      {active && isChannel && (
        <span className="shrink-0 text-body-sm font-semibold text-primary">Selected</span>
      )}
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
  );
}
