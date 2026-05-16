import { cn } from "@/lib/utils";

interface IconWellProps {
  children: React.ReactNode;
  className?: string;
  iconClassName?: string;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "h-10 w-10",
  md: "h-14 w-14",
  lg: "h-16 w-16",
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
        "flex shrink-0 items-center justify-center rounded-full bg-white shadow-none transition-transform duration-200 group-hover:scale-110",
        sizeClasses[size],
        iconClassName,
        className
      )}
    >
      {children}
    </div>
  );
}
