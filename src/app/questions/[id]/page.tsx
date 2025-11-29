import { ArrowLeft, Building2, Code2, Hash } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BookmarkButton } from "@/components/bookmark-button";
import { CodeEditor } from "@/components/code-editor";
import { CompletionButton } from "@/components/completed-checkbox";
import { Badge } from "@/components/ui/badge";
import { VoteButtons } from "@/components/vote-buttons";
import { getAllQuestions, getQuestionById } from "@/lib/questions";
import { cn, getDifficultyColor, getTypeColor } from "@/lib/utils";
import type { QuestionType } from "@/types/question";
import { DIFFICULTY_LABELS } from "@/types/question";

interface QuestionPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: QuestionPageProps): Promise<Metadata> {
  const { id } = await params;
  const question = getQuestionById(Number.parseInt(id, 10));

  if (!question) {
    return {
      title: "Question Not Found",
    };
  }

  return {
    title: `${question.title} | Question Explorer`,
    description: question.summary,
  };
}

export async function generateStaticParams() {
  const questions = getAllQuestions();
  return questions.map((q) => ({
    id: q.id.toString(),
  }));
}

function getDefaultLanguage(type: QuestionType): string {
  switch (type) {
    case "sql":
      return "sql";
    case "python":
    case "algorithms":
    case "machine learning":
    case "statistics":
    case "probability":
      return "python";
    default:
      return "python";
  }
}

export default async function QuestionPage({ params }: QuestionPageProps) {
  const { id } = await params;
  const question = getQuestionById(Number.parseInt(id, 10));

  if (!question) {
    notFound();
  }

  const difficultyColors = getDifficultyColor(question.difficulty);
  const typeColors = getTypeColor(question.type);
  const defaultLanguage = getDefaultLanguage(question.type);

  return (
    <div className="min-h-screen bg-background">
      {/* Header with gradient */}
      <div className="relative overflow-hidden border-b border-border/50 bg-linear-to-b from-primary/5 via-background to-background">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Back Navigation */}
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            Back to questions
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8 space-y-6">
        {/* Question Content */}
        <article className="rounded-2xl border border-border/60 bg-card shadow-sm">
          {/* Header */}
          <header className="border-b border-border/50 p-6 sm:p-8">
            <div className="flex gap-4 sm:gap-6">
              {/* Title and Metadata */}
              <div className="flex-1 min-w-0">
                <h1 className="text-2xl font-bold text-foreground sm:text-3xl leading-tight">
                  {question.title}
                </h1>

                {/* Metadata */}
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <Badge
                    variant="outline"
                    className={cn(
                      "font-semibold text-sm px-3 py-1",
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
                      "font-semibold text-sm px-3 py-1",
                      typeColors.bg,
                      typeColors.text,
                      typeColors.border,
                      question.type === "sql" ? "uppercase" : "capitalize",
                    )}
                  >
                    {question.type}
                  </Badge>
                </div>

                {/* Completion Button and Bookmark */}
                <div className="mt-4 flex items-center gap-3">
                  <CompletionButton questionId={question.id} />
                  <BookmarkButton questionId={question.id} size="md" />
                </div>
              </div>

              {/* Vote Buttons */}
              <div className="shrink-0">
                <VoteButtons
                  questionId={question.id}
                  baseVotes={question.votes}
                  orientation="vertical"
                />
              </div>
            </div>
          </header>

          {/* Company Card */}
          <div className="border-b border-border/50 p-6 sm:px-8">
            <div className="flex items-center gap-4 rounded-xl bg-muted/50 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Building2 className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Asked at
                </p>
                <p className="font-semibold text-foreground">
                  {question.company}
                </p>
              </div>
            </div>
          </div>

          {/* Summary */}
          <section className="p-6 sm:p-8">
            <h2 className="mb-4 text-lg font-semibold text-foreground">
              Problem Description
            </h2>
            <div className="prose prose-neutral dark:prose-invert max-w-none">
              <p className="text-muted-foreground leading-relaxed text-base">
                {question.summary}
              </p>
            </div>
          </section>

          {/* Footer */}
          <footer className="flex items-center justify-between border-t border-border/50 bg-muted/30 px-6 py-4 sm:px-8">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Hash className="h-3.5 w-3.5" />
              Question ID: {question.id}
            </div>
            <Link
              href="/"
              className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md active:scale-[0.98]"
            >
              Browse More Questions
            </Link>
          </footer>
        </article>

        {/* Code Editor Section */}
        <section className="rounded-2xl border border-border/60 bg-card shadow-sm p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Code2 className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">
                Your Solution
              </h2>
              <p className="text-sm text-muted-foreground">
                Write and test your solution below
              </p>
            </div>
          </div>

          <CodeEditor
            questionId={question.id}
            defaultLanguage={defaultLanguage}
          />
        </section>
      </div>
    </div>
  );
}
