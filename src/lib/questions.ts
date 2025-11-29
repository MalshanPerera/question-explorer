import fs from "node:fs";
import path from "node:path";
import type { Difficulty, Question, QuestionType } from "@/types/question";

/**
 * Parse CSV content into Question objects
 */
function parseCSV(content: string): Question[] {
  const lines = content.trim().split("\n");
  const questions: Question[] = [];

  // Skip header row
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim()) continue;

    // Handle CSV parsing with quoted fields
    const values: string[] = [];
    let current = "";
    let inQuotes = false;

    for (let j = 0; j < line.length; j++) {
      const char = line[j];
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === "," && !inQuotes) {
        values.push(current.trim());
        current = "";
      } else {
        current += char;
      }
    }
    values.push(current.trim());

    // Map to Question object
    // CSV columns: qid, title, difficulty, type, sum(cu.vote), question_summary, company_asked
    const [qid, title, difficulty, type, votes, summary, company] = values;

    const question: Question = {
      id: Number.parseInt(qid, 10),
      title: title.replace(/^"|"$/g, ""),
      difficulty: Number.parseInt(difficulty, 10) as Difficulty,
      type: type.toLowerCase() as QuestionType,
      votes: Number.parseInt(votes, 10) || 0,
      summary: summary.replace(/^"|"$/g, ""),
      company: company.replace(/^"|"$/g, ""),
    };

    questions.push(question);
  }

  return questions;
}

/**
 * Get all questions from CSV file
 */
export function getAllQuestions(): Question[] {
  const csvPath = path.join(process.cwd(), "src", "data", "questions.csv");
  const content = fs.readFileSync(csvPath, "utf-8");
  return parseCSV(content);
}

/**
 * Get a single question by ID
 */
export function getQuestionById(id: number): Question | undefined {
  const questions = getAllQuestions();
  return questions.find((q) => q.id === id);
}

/**
 * Get all unique companies from questions
 */
export function getAllCompanies(): string[] {
  const questions = getAllQuestions();
  const companies = new Set(questions.map((q) => q.company));
  return Array.from(companies).sort();
}

/**
 * Get all unique question types
 */
export function getAllTypes(): QuestionType[] {
  const questions = getAllQuestions();
  const types = new Set(questions.map((q) => q.type));
  return Array.from(types).sort() as QuestionType[];
}
