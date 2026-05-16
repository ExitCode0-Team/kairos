import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-accent text-main hover:bg-accent/90",
        outline:
          "border border-border-hover bg-transparent text-text-primary hover:bg-surface-hover",
        ghost: "hover:bg-surface-hover text-text-primary",
        link: "text-text-secondary underline-offset-4 hover:text-text-primary hover:underline",
        pill: "border border-border-hover bg-transparent text-text-primary hover:bg-surface-hover data-[selected=true]:border-accent data-[selected=true]:bg-accent/10",
      },
      size: {
        default: "h-9 px-4 py-2 rounded-[6px]",
        sm: "h-8 px-3 text-xs rounded-[6px]",
        lg: "h-10 px-6 rounded-[6px]",
        icon: "h-9 w-9 rounded-[6px]",
        pill: "h-10 px-5 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
