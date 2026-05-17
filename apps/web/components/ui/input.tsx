import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    return (
      <div className="w-full">
        <input
          type={type}
          className={cn(
            "flex h-11 w-full rounded-md border border-border bg-[var(--bg-elevated)] px-4 py-2 text-body text-foreground transition-all duration-200 placeholder:text-placeholder focus:border-[var(--accent)] focus:shadow-[var(--shadow-focus-ring)] focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-[var(--danger)] focus:border-[var(--danger)]",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && <p className="mt-1 text-caption text-danger">{error}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
