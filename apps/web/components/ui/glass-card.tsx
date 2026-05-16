import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const glassCardVariants = cva("transition-all duration-200", {
  variants: {
    tier: {
      1: "glass-1",
      2: "glass-2",
      3: "glass-3",
    },
    signal: {
      none: "",
      blue: "border-l-2 border-l-primary ring-1 ring-primary/20",
      green: "border-l-2 border-l-secondary ring-1 ring-secondary/20",
    },
    padding: {
      none: "",
      sm: "p-4",
      default: "p-6",
      lg: "p-8",
    },
    float: {
      true: "animate-glass-drift will-change-transform",
      false: "",
    },
  },
  defaultVariants: {
    tier: 2,
    signal: "none",
    padding: "default",
    float: false,
  },
});

export interface GlassCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof glassCardVariants> {}

export function GlassCard({
  className,
  tier,
  signal,
  padding,
  float,
  children,
  ...props
}: GlassCardProps) {
  return (
    <div className={cn(glassCardVariants({ tier, signal, padding, float }), className)} {...props}>
      {children}
    </div>
  );
}
