import { cn } from "@/lib/utils";

interface FlatDecorProps {
  variant?: "hero" | "minimal";
  className?: string;
}

export function FlatDecor({ variant = "hero", className }: FlatDecorProps) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden>
      {variant === "hero" ? (
        <>
          <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10" />
          <div className="absolute -bottom-20 -left-12 h-48 w-48 rounded-full bg-white/10" />
          <div className="absolute right-1/4 top-1/3 h-24 w-24 rotate-12 bg-white/5" />
          <div className="absolute bottom-1/4 left-1/3 h-32 w-32 -rotate-6 bg-white/5" />
        </>
      ) : (
        <>
          <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary/10" />
          <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-primary/10" />
        </>
      )}
    </div>
  );
}
