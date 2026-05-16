"use client";

import { ConnectorsPanel } from "./connectors-panel";

interface ConnectionsViewProps {
  continueHref?: string;
  showContinue?: boolean;
}

export function ConnectionsView({
  continueHref = "/dashboard",
  showContinue = true,
}: ConnectionsViewProps) {
  return (
    <ConnectorsPanel
      continueHref={continueHref}
      showContinue={showContinue}
    />
  );
}

export function ConnectorsDashboardExtras() {
  return null;
}
