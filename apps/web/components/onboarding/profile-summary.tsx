"use client";

import { ArrowRight } from "lucide-react";
import type { UserProfile } from "@/lib/onboarding/types";

interface ProfileSummaryProps {
  userData: UserProfile;
  onConfirm: () => void;
  onEdit: (field: keyof UserProfile) => void;
}

const FIELDS: { key: keyof UserProfile; label: string }[] = [
  { key: "name", label: "Name" },
  { key: "role", label: "Role" },
  { key: "skills", label: "Skills" },
  { key: "experience", label: "Experience" },
];

export function ProfileSummary({ userData, onConfirm, onEdit }: ProfileSummaryProps) {
  return (
    <div className="animate-message-in space-y-4">
      <div className="rounded-card bg-surface p-5 shadow-soft">
        <p className="mb-4 text-[12px] uppercase tracking-wider text-text-muted">
          Your profile
        </p>
        <div className="space-y-3">
          {FIELDS.map(({ key, label }) => (
            <ProfileField
              key={key}
              label={label}
              value={
                key === "skills"
                  ? userData.skills.join(", ") || "—"
                  : (userData[key] as string) || "—"
              }
              onEdit={() => onEdit(key)}
            />
          ))}
        </div>
      </div>
      <button
        type="button"
        onClick={onConfirm}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent py-3.5 text-[15px] font-medium text-surface shadow-soft transition-colors hover:bg-accent-hover"
      >
        Looks good, continue
        <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
}

function ProfileField({
  label,
  value,
  onEdit,
}: {
  label: string;
  value: string;
  onEdit: () => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-border/60 py-2 last:border-0">
      <div className="min-w-0 flex-1">
        <p className="mb-0.5 text-[11px] uppercase tracking-wider text-text-muted">
          {label}
        </p>
        <p className="truncate text-[14px] text-text-primary">{value}</p>
      </div>
      <button
        type="button"
        onClick={onEdit}
        className="shrink-0 text-[12px] text-blue transition-colors hover:text-accent"
      >
        Edit
      </button>
    </div>
  );
}
