import { ConnectorsPanel } from "@/components/connectors/connectors-panel";

export default function ConnectorsPage() {
  return (
    <div className="relative z-10 -m-6 flex min-h-[calc(100vh-3.5rem)] items-start justify-center p-6">
      <ConnectorsPanel showContinue={false} showClose={false} />
    </div>
  );
}
