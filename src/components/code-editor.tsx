"use client";

import Editor from "@monaco-editor/react";
import { Code2 } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CodeEditorProps {
  defaultLanguage?: string;
  questionId: number;
  placeholder?: string;
}

const LANGUAGES = [
  { value: "sql", label: "SQL" },
  { value: "python", label: "Python" },
  { value: "javascript", label: "JavaScript" },
  { value: "typescript", label: "TypeScript" },
] as const;

type Language = (typeof LANGUAGES)[number]["value"];

const STARTER_CODE: Record<Language, string> = {
  sql: `-- Write your SQL query here
SELECT 
  column_name
FROM 
  table_name
WHERE 
  condition;`,
  python: `# Write your Python solution here
def solution():
    # Your code here
    pass

# Test your solution
if __name__ == "__main__":
    result = solution()
    print(result)`,
  javascript: `// Write your JavaScript solution here
function solution() {
  // Your code here
}

// Test your solution
console.log(solution());`,
  typescript: `// Write your TypeScript solution here
function solution(): void {
  // Your code here
}

// Test your solution
console.log(solution());`,
};

function getStorageKey(questionId: number, language: string): string {
  return `question-${questionId}-${language}`;
}

export function CodeEditor({
  defaultLanguage = "python",
  questionId,
  placeholder,
}: CodeEditorProps) {
  const [language, setLanguage] = useState<Language>(
    defaultLanguage as Language,
  );
  const [code, setCode] = useState<string>("");
  const [mounted, setMounted] = useState(false);

  // Handle hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  // Load saved code from localStorage
  useEffect(() => {
    if (!mounted) return;

    const savedCode = localStorage.getItem(getStorageKey(questionId, language));
    if (savedCode) {
      setCode(savedCode);
    } else {
      setCode(placeholder || STARTER_CODE[language] || STARTER_CODE.python);
    }
  }, [language, questionId, placeholder, mounted]);

  // Save code to localStorage
  const handleCodeChange = (value: string | undefined) => {
    const newCode = value || "";
    setCode(newCode);
    localStorage.setItem(getStorageKey(questionId, language), newCode);
  };

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage as Language);
  };

  const handleReset = () => {
    const starterCode =
      placeholder || STARTER_CODE[language] || STARTER_CODE.python;
    setCode(starterCode);
    localStorage.removeItem(getStorageKey(questionId, language));
  };

  if (!mounted) {
    return (
      <div className="flex h-[400px] items-center justify-center rounded-lg border border-border bg-muted/30">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Code2 className="h-5 w-5 animate-pulse" />
          <span>Loading editor...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Select value={language} onValueChange={handleLanguageChange}>
            <SelectTrigger className="w-[140px] h-9 bg-background">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {LANGUAGES.map((lang) => (
                <SelectItem key={lang.value} value={lang.value}>
                  {lang.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          Reset
        </button>
      </div>

      {/* Editor */}
      <div className="overflow-hidden rounded-lg border border-border">
        <Editor
          height="400px"
          language={language}
          value={code}
          onChange={handleCodeChange}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            fontFamily: "var(--font-geist-mono), monospace",
            padding: { top: 16, bottom: 16 },
            lineNumbers: "on",
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
            wordWrap: "on",
            renderLineHighlight: "line",
            cursorBlinking: "smooth",
            smoothScrolling: true,
            bracketPairColorization: { enabled: true },
          }}
        />
      </div>

      {/* Helper text */}
      <p className="text-xs text-muted-foreground">
        Your code is automatically saved to your browser.
      </p>
    </div>
  );
}
