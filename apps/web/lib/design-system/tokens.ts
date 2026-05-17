/** Kairos design tokens (color values now live in globals.css as CSS variables). */

export type ThemeMode = "light" | "dark" | "system";

export const radius = {
  sm: "8px",
  md: "14px",
  lg: "16px",
  xl: "20px",
} as const;

export const motion = {
  ease: "cubic-bezier(0.16, 1, 0.3, 1)",
  durationFast: "150ms",
  duration: "200ms",
  durationSlow: "300ms",
} as const;
