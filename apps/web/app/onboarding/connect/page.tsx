"use client";

import { Logo } from "@/components/logo";
import { ConnectionsView } from "@/components/connectors/connections-view";

export default function ConnectPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="relative z-10 mx-auto max-w-3xl px-6 py-12">
        <header className="mb-12">
          <Logo className="mb-8" />
          <h1 className="font-display mb-3 text-[28px] font-medium tracking-tight text-text-primary">
            Connect your sources
          </h1>
          <p className="max-w-lg text-[16px] leading-relaxed text-text-secondary">
            Kairos gets smarter the more it knows about you. Link your data and choose how you&apos;d like to stay in touch.
          </p>
        </header>

        <ConnectionsView continueHref="/dashboard" />
      </div>
    </div>
  );
}
