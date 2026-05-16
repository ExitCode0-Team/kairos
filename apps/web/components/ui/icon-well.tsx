import { cn } from "@/lib/utils";

interface IconWellProps {
  children: React.ReactNode;
  className?: string;
  iconClassName?: string;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "h-10 w-10 rounded-lg",
  md: "h-12 w-12 rounded-lg",
  lg: "h-14 w-14 rounded-lg",
};

export function IconWell({
  children,
  className,
  iconClassName,
  size = "md",
}: IconWellProps) {
  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center border border-border bg-surface transition-transform duration-200 group-hover:scale-105",
        sizeClasses[size],
        iconClassName,
        className
      )}
    >
      {children}
    </div>
  );
}
