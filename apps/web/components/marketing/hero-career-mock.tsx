import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

export function HeroCareerMock() {
  return (
    <div className="glass-3 animate-glass-drift relative w-full max-w-md p-6" aria-hidden>
      <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3">
        <span className="text-label-ai">Stripe · Senior Frontend</span>
        <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <span className="h-2 w-2 rounded-full bg-secondary" />
          WhatsApp
        </span>
      </div>

      <div className="space-y-3">
        <div className="flex justify-end">
          <div className="max-w-[85%] rounded-2xl bg-primary/20 px-3 py-2 text-sm text-foreground">
            Tailor my CV for this Stripe role
          </div>
        </div>

        <div className="glass-2 space-y-3 rounded-xl p-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Match score</span>
            <Badge variant="insight">94%</Badge>
          </div>
          <ul className="space-y-1 text-xs text-muted-foreground">
            <li>• Strong React + TypeScript overlap</li>
            <li>• Add payments API experience</li>
            <li>• Highlight design-system work</li>
          </ul>
          <Button variant="success" size="sm" className="w-full">
            Generate CV
          </Button>
        </div>

        <div className="glass-2 flex items-center gap-2 rounded-xl px-3 py-2 text-xs text-muted-foreground">
          <MessageCircle className="h-3.5 w-3.5 text-secondary" />
          PDF ready in ~45s — we&apos;ll send it here
        </div>
      </div>
    </div>
  );
}
