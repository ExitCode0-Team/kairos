"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
      <Card>
        <p className="mb-4 text-[12px] font-medium uppercase tracking-wider text-muted-foreground">
          Your profile
        </p>
        <div className="space-y-2">
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
      </Card>
      <Button type="button" className="h-12 w-full gap-2" onClick={onConfirm}>
        Looks good, continue
        <ArrowRight className="h-4 w-4" />
      </Button>
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
    <div className="flex items-start justify-between gap-4 rounded-lg bg-muted px-3 py-2.5">
      <div className="min-w-0 flex-1">
        <p className="mb-0.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          {label}
        </p>
        <p className="truncate text-[14px] text-foreground">{value}</p>
      </div>
      <button
        type="button"
        onClick={onEdit}
        className="shrink-0 text-[12px] font-medium text-primary transition-colors hover:text-primary-hover"
      >
        Edit
      </button>
    </div>
  );
}
