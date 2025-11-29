"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Difficulty, QuestionType } from "@/types/question";
import { DIFFICULTY_LABELS, QUESTION_TYPES } from "@/types/question";

interface FiltersProps {
  difficulty: string;
  type: string;
  company: string;
  companies: string[];
  onDifficultyChange: (value: string) => void;
  onTypeChange: (value: string) => void;
  onCompanyChange: (value: string) => void;
}

export function Filters({
  difficulty,
  type,
  company,
  companies,
  onDifficultyChange,
  onTypeChange,
  onCompanyChange,
}: FiltersProps) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
      <Select
        value={difficulty || "all"}
        onValueChange={(val) => onDifficultyChange(val === "all" ? "" : val)}
      >
        <SelectTrigger
          className="w-full sm:w-[130px] h-10 bg-background"
          aria-label="Filter by difficulty"
        >
          <SelectValue placeholder="Difficulty" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Levels</SelectItem>
          {([1, 2, 3] as Difficulty[]).map((d) => (
            <SelectItem key={d} value={d.toString()}>
              {DIFFICULTY_LABELS[d]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={type || "all"}
        onValueChange={(val) => onTypeChange(val === "all" ? "" : val)}
      >
        <SelectTrigger
          className="w-full sm:w-[150px] h-10 bg-background"
          aria-label="Filter by type"
        >
          <SelectValue placeholder="Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Types</SelectItem>
          {QUESTION_TYPES.map((t) => (
            <SelectItem key={t} value={t} className="capitalize">
              {formatTypeName(t)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={company || "all"}
        onValueChange={(val) => onCompanyChange(val === "all" ? "" : val)}
      >
        <SelectTrigger
          className="w-full sm:w-[180px] h-10 bg-background"
          aria-label="Filter by company"
        >
          <SelectValue placeholder="Company" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Companies</SelectItem>
          {companies.map((c) => (
            <SelectItem key={c} value={c}>
              {c}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

function formatTypeName(type: QuestionType): string {
  return type
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
