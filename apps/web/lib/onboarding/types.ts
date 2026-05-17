export type InputType = "text" | "tags" | "cv-upload" | "retry" | "none";

export type OnboardingStatus = "idle" | "submitting" | "error";

export interface ChatMessage {
  id: string;
  type: "ai" | "user";
  content: string;
  inputType?: InputType;
  field?: keyof UserProfile;
  isNew?: boolean;
  errorRef?: boolean;
}

export interface UserProfile {
  name: string;
  role: string;
  skills: string[];
  experience: string;
  projects: string[];
  references: string[];
}

export interface Question<K extends keyof UserProfile = keyof UserProfile> {
  field: K;
  prompt: string;
  inputType: Exclude<InputType, "none" | "cv-upload" | "retry">;
  optional?: boolean;
  validate?: (value: UserProfile[K]) => string | null;
}

export type Schema = Question[];

export const PROFILE_STORAGE_KEY = "kairos-onboarding-profile";
