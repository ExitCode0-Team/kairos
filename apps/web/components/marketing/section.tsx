import { cn } from "@/lib/utils";

type SectionVariant = "default" | "muted" | "primary" | "secondary" | "accent" | "dark";

const variantClasses: Record<SectionVariant, string> = {
  default: "bg-background text-foreground",
  muted: "section-muted",
  primary: "section-primary",
  secondary: "section-secondary",
  accent: "section-accent",
  dark: "section-dark",
};

interface SectionProps {
  variant?: SectionVariant;
  className?: string;
  children: React.ReactNode;
  id?: string;
}

export function Section({ variant = "default", className, children, id }: SectionProps) {
  return (
    <section id={id} className={cn("py-16 md:py-24", variantClasses[variant], className)}>
      <div className="mx-auto max-w-7xl px-6">{children}</div>
    </section>
  );
}
