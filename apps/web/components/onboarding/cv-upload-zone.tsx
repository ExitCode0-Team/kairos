"use client";

import { useRef, useState } from "react";
import { Upload } from "lucide-react";
import { cn } from "@/lib/utils";

interface CVUploadZoneProps {
  onUpload: (file: File) => void;
  onSkip: () => void;
}

export function CVUploadZone({ onUpload, onSkip }: CVUploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    onUpload(file);
  };

  return (
    <div className="animate-drop-in space-y-4">
      <DropZone
        isDragging={isDragging}
        setIsDragging={setIsDragging}
        fileInputRef={fileInputRef}
        onFile={handleFile}
      />
      <button
        type="button"
        onClick={onSkip}
        className="w-full text-center text-[13px] text-text-secondary transition-colors hover:text-text-primary"
      >
        Skip — I&apos;ll answer the questions instead
      </button>
    </div>
  );
}

function DropZone({
  isDragging,
  setIsDragging,
  fileInputRef,
  onFile,
}: {
  isDragging: boolean;
  setIsDragging: (v: boolean) => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  onFile: (file: File) => void;
}) {
  return (
    <div
      className={cn(
        "cursor-pointer rounded-card border-2 border-dashed p-8 text-center transition-all duration-300",
        isDragging
          ? "border-accent bg-accent/5 shadow-soft"
          : "border-border bg-surface/80 hover:border-accent/40 hover:shadow-soft"
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
        if (file) onFile(file);
      }}
      onClick={() => fileInputRef.current?.click()}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") fileInputRef.current?.click();
      }}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.doc,.docx"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onFile(file);
        }}
      />
      <Upload className="mx-auto mb-4 h-10 w-10 text-text-secondary" />
      <p className="mb-1 text-[15px] text-text-primary">
        Drop your CV here or <span className="text-accent">browse</span>
      </p>
      <p className="text-[13px] text-text-muted">PDF, DOC, or DOCX</p>
    </div>
  );
}
