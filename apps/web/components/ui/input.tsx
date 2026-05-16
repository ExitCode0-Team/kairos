import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-11 w-full rounded-xl border border-border-hover bg-panel/50 px-4 py-2 text-[15px] text-text-primary placeholder:text-text-muted transition-all duration-300 focus:outline-none focus:border-accent/50 focus:bg-panel focus:shadow-[0_0_20px_rgba(242,213,138,0.1)] disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
