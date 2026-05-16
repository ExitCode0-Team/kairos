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

export const dataSources = [
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

export const channels = [
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

export const comingSoonSources = [
  { id: "linear", name: "Linear", description: "Sync issues and project context." },
  { id: "jira", name: "Jira", description: "Connect sprint and ticket history." },
];
