"use client";

import type { ReactNode } from "react";
import {
  DiscordIcon,
  DriveIcon,
  GitHubIcon,
  MailIcon,
  NotionIcon,
  SlackIcon,
  TelegramIcon,
  UploadIcon,
  WhatsAppIcon,
} from "@/components/connectors/icons";

/**
 * Client-side registry keyed by connector id. Server only ships text + id;
 * icons stay here so we don't serialize React over the wire.
 */
export const CONNECTOR_ICONS: Record<string, ReactNode> = {
  notion: <NotionIcon />,
  github: <GitHubIcon />,
  drive: <DriveIcon />,
  cv: <UploadIcon />,
  whatsapp: <WhatsAppIcon />,
  telegram: <TelegramIcon />,
  slack: <SlackIcon />,
  discord: <DiscordIcon />,
  email: <MailIcon />,
};

export const CONNECTOR_ICON_CLASS: Record<string, string> = {
  cv: "text-primary",
  slack: "text-primary",
  email: "text-secondary",
};

export function getConnectorIcon(id: string): ReactNode {
  return CONNECTOR_ICONS[id] ?? <span className="text-lg">◇</span>;
}

export function getConnectorIconClass(id: string): string | undefined {
  return CONNECTOR_ICON_CLASS[id] ?? "text-foreground";
}
