import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const cardVariants = cva(
  "rounded-lg p-6 shadow-none transition-all duration-200",
  {
    variants: {
      variant: {
        default: "bg-background",
        muted: "bg-muted",
        primary: "bg-primary text-white",
        "tint-blue": "bg-blue-50",
        "tint-emerald": "bg-emerald-50",
        "tint-amber": "bg-amber-50",
      },
      interactive: {
        true: "group cursor-pointer hover:scale-[1.02]",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      interactive: false,
    },
  }
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

function Card({ className, variant, interactive, ...props }: CardProps) {
  return (
    <div className={cn(cardVariants({ variant, interactive }), className)} {...props} />
  );
}

export { Card, cardVariants };
