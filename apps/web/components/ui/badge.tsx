import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md px-2.5 py-0.5 text-xs font-bold tabular-nums shadow-none",
  {
    variants: {
      variant: {
        high: "bg-emerald-50 text-secondary",
        medium: "bg-blue-50 text-primary",
        default: "bg-muted text-muted-foreground",
        accent: "bg-amber-50 text-accent",
        success: "bg-emerald-50 text-secondary",
        primary: "bg-blue-50 text-primary",
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
