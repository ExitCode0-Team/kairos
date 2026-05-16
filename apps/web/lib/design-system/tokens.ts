/** Kairos Flat Design tokens */

export const colors = {
  background: "#ffffff",
  surface: "#ffffff",
  foreground: "#111827",
  primary: "#3b82f6",
  primaryHover: "#2563eb",
  secondary: "#10b981",
  secondaryHover: "#059669",
  accent: "#f59e0b",
  accentHover: "#d97706",
  muted: "#f3f4f6",
  mutedForeground: "#6b7280",
  border: "#e5e7eb",
  danger: "#ef4444",
  placeholder: "#9ca3af",
} as const;

export const radius = {
  sm: "6px",
  md: "8px",
  lg: "12px",
} as const;

export const motion = {
  ease: "cubic-bezier(0.16, 1, 0.3, 1)",
  durationFast: "150ms",
  duration: "200ms",
  durationSlow: "300ms",
} as const;

export type ThemeMode = "light";
