import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: string;
}

export function Select({ className, error, children, ...props }: SelectProps) {
  return (
    <div className="relative w-full">
      <select
        className={cn(
          "flex h-11 w-full appearance-none rounded-md border border-border bg-[var(--bg-elevated)] px-4 py-2 pr-10 text-body text-foreground transition-all duration-200 focus:border-[var(--accent)] focus:shadow-[var(--shadow-focus-ring)] focus:outline-none disabled:opacity-50",
          error && "border-[var(--danger)]",
          className
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      {error && <p className="mt-1 text-caption text-danger">{error}</p>}
    </div>
  );
}
