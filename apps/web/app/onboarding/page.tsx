"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Upload, ArrowRight, X, Paperclip, Check } from "lucide-react";
import { LogoMark } from "@/components/logo";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  type: "ai" | "user";
  content: string;
  inputType?: "text" | "tags" | "pills" | "cv-upload" | "confirmation";
  options?: string[];
  field?: string;
}

interface UserData {
  name: string;
  role: string;
  skills: string[];
  experience: string;
  workPreference: string;
}

const conversationFlow: Omit<Message, "id">[] = [
  {
    type: "ai",
    content: "Hey there! I'm Kairos, your AI career companion. I'll help you find the right opportunities at the right time.",
  },
  {
    type: "ai",
    content: "Let's get to know each other. What's your name?",
    inputType: "text",
    field: "name",
  },
  {
    type: "ai",
    content: "Nice to meet you, {name}! What do you do? Tell me about your current or most recent role.",
    inputType: "text",
    field: "role",
  },
  {
    type: "ai",
    content: "Got it. Now, what are your key skills? Add as many as you'd like.",
    inputType: "tags",
    field: "skills",
  },
  {
    type: "ai",
    content: "Great skill set! Give me a quick summary of your experience — just a sentence or two is fine.",
    inputType: "text",
    field: "experience",
  },
  {
    type: "ai",
    content: "Last question: do you prefer working remote, hybrid, or on-site?",
    inputType: "pills",
    options: ["Remote", "Hybrid", "On-site"],
    field: "workPreference",
  },
];

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1.5 px-4 py-3">
      <div className="w-2 h-2 rounded-full bg-cyan animate-pulse-dot" />
      <div className="w-2 h-2 rounded-full bg-cyan animate-pulse-dot-delay-1" />
      <div className="w-2 h-2 rounded-full bg-cyan animate-pulse-dot-delay-2" />
    </div>
  );
}

function AIMessage({ content, isNew }: { content: string; isNew?: boolean }) {
  return (
    <div className={cn("flex items-start gap-3 max-w-2xl", isNew && "animate-message-in")}>
      <div className="w-8 h-8 rounded-full bg-panel border border-border-hover flex items-center justify-center shrink-0 mt-0.5">
        <LogoMark className="w-4 h-4" />
      </div>
      <div className="glass-elevated rounded-2xl rounded-tl-sm px-4 py-3">
        <p className="text-[15px] text-text-primary leading-relaxed">{content}</p>
      </div>
    </div>
  );
}

function UserMessage({ content, isNew }: { content: string; isNew?: boolean }) {
  return (
    <div className={cn("flex justify-end", isNew && "animate-message-in")}>
      <div className="bg-accent/10 border border-accent/20 rounded-2xl rounded-tr-sm px-4 py-3 max-w-md">
        <p className="text-[15px] text-text-primary">{content}</p>
      </div>
    </div>
  );
}

function TagsMessage({ tags, isNew }: { tags: string[]; isNew?: boolean }) {
  return (
    <div className={cn("flex justify-end", isNew && "animate-message-in")}>
      <div className="bg-accent/10 border border-accent/20 rounded-2xl rounded-tr-sm px-4 py-3 max-w-md">
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-2.5 py-1 rounded-full bg-accent/20 text-[13px] text-accent"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function TextInput({
  onSubmit,
  placeholder,
}: {
  onSubmit: (value: string) => void;
  placeholder?: string;
}) {
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = () => {
    if (value.trim()) {
      onSubmit(value.trim());
      setValue("");
    }
  };

  return (
    <div className="flex items-center gap-3 p-3 glass-elevated rounded-2xl">
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        placeholder={placeholder || "Type your answer..."}
        className="flex-1 bg-transparent text-[15px] text-text-primary placeholder:text-text-muted focus:outline-none"
      />
      <button
        onClick={handleSubmit}
        disabled={!value.trim()}
        className="w-9 h-9 rounded-full bg-accent text-main flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed transition-smooth hover:bg-accent/90"
      >
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}

function TagsInput({
  onSubmit,
}: {
  onSubmit: (tags: string[]) => void;
}) {
  const [tags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const addTag = () => {
    if (inputValue.trim() && !tags.includes(inputValue.trim())) {
      setTags([...tags, inputValue.trim()]);
      setInputValue("");
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleSubmit = () => {
    if (tags.length > 0) {
      onSubmit(tags);
    }
  };

  return (
    <div className="space-y-3">
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan/10 border border-cyan/20 text-[13px] text-cyan"
            >
              {tag}
              <button onClick={() => removeTag(tag)} className="hover:text-white">
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      )}
      <div className="flex items-center gap-3 p-3 glass-elevated rounded-2xl">
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
          onClick={handleSubmit}
          disabled={tags.length === 0}
          className="px-4 h-9 rounded-full bg-accent text-main text-[13px] font-medium flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed transition-smooth hover:bg-accent/90"
        >
          Done
          <Check className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

function PillsInput({
  options,
  onSubmit,
}: {
  options: string[];
  onSubmit: (value: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onSubmit(option)}
          className="px-5 py-2.5 rounded-full border border-border-hover bg-panel text-[14px] text-text-primary hover:border-accent hover:bg-accent/10 transition-smooth"
        >
          {option}
        </button>
      ))}
    </div>
  );
}

function CVUploadInput({ onUpload, onSkip }: { onUpload: (file: File) => void; onSkip: () => void }) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    onUpload(file);
  };

  return (
    <div className="space-y-4">
      <div
        className={cn(
          "p-8 rounded-2xl border-2 border-dashed text-center transition-smooth cursor-pointer",
          isDragging
            ? "border-accent bg-accent/5"
            : "border-border-hover hover:border-border-glow bg-panel/50"
        )}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          const file = e.dataTransfer.files[0];
          if (file) handleFile(file);
        }}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.doc,.docx"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
          }}
        />
        <Upload className="w-10 h-10 mx-auto mb-4 text-text-secondary" />
        <p className="text-[15px] text-text-primary mb-1">
          Drop your CV here or <span className="text-accent">browse</span>
        </p>
        <p className="text-[13px] text-text-muted">PDF, DOC, or DOCX</p>
      </div>
      <button
        onClick={onSkip}
        className="w-full text-center text-[13px] text-text-secondary hover:text-text-primary transition-smooth"
      >
        Skip — I'll answer the questions instead
      </button>
    </div>
  );
}

