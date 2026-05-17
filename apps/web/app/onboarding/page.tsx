"use client";

import { useEffect, useRef } from "react";
import { Logo, LogoMark } from "@/components/logo";
import {
  AIMessage,
  TagsMessage,
  TypingIndicator,
  UserMessage,
} from "@/components/onboarding/chat-bubble";
import { ChatComposer } from "@/components/onboarding/chat-composer";
import { ProfileSummary } from "@/components/onboarding/profile-summary";
import { IconWell } from "@/components/ui/icon-well";
import { useOnboardingChat } from "@/hooks/use-onboarding-chat";
import type { ChatMessage } from "@/lib/onboarding/types";

export default function OnboardingPage() {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chat = useOnboardingChat();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat.messages, chat.isTyping, chat.showSummary]);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="relative z-10 border-b border-border bg-[var(--bg-elevated)] px-4 py-5">
        <div className="mx-auto flex max-w-2xl justify-center">
          <Logo />
        </div>
      </header>

      <main className="relative z-10 flex-1 overflow-y-auto bg-background px-4 pb-36">
        <div className="mx-auto max-w-2xl space-y-4 py-6">
          {chat.messages.map((message, index) => (
            <MessageRow
              key={message.id}
              message={message}
              prev={chat.messages[index - 1]}
            />
          ))}

          {chat.isTyping && <TypingRow />}

          {chat.showSummary && (
            <ProfileSummary
              userData={chat.userData}
              onConfirm={chat.handleConfirm}
              onEdit={chat.handleEditField}
            />
          )}

          <div ref={messagesEndRef} />
        </div>
      </main>

      {chat.showInput && chat.currentMessage?.inputType && (
        <div className="fixed bottom-0 left-0 right-0 z-20 p-4">
          <div className="mx-auto max-w-2xl rounded-[16px] border border-border bg-[var(--bg-elevated)] p-4 shadow-elevated">
            <ChatComposer
              inputType={chat.currentMessage.inputType}
              field={chat.currentMessage.field}
              optional={chat.currentStep?.optional}
              onSubmit={chat.handleAnswer}
              onSkipStep={chat.handleSkipStep}
              onCVUpload={chat.handleCVUpload}
              onSkipCV={chat.handleSkipCV}
              onRetry={chat.handleRetrySubmit}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function MessageRow({
  message,
  prev,
}: {
  message: ChatMessage;
  prev?: ChatMessage;
}) {
  const isTags =
    message.type === "user" &&
    (prev?.field === "skills" ||
      prev?.field === "projects" ||
      prev?.field === "references") &&
    message.content.includes(",");

  if (message.type === "ai") {
    return <AIMessage content={message.content} isNew={message.isNew} />;
  }
  if (isTags) {
    return (
      <TagsMessage tags={message.content.split(", ")} isNew={message.isNew} />
    );
  }
  return <UserMessage content={message.content} isNew={message.isNew} />;
}

function TypingRow() {
  return (
    <div className="flex items-start gap-3">
      <IconWell size="sm" className="mt-0.5 bg-primary">
        <LogoMark className="h-4 w-4 text-on-primary" />
      </IconWell>
      <div className="rounded-[14px] border border-border bg-surface">
        <TypingIndicator />
      </div>
    </div>
  );
}
