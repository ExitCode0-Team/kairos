import { ThemeProvider } from "@/lib/design-system/theme-provider";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return <ThemeProvider forcedTheme="light">{children}</ThemeProvider>;
}
