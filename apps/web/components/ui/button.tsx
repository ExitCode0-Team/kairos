import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-accent text-main hover:bg-accent/90 hover:shadow-[0_0_20px_rgba(242,213,138,0.3)]",
        outline:
          "border border-border-hover bg-transparent text-text-primary hover:bg-surface-hover hover:border-border-glow",
        ghost: "hover:bg-surface-hover text-text-primary",
        link: "text-text-secondary underline-offset-4 hover:text-text-primary hover:underline",
        pill: "border border-border-hover bg-panel text-text-primary hover:border-accent hover:bg-accent/10 data-[selected=true]:border-accent data-[selected=true]:bg-accent/10 data-[selected=true]:text-accent",
        glass: "glass-elevated text-text-primary hover:bg-white/5",
        cyan: "bg-cyan/10 border border-cyan/20 text-cyan hover:bg-cyan/20",
      },
      size: {
        default: "h-10 px-5 py-2 rounded-xl",
        sm: "h-9 px-4 text-xs rounded-lg",
        lg: "h-12 px-8 text-base rounded-xl",
        icon: "h-10 w-10 rounded-xl",
        pill: "h-11 px-6 rounded-full",
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
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
