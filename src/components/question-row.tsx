"use client";

import { ArrowRight, Building2, ThumbsUp } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { cn, formatVotes, getDifficultyColor, getTypeColor } from "@/lib/utils";
import type { Question } from "@/types/question";
import { DIFFICULTY_LABELS } from "@/types/question";

interface QuestionRowProps {
  question: Question;
}

export function QuestionRow({ question }: QuestionRowProps) {
  const difficultyColors = getDifficultyColor(question.difficulty);
  const typeColors = getTypeColor(question.type);

  return (
    <Link
      href={`/questions/${question.id}`}
      className={cn(
        "card-hover group relative block rounded-xl border border-border/60 bg-card p-5 transition-all",
        "hover:border-primary/30 hover:bg-accent/30",
      )}
    >
      {/* Mobile Layout */}
      <div className="flex flex-col gap-4 lg:hidden">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-semibold text-foreground leading-snug group-hover:text-primary transition-colors">
            {question.title}
          </h3>
          <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-0.5" />
        </div>

        <div className="flex flex-wrap items-center gap-2">
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
              "font-medium capitalize",
              typeColors.bg,
              typeColors.text,
              typeColors.border,
            )}
          >
            {question.type}
          </Badge>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Building2 className="h-3.5 w-3.5" />
            <span className="truncate max-w-[200px]">{question.company}</span>
          </div>
          <div
            className={cn(
              "flex items-center gap-1 font-medium tabular-nums",
              question.votes >= 0 ? "text-easy" : "text-hard",
            )}
          >
            <ThumbsUp className="h-3.5 w-3.5" />
            {formatVotes(question.votes)}
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:grid lg:grid-cols-[1fr_90px_140px_70px_220px] lg:items-center lg:gap-6">
        <div className="flex items-center gap-3 min-w-0">
          <h3 className="font-semibold text-foreground truncate group-hover:text-primary transition-colors">
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
            "justify-center font-medium capitalize",
            typeColors.bg,
            typeColors.text,
            typeColors.border,
          )}
        >
          {question.type}
        </Badge>
        <div
          className={cn(
            "flex items-center justify-center gap-1 text-sm font-semibold tabular-nums",
            question.votes >= 0 ? "text-easy" : "text-hard",
          )}
        >
          <ThumbsUp className="h-3.5 w-3.5" />
          {formatVotes(question.votes)}
        </div>
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground min-w-0">
          <Building2 className="h-3.5 w-3.5 shrink-0" />
          <span className="truncate">{question.company}</span>
        </div>
      </div>
    </Link>
  );
}
