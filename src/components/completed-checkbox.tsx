"use client";

import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useProgressStore } from "@/stores/progress-store";

interface CompletedCheckboxProps {
  questionId: number;
  size?: "sm" | "md";
  className?: string;
}

export function CompletedCheckbox({
  questionId,
  size = "md",
  className,
}: CompletedCheckboxProps) {
  const [mounted, setMounted] = useState(false);

  const isCompleted = useProgressStore(
    (state) => state.completed[questionId] === true,
  );
  const toggleCompleted = useProgressStore((state) => state.toggleCompleted);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleCompleted(questionId);
  };

  const sizeClasses = {
    sm: "h-5 w-5",
    md: "h-6 w-6",
  };

  const iconSizeClasses = {
    sm: "h-3 w-3",
    md: "h-3.5 w-3.5",
  };

  if (!mounted) {
    return (
      <div
        className={cn(
          "shrink-0 rounded-full bg-muted animate-pulse",
          sizeClasses[size],
          className,
        )}
      />
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={isCompleted ? "Mark as incomplete" : "Mark as completed"}
      aria-pressed={isCompleted}
      className={cn(
        "group/check shrink-0 rounded-full border-2 flex items-center justify-center transition-all duration-200",
        sizeClasses[size],
        isCompleted
          ? "border-easy bg-easy text-white"
          : "border-border bg-transparent text-transparent hover:border-easy/50 hover:bg-easy/10 hover:text-easy/50",
        className,
      )}
    >
      {isCompleted ? (
        <Check className={cn(iconSizeClasses[size], "stroke-3")} />
      ) : (
        <Check
          className={cn(
            iconSizeClasses[size],
            "stroke-2 opacity-0 group-hover/check:opacity-100 transition-opacity",
          )}
        />
      )}
    </button>
  );
}

export function CompletionButton({
  questionId,
  className,
}: {
  questionId: number;
  className?: string;
}) {
  const [mounted, setMounted] = useState(false);

  const isCompleted = useProgressStore(
    (state) => state.completed[questionId] === true,
  );
  const toggleCompleted = useProgressStore((state) => state.toggleCompleted);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className={cn("h-10 w-40 animate-pulse rounded-lg bg-muted", className)}
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => toggleCompleted(questionId)}
      className={cn(
        "inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 active:scale-[0.98]",
        isCompleted
          ? "bg-easy/15 text-easy border border-easy/30 hover:bg-easy/20"
          : "bg-muted text-muted-foreground border border-border hover:bg-muted/80 hover:text-foreground",
        className,
      )}
    >
      <div
        className={cn(
          "flex h-5 w-5 items-center justify-center rounded-full border-2 transition-all",
          isCompleted
            ? "border-easy bg-easy text-white"
            : "border-current bg-transparent",
        )}
      >
        {isCompleted && <Check className="h-3 w-3 stroke-3" />}
      </div>
      {isCompleted ? "Completed" : "Mark Complete"}
    </button>
  );
}
