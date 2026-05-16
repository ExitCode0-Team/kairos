"use client";

import { useEffect, useState } from "react";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "@/lib/design-system/theme-provider";
import { cn } from "@/lib/utils";

type ThemeOption = "light" | "dark" | "system";

const OPTIONS: {
  id: ThemeOption;
  label: string;
  description: string;
  icon: typeof Sun;
}[] = [
  { id: "light", label: "Light", description: "Bright and crisp.", icon: Sun },
  { id: "dark", label: "Dark", description: "Quiet and focused.", icon: Moon },
  { id: "system", label: "System", description: "Follows your OS.", icon: Monitor },
];

export function AppearanceSettings() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const active = (mounted ? theme : "system") as ThemeOption;

  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {OPTIONS.map((option) => {
        const isActive = active === option.id;
        const Icon = option.icon;
        return (
          <button
            key={option.id}
            type="button"
            onClick={() => setTheme(option.id)}
            className={cn(
              "group relative flex flex-col gap-3 rounded-[14px] border bg-surface p-3 text-left transition-all duration-200",
              isActive
                ? "border-[var(--accent)] shadow-[var(--shadow-focus-ring)]"
                : "border-border hover:border-border-strong"
            )}
            aria-pressed={isActive}
          >
            <ThemePreview theme={option.id} />
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="flex items-center gap-1.5 text-body-sm font-semibold text-foreground">
                  <Icon className="h-3.5 w-3.5" />
                  {option.label}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {option.description}
                </p>
              </div>
              {isActive ? (
                <span className="rounded-full bg-[var(--accent-soft)] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[var(--accent)]">
                  Active
                </span>
              ) : null}
            </div>
          </button>
        );
      })}
    </div>
  );
}

function ThemePreview({ theme }: { theme: ThemeOption }) {
  const dataTheme = theme === "system" ? undefined : theme;
  return (
    <div
      data-theme={dataTheme}
      className={cn(
        "relative h-[88px] w-full overflow-hidden rounded-[10px] border border-border",
        theme === "system" &&
          "bg-gradient-to-br from-white to-[#0F1115] [&_*]:!bg-transparent"
      )}
      style={
        theme === "system"
          ? undefined
          : { backgroundColor: "var(--bg)" }
      }
    >
      {theme !== "system" ? (
        <>
          <div
            className="absolute left-2 top-2 bottom-2 w-[26%] rounded-[6px] border"
            style={{
              backgroundColor: "var(--bg-elevated)",
              borderColor: "var(--border)",
            }}
          >
            <div
              className="absolute left-1.5 top-2 h-1 w-6 rounded-full"
              style={{ backgroundColor: "var(--surface-active)" }}
            />
            <div
              className="absolute left-1.5 top-5 h-1 w-4 rounded-full"
              style={{ backgroundColor: "var(--surface-hover)" }}
            />
          </div>
          <div className="absolute right-2 top-2 bottom-2 left-[31%] space-y-1.5 p-1.5">
            <div
              className="h-1.5 w-12 rounded-full"
              style={{ backgroundColor: "var(--fg)" }}
            />
            <div
              className="h-1 w-20 rounded-full"
              style={{ backgroundColor: "var(--fg-muted)" }}
            />
            <div className="mt-2 grid grid-cols-2 gap-1.5">
              <div
                className="h-7 rounded-[6px] border"
                style={{
                  backgroundColor: "var(--surface)",
                  borderColor: "var(--border)",
                }}
              />
              <div
                className="h-7 rounded-[6px] border"
                style={{
                  backgroundColor: "var(--surface)",
                  borderColor: "var(--border)",
                }}
              />
            </div>
            <div
              className="h-2.5 w-10 rounded-[4px]"
              style={{ backgroundColor: "var(--accent)" }}
            />
          </div>
        </>
      ) : (
        <div className="flex h-full">
          <div data-theme="light" className="relative flex-1" style={{ backgroundColor: "var(--bg)" }}>
            <Sun className="absolute right-1.5 top-1.5 h-3 w-3 text-foreground" />
          </div>
          <div data-theme="dark" className="relative flex-1" style={{ backgroundColor: "var(--bg)" }}>
            <Moon className="absolute left-1.5 top-1.5 h-3 w-3 text-foreground" />
          </div>
        </div>
      )}
    </div>
  );
}