function ConfirmationView({
  userData,
  onConfirm,
  onEdit,
}: {
  userData: UserData;
  onConfirm: () => void;
  onEdit: (field: string) => void;
}) {
  return (
    <div className="space-y-4 animate-message-in">
      <div className="glass-elevated rounded-2xl p-5 space-y-4">
        <h3 className="text-[13px] uppercase tracking-wider text-text-muted mb-4">
          Your Profile Summary
        </h3>
        
        <div className="space-y-3">
          <ProfileField label="Name" value={userData.name} onEdit={() => onEdit("name")} />
          <ProfileField label="Role" value={userData.role} onEdit={() => onEdit("role")} />
          <ProfileField 
            label="Skills" 
            value={userData.skills.join(", ")} 
            onEdit={() => onEdit("skills")} 
          />
          <ProfileField label="Experience" value={userData.experience} onEdit={() => onEdit("experience")} />
          <ProfileField label="Work Style" value={userData.workPreference} onEdit={() => onEdit("workPreference")} />
        </div>
      </div>
      
      <button
        onClick={onConfirm}
        className="w-full py-3.5 rounded-xl bg-accent text-main text-[15px] font-medium flex items-center justify-center gap-2 hover:bg-accent/90 transition-smooth glow-accent"
      >
        Looks good, continue
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}

function ProfileField({
  label,
  value,
  onEdit,
}: {
  label: string;
  value: string;
  onEdit: () => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4 py-2 border-b border-border last:border-0">
      <div className="flex-1 min-w-0">
        <p className="text-[11px] uppercase tracking-wider text-text-muted mb-0.5">{label}</p>
        <p className="text-[14px] text-text-primary truncate">{value || "—"}</p>
      </div>
      <button
        onClick={onEdit}
        className="text-[12px] text-cyan hover:text-cyan/80 transition-smooth shrink-0"
      >
        Edit
      </button>
    </div>
  );
}

export default function OnboardingPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [showCVUpload, setShowCVUpload] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [userData, setUserData] = useState<UserData>({
    name: "",
    role: "",
    skills: [],
    experience: "",
    workPreference: "",
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  const addAIMessage = useCallback((messageData: Omit<Message, "id">) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const newMessage: Message = {
        ...messageData,
        id: `msg-${Date.now()}`,
        content: messageData.content
          .replace("{name}", userData.name || "")
          .replace("{role}", userData.role || ""),
      };
      setMessages((prev) => [...prev, newMessage]);
    }, 800 + Math.random() * 400);
  }, [userData]);

  useEffect(() => {
    // Initial greeting
    setTimeout(() => {
      addAIMessage(conversationFlow[0]);
    }, 500);
    
    // Second message with CV upload option
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: "msg-cv-prompt",
          type: "ai",
          content: "Before we start, you can upload your CV and I'll extract your details automatically. Or we can just chat through it.",
          inputType: "cv-upload",
        },
      ]);
    }, 2000);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCVUpload = (file: File) => {
    // Simulate CV parsing
    setMessages((prev) => [
      ...prev,
      {
        id: `user-${Date.now()}`,
        type: "user",
        content: `Uploaded: ${file.name}`,
      },
    ]);

    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      // Simulate extracted data
      const extractedData: UserData = {
        name: "Alex Chen",
        role: "Senior Product Designer",
        skills: ["Figma", "User Research", "Prototyping", "Design Systems", "React"],
        experience: "8 years of product design experience across fintech and SaaS. Led design at two startups from 0 to 1.",
        workPreference: "Remote",
      };
      setUserData(extractedData);
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          type: "ai",
          content: "I've extracted your details from your CV. Let me show you what I found:",
        },
      ]);
      setTimeout(() => {
        setShowConfirmation(true);
      }, 600);
    }, 2000);
  };

  const handleSkipCV = () => {
    // Remove the CV upload message and add the first question
    setMessages((prev) => prev.filter((m) => m.inputType !== "cv-upload"));
    setCurrentStep(1);
    addAIMessage(conversationFlow[1]);
  };

  const handleAnswer = (value: string | string[], field?: string) => {
    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      type: "user",
      content: Array.isArray(value) ? value.join(", ") : value,
    };
    setMessages((prev) => [...prev, userMessage]);

    // Create updated user data for immediate use
    const newUserData = {
      ...userData,
      ...(field ? { [field]: value } : {}),
    };

    // Update user data state
    if (field) {
      setUserData(newUserData);
    }

    // Move to next step
    const nextStep = currentStep + 1;
    if (nextStep < conversationFlow.length) {
      setCurrentStep(nextStep);
      setTimeout(() => {
        // Replace placeholders with the new user data (not stale state)
        const messageData = conversationFlow[nextStep];
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          const newMessage: Message = {
            ...messageData,
            id: `msg-${Date.now()}`,
            content: messageData.content
              .replace("{name}", String(newUserData.name || ""))
              .replace("{role}", String(newUserData.role || "")),
          };
          setMessages((prev) => [...prev, newMessage]);
        }, 800 + Math.random() * 400);
      }, 300);
    } else {
      // Show confirmation
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: `ai-${Date.now()}`,
            type: "ai",
            content: "Here's what I've got. Take a look and let me know if anything needs adjusting:",
          },
        ]);
        setTimeout(() => {
          setShowConfirmation(true);
        }, 600);
      }, 500);
    }
  };

  const handleConfirm = () => {
    router.push("/onboarding/connect");
  };

  const handleEditField = (field: string) => {
    setShowConfirmation(false);
    // Find the step for this field and restart from there
    const stepIndex = conversationFlow.findIndex((msg) => msg.field === field);
    if (stepIndex !== -1) {
      setCurrentStep(stepIndex);
      addAIMessage({
        type: "ai",
        content: `No problem! Let's update your ${field}. ${conversationFlow[stepIndex].content.replace("{name}", userData.name)}`,
        inputType: conversationFlow[stepIndex].inputType,
        options: conversationFlow[stepIndex].options,
        field: conversationFlow[stepIndex].field,
      });
    }
  };

  const currentMessage = messages[messages.length - 1];
  const showInput = currentMessage?.inputType && !showConfirmation && !isTyping;

  return (
    <div className="min-h-screen bg-shell flex flex-col">
      {/* Background gradient */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] radial-cyan opacity-30" />
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-center py-6">
        <div className="flex items-center gap-2">
          <LogoMark className="w-6 h-6" />
          <span className="text-lg font-medium tracking-tight text-text-primary">kairos.</span>
        </div>
      </header>

      {/* Chat area */}
      <main className="relative z-10 flex-1 overflow-y-auto px-4 pb-32">
        <div className="max-w-2xl mx-auto space-y-4 py-6">
          {messages.map((message, index) => (
            <div key={message.id}>
              {message.type === "ai" ? (
                <AIMessage content={message.content} isNew={index === messages.length - 1} />
              ) : Array.isArray(userData.skills) && message.content.includes(",") && messages[index - 1]?.field === "skills" ? (
                <TagsMessage tags={message.content.split(", ")} isNew={index === messages.length - 1} />
              ) : (
                <UserMessage content={message.content} isNew={index === messages.length - 1} />
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-panel border border-border-hover flex items-center justify-center">
                <LogoMark className="w-4 h-4" />
              </div>
              <div className="glass-elevated rounded-2xl rounded-tl-sm">
                <TypingIndicator />
              </div>
            </div>
          )}

          {showConfirmation && (
            <ConfirmationView
              userData={userData}
              onConfirm={handleConfirm}
              onEdit={handleEditField}
            />
          )}

          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Input area */}
      {showInput && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-shell via-shell/95 to-transparent">
          <div className="max-w-2xl mx-auto">
            {currentMessage.inputType === "cv-upload" ? (
              <CVUploadInput onUpload={handleCVUpload} onSkip={handleSkipCV} />
            ) : currentMessage.inputType === "text" ? (
              <TextInput
                onSubmit={(value) => handleAnswer(value, currentMessage.field)}
                placeholder={
                  currentMessage.field === "name"
                    ? "Enter your name..."
                    : currentMessage.field === "role"
                    ? "e.g. Senior Software Engineer"
                    : currentMessage.field === "experience"
                    ? "Tell me about your experience..."
                    : "Type your answer..."
                }
              />
            ) : currentMessage.inputType === "tags" ? (
              <TagsInput
                onSubmit={(tags) => handleAnswer(tags, currentMessage.field)}
              />
            ) : currentMessage.inputType === "pills" ? (
              <PillsInput
                options={currentMessage.options || []}
                onSubmit={(value) => handleAnswer(value, currentMessage.field)}
              />
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}
