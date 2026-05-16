import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  suffix?: React.ReactNode;
}

export function SearchInput({ className, suffix, ...props }: SearchInputProps) {
  return (
    <div className={cn("relative", className)}>
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <input
        type="search"
        className={cn(
          "h-10 w-full rounded-md border border-border bg-[var(--bg-elevated)] pl-10 text-body-sm text-foreground placeholder:text-placeholder transition-all duration-200 focus:border-[var(--accent)] focus:shadow-[var(--shadow-focus-ring)] focus:outline-none",
          suffix ? "pr-14" : "pr-4"
        )}
        {...props}
      />
      {suffix ? (
        <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
          {suffix}
        </div>
      ) : null}
    </div>
  );
}
