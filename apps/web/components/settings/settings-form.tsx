"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { SectionShell } from "@/components/ui/section-shell";
import { apiFetch } from "@/lib/api/client";
import type { Settings } from "@/lib/api/types";

type SaveState = "idle" | "saving" | "saved" | "error";

export function SettingsForm({ initial }: { initial: Settings }) {
  const [values, setValues] = useState<Settings>(initial);
  const [state, setState] = useState<SaveState>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const update = <K extends keyof Settings>(key: K, value: Settings[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    if (state !== "idle") setState("idle");
  };

  const handleSave = async () => {
    setState("saving");
    setErrorMsg(null);
    const res = await apiFetch<Settings>("/api/settings", {
      method: "PUT",
      body: JSON.stringify(values),
    });
    if (res.ok) {
      setValues(res.data);
      setState("saved");
    } else {
      setState("error");
      setErrorMsg(res.error.message ?? "Could not save settings.");
    }
  };

  return (
    <>
      <SectionShell title="Profile" description="How you appear in Kairos.">
        <div className="space-y-4">
          <div>
            <label className="mb-1.5 block text-label">Display name</label>
            <Input
              value={values.displayName}
              onChange={(e) => update("displayName", e.target.value)}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-label">Email</label>
            <Input
              type="email"
              value={values.email}
              onChange={(e) => update("email", e.target.value)}
            />
          </div>
        </div>
      </SectionShell>

      <SectionShell title="Notifications" description="Where your agent reaches you.">
        <div>
          <label className="mb-1.5 block text-label">Default channel</label>
          <Select
            value={values.notificationChannel}
            onChange={(e) =>
              update("notificationChannel", e.target.value as Settings["notificationChannel"])
            }
          >
            <option value="whatsapp">WhatsApp</option>
            <option value="telegram">Telegram</option>
            <option value="slack">Slack</option>
            <option value="discord">Discord</option>
            <option value="email">Email</option>
          </Select>
        </div>
      </SectionShell>

      <div className="flex items-center gap-3">
        <Button onClick={handleSave} disabled={state === "saving"}>
          {state === "saving" ? "Saving…" : "Save changes"}
        </Button>
        {state === "saved" && (
          <span className="text-body-sm text-secondary">Saved</span>
        )}
        {state === "error" && (
          <span className="text-body-sm text-[var(--danger)]">{errorMsg}</span>
        )}
      </div>
    </>
  );
}
