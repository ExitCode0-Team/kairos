import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export function SearchInput({ className, ...props }: SearchInputProps) {
  return (
    <div className={cn("relative", className)}>
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <input
        type="search"
        className="h-10 w-full rounded-md border-0 bg-muted pl-10 pr-4 text-body-sm text-foreground shadow-none placeholder:text-placeholder focus:border-2 focus:border-primary focus:bg-surface focus:outline-none"
        {...props}
      />
    </div>
  );
}
