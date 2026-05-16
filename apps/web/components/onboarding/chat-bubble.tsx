"use client";

import { LogoMark } from "@/components/logo";
import { IconWell } from "@/components/ui/icon-well";
import { cn } from "@/lib/utils";

export function TypingIndicator() {
  return (
    <div className="flex items-center gap-1.5 px-4 py-3">
      <div className="h-2 w-2 rounded-full bg-primary animate-pulse-dot" />
      <div className="h-2 w-2 rounded-full bg-primary animate-pulse-dot-delay-1" />
      <div className="h-2 w-2 rounded-full bg-primary animate-pulse-dot-delay-2" />
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
      <IconWell size="sm" className="mt-0.5 bg-muted">
        <LogoMark className="h-4 w-4" />
      </IconWell>
      <div className="rounded-lg bg-muted px-4 py-3">
        <p className="text-[15px] leading-relaxed text-foreground">{content}</p>
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
      <div className="max-w-md rounded-lg bg-primary px-4 py-3">
        <p className="text-[15px] text-white">{content}</p>
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
      <div className="max-w-md rounded-lg bg-primary px-4 py-3">
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex rounded-md bg-white/20 px-2.5 py-1 text-[13px] font-medium text-white"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
