"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check, RefreshCw, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { InputType } from "@/lib/onboarding/types";
import type { UserProfile } from "@/lib/onboarding/types";
import { CVUploadZone } from "./cv-upload-zone";

interface ChatComposerProps {
  inputType: InputType;
  field?: keyof UserProfile;
  optional?: boolean;
  onSubmit: (value: string | string[], field?: keyof UserProfile) => void;
  onSkipStep?: () => void;
  onCVUpload: (file: File) => void;
  onSkipCV: () => void;
  onRetry?: () => void;
}

export function ChatComposer({
  inputType,
  field,
  optional,
  onSubmit,
  onSkipStep,
  onCVUpload,
  onSkipCV,
  onRetry,
}: ChatComposerProps) {
  if (inputType === "cv-upload") {
    return <CVUploadZone onUpload={onCVUpload} onSkip={onSkipCV} />;
  }
  if (inputType === "retry") {
    return <RetryButton onRetry={onRetry ?? (() => {})} />;
  }
  if (inputType === "tags") {
    return (
      <TagsInput
        field={field}
        optional={optional}
        onSubmit={(tags) => onSubmit(tags, field)}
        onSkip={optional ? onSkipStep : undefined}
      />
    );
  }
  return (
    <TextInput
      field={field}
      optional={optional}
      onSubmit={(value) => onSubmit(value, field)}
      onSkip={optional ? onSkipStep : undefined}
    />
  );
}

function RetryButton({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex justify-end">
      <Button type="button" onClick={onRetry} className="gap-2">
        <RefreshCw className="h-4 w-4" />
        Try again
      </Button>
    </div>
  );
}

function TextInput({
  field,
  optional,
  onSubmit,
  onSkip,
}: {
  field?: keyof UserProfile;
  optional?: boolean;
  onSubmit: (value: string) => void;
  onSkip?: () => void;
}) {
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const placeholders: Partial<Record<keyof UserProfile, string>> = {
    name: "Enter your name...",
    role: "e.g. Product Designer, Software Engineer",
    experience: "A quick summary of your experience...",
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-3 rounded-lg bg-muted p-3">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && value.trim() && onSubmit(value.trim())}
          placeholder={field ? placeholders[field] : "Type your answer..."}
          className="flex-1 bg-transparent text-[15px] text-foreground placeholder:text-muted-foreground focus:outline-none"
        />
        <Button
          type="button"
          size="icon"
          className="h-10 w-10 shrink-0"
          onClick={() => value.trim() && onSubmit(value.trim())}
          disabled={!value.trim()}
          aria-label="Send"
        >
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
      {optional && onSkip && (
        <Button type="button" variant="ghost" size="sm" onClick={onSkip} className="text-muted-foreground">
          Skip for now
        </Button>
      )}
    </div>
  );
}

function TagsInput({
  field,
  optional,
  onSubmit,
  onSkip,
}: {
  field?: keyof UserProfile;
  optional?: boolean;
  onSubmit: (tags: string[]) => void;
  onSkip?: () => void;
}) {
  const [tags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const addTag = () => {
    const trimmed = inputValue.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
      setInputValue("");
    }
  };

  const placeholders: Partial<Record<keyof UserProfile, string>> = {
    skills: "Type a skill and press Enter...",
    projects: "Type a project name and press Enter...",
    references: "Type a name (e.g. Sam Lee, Engineering Manager)...",
  };

  return (
    <div className="space-y-3">
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1.5 rounded-md bg-background px-3 py-1.5 text-[13px] font-medium text-muted-foreground ring-1 ring-border"
            >
              {tag}
              <button
                type="button"
                onClick={() => setTags(tags.filter((t) => t !== tag))}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      )}
      <div className="flex items-center gap-3 rounded-lg bg-muted p-3">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addTag();
            }
          }}
          placeholder={
            (field && placeholders[field]) ?? "Type a value and press Enter..."
          }
          className="flex-1 bg-transparent text-[15px] text-foreground placeholder:text-muted-foreground focus:outline-none"
        />
        <Button
          type="button"
          size="sm"
          onClick={() => tags.length > 0 && onSubmit(tags)}
          disabled={tags.length === 0}
          className="shrink-0 gap-2"
        >
          Done
          <Check className="h-3.5 w-3.5" />
        </Button>
      </div>
      {optional && onSkip && (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onSkip}
          className="text-muted-foreground"
        >
          Skip for now
        </Button>
      )}
    </div>
  );
}
