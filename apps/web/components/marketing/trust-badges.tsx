import { Shield, Lock, Zap } from "lucide-react";

const badges = [
  { icon: Shield, label: "SOC 2 ready" },
  { icon: Lock, label: "Your data stays yours" },
  { icon: Zap, label: "Apply in under 60s" },
];

export function TrustBadges() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
      {badges.map(({ icon: Icon, label }) => (
        <div key={label} className="flex items-center gap-2 text-sm text-muted-foreground">
          <Icon className="h-4 w-4 text-secondary" strokeWidth={2} />
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}
