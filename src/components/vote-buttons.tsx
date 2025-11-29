"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useVoteStore } from "@/stores/vote-store";

interface VoteButtonsProps {
  questionId: number;
  baseVotes: number;
  orientation?: "vertical" | "horizontal";
}

export function VoteButtons({
  questionId,
  baseVotes,
  orientation = "vertical",
}: VoteButtonsProps) {
  const [mounted, setMounted] = useState(false);

  // Subscribe to the specific vote state for this question
  const voteState = useVoteStore((state) => state.votes[questionId] ?? null);
  const upvote = useVoteStore((state) => state.upvote);
  const downvote = useVoteStore((state) => state.downvote);

  // Calculate adjusted votes based on vote state
  const voteAdjustment = voteState === "up" ? 1 : voteState === "down" ? -1 : 0;
  const adjustedVotes = baseVotes + voteAdjustment;

  // Handle hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className={cn(
          "flex items-center gap-1",
          orientation === "vertical" ? "flex-col" : "flex-row",
        )}
      >
        <div className="h-8 w-8 animate-pulse rounded-lg bg-muted" />
        <div className="h-6 w-8 animate-pulse rounded bg-muted" />
        <div className="h-8 w-8 animate-pulse rounded-lg bg-muted" />
      </div>
    );
  }

  const isVertical = orientation === "vertical";

  return (
    <div
      className={cn(
        "flex items-center",
        isVertical ? "flex-col gap-0.5" : "flex-row gap-2",
      )}
    >
      {/* Upvote Button */}
      <button
        type="button"
        onClick={() => upvote(questionId)}
        aria-label="Upvote"
        aria-pressed={voteState === "up"}
        className={cn(
          "group flex items-center justify-center rounded-lg p-1.5 transition-all duration-200",
          "hover:bg-easy/10 active:scale-90",
          voteState === "up"
            ? "bg-easy/15 text-easy"
            : "text-muted-foreground hover:text-easy",
        )}
      >
        <ChevronUp
          className={cn(
            "h-5 w-5 transition-transform",
            voteState === "up" && "scale-110",
          )}
          strokeWidth={voteState === "up" ? 3 : 2}
        />
      </button>

      {/* Vote Count */}
      <span
        className={cn(
          "min-w-[2.5rem] text-center text-sm font-bold tabular-nums transition-colors duration-200",
          isVertical ? "py-0.5" : "px-1",
          voteState === "up" && "text-easy",
          voteState === "down" && "text-hard",
          voteState === null && "text-foreground",
        )}
      >
        {adjustedVotes >= 0 ? `+${adjustedVotes}` : adjustedVotes}
      </span>

      {/* Downvote Button */}
      <button
        type="button"
        onClick={() => downvote(questionId)}
        aria-label="Downvote"
        aria-pressed={voteState === "down"}
        className={cn(
          "group flex items-center justify-center rounded-lg p-1.5 transition-all duration-200",
          "hover:bg-hard/10 active:scale-90",
          voteState === "down"
            ? "bg-hard/15 text-hard"
            : "text-muted-foreground hover:text-hard",
        )}
      >
        <ChevronDown
          className={cn(
            "h-5 w-5 transition-transform",
            voteState === "down" && "scale-110",
          )}
          strokeWidth={voteState === "down" ? 3 : 2}
        />
      </button>
    </div>
  );
}
