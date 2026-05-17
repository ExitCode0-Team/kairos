"use client";

import { ThemeProvider as NextThemes, useTheme as useNextTheme } from "next-themes";
import type { ReactNode } from "react";

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemes
      attribute="data-theme"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange={false}
      storageKey="kairos-theme"
    >
      {children}
    </NextThemes>
  );
}

export function useTheme() {
  return useNextTheme();
}
