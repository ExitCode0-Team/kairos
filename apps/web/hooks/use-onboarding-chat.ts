"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  CV_EXTRACTED_PROMPT,
  CV_PROMPT,
  GREETING,
  interpolate,
  MANUAL_FLOW,
  SUMMARY_PROMPT,
} from "@/lib/onboarding/flow";
import { parseCvFile } from "@/lib/onboarding/parse-cv";
import {
  PROFILE_STORAGE_KEY,
  type ChatMessage,
  type UserProfile,
} from "@/lib/onboarding/types";

const EMPTY_PROFILE: UserProfile = {
  name: "",
  role: "",
  skills: [],
  experience: "",
};

function typingDelay() {
  return 700 + Math.random() * 400;
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

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

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
    const step = MANUAL_FLOW[0];
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      pushMessage({
        type: "ai",
        content: interpolate(step.content, userData),
        inputType: step.inputType,
        field: step.field,
      });
    }, typingDelay());
  }, [addAIMessage, userData]);

  const advanceManual = useCallback(
    (profile: UserProfile, nextIndex: number) => {
      if (nextIndex < MANUAL_FLOW.length) {
        setManualStep(nextIndex);
        const step = MANUAL_FLOW[nextIndex];
        setTimeout(() => {
          setIsTyping(true);
          setTimeout(() => {
            setIsTyping(false);
            pushMessage({
              type: "ai",
              content: interpolate(step.content, profile),
              inputType: step.inputType,
              field: step.field,
            });
          }, typingDelay());
        }, 300);
      } else {
        setTimeout(() => showConfirmation(), 400);
      }
    },
    [pushMessage, showConfirmation]
  );

  const handleAnswer = useCallback(
    (value: string | string[], field?: keyof UserProfile) => {
      const display = Array.isArray(value) ? value.join(", ") : value;
      pushMessage({ type: "user", content: display });

      const nextProfile = field
        ? { ...userData, [field]: value }
        : userData;
      if (field) setUserData(nextProfile);

      const nextStep = manualStep + 1;
      advanceManual(nextProfile, nextStep);
    },
    [advanceManual, manualStep, pushMessage, userData]
  );

  const handleSkipExperience = useCallback(() => {
    pushMessage({ type: "user", content: "I'll add experience later" });
    const nextProfile = { ...userData, experience: "" };
    setUserData(nextProfile);
    const nextStep = manualStep + 1;
    advanceManual(nextProfile, nextStep);
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
        setIsTyping(false);
        addAIMessage(CV_EXTRACTED_PROMPT);
        setTimeout(() => setShowSummary(true), 500);
      } catch {
        setIsTyping(false);
        addAIMessage("I couldn't read that file. Let's fill things in together instead.");
        setManualStarted(true);
        setManualStep(0);
        const step = MANUAL_FLOW[0];
        setTimeout(() => {
          addAIMessage(interpolate(step.content, userData), {
            inputType: step.inputType,
            field: step.field,
          });
        }, 600);
      }
    },
    [addAIMessage, pushMessage, userData]
  );

  const handleConfirm = useCallback(() => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(userData));
    }
    router.push("/onboarding/connect");
  }, [router, userData]);

  const handleEditField = useCallback(
    (field: keyof UserProfile) => {
      setShowSummary(false);
      const stepIndex = MANUAL_FLOW.findIndex((s) => s.field === field);
      if (stepIndex === -1) return;

      setManualStarted(true);
      setManualStep(stepIndex);
      const step = MANUAL_FLOW[stepIndex];
      const labels: Record<keyof UserProfile, string> = {
        name: "name",
        role: "role",
        skills: "skills",
        experience: "experience",
      };
      addAIMessage(
        `No problem — let's update your ${labels[field]}. ${interpolate(step.content, userData)}`,
        { inputType: step.inputType, field: step.field }
      );
    },
    [addAIMessage, userData]
  );

  const currentMessage = [...messages].reverse().find(
    (m) => m.type === "ai" && m.inputType && m.inputType !== "none"
  );

  const showInput =
    !showSummary &&
    !isTyping &&
    (awaitingCV
      ? messages.some((m) => m.inputType === "cv-upload")
      : manualStarted && currentMessage?.inputType);

  const currentStep = MANUAL_FLOW[manualStep];

  return {
    messages,
    isTyping,
    showSummary,
    userData,
    showInput,
    currentMessage: currentMessage ?? null,
    currentStep,
    handleAnswer,
    handleSkipExperience,
    handleCVUpload,
    handleSkipCV: startManualFlow,
    handleConfirm,
    handleEditField,
  };
}
