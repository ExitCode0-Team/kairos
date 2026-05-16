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
      <header className="relative z-10 flex items-center justify-center py-6">
        <Logo />
      </header>

      <main className="relative z-10 flex-1 overflow-y-auto px-4 pb-36">
        <div className="mx-auto max-w-2xl space-y-4 py-6">
          {chat.messages.map((message, index) => (
            <MessageRow
              key={message.id}
              message={message}
              prev={chat.messages[index - 1]}
            />
          ))}

          {chat.isTyping && (
            <TypingRow />
          )}

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
        <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-background via-background/95 to-transparent p-4">
          <div className="mx-auto max-w-2xl">
            <ChatComposer
              inputType={chat.currentMessage.inputType}
              field={chat.currentMessage.field}
              optional={chat.currentStep?.optional}
              onSubmit={chat.handleAnswer}
              onSkipExperience={chat.handleSkipExperience}
              onCVUpload={chat.handleCVUpload}
              onSkipCV={chat.handleSkipCV}
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
    prev?.field === "skills" &&
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
      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface shadow-soft">
        <LogoMark className="h-4 w-4" />
      </div>
      <div className="rounded-card rounded-tl-sm bg-surface shadow-soft">
        <TypingIndicator />
      </div>
    </div>
  );
}
