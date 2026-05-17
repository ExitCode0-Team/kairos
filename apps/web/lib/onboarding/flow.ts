import type { Question, Schema, UserProfile } from "./types";

export const GREETING = {
  content:
    "Hey there 👋 I'm Kairos, your AI career companion. I'll help you find the right opportunities at the right time.",
} as const;

export const CV_PROMPT = {
  content:
    "You can upload your CV and I'll pull out the details for you — or we can chat through it together.",
} as const;

export const ONBOARDING_SCHEMA: Schema = [
  {
    field: "name",
    prompt: "What's your name?",
    inputType: "text",
    validate: (value) => {
      const v = (value as string)?.trim() ?? "";
      if (v.length < 2) return "That looks too short — could I get your full name?";
      return null;
    },
  },
  {
    field: "role",
    prompt: "Nice to meet you, {name}! What's your role or profession?",
    inputType: "text",
    validate: (value) => {
      const v = (value as string)?.trim() ?? "";
      if (v.length < 2) return "Could you give me a role with at least a couple of characters?";
      return null;
    },
  },
  {
    field: "skills",
    prompt: "What skills or interests should I know about? Add as many as you'd like.",
    inputType: "tags",
    validate: (value) => {
      const tags = (value as string[]) ?? [];
      if (tags.length === 0) return "Add at least one skill so I can match you well.";
      return null;
    },
  },
  {
    field: "experience",
    prompt:
      "Tell me a bit about your experience — a sentence or two is perfect. Or skip if you'd rather add this later.",
    inputType: "text",
    optional: true,
  },
  {
    field: "projects",
    prompt:
      "Any standout projects you'd like to highlight? Add their names or a short description each. Skip if you don't have any handy.",
    inputType: "tags",
    optional: true,
  },
  {
    field: "references",
    prompt:
      "Got any references I should know about? Add each as a name (and role or contact if you'd like). Skip if you'd rather add them later.",
    inputType: "tags",
    optional: true,
  },
];

export const SUMMARY_PROMPT =
  "Here's what I've got. Take a look and let me know if anything needs adjusting:";

export const CV_EXTRACTED_PROMPT =
  "I've pulled these details from your CV. Does everything look right?";

export function interpolate(content: string, profile: Pick<UserProfile, "name" | "role">) {
  return content
    .replace("{name}", profile.name || "")
    .replace("{role}", profile.role || "");
}

export function findQuestionIndex(field: Question["field"]): number {
  return ONBOARDING_SCHEMA.findIndex((q) => q.field === field);
}
