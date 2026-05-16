import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const cardVariants = cva("rounded-lg shadow-none transition-all duration-200", {
  variants: {
    variant: {
      default: "bg-surface",
      muted: "bg-muted",
      primary: "bg-primary text-white",
      "tint-blue": "bg-primary/10",
      "tint-emerald": "bg-secondary/10",
      "tint-amber": "bg-accent/10",
    },
    interactive: {
      true: "group cursor-pointer hover:scale-[1.02]",
      false: "",
    },
    padding: {
      default: "p-6",
      sm: "p-4",
      none: "p-0",
    },
  },
  defaultVariants: {
    variant: "default",
    interactive: false,
    padding: "default",
  },
});

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

function Card({ className, variant, interactive, padding, ...props }: CardProps) {
  return (
    <div className={cn(cardVariants({ variant, interactive, padding }), className)} {...props} />
  );
}

export { Card, cardVariants };
