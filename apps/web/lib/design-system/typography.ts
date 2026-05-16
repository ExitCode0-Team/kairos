import { cn } from "@/lib/utils";

export const typography = {
  hero: "text-hero",
  h1: "text-h1",
  h2: "text-h2",
  h3: "text-h3",
  h4: "text-h4",
  body: "text-body",
  bodySm: "text-body-sm",
  caption: "text-caption",
  label: "text-label",
} as const;

export type TypographyVariant = keyof typeof typography;

export function textClass(variant: TypographyVariant, className?: string) {
  return cn(typography[variant], className);
}
