"use client";

import { cn } from "@/lib/utils";

interface LogoProps {
  showMark?: boolean;
  className?: string;
  markClassName?: string;
}

export function HourglassMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={cn("w-5 h-5", className)}
      aria-hidden="true"
    >
      {/* Top horizontal line */}
      <line x1="6" y1="4" x2="18" y2="4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      {/* Bottom horizontal line */}
      <line x1="6" y1="20" x2="18" y2="20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      {/* Left curve - top to center */}
      <path d="M6 4 C6 8, 10 10, 12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      {/* Right curve - top to center */}
      <path d="M18 4 C18 8, 14 10, 12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      {/* Left curve - center to bottom */}
      <path d="M12 12 C10 14, 6 16, 6 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      {/* Right curve - center to bottom */}
      <path d="M12 12 C14 14, 18 16, 18 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    </svg>
  );
}

export function Logo({ showMark = true, className, markClassName }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {showMark && <HourglassMark className={cn("text-accent", markClassName)} />}
      <span className="text-lg font-medium tracking-[-0.02em] text-text-primary">
        kairos.
      </span>
    </div>
  );
}

export function LogoMark({ className }: { className?: string }) {
  return <HourglassMark className={cn("text-accent", className)} />;
}
