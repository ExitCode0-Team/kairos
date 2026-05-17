import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const cardVariants = cva("transition-all duration-200", {
  variants: {
    variant: {
      default: "bg-surface border border-border shadow-card",
      muted: "bg-muted border border-border/60",
      elevated: "bg-[var(--bg-elevated)] border border-border shadow-elevated",
      inset: "bg-[var(--surface-2)] border border-border/60",
      primary: "bg-primary text-on-primary border border-transparent",
      "tint-blue": "bg-[var(--accent-soft)] border border-transparent",
      "tint-emerald": "bg-[var(--success-soft)] border border-transparent",
      "tint-amber": "bg-[var(--warning-soft)] border border-transparent",
    },
    interactive: {
      true: "group cursor-pointer hover:border-border-strong hover:bg-surface-hover",
      false: "",
    },
    padding: {
      default: "p-6",
      sm: "p-4",
      none: "p-0",
    },
    radius: {
      default: "rounded-[14px]",
      sm: "rounded-[10px]",
      lg: "rounded-[16px]",
      xl: "rounded-[20px]",
    },
  },
  defaultVariants: {
    variant: "default",
    interactive: false,
    padding: "default",
    radius: "default",
  },
});

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

function Card({ className, variant, interactive, padding, radius, ...props }: CardProps) {
  return (
    <div
      className={cn(cardVariants({ variant, interactive, padding, radius }), className)}
      {...props}
    />
  );
}

export { Card, cardVariants };
