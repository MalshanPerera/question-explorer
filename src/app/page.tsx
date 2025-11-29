import { Code2, Sparkles } from "lucide-react";
import { ProgressStats } from "@/components/progress-stats";
import { QuestionList } from "@/components/question-list";
import { RandomQuestionButton } from "@/components/random-question-button";
import { ThemeToggle } from "@/components/theme-toggle";
import { getAllCompanies, getAllQuestions } from "@/lib/questions";

export default function HomePage() {
  const questions = getAllQuestions();
  const companies = getAllCompanies();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden border-b border-border/50 bg-linear-to-b from-primary/5 via-background to-background">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <header className="flex flex-col gap-4">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
                  <Code2 className="h-6 w-6" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                    Question Explorer
                  </h1>
                </div>
              </div>
              <ThemeToggle />
            </div>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-2xl text-lg text-muted-foreground">
                Browse and practice{" "}
                <span className="font-semibold text-foreground">
                  {questions.length} interview questions
                </span>{" "}
                from top companies. Filter by difficulty, type, and company to
                find your next challenge.
              </p>
              <RandomQuestionButton questionIds={questions.map((q) => q.id)} />
            </div>

            {/* Stats Row */}
            <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3">
              {/* Difficulty Stats */}
              <div className="flex items-center gap-2 text-sm">
                <Sparkles className="h-4 w-4 text-easy" />
                <span className="text-muted-foreground">
                  <span className="font-medium text-foreground">
                    {questions.filter((q) => q.difficulty === 1).length}
                  </span>{" "}
                  Easy
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Sparkles className="h-4 w-4 text-medium" />
                <span className="text-muted-foreground">
                  <span className="font-medium text-foreground">
                    {questions.filter((q) => q.difficulty === 2).length}
                  </span>{" "}
                  Medium
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Sparkles className="h-4 w-4 text-hard" />
                <span className="text-muted-foreground">
                  <span className="font-medium text-foreground">
                    {questions.filter((q) => q.difficulty === 3).length}
                  </span>{" "}
                  Hard
                </span>
              </div>

              {/* Divider */}
              <div className="hidden sm:block h-4 w-px bg-border" />

              {/* Progress Stats */}
              <ProgressStats totalQuestions={questions.length} />
            </div>
          </header>
        </div>
      </div>

      {/* Question List */}
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <QuestionList questions={questions} companies={companies} />
      </main>
    </div>
  );
}
