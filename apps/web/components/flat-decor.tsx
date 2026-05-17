import { cn } from "@/lib/utils";

interface FlatDecorProps {
  variant?: "hero" | "minimal";
  className?: string;
}

export function FlatDecor({ variant = "hero", className }: FlatDecorProps) {
  if (variant === "minimal") return null;

  return (
    <div
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      aria-hidden
    >
      <div className="absolute -right-12 top-8 h-48 w-48 rounded-full bg-[var(--on-accent)]/10" />
      <div className="absolute bottom-12 left-8 h-32 w-32 rotate-12 rounded-[16px] bg-[var(--on-accent)]/10" />
      <div className="absolute right-1/4 top-1/3 h-24 w-24 rounded-[16px] bg-[var(--on-accent)]/5" />
    </div>
  );
}
