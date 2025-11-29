"use client";

import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useBookmarkStore } from "@/stores/bookmark-store";
import { Button } from "./ui/button";

interface BookmarkButtonProps {
  questionId: number;
  size?: "sm" | "md";
  className?: string;
}

export function BookmarkButton({
  questionId,
  size = "md",
  className,
}: BookmarkButtonProps) {
  const [mounted, setMounted] = useState(false);

  const isBookmarked = useBookmarkStore(
    (state) => state.bookmarks[questionId] === true,
  );
  const toggleBookmark = useBookmarkStore((state) => state.toggleBookmark);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleBookmark(questionId);
  };

  const sizeClasses = {
    sm: "h-5 w-5",
    md: "h-6 w-6",
  };

  const iconSizeClasses = {
    sm: "h-3.5 w-3.5",
    md: "h-6 w-6",
  };

  if (!mounted) {
    return (
      <div
        className={cn(
          "shrink-0 rounded bg-muted animate-pulse",
          sizeClasses[size],
          className,
        )}
      />
    );
  }

  return (
    <Button
      onClick={handleClick}
      aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
      aria-pressed={isBookmarked}
      className={cn(
        isBookmarked
          ? "text-yellow-500 hover:text-yellow-600"
          : "text-muted-foreground hover:text-yellow-500/70",
        className,
      )}
      variant={"ghost"}
    >
      <Star
        className={cn(
          iconSizeClasses[size],
          isBookmarked ? "fill-current" : "fill-none",
          "transition-all duration-200",
        )}
        strokeWidth={isBookmarked ? 0 : 2}
      />
    </Button>
  );
}
