import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md px-2.5 py-0.5 text-xs font-semibold tabular-nums",
  {
    variants: {
      variant: {
        default: "bg-muted text-muted-foreground",
        primary: "bg-primary/15 text-primary",
        success: "bg-secondary/15 text-secondary",
        accent: "bg-accent/15 text-accent",
        danger: "bg-danger/15 text-danger",
        high: "bg-secondary/15 text-secondary",
        medium: "bg-primary/15 text-primary",
        interview: "bg-accent/15 text-accent",
        insight: "bg-primary/15 text-primary",
        proactive: "bg-secondary/15 text-secondary",
        neutral: "bg-muted text-muted-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
