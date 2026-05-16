import { cn } from "@/lib/utils";

interface LogoProps {
  showMark?: boolean;
  className?: string;
  markClassName?: string;
  inverted?: boolean;
}

export function HourglassMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={cn("h-5 w-5", className)}
      aria-hidden="true"
    >
      <line x1="6" y1="4" x2="18" y2="4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="6" y1="20" x2="18" y2="20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M6 4 C6 8, 10 10, 12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M18 4 C18 8, 14 10, 12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M12 12 C10 14, 6 16, 6 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M12 12 C14 14, 18 16, 18 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    </svg>
  );
}

export function Logo({ showMark = true, className, markClassName, inverted }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      {showMark && (
        <span
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-full shadow-none",
            inverted ? "bg-white text-primary" : "bg-primary text-white"
          )}
        >
          <HourglassMark className={markClassName} />
        </span>
      )}
      <span
        className={cn(
          "text-lg font-bold tracking-tight",
          inverted ? "text-white" : "text-foreground"
        )}
      >
        kairos.
      </span>
    </div>
  );
}

export function LogoMark({ className, inverted }: { className?: string; inverted?: boolean }) {
  return (
    <HourglassMark
      className={cn(inverted ? "text-primary" : "text-white", className)}
    />
  );
}
