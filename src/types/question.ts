export type Difficulty = 1 | 2 | 3;

export type QuestionType =
  | "sql"
  | "python"
  | "algorithms"
  | "product metrics"
  | "business case"
  | "statistics"
  | "probability"
  | "machine learning"
  | "analytics"
  | "a/b testing";

export interface Question {
  id: number;
  title: string;
  difficulty: Difficulty;
  type: QuestionType;
  votes: number;
  summary: string;
  company: string;
}

export const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  1: "Easy",
  2: "Medium",
  3: "Hard",
};

export const QUESTION_TYPES: QuestionType[] = [
  "sql",
  "python",
  "algorithms",
  "product metrics",
  "business case",
  "statistics",
  "probability",
  "machine learning",
  "analytics",
  "a/b testing",
];
