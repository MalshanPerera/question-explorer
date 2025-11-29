"use client";

import { ArrowRight, Building2, ThumbsDown, ThumbsUp } from "lucide-react";
import Link from "next/link";
import { CompletedCheckbox } from "@/components/completed-checkbox";
import { Badge } from "@/components/ui/badge";
import { cn, formatVotes, getDifficultyColor, getTypeColor } from "@/lib/utils";
import { useProgressStore } from "@/stores/progress-store";
import { useVoteStore } from "@/stores/vote-store";
import type { Question } from "@/types/question";
import { DIFFICULTY_LABELS } from "@/types/question";

interface QuestionRowProps {
  question: Question;
}

export function QuestionRow({ question }: QuestionRowProps) {
  const difficultyColors = getDifficultyColor(question.difficulty);
  const typeColors = getTypeColor(question.type);

  // Subscribe to the specific vote state for this question
  const voteState = useVoteStore((state) => state.votes[question.id] ?? null);
  const voteAdjustment = voteState === "up" ? 1 : voteState === "down" ? -1 : 0;
  const adjustedVotes = question.votes + voteAdjustment;

  // Subscribe to completion state
  const isCompleted = useProgressStore(
    (state) => state.completed[question.id] === true,
  );

  return (
    <Link
      href={`/questions/${question.id}`}
      className={cn(
        "card-hover group relative block rounded-xl border border-border/60 bg-card p-5 transition-all",
        "hover:border-primary/30 hover:bg-accent/30",
        isCompleted && "bg-easy/5 border-easy/20 hover:bg-easy/10",
      )}
    >
      {/* Mobile Layout */}
      <div className="flex flex-col gap-4 lg:hidden">
        <div className="flex items-start gap-3">
          <CompletedCheckbox questionId={question.id} size="sm" />
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3">
              <h3
                className={cn(
                  "font-semibold leading-snug transition-colors",
                  isCompleted
                    ? "text-muted-foreground"
                    : "text-foreground group-hover:text-primary",
                )}
              >
                {question.title}
              </h3>
              <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-0.5" />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 pl-8">
          <Badge
            variant="outline"
            className={cn(
              "font-medium",
              difficultyColors.bg,
              difficultyColors.text,
              difficultyColors.border,
            )}
          >
            {DIFFICULTY_LABELS[question.difficulty]}
          </Badge>
          <Badge
            variant="outline"
            className={cn(
              "font-medium",
              typeColors.bg,
              typeColors.text,
              typeColors.border,
              question.type === "sql" ? "uppercase" : "capitalize",
            )}
          >
            {question.type}
          </Badge>
        </div>

        <div className="flex items-center justify-between text-sm pl-8">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Building2 className="h-3.5 w-3.5" />
            <span className="truncate max-w-[200px]">{question.company}</span>
          </div>
          <div
            className={cn(
              "flex items-center gap-1 font-medium tabular-nums",
              adjustedVotes >= 0 ? "text-easy" : "text-hard",
            )}
          >
            {adjustedVotes >= 0 ? (
              <ThumbsUp className="h-3.5 w-3.5" />
            ) : (
              <ThumbsDown className="h-3.5 w-3.5" />
            )}
            {formatVotes(adjustedVotes)}
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:grid lg:grid-cols-[24px_1fr_90px_140px_70px_220px] lg:items-center lg:gap-4">
        <CompletedCheckbox questionId={question.id} size="sm" />
        <div className="flex items-center gap-3 min-w-0">
          <h3
            className={cn(
              "font-semibold truncate transition-colors",
              isCompleted
                ? "text-muted-foreground"
                : "text-foreground group-hover:text-primary",
            )}
          >
            {question.title}
          </h3>
          <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-0.5" />
        </div>
        <Badge
          variant="outline"
          className={cn(
            "justify-center font-medium",
            difficultyColors.bg,
            difficultyColors.text,
            difficultyColors.border,
          )}
        >
          {DIFFICULTY_LABELS[question.difficulty]}
        </Badge>
        <Badge
          variant="outline"
          className={cn(
            "justify-center font-medium",
            typeColors.bg,
            typeColors.text,
            typeColors.border,
            question.type === "sql" ? "uppercase" : "capitalize",
          )}
        >
          {question.type}
        </Badge>
        <div
          className={cn(
            "flex items-center gap-1 text-sm font-semibold tabular-nums",
            adjustedVotes >= 0 ? "text-easy" : "text-hard",
          )}
        >
          {adjustedVotes >= 0 ? (
            <ThumbsUp className="h-3.5 w-3.5" />
          ) : (
            <ThumbsDown className="h-3.5 w-3.5" />
          )}
          {formatVotes(adjustedVotes)}
        </div>
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground min-w-0">
          <Building2 className="h-3.5 w-3.5 shrink-0" />
          <span className="truncate">{question.company}</span>
        </div>
      </div>
    </Link>
  );
}
