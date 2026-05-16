"use client";

import { createContext, useContext } from "react";
import type { ThemeMode } from "./tokens";

const ThemeContext = createContext<ThemeMode>("light");

export function ThemeProvider({
  children,
  forcedTheme = "light",
}: {
  children: React.ReactNode;
  forcedTheme?: ThemeMode;
}) {
  return <ThemeContext.Provider value={forcedTheme}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}
