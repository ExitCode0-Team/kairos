import { cn } from "@/lib/utils";

interface SectionShellProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export function SectionShell({ title, description, children, className }: SectionShellProps) {
  return (
    <section className={cn("space-y-4", className)}>
      <div>
        <h2 className="text-h4">{title}</h2>
        {description && <p className="mt-1 text-body-sm text-muted-foreground">{description}</p>}
      </div>
      {children}
    </section>
  );
}
