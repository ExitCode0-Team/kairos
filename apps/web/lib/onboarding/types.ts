export type InputType = "text" | "tags" | "cv-upload" | "none";

export interface ChatMessage {
  id: string;
  type: "ai" | "user";
  content: string;
  inputType?: InputType;
  field?: keyof UserProfile;
  isNew?: boolean;
}

export interface UserProfile {
  name: string;
  role: string;
  skills: string[];
  experience: string;
}

export interface FlowStep {
  type: "ai";
  content: string;
  inputType?: InputType;
  field?: keyof UserProfile;
  optional?: boolean;
}

export const PROFILE_STORAGE_KEY = "kairos-onboarding-profile";
