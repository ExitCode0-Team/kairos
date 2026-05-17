"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useJobPreferences } from "@/hooks/use-job-preferences";
import { cn } from "@/lib/utils";

type JobPreferencesEditorProps = {
  layout?: "header" | "inline";
};

export function JobPreferencesEditor({ layout = "header" }: JobPreferencesEditorProps) {
  const [isAdding, setIsAdding] = useState(false);
  const {
    selectedTags,
    availableTags,
    addTag,
    removeTag,
    atMax,
    hydrated,
    maxPreferences,
  } = useJobPreferences();

  if (!hydrated) {
    return (
      <p className="text-body-sm text-muted-foreground">Loading preferences…</p>
    );
  }

  const addButtonLabel =
    selectedTags.length === 0 ? "Add preferences" : "Add or change";

  const handleAddTag = (id: Parameters<typeof addTag>[0]) => {
    addTag(id);
    if (selectedTags.length + 1 >= maxPreferences) {
      setIsAdding(false);
    }
  };

  const toggleAdding = () => setIsAdding((open) => !open);
  const addDisabled = !isAdding && atMax && selectedTags.length > 0;

  const headerButtonLabel = isAdding
    ? "Done"
    : atMax && selectedTags.length > 0
      ? `Maximum ${maxPreferences}`
      : addButtonLabel;

  const inlineButtonLabel = isAdding ? "Done" : `+ ${addButtonLabel}`;

  const tagPills = selectedTags.map((tag) => (
    <span
      key={tag.id}
      className="inline-flex items-center gap-1.5 rounded-md bg-primary/15 px-2.5 py-1 text-[13px] font-semibold text-primary"
    >
      {tag.label}
      <button
        type="button"
        onClick={() => removeTag(tag.id)}
        className="flex h-5 w-5 items-center justify-center rounded-md text-primary transition-colors hover:bg-primary/25"
        aria-label={`Remove ${tag.label}`}
      >
        <X className="h-3 w-3" />
      </button>
    </span>
  ));

  const poolPanel = isAdding ? (
    <div className="space-y-3 rounded-lg border border-border bg-muted/30 p-4">
      <p className="text-label">Choose from the list</p>
      {atMax ? (
        <p className="text-body-sm text-muted-foreground">
          Up to {maxPreferences} preferences — remove one to add another.
        </p>
      ) : availableTags.length === 0 ? (
        <p className="text-body-sm text-muted-foreground">
          All available tags are selected.
        </p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {availableTags.map((tag) => (
            <button
              key={tag.id}
              type="button"
              onClick={() => handleAddTag(tag.id)}
              className={cn(
                "rounded-md border border-border bg-background px-3 py-1.5 text-[13px] font-medium text-foreground transition-colors",
                "hover:border-primary/30 hover:bg-muted"
              )}
            >
              + {tag.label}
            </button>
          ))}
        </div>
      )}
    </div>
  ) : null;

  if (layout === "inline") {
    return (
      <div className="space-y-3">
        <p className="text-label">Job preferences</p>
        <div className="flex flex-wrap items-center gap-2">
          {tagPills}
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="shrink-0 gap-1 border-border text-muted-foreground hover:text-foreground"
            onClick={toggleAdding}
            disabled={addDisabled}
          >
            {!isAdding && <Plus className="h-3.5 w-3.5" />}
            {inlineButtonLabel}
          </Button>
        </div>
        {selectedTags.length === 0 && !isAdding ? (
          <p className="text-body-sm text-muted-foreground">
            No job preferences yet. Add tags so Kairos can surface better matches.
          </p>
        ) : null}
        {poolPanel}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <p className="text-label">Job preferences</p>
        <Button
          type="button"
          variant="default"
          size="sm"
          className="shrink-0 gap-1.5"
          onClick={toggleAdding}
          disabled={addDisabled}
        >
          {!isAdding && <Plus className="h-3.5 w-3.5" />}
          {headerButtonLabel}
        </Button>
      </div>

      <div>
        {selectedTags.length === 0 ? (
          <p className="text-body-sm text-muted-foreground">
            No job preferences yet. Add tags so Kairos can surface better matches.
          </p>
        ) : (
          <div className="flex flex-wrap gap-2">{tagPills}</div>
        )}
      </div>

      {poolPanel}
    </div>
  );
}
