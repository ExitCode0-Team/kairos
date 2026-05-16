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
            "flex h-11 w-full rounded-md border-0 bg-muted px-4 py-2 text-body text-foreground shadow-none transition-all duration-200 placeholder:text-placeholder focus:border-2 focus:border-primary focus:bg-surface focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-2 border-danger focus:border-danger",
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
