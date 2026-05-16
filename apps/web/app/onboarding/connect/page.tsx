"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { LogoMark } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ConnectorCardProps {
  icon: React.ReactNode;
  name: string;
  description: string;
  connected?: boolean;
  active?: boolean;
  loading?: boolean;
  onConnect?: () => void;
  onSelect?: () => void;
  type: "data" | "channel";
}

function NotionIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.98-.7-2.055-.607L3.01 2.721c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.886l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952l1.448.327s0 .84-1.168.84l-3.22.186c-.094-.187 0-.653.327-.746l.84-.233V9.854L7.822 9.62c-.094-.42.14-1.026.793-1.073l3.456-.234 4.763 7.279V9.062l-1.214-.14c-.094-.514.28-.887.747-.933zM2.332 1.155l13.728-1.009c1.682-.14 2.102-.046 3.15.7l4.342 3.036c.7.513.934.653.934 1.213v16.378c0 1.026-.373 1.632-1.681 1.726L5.458 24c-.98.047-1.448-.093-1.962-.747l-3.13-4.06c-.56-.746-.793-1.306-.793-1.958V2.795c0-.84.373-1.54 1.759-1.64z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

function DriveIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M4.433 22.396l4-6.93H24l-4 6.93zm7.134-6.93L3.567 1.604h8l8 13.862zm-1.133 0H2.434L6.433 8.54l4 6.926z" />
    </svg>
  );
}

function UploadIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function TelegramIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  );
}

function SlackIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" />
    </svg>
  );
}

function DiscordIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function ConnectorCard({
  icon,
  name,
  description,
  connected,
  active,
  loading,
  onConnect,
  onSelect,
  type,
}: ConnectorCardProps) {
  const isChannel = type === "channel";

  return (
    <div
      onClick={isChannel ? onSelect : undefined}
      className={cn(
        "group relative p-5 rounded-2xl border transition-all duration-300 cursor-pointer",
        active
          ? "border-accent/50 bg-accent/5 shadow-[0_0_30px_rgba(242,213,138,0.1)]"
          : connected
          ? "border-cyan/30 bg-cyan/5"
          : "border-border-hover bg-panel/50 hover:border-border-glow hover:bg-panel"
      )}
    >
      {/* Glow effect for active */}
      {active && (
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-accent/10 to-transparent pointer-events-none" />
      )}

      <div className="relative flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <div
            className={cn(
              "w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300",
              active
                ? "bg-accent/20 text-accent"
                : connected
                ? "bg-cyan/20 text-cyan"
                : "bg-main border border-border-hover text-text-secondary group-hover:text-text-primary"
            )}
          >
            {icon}
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <span className="text-[15px] font-medium text-text-primary">{name}</span>
              {connected && !isChannel && (
                <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-cyan/10 border border-cyan/20 text-[11px] text-cyan">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse" />
                  Connected
                </span>
              )}
              {active && isChannel && (
                <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-accent/10 border border-accent/20 text-[11px] text-accent">
                  <Check className="w-3 h-3" />
                  Selected
                </span>
              )}
            </div>
            <p className="text-[13px] text-text-secondary mt-1 leading-relaxed">
              {description}
            </p>
          </div>
        </div>
        {!isChannel && !connected && (
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onConnect?.();
            }}
            disabled={loading}
            className="shrink-0"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              "Connect"
            )}
          </Button>
        )}
      </div>
    </div>
  );
}

const dataSources = [
  {
    id: "notion",
    icon: <NotionIcon />,
    name: "Notion",
    description: "Sync notes and docs to keep your profile current.",
  },
  {
    id: "github",
    icon: <GitHubIcon />,
    name: "GitHub",
    description: "Pull projects and contributions automatically.",
  },
  {
    id: "drive",
    icon: <DriveIcon />,
    name: "Google Drive",
    description: "Connect docs and portfolios.",
  },
  {
    id: "cv",
    icon: <UploadIcon />,
    name: "Upload CV",
    description: "Parse your existing CV instantly.",
  },
];

const channels = [
  {
    id: "whatsapp",
    icon: <WhatsAppIcon />,
    name: "WhatsApp",
    description: "Get alerts and send commands via WhatsApp.",
  },
  {
    id: "telegram",
    icon: <TelegramIcon />,
    name: "Telegram",
    description: "Chat with Kairos on Telegram.",
  },
  {
    id: "slack",
    icon: <SlackIcon />,
    name: "Slack",
    description: "Receive updates in your Slack workspace.",
  },
  {
    id: "discord",
    icon: <DiscordIcon />,
    name: "Discord",
    description: "Get notifications via Discord DM.",
  },
  {
    id: "email",
    icon: <MailIcon />,
    name: "Email",
    description: "Traditional email notifications.",
  },
];

export default function ConnectPage() {
  const router = useRouter();
  const [connectedSources, setConnectedSources] = useState<string[]>([]);
  const [loadingSource, setLoadingSource] = useState<string | null>(null);
  const [activeChannel, setActiveChannel] = useState<string>("whatsapp");

  const handleConnect = async (sourceId: string) => {
    setLoadingSource(sourceId);
    // Simulate connection
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setConnectedSources([...connectedSources, sourceId]);
    setLoadingSource(null);
  };

  const handleContinue = () => {
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-shell">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] radial-accent opacity-20" />
        <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] radial-cyan opacity-15" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-8">
            <LogoMark className="w-6 h-6" />
            <span className="text-lg font-medium tracking-tight text-text-primary">kairos.</span>
          </div>
          <h1 className="text-[28px] font-medium text-text-primary mb-3 tracking-tight">
            Connect your world.
          </h1>
          <p className="text-[16px] text-text-secondary leading-relaxed max-w-lg">
            Kairos gets smarter the more it knows. Connect your data sources and choose how you want to stay in touch.
          </p>
        </div>

        {/* Data Sources */}
        <section className="mb-12">
          <h2 className="text-[11px] uppercase tracking-[0.1em] text-text-muted mb-5 font-medium">
            Data Sources
          </h2>
          <div className="grid gap-4">
            {dataSources.map((source) => (
              <ConnectorCard
                key={source.id}
                icon={source.icon}
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

        {/* Communication Channel */}
        <section className="mb-12">
          <h2 className="text-[11px] uppercase tracking-[0.1em] text-text-muted mb-2 font-medium">
            Communication Channel
          </h2>
          <p className="text-[13px] text-text-secondary mb-5 leading-relaxed">
            Choose where Kairos reaches you. Job alerts, CV delivery, and weekly check-ins happen here.
          </p>
          <div className="grid gap-4">
            {channels.map((channel) => (
              <ConnectorCard
                key={channel.id}
                icon={channel.icon}
                name={channel.name}
                description={channel.description}
                active={activeChannel === channel.id}
                onSelect={() => setActiveChannel(channel.id)}
                type="channel"
              />
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="flex justify-end">
          <Button onClick={handleContinue} size="lg" className="gap-2 glow-accent">
            Continue to dashboard
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
