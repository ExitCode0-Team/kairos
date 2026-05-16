"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { X, Upload, ArrowRight } from "lucide-react";
import { LogoMark } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface Question {
  id: string;
  text: string;
  type: "text" | "tags" | "pills";
  placeholder?: string;
  options?: string[];
}

const questions: Question[] = [
  {
    id: "name",
    text: "What's your name?",
    type: "text",
    placeholder: "Enter your name",
  },
  {
    id: "role",
    text: "What's your current role?",
    type: "text",
    placeholder: "e.g. Senior Software Engineer",
  },
  {
    id: "skills",
    text: "What skills do you bring?",
    type: "tags",
    placeholder: "Type a skill and press enter",
  },
  {
    id: "targetRoles",
    text: "What kind of roles are you targeting?",
    type: "tags",
    placeholder: "Type a role and press enter",
  },
  {
    id: "workPreference",
    text: "Do you prefer remote, hybrid, or on-site?",
    type: "pills",
    options: ["Remote", "Hybrid", "On-site"],
  },
];

function ProgressDots({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "w-2 h-2 rounded-full transition-colors",
            i === current ? "bg-accent" : "bg-border"
          )}
        />
      ))}
    </div>
  );
}

function TagInput({
  tags,
  onTagsChange,
  placeholder,
}: {
  tags: string[];
  onTagsChange: (tags: string[]) => void;
  placeholder?: string;
}) {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      if (!tags.includes(inputValue.trim())) {
        onTagsChange([...tags, inputValue.trim()]);
      }
      setInputValue("");
    } else if (e.key === "Backspace" && !inputValue && tags.length > 0) {
      onTagsChange(tags.slice(0, -1));
    }
  };

  const removeTag = (tagToRemove: string) => {
    onTagsChange(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-[6px] bg-panel border border-border text-[13px] text-text-primary"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="text-text-secondary hover:text-text-primary"
            >
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
      </div>
      <Input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="max-w-md"
      />
    </div>
  );
}

function PillSelect({
  options,
  selected,
  onSelect,
}: {
  options: string[];
  selected: string | null;
  onSelect: (option: string) => void;
}) {
  return (
    <div className="flex gap-3">
      {options.map((option) => (
        <Button
          key={option}
          variant="pill"
          size="pill"
          data-selected={selected === option}
          onClick={() => onSelect(option)}
        >
          {option}
        </Button>
      ))}
    </div>
  );
}

function CVUploadZone({ onUpload }: { onUpload: () => void }) {
  const [isDragging, setIsDragging] = useState(false);

  return (
    <div
      className={cn(
        "mt-8 p-8 border border-dashed rounded-[10px] text-center transition-colors",
        isDragging ? "border-accent bg-accent/5" : "border-border-hover"
      )}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setIsDragging(false);
        onUpload();
      }}
    >
      <Upload className="w-8 h-8 mx-auto mb-3 text-text-secondary" />
      <p className="text-[14px] text-text-primary mb-1">
        Drop your CV here or{" "}
        <button
          type="button"
          onClick={onUpload}
          className="text-accent hover:underline"
        >
          browse
        </button>
      </p>
      <p className="text-[12px] text-text-secondary">PDF, DOC, or DOCX</p>
    </div>
  );
}

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [showUpload, setShowUpload] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const currentQuestion = questions[currentStep];
  const currentAnswer = answers[currentQuestion.id];

  const hasAnswer = useCallback(() => {
    if (!currentAnswer) return false;
    if (Array.isArray(currentAnswer)) return currentAnswer.length > 0;
    return currentAnswer.trim().length > 0;
  }, [currentAnswer]);

  const handleContinue = () => {
    if (!hasAnswer()) return;

    if (currentStep < questions.length - 1) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
        setIsTransitioning(false);
      }, 200);
    } else {
      router.push("/onboarding/connect");
    }
  };

  const handleSkipWithCV = () => {
    setShowUpload(true);
  };

  const handleCVUpload = () => {
    // Simulate CV parsing
    router.push("/onboarding/connect");
  };

  const updateAnswer = (value: string | string[]) => {
    setAnswers({ ...answers, [currentQuestion.id]: value });
  };

  return (
    <div className="min-h-screen bg-shell flex flex-col">
      {/* Progress */}
      <div className="flex justify-center pt-8">
        <ProgressDots current={currentStep} total={questions.length} />
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div
          className={cn(
            "w-full max-w-xl transition-all duration-200",
            isTransitioning ? "opacity-0 -translate-y-4" : "opacity-100 translate-y-0"
          )}
        >
          {showUpload ? (
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <LogoMark className="w-8 h-8" />
              </div>
              <h2 className="text-[18px] font-medium text-text-primary mb-2">
                Upload your CV
              </h2>
              <p className="text-[13px] text-text-secondary mb-6">
                {"We'll extract your information automatically"}
              </p>
              <CVUploadZone onUpload={handleCVUpload} />
              <Button
                variant="ghost"
                className="mt-4 text-text-secondary"
                onClick={() => setShowUpload(false)}
              >
                Go back to questions
              </Button>
            </div>
          ) : (
            <>
              {/* Question */}
              <div className="flex items-start gap-4 mb-8">
                <LogoMark className="w-6 h-6 mt-1 shrink-0" />
                <h2 className="text-[20px] font-medium text-text-primary leading-snug">
                  {currentQuestion.text}
                </h2>
              </div>

              {/* Input */}
              <div className="pl-10">
                {currentQuestion.type === "text" && (
                  <Input
                    value={(currentAnswer as string) || ""}
                    onChange={(e) => updateAnswer(e.target.value)}
                    placeholder={currentQuestion.placeholder}
                    className="max-w-md"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && hasAnswer()) {
                        handleContinue();
                      }
                    }}
                    autoFocus
                  />
                )}

                {currentQuestion.type === "tags" && (
                  <TagInput
                    tags={(currentAnswer as string[]) || []}
                    onTagsChange={updateAnswer}
                    placeholder={currentQuestion.placeholder}
                  />
                )}

                {currentQuestion.type === "pills" && (
                  <PillSelect
                    options={currentQuestion.options || []}
                    selected={(currentAnswer as string) || null}
                    onSelect={updateAnswer}
                  />
                )}

                {/* Continue button */}
                <div className="mt-8">
                  <Button
                    onClick={handleContinue}
                    disabled={!hasAnswer()}
                    className="gap-2"
                  >
                    Continue
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Skip option */}
      {!showUpload && (
        <div className="pb-8 text-center">
          <button
            type="button"
            onClick={handleSkipWithCV}
            className="text-[13px] text-text-secondary hover:text-text-primary transition-colors"
          >
            Skip — upload my CV instead
          </button>
        </div>
      )}
    </div>
  );
}
