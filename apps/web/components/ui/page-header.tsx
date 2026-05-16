import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  inverted?: boolean;
  className?: string;
}

export function PageHeader({
  title,
  description,
  actions,
  inverted,
  className,
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        "mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between",
        className
      )}
    >
      <div>
        <h1 className={cn("text-h1", inverted && "text-white")}>{title}</h1>
        {description && (
          <p
            className={cn(
              "mt-1 text-body-sm",
              inverted ? "text-white/80" : "text-muted-foreground"
            )}
          >
            {description}
          </p>
        )}
      </div>
      {actions ? (
        <div className="flex shrink-0 items-center gap-2">{actions}</div>
      ) : null}
    </div>
  );
}
