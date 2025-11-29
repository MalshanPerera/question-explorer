"use client";

import { ArrowUpDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type SortOption =
  | "title-asc"
  | "title-desc"
  | "difficulty-asc"
  | "difficulty-desc"
  | "votes-desc"
  | "votes-asc";

interface SortSelectProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "votes-desc", label: "Most Votes" },
  { value: "votes-asc", label: "Least Votes" },
  { value: "difficulty-asc", label: "Easiest First" },
  { value: "difficulty-desc", label: "Hardest First" },
  { value: "title-asc", label: "Title A-Z" },
  { value: "title-desc", label: "Title Z-A" },
];

export function SortSelect({ value, onChange }: SortSelectProps) {
  return (
    <Select value={value} onValueChange={(val) => onChange(val as SortOption)}>
      <SelectTrigger
        className="w-full sm:w-[140px] h-10 bg-background"
        aria-label="Sort questions"
      >
        <div className="flex items-center gap-2">
          <ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground" />
          <SelectValue />
        </div>
      </SelectTrigger>
      <SelectContent>
        {sortOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
