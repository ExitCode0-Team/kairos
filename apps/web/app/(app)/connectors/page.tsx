import { ConnectorsPanel } from "@/components/connectors/connectors-panel";
import { getConnectorStatus, getConnectors } from "@/lib/api/resources";

export default async function ConnectorsPage() {
  const [catalog, status] = await Promise.all([
    getConnectors(),
    getConnectorStatus(),
  ]);
  return (
    <div className="relative z-10 -m-6 flex min-h-[calc(100vh-3.5rem)] items-start justify-center p-6">
      <ConnectorsPanel
        showContinue={false}
        showClose={false}
        catalog={catalog}
        status={status}
      />
    </div>
  );
}
