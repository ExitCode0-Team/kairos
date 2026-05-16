"use client";

import { Logo } from "@/components/logo";
import { ConnectionsView } from "@/components/connectors/connections-view";
import { Card } from "@/components/ui/card";

export default function ConnectPage() {
  return (
    <div className="min-h-screen bg-muted">
      <div className="mx-auto max-w-3xl px-6 py-12">
        <header className="mb-10">
          <Logo className="mb-8" />
          <Card variant="tint-blue" className="mb-8 p-6">
            <h1 className="font-display mb-3 text-[28px] font-extrabold tracking-tight text-foreground">
              Connect your sources
            </h1>
            <p className="max-w-lg text-[16px] leading-relaxed text-muted-foreground">
              Kairos gets smarter the more it knows about you. Link your data and choose how you&apos;d like to stay in touch.
            </p>
          </Card>
        </header>

        <ConnectionsView continueHref="/dashboard" />
      </div>
    </div>
  );
}
