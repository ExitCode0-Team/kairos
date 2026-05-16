import { ThemeProvider } from "@/lib/design-system/theme-provider";

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider forcedTheme="light">
      <div className="min-h-screen bg-muted">{children}</div>
    </ThemeProvider>
  );
}
