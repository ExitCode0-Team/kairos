"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, ExternalLink, X } from "lucide-react";
import { IconCloud } from "./icon-cloud";
import { ConnectorRow } from "./connector-row";
import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/ui/search-input";
import { GlassPanel } from "@/components/ui/glass-panel";
import { channels, comingSoonSources, dataSources } from "@/lib/connectors/data";

interface ConnectorsPanelProps {
  continueHref?: string;
  showContinue?: boolean;
  showClose?: boolean;
  closeHref?: string;
  onDismiss?: () => void;
}

export function ConnectorsPanel({
  continueHref = "/dashboard",
  showContinue = true,
  showClose = false,
  closeHref = "/dashboard",
  onDismiss,
}: ConnectorsPanelProps) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [connectedSources, setConnectedSources] = useState<string[]>([]);
  const [loadingSource, setLoadingSource] = useState<string | null>(null);
  const [activeChannel, setActiveChannel] = useState("whatsapp");
  const [heroDismissed, setHeroDismissed] = useState(false);

  const handleConnect = async (sourceId: string) => {
    setLoadingSource(sourceId);
    await new Promise((r) => setTimeout(r, 1200));
    setConnectedSources((prev) => [...prev, sourceId]);
    setLoadingSource(null);
  };

  const filteredSources = useMemo(() => {
    const q = search.toLowerCase();
    if (!q) return dataSources;
    return dataSources.filter(
      (s) => s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q)
    );
  }, [search]);

  const filteredChannels = useMemo(() => {
    const q = search.toLowerCase();
    if (!q) return channels;
    return channels.filter(
      (c) => c.name.toLowerCase().includes(q) || c.description.toLowerCase().includes(q)
    );
  }, [search]);

  return (
    <GlassPanel padding="none" className="mx-auto w-full max-w-4xl overflow-hidden">
      <div className="flex items-center justify-between border-b border-border px-6 py-4">
        <h1 className="text-h2">Connectors</h1>
        <div className="flex items-center gap-3">
          <SearchInput
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-48"
          />
          {showClose && (
            <Link
              href={closeHref}
              onClick={onDismiss}
              className="flex h-10 w-10 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </Link>
          )}
        </div>
      </div>

      {!heroDismissed && (
        <div className="border-b border-border px-6 py-8 text-center">
          <IconCloud />
          <h2 className="mt-4 text-h2">Build from what you already use</h2>
          <p className="mx-auto mt-2 max-w-lg text-body-sm text-muted-foreground">
            Link your data sources and choose how Kairos reaches you. Job alerts, CV delivery, and check-ins happen on your channel.
          </p>
          <HeroActions
            onDismiss={() => setHeroDismissed(true)}
            showContinue={showContinue}
            continueHref={continueHref}
            router={router}
          />
        </div>
      )}

      <div className="space-y-8 p-6">
        <section>
          <h3 className="mb-4 text-label">App connectors</h3>
          <p className="mb-4 text-body-sm text-muted-foreground">
            Connect tools to keep your profile and applications up to date.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {filteredSources.map((source) => (
              <ConnectorRow
                key={source.id}
                icon={source.icon}
                iconClass={source.iconClass}
                name={source.name}
                description={source.description}
                connected={connectedSources.includes(source.id)}
                loading={loadingSource === source.id}
                onConnect={() => handleConnect(source.id)}
                type="data"
              />
            ))}
          </div>
        </section>

        <section>
          <h3 className="mb-2 text-label">Communication channel</h3>
          <p className="mb-4 text-body-sm text-muted-foreground">
            Choose where Kairos reaches you.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {filteredChannels.map((channel) => (
              <ConnectorRow
                key={channel.id}
                icon={channel.icon}
                iconClass={channel.iconClass}
                name={channel.name}
                description={channel.description}
                active={activeChannel === channel.id}
                onSelect={() => setActiveChannel(channel.id)}
                type="channel"
              />
            ))}
          </div>
        </section>

        {comingSoonSources.length > 0 && (
          <section>
            <h3 className="mb-4 text-label">Coming soon</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {comingSoonSources.map((source) => (
                <ConnectorRow
                  key={source.id}
                  icon={<span className="text-lg">◇</span>}
                  name={source.name}
                  description={source.description}
                  comingSoon
                  type="data"
                />
              ))}
            </div>
          </section>
        )}

        {showContinue && heroDismissed && (
          <ContinueFooter continueHref={continueHref} router={router} />
        )}
      </div>
    </GlassPanel>
  );
}

function HeroActions({
  onDismiss,
  showContinue,
  continueHref,
  router,
}: {
  onDismiss: () => void;
  showContinue: boolean;
  continueHref: string;
  router: ReturnType<typeof useRouter>;
}) {
  return (
    <div className="mt-6 flex flex-wrap justify-center gap-3">
      <Button variant="outline" size="sm" asChild>
        <a href="https://docs.kairos.app" target="_blank" rel="noopener noreferrer">
          View the docs
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </Button>
      <Button variant="secondary" size="sm" onClick={onDismiss}>
        Got it
      </Button>
      {showContinue && (
        <Button size="sm" onClick={() => router.push(continueHref)} className="gap-1">
          Continue
          <ArrowRight className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}

function ContinueFooter({
  continueHref,
  router,
}: {
  continueHref: string;
  router: ReturnType<typeof useRouter>;
}) {
  return (
    <div className="flex justify-end border-t border-border pt-6">
      <Button onClick={() => router.push(continueHref)} className="gap-2">
        Continue to dashboard
        <ArrowRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
