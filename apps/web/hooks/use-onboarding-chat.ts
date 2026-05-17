"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  CV_EXTRACTED_PROMPT,
  CV_PROMPT,
  GREETING,
  ONBOARDING_SCHEMA,
  SUMMARY_PROMPT,
  findQuestionIndex,
  interpolate,
} from "@/lib/onboarding/flow";
import { parseCvFile } from "@/lib/onboarding/parse-cv";
import { submitOnboarding } from "@/lib/onboarding/submit";
import {
  PROFILE_STORAGE_KEY,
  type ChatMessage,
  type OnboardingStatus,
  type Question,
  type UserProfile,
} from "@/lib/onboarding/types";

const EMPTY_PROFILE: UserProfile = {
  name: "",
  role: "",
  skills: [],
  experience: "",
  projects: [],
  references: [],
};

function typingDelay() {
  return 700 + Math.random() * 400;
}

function persist(profile: UserProfile) {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
  } catch {
    /* ignore quota / privacy mode */
  }
}

function loadPersisted(): UserProfile | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(PROFILE_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<UserProfile>;
    return { ...EMPTY_PROFILE, ...parsed };
  } catch {
    return null;
  }
}

export function useOnboardingChat() {
  const router = useRouter();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [manualStep, setManualStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [userData, setUserData] = useState<UserProfile>(EMPTY_PROFILE);
  const [awaitingCV, setAwaitingCV] = useState(true);
  const [manualStarted, setManualStarted] = useState(false);
  const [status, setStatus] = useState<OnboardingStatus>("idle");
  const initialized = useRef(false);

  const pushMessage = useCallback((msg: Omit<ChatMessage, "id">) => {
    const id = `msg-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    setMessages((prev) => [...prev, { ...msg, id, isNew: true }]);
  }, []);

  const addAIMessage = useCallback(
    (content: string, extras?: Partial<ChatMessage>) => {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        pushMessage({ type: "ai", content, ...extras });
      }, typingDelay());
    },
    [pushMessage]
  );

  const emitQuestion = useCallback(
    (q: Question, profile: UserProfile, extras?: Partial<ChatMessage>) => {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        pushMessage({
          type: "ai",
          content: interpolate(q.prompt, profile),
          inputType: q.inputType,
          field: q.field,
          ...extras,
        });
      }, typingDelay());
    },
    [pushMessage]
  );

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const restored = loadPersisted();
    if (restored) setUserData(restored);

    setTimeout(() => addAIMessage(GREETING.content), 400);
    setTimeout(() => {
      pushMessage({
        type: "ai",
        content: CV_PROMPT.content,
        inputType: "cv-upload",
      });
    }, 1600);
  }, [addAIMessage, pushMessage]);

  const showConfirmation = useCallback(() => {
    addAIMessage(SUMMARY_PROMPT);
    setTimeout(() => setShowSummary(true), 500);
  }, [addAIMessage]);

  const startManualFlow = useCallback(() => {
    setAwaitingCV(false);
    setManualStarted(true);
    setMessages((prev) => prev.filter((m) => m.inputType !== "cv-upload"));
    setManualStep(0);
    emitQuestion(ONBOARDING_SCHEMA[0], userData);
  }, [emitQuestion, userData]);

  const advanceManual = useCallback(
    (profile: UserProfile, nextIndex: number) => {
      if (nextIndex < ONBOARDING_SCHEMA.length) {
        setManualStep(nextIndex);
        setTimeout(() => emitQuestion(ONBOARDING_SCHEMA[nextIndex], profile), 300);
      } else {
        setTimeout(() => showConfirmation(), 400);
      }
    },
    [emitQuestion, showConfirmation]
  );

  const handleAnswer = useCallback(
    (value: string | string[], field?: keyof UserProfile) => {
      const q =
        (field ? ONBOARDING_SCHEMA[findQuestionIndex(field)] : undefined) ??
        ONBOARDING_SCHEMA[manualStep];

      const display = Array.isArray(value) ? value.join(", ") : value;
      pushMessage({ type: "user", content: display });

      const err = q?.validate?.(value as never);
      if (err) {
        addAIMessage(err, { errorRef: true });
        setTimeout(() => emitQuestion(q, userData, { errorRef: true }), 400);
        return;
      }

      const nextProfile = q
        ? ({ ...userData, [q.field]: value } as UserProfile)
        : userData;
      if (q) {
        setUserData(nextProfile);
        persist(nextProfile);
      }

      const currentIndex = q ? findQuestionIndex(q.field) : manualStep;
      advanceManual(nextProfile, currentIndex + 1);
    },
    [addAIMessage, advanceManual, emitQuestion, manualStep, pushMessage, userData]
  );

  const handleSkipStep = useCallback(() => {
    const q = ONBOARDING_SCHEMA[manualStep];
    if (!q || !q.optional) return;

    const labels: Partial<Record<keyof UserProfile, string>> = {
      experience: "I'll add experience later",
      projects: "I'll add projects later",
      references: "I'll add references later",
    };
    pushMessage({ type: "user", content: labels[q.field] ?? "Skip for now" });

    const emptyValue = q.inputType === "tags" ? [] : "";
    const nextProfile = { ...userData, [q.field]: emptyValue } as UserProfile;
    setUserData(nextProfile);
    persist(nextProfile);
    advanceManual(nextProfile, manualStep + 1);
  }, [advanceManual, manualStep, pushMessage, userData]);

  const handleCVUpload = useCallback(
    async (file: File) => {
      setAwaitingCV(false);
      setMessages((prev) => prev.filter((m) => m.inputType !== "cv-upload"));
      pushMessage({ type: "user", content: `Uploaded: ${file.name}` });

      setIsTyping(true);
      try {
        const extracted = await parseCvFile(file);
        setUserData(extracted);
        persist(extracted);
        setIsTyping(false);
        addAIMessage(CV_EXTRACTED_PROMPT);
        setTimeout(() => setShowSummary(true), 500);
      } catch {
        setIsTyping(false);
        addAIMessage(
          "I couldn't read that file. Let's fill things in together instead.",
          { errorRef: true }
        );
        setManualStarted(true);
        setManualStep(0);
        setTimeout(() => emitQuestion(ONBOARDING_SCHEMA[0], userData), 600);
      }
    },
    [addAIMessage, emitQuestion, pushMessage, userData]
  );

  const handleEditField = useCallback(
    (field: keyof UserProfile) => {
      setShowSummary(false);
      const stepIndex = findQuestionIndex(field);
      if (stepIndex === -1) return;

      setManualStarted(true);
      setManualStep(stepIndex);
      const step = ONBOARDING_SCHEMA[stepIndex];
      const labels: Record<keyof UserProfile, string> = {
        name: "name",
        role: "role",
        skills: "skills",
        experience: "experience",
        projects: "projects",
        references: "references",
      };
      addAIMessage(
        `No problem — let's update your ${labels[field]}. ${interpolate(step.prompt, userData)}`,
        { inputType: step.inputType, field: step.field }
      );
    },
    [addAIMessage, userData]
  );

  const handleConfirm = useCallback(async () => {
    setShowSummary(false);
    setStatus("submitting");
    setIsTyping(true);

    const res = await submitOnboarding(userData);

    setIsTyping(false);

    if (res.ok) {
      setStatus("idle");
      persist(userData);
      router.push("/onboarding/connect");
      return;
    }

    setStatus("error");

    if (res.fieldErrors && Object.keys(res.fieldErrors).length > 0) {
      const first = Object.keys(res.fieldErrors)[0] as keyof UserProfile;
      const message = res.fieldErrors[first]?.[0] ?? "please review.";
      addAIMessage(`I couldn't save that: ${message}`, { errorRef: true });
      setTimeout(() => handleEditField(first), 500);
      return;
    }

    addAIMessage(
      res.message
        ? `Hmm, saving failed: ${res.message}`
        : "Network hiccup saving your profile.",
      { errorRef: true }
    );
    pushMessage({
      type: "ai",
      content: "Want me to try sending again?",
      inputType: "retry",
    });
  }, [addAIMessage, handleEditField, pushMessage, router, userData]);

  const handleRetrySubmit = useCallback(() => {
    setMessages((prev) => prev.filter((m) => m.inputType !== "retry"));
    void handleConfirm();
  }, [handleConfirm]);

  const currentMessage = [...messages].reverse().find(
    (m) => m.type === "ai" && m.inputType && m.inputType !== "none"
  );

  const showInput =
    !showSummary &&
    !isTyping &&
    status !== "submitting" &&
    (awaitingCV
      ? messages.some((m) => m.inputType === "cv-upload")
      : Boolean(manualStarted && currentMessage?.inputType));

  const currentStep = ONBOARDING_SCHEMA[manualStep];

  return {
    messages,
    isTyping,
    showSummary,
    userData,
    status,
    showInput,
    currentMessage: currentMessage ?? null,
    currentStep,
    handleAnswer,
    handleSkipStep,
    handleCVUpload,
    handleSkipCV: startManualFlow,
    handleConfirm,
    handleEditField,
    handleRetrySubmit,
  };
}
