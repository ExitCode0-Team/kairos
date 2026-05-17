/**
 * Brand-ish avatar colors for match cards.
 * Each entry includes a light and dark surface so the avatars retain identity
 * without harsh saturation against the graphite dark theme.
 */
export const COMPANY_COLORS: Record<
  string,
  { light: string; dark: string; foreground: string }
> = {
  Stripe: {
    light: "bg-emerald-500",
    dark: "bg-emerald-500/70",
    foreground: "text-white",
  },
  Linear: {
    light: "bg-violet-500",
    dark: "bg-violet-500/70",
    foreground: "text-white",
  },
  Vercel: {
    light: "bg-blue-500",
    dark: "bg-blue-500/70",
    foreground: "text-white",
  },
  Notion: {
    light: "bg-orange-500",
    dark: "bg-orange-500/70",
    foreground: "text-white",
  },
  Figma: {
    light: "bg-pink-500",
    dark: "bg-pink-500/70",
    foreground: "text-white",
  },
  Airbnb: {
    light: "bg-rose-500",
    dark: "bg-rose-500/70",
    foreground: "text-white",
  },
};

const FALLBACK = {
  light: "bg-slate-500",
  dark: "bg-slate-500/70",
  foreground: "text-white",
};

export function getCompanyAvatarClass(company: string): string {
  const entry = COMPANY_COLORS[company] ?? FALLBACK;
  return `${entry.light} dark:${entry.dark} ${entry.foreground}`;
}
