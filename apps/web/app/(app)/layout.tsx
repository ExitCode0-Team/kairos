import { ThemeProvider } from "@/lib/design-system/theme-provider";
import { AppShell } from "@/components/layout/app-shell";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider forcedTheme="light">
      <AppShell>{children}</AppShell>
    </ThemeProvider>
  );
}
