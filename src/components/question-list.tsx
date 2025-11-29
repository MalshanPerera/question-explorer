"use client";

import { Filter, SearchX, SlidersHorizontal, X } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { Filters } from "@/components/filters";
import { QuestionRow } from "@/components/question-row";
import { SearchBar } from "@/components/search-bar";
import { type SortOption, SortSelect } from "@/components/sort-select";
import type { Question } from "@/types/question";

interface QuestionListProps {
  questions: Question[];
  companies: string[];
}

export function QuestionList({ questions, companies }: QuestionListProps) {
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [type, setType] = useState("");
  const [company, setCompany] = useState("");
  const [sort, setSort] = useState<SortOption>("votes-desc");

  // Filter and sort questions
  const filteredQuestions = useMemo(() => {
    let result = [...questions];

    // Search filter
    if (search) {
      const searchLower = search.toLowerCase();
      result = result.filter(
        (q) =>
          q.title.toLowerCase().includes(searchLower) ||
          q.summary.toLowerCase().includes(searchLower) ||
          q.company.toLowerCase().includes(searchLower),
      );
    }

    // Difficulty filter
    if (difficulty) {
      result = result.filter(
        (q) => q.difficulty === Number.parseInt(difficulty, 10),
      );
    }

    // Type filter
    if (type) {
      result = result.filter((q) => q.type === type);
    }

    // Company filter
    if (company) {
      result = result.filter((q) => q.company === company);
    }

    // Sort
    result.sort((a, b) => {
      switch (sort) {
        case "title-asc":
          return a.title.localeCompare(b.title);
        case "title-desc":
          return b.title.localeCompare(a.title);
        case "difficulty-asc":
          return a.difficulty - b.difficulty;
        case "difficulty-desc":
          return b.difficulty - a.difficulty;
        case "votes-desc":
          return b.votes - a.votes;
        case "votes-asc":
          return a.votes - b.votes;
        default:
          return 0;
      }
    });

    return result;
  }, [questions, search, difficulty, type, company, sort]);

  const handleSearchChange = useCallback((value: string) => {
    setSearch(value);
  }, []);

  const handleClearFilters = useCallback(() => {
    setSearch("");
    setDifficulty("");
    setType("");
    setCompany("");
    setSort("votes-desc");
  }, []);

  const hasActiveFilters = search || difficulty || type || company;
  const activeFilterCount = [search, difficulty, type, company].filter(
    Boolean,
  ).length;

  return (
    <div className="flex flex-col gap-6">
      {/* Search and Filters */}
      <div className="rounded-xl border border-border/60 bg-card p-4 shadow-sm">
        <div className="flex flex-col gap-4">
          {/* Search Row */}
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
            <div className="flex-1 lg:max-w-md">
              <SearchBar
                value={search}
                onChange={handleSearchChange}
                placeholder="Search questions..."
              />
            </div>

            {/* Filters Row */}
            <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
              <div className="flex items-center gap-2 text-sm text-muted-foreground sm:hidden">
                <SlidersHorizontal className="h-4 w-4" />
                <span>Filters</span>
              </div>
              <Filters
                difficulty={difficulty}
                type={type}
                company={company}
                companies={companies}
                onDifficultyChange={setDifficulty}
                onTypeChange={setType}
                onCompanyChange={setCompany}
              />
              <SortSelect value={sort} onChange={setSort} />
            </div>
          </div>

          {/* Active filters indicator */}
          {hasActiveFilters && (
            <div className="flex items-center justify-between border-t border-border/50 pt-3">
              <div className="flex items-center gap-2 text-sm">
                <Filter className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">
                  Showing{" "}
                  <span className="font-medium text-foreground">
                    {filteredQuestions.length}
                  </span>{" "}
                  of {questions.length} questions
                </span>
                {activeFilterCount > 0 && (
                  <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                    {activeFilterCount} filter{activeFilterCount > 1 ? "s" : ""}
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={handleClearFilters}
                className="flex items-center gap-1 rounded-md px-2 py-1 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <X className="h-3.5 w-3.5" />
                Clear
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Question List */}
      {filteredQuestions.length > 0 ? (
        <div className="flex flex-col gap-3">
          {/* Desktop Header */}
          <div className="hidden lg:grid lg:grid-cols-[1fr_90px_140px_70px_220px] lg:gap-6 lg:px-5 lg:text-sm lg:font-medium lg:text-muted-foreground">
            <span>Question</span>
            <span>Difficulty</span>
            <span>Type</span>
            <span>Votes</span>
            <span>Company</span>
          </div>

          {/* Questions */}
          <div className="flex flex-col gap-2">
            {filteredQuestions.map((question) => (
              <QuestionRow key={question.id} question={question} />
            ))}
          </div>
        </div>
      ) : (
        <EmptyState onClear={handleClearFilters} />
      )}
    </div>
  );
}

function EmptyState({ onClear }: { onClear: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card/50 px-6 py-20 text-center">
      <div className="mb-4 rounded-full bg-muted p-4">
        <SearchX className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="mb-2 text-lg font-semibold text-foreground">
        No questions found
      </h3>
      <p className="mb-6 max-w-sm text-sm text-muted-foreground">
        We couldn&apos;t find any questions matching your criteria. Try
        adjusting your filters or search term.
      </p>
      <button
        type="button"
        onClick={onClear}
        className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md active:scale-[0.98]"
      >
        Clear all filters
      </button>
    </div>
  );
}
