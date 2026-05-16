import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-lg px-2 py-0.5 text-xs font-medium tabular-nums",
  {
    variants: {
      variant: {
        high: "bg-success-bg text-success",
        medium: "bg-amber-bg text-amber",
        default: "bg-surface-hover text-text-secondary",
        sage: "bg-sage-bg text-sage",
        blue: "bg-blue-bg text-blue",
        purple: "bg-blue-bg text-blue",
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
