"use client";

import { CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useProgressStore } from "@/stores/progress-store";

interface ProgressStatsProps {
  totalQuestions: number;
}

export function ProgressStats({ totalQuestions }: ProgressStatsProps) {
  const [mounted, setMounted] = useState(false);
  const completedCount = useProgressStore(
    (state) => Object.keys(state.completed).length,
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center gap-2 text-sm">
        <div className="h-4 w-4 animate-pulse rounded-full bg-muted" />
        <div className="h-4 w-20 animate-pulse rounded bg-muted" />
      </div>
    );
  }

  const percentage = Math.round((completedCount / totalQuestions) * 100);

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2 text-sm">
        <CheckCircle2 className="h-4 w-4 text-easy" />
        <span className="text-muted-foreground">
          <span className="font-semibold text-foreground">
            {completedCount}
          </span>
          <span className="text-muted-foreground"> / {totalQuestions}</span>
          <span className="ml-1 text-muted-foreground">completed</span>
        </span>
      </div>

      {/* Progress Bar */}
      <div className="hidden sm:flex items-center gap-2">
        <div className="h-2 w-24 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-easy transition-all duration-500 ease-out"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <span className="text-xs font-medium text-muted-foreground">
          {percentage}%
        </span>
      </div>
    </div>
  );
}
