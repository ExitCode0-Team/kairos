import type { FlowStep } from "./types";

export const GREETING: FlowStep = {
  type: "ai",
  content:
    "Hey there 👋 I'm Kairos, your AI career companion. I'll help you find the right opportunities at the right time.",
  inputType: "none",
};

export const CV_PROMPT: FlowStep = {
  type: "ai",
  content:
    "You can upload your CV and I'll pull out the details for you — or we can chat through it together.",
  inputType: "cv-upload",
};

export const MANUAL_FLOW: FlowStep[] = [
  {
    type: "ai",
    content: "What's your name?",
    inputType: "text",
    field: "name",
  },
  {
    type: "ai",
    content: "Nice to meet you, {name}! What's your role or profession?",
    inputType: "text",
    field: "role",
  },
  {
    type: "ai",
    content: "What skills or interests should I know about? Add as many as you'd like.",
    inputType: "tags",
    field: "skills",
  },
  {
    type: "ai",
    content:
      "Tell me a bit about your experience — a sentence or two is perfect. Or skip if you'd rather add this later.",
    inputType: "text",
    field: "experience",
    optional: true,
  },
];

export const SUMMARY_PROMPT =
  "Here's what I've got. Take a look and let me know if anything needs adjusting:";

export const CV_EXTRACTED_PROMPT =
  "I've pulled these details from your CV. Does everything look right?";

export function interpolate(content: string, profile: { name?: string; role?: string }) {
  return content
    .replace("{name}", profile.name || "")
    .replace("{role}", profile.role || "");
}
