"use client";

import { Shuffle } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

interface RandomQuestionButtonProps {
  questionIds: number[];
}

export function RandomQuestionButton({
  questionIds,
}: RandomQuestionButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    if (questionIds.length === 0) return;

    const randomIndex = Math.floor(Math.random() * questionIds.length);
    const randomId = questionIds[randomIndex];
    router.push(`/questions/${randomId}`);
  };

  return (
    <Button onClick={handleClick}>
      <Shuffle className="h-4 w-4" />
      Random Question
    </Button>
  );
}
