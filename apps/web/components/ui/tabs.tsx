"use client";

import { useId } from "react";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface Tab {
  id: string;
  label: string;
  icon?: LucideIcon;
}

interface TabsProps {
  tabs: Tab[];
  active: string;
  onChange: (id: string) => void;
  className?: string;
  variant?: "pill" | "underline";
}

export function Tabs({
  tabs,
  active,
  onChange,
  className,
  variant = "pill",
}: TabsProps) {
  const layoutId = useId();

  if (variant === "underline") {
    return (
      <div className={cn("flex gap-6 border-b border-border", className)}>
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = active === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onChange(tab.id)}
              className={cn(
                "relative flex items-center gap-1.5 pb-3 text-body-sm font-medium transition-colors",
                isActive
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {Icon ? <Icon className="h-4 w-4" /> : null}
              {tab.label}
              {isActive ? (
                <motion.span
                  layoutId={`tabs-underline-${layoutId}`}
                  className="absolute -bottom-px left-0 right-0 h-[2px] rounded-full bg-[var(--accent)]"
                  transition={{ type: "spring", stiffness: 360, damping: 32 }}
                />
              ) : null}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative flex gap-1 rounded-[10px] border border-border bg-[var(--surface-2)] p-1",
        className
      )}
    >
      {tabs.map((tab) => {
        const isActive = active === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={cn(
              "relative rounded-[6px] px-4 py-1.5 text-body-sm font-medium transition-colors",
              isActive
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {isActive ? (
              <motion.span
                layoutId={`tabs-pill-${layoutId}`}
                className="absolute inset-0 rounded-[6px] bg-surface shadow-card"
                transition={{ type: "spring", stiffness: 360, damping: 32 }}
              />
            ) : null}
            <span className="relative">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
