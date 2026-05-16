"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { ConnectorCard } from "@/components/connectors/connector-card";
import { Button } from "@/components/ui/button";
import { channels, comingSoonSources, dataSources } from "@/lib/connectors/data";
import type { CardProps } from "@/components/ui/card";

const DATA_TINTS: CardProps["variant"][] = [
  "tint-blue",
  "tint-emerald",
  "tint-amber",
  "tint-blue",
];

interface ConnectionsViewProps {
  continueHref?: string;
  showContinue?: boolean;
}

export function ConnectionsView({
  continueHref = "/dashboard",
  showContinue = true,
}: ConnectionsViewProps) {
  const router = useRouter();
  const [connectedSources, setConnectedSources] = useState<string[]>([]);
  const [loadingSource, setLoadingSource] = useState<string | null>(null);
  const [activeChannel, setActiveChannel] = useState("whatsapp");

  const handleConnect = async (sourceId: string) => {
    setLoadingSource(sourceId);
    await new Promise((r) => setTimeout(r, 1200));
    setConnectedSources((prev) => [...prev, sourceId]);
    setLoadingSource(null);
  };

  return (
    <div className="space-y-10">
      <section>
        <h2 className="mb-5 text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
          Data sources
        </h2>
        <div className="grid gap-4">
          {dataSources.map((source, index) => (
            <ConnectorCard
              key={source.id}
              icon={source.icon}
              iconClass={source.iconClass}
              name={source.name}
              description={source.description}
              connected={connectedSources.includes(source.id)}
              loading={loadingSource === source.id}
              onConnect={() => handleConnect(source.id)}
              type="data"
              tint={DATA_TINTS[index % DATA_TINTS.length]}
            />
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
          Communication channel
        </h2>
        <p className="mb-5 text-[13px] leading-relaxed text-muted-foreground">
          Choose where Kairos reaches you. Job alerts, CV delivery, and weekly check-ins happen here.
        </p>
        <ChannelList activeChannel={activeChannel} onSelect={setActiveChannel} />
      </section>

      {showContinue && (
        <div className="flex justify-end pt-2">
          <Button size="lg" onClick={() => router.push(continueHref)} className="gap-2">
            Continue to dashboard
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}

const CHANNEL_TINTS: CardProps["variant"][] = [
  "tint-emerald",
  "tint-blue",
  "tint-amber",
  "tint-blue",
  "tint-emerald",
];

function ChannelList({
  activeChannel,
  onSelect,
}: {
  activeChannel: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="grid gap-4">
      {channels.map((channel, index) => (
        <ConnectorCard
          key={channel.id}
          icon={channel.icon}
          iconClass={channel.iconClass}
          name={channel.name}
          description={channel.description}
          active={activeChannel === channel.id}
          onSelect={() => onSelect(channel.id)}
          type="channel"
          tint={CHANNEL_TINTS[index % CHANNEL_TINTS.length]}
        />
      ))}
    </div>
  );
}

export function ConnectorsDashboardExtras() {
  return (
    <section className="mt-10">
      <h2 className="mb-5 text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
        Coming soon
      </h2>
      <div className="grid gap-4">
        {comingSoonSources.map((source, index) => (
          <ConnectorCard
            key={source.id}
            icon={<span className="text-lg text-muted-foreground">◇</span>}
            name={source.name}
            description={source.description}
            comingSoon
            type="data"
            tint={index % 2 === 0 ? "tint-amber" : "tint-blue"}
          />
        ))}
      </div>
    </section>
  );
}
