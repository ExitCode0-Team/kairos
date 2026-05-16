import { cn } from "@/lib/utils";

interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  padding?: "none" | "sm" | "default" | "lg";
  tier?: 1 | 2 | 3;
}

const paddingMap = {
  none: "",
  sm: "p-4",
  default: "p-6",
  lg: "p-8",
};

const tierMap = {
  1: "glass-1",
  2: "glass-2",
  3: "glass-3",
};

export function GlassPanel({
  className,
  padding = "default",
  tier = 2,
  children,
  ...props
}: GlassPanelProps) {
  return (
    <div className={cn(tierMap[tier], paddingMap[padding], className)} {...props}>
      {children}
    </div>
  );
}
