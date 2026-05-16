"use client";

import { Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, type CardProps } from "@/components/ui/card";
import { IconWell } from "@/components/ui/icon-well";
import { cn } from "@/lib/utils";

export interface ConnectorCardProps {
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
  tint?: CardProps["variant"];
}

export function ConnectorCard({
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
  tint = "tint-blue",
}: ConnectorCardProps) {
  const isChannel = type === "channel";

  return (
    <Card
      variant={tint}
      interactive={!comingSoon && !connected}
      onClick={isChannel && !comingSoon ? onSelect : undefined}
      className={cn(
        "group p-5",
        active && "ring-2 ring-primary ring-offset-2 ring-offset-background",
        connected && !isChannel && "ring-2 ring-secondary ring-offset-2 ring-offset-background",
        comingSoon && "cursor-default opacity-60"
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <IconWell
            size="sm"
            className={cn(
              active && "text-primary",
              connected && !isChannel && "text-secondary",
              !active && !connected && "text-muted-foreground group-hover:text-foreground",
              iconClass
            )}
          >
            {icon}
          </IconWell>
          <div>
            <div className="flex items-center gap-2.5">
              <span className="text-[15px] font-medium text-foreground">{name}</span>
              {connected && !isChannel && (
                <span className="flex items-center gap-1.5 rounded-md bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-secondary">
                  <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
                  Connected
                </span>
              )}
              {active && isChannel && (
                <span className="flex items-center gap-1 rounded-md bg-blue-50 px-2 py-0.5 text-[11px] font-medium text-primary">
                  <Check className="h-3 w-3" />
                  Selected
                </span>
              )}
              {comingSoon && (
                <span className="rounded-md bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                  Coming soon
                </span>
              )}
            </div>
            <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">
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
    </Card>
  );
}
