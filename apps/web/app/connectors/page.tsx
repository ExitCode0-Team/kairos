"use client";

import {
  ConnectionsView,
  ConnectorsDashboardExtras,
} from "@/components/connectors/connections-view";

export default function ConnectorsPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <header className="mb-10">
        <h1 className="font-display mb-2 text-[26px] font-medium text-text-primary">
          Connectors
        </h1>
        <p className="text-[15px] text-text-secondary">
          Manage your data sources and communication channels.
        </p>
      </header>

      <ConnectionsView showContinue={false} />
      <ConnectorsDashboardExtras />
    </div>
  );
}
