"use client";

import { ConnectorsPanel } from "@/components/connectors/connectors-panel";

export default function ConnectPage() {
  return (
    <div className="flex min-h-screen items-start justify-center p-6">
      <ConnectorsPanel continueHref="/dashboard" showContinue />
    </div>
  );
}
