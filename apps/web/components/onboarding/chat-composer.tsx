"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { InputType } from "@/lib/onboarding/types";
import type { UserProfile } from "@/lib/onboarding/types";
import { CVUploadZone } from "./cv-upload-zone";

interface ChatComposerProps {
  inputType: InputType;
  field?: keyof UserProfile;
  optional?: boolean;
  onSubmit: (value: string | string[], field?: keyof UserProfile) => void;
  onSkipExperience?: () => void;
  onCVUpload: (file: File) => void;
  onSkipCV: () => void;
}

export function ChatComposer({
  inputType,
  field,
  optional,
  onSubmit,
  onSkipExperience,
  onCVUpload,
  onSkipCV,
}: ChatComposerProps) {
  if (inputType === "cv-upload") {
    return <CVUploadZone onUpload={onCVUpload} onSkip={onSkipCV} />;
  }
  if (inputType === "tags") {
    return <TagsInput onSubmit={(tags) => onSubmit(tags, field)} />;
  }
  return (
    <TextInput
      field={field}
      optional={optional}
      onSubmit={(value) => onSubmit(value, field)}
      onSkip={field === "experience" ? onSkipExperience : undefined}
    />
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
      <div className="flex items-center gap-3 rounded-card bg-surface p-3 shadow-soft">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && value.trim() && onSubmit(value.trim())}
          placeholder={field ? placeholders[field] : "Type your answer..."}
          className="flex-1 bg-transparent text-[15px] text-text-primary placeholder:text-text-muted focus:outline-none"
        />
        <button
          type="button"
          onClick={() => value.trim() && onSubmit(value.trim())}
          disabled={!value.trim()}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-surface transition-opacity hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
      {optional && onSkip && (
        <button
          type="button"
          onClick={onSkip}
          className="rounded-full border border-border bg-surface px-4 py-2 text-[13px] text-text-secondary shadow-soft transition-colors hover:text-text-primary"
        >
          Skip for now
        </button>
      )}
    </div>
  );
}

function TagsInput({ onSubmit }: { onSubmit: (tags: string[]) => void }) {
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

  return (
    <div className="space-y-3">
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5 text-[13px] text-text-secondary shadow-soft"
            >
              {tag}
              <button
                type="button"
                onClick={() => setTags(tags.filter((t) => t !== tag))}
                className="hover:text-text-primary"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      )}
      <div className="flex items-center gap-3 rounded-card bg-surface p-3 shadow-soft">
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
          placeholder="Type a skill and press Enter..."
          className="flex-1 bg-transparent text-[15px] text-text-primary placeholder:text-text-muted focus:outline-none"
        />
        <button
          type="button"
          onClick={() => tags.length > 0 && onSubmit(tags)}
          disabled={tags.length === 0}
          className={cn(
            "flex h-9 items-center gap-2 rounded-full bg-accent px-4 text-[13px] font-medium text-surface",
            "transition-opacity hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-40"
          )}
        >
          Done
          <Check className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
