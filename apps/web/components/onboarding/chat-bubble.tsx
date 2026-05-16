"use client";

import { LogoMark } from "@/components/logo";
import { cn } from "@/lib/utils";

export function TypingIndicator() {
  return (
    <div className="flex items-center gap-1.5 px-4 py-3">
      <div className="h-2 w-2 rounded-full bg-accent animate-pulse-dot" />
      <div className="h-2 w-2 rounded-full bg-accent animate-pulse-dot-delay-1" />
      <div className="h-2 w-2 rounded-full bg-accent animate-pulse-dot-delay-2" />
    </div>
  );
}

export function AIMessage({
  content,
  isNew,
}: {
  content: string;
  isNew?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex max-w-2xl items-start gap-3",
        isNew && "animate-message-in"
      )}
    >
      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface shadow-soft">
        <LogoMark className="h-4 w-4" />
      </div>
      <div className="rounded-card rounded-tl-sm bg-surface px-4 py-3 shadow-soft">
        <p className="text-[15px] leading-relaxed text-text-primary">{content}</p>
      </div>
    </div>
  );
}

export function UserMessage({
  content,
  isNew,
}: {
  content: string;
  isNew?: boolean;
}) {
  return (
    <div className={cn("flex justify-end", isNew && "animate-message-in")}>
      <div className="max-w-md rounded-card rounded-tr-sm bg-user-bubble px-4 py-3 shadow-soft">
        <p className="text-[15px] text-text-primary">{content}</p>
      </div>
    </div>
  );
}

export function TagsMessage({
  tags,
  isNew,
}: {
  tags: string[];
  isNew?: boolean;
}) {
  return (
    <div className={cn("flex justify-end", isNew && "animate-message-in")}>
      <div className="max-w-md rounded-card rounded-tr-sm bg-user-bubble px-4 py-3 shadow-soft">
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex rounded-full bg-sand/80 px-2.5 py-1 text-[13px] text-text-secondary"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
