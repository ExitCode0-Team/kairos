import { cn } from "@/lib/utils";
import { IconWell } from "./icon-well";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-16 text-center", className)}>
      {icon && (
        <IconWell size="lg" className="mb-4 text-muted-foreground">
          {icon}
        </IconWell>
      )}
      <h3 className="text-h4">{title}</h3>
      {description && <p className="mt-2 max-w-sm text-body-sm text-muted-foreground">{description}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
