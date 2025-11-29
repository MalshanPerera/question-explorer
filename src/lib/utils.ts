import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Difficulty } from "@/types/question";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatVotes(votes: number): string {
  if (votes > 0) return `+${votes}`;
  return votes.toString();
}

export function getDifficultyColor(difficulty: Difficulty): {
  bg: string;
  text: string;
  border: string;
} {
  switch (difficulty) {
    case 1:
      return {
        bg: "bg-easy-bg",
        text: "text-easy",
        border: "border-easy/30",
      };
    case 2:
      return {
        bg: "bg-medium-bg",
        text: "text-medium",
        border: "border-medium/30",
      };
    case 3:
      return {
        bg: "bg-hard-bg",
        text: "text-hard",
        border: "border-hard/30",
      };
  }
}

export function getTypeColor(type: string): {
  bg: string;
  text: string;
  border: string;
} {
  const typeColors: Record<
    string,
    { bg: string; text: string; border: string }
  > = {
    sql: {
      bg: "bg-blue-500/10 dark:bg-blue-400/15",
      text: "text-blue-600 dark:text-blue-400",
      border: "border-blue-500/25",
    },
    python: {
      bg: "bg-amber-500/10 dark:bg-amber-400/15",
      text: "text-amber-600 dark:text-amber-400",
      border: "border-amber-500/25",
    },
    algorithms: {
      bg: "bg-violet-500/10 dark:bg-violet-400/15",
      text: "text-violet-600 dark:text-violet-400",
      border: "border-violet-500/25",
    },
    "product metrics": {
      bg: "bg-pink-500/10 dark:bg-pink-400/15",
      text: "text-pink-600 dark:text-pink-400",
      border: "border-pink-500/25",
    },
    "business case": {
      bg: "bg-indigo-500/10 dark:bg-indigo-400/15",
      text: "text-indigo-600 dark:text-indigo-400",
      border: "border-indigo-500/25",
    },
    statistics: {
      bg: "bg-cyan-500/10 dark:bg-cyan-400/15",
      text: "text-cyan-600 dark:text-cyan-400",
      border: "border-cyan-500/25",
    },
    probability: {
      bg: "bg-teal-500/10 dark:bg-teal-400/15",
      text: "text-teal-600 dark:text-teal-400",
      border: "border-teal-500/25",
    },
    "machine learning": {
      bg: "bg-orange-500/10 dark:bg-orange-400/15",
      text: "text-orange-600 dark:text-orange-400",
      border: "border-orange-500/25",
    },
    analytics: {
      bg: "bg-sky-500/10 dark:bg-sky-400/15",
      text: "text-sky-600 dark:text-sky-400",
      border: "border-sky-500/25",
    },
    "a/b testing": {
      bg: "bg-fuchsia-500/10 dark:bg-fuchsia-400/15",
      text: "text-fuchsia-600 dark:text-fuchsia-400",
      border: "border-fuchsia-500/25",
    },
  };

  return (
    typeColors[type.toLowerCase()] || {
      bg: "bg-gray-500/10 dark:bg-gray-400/15",
      text: "text-gray-600 dark:text-gray-400",
      border: "border-gray-500/25",
    }
  );
}

export function debounce<T extends (...args: Parameters<T>) => void>(
  fn: T,
  delay: number,
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}
