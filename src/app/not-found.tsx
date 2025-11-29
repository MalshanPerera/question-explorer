import { FileQuestion } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto flex max-w-md flex-col items-center justify-center px-4 py-32 text-center">
        <div className="mb-6 rounded-2xl bg-primary/10 p-6">
          <FileQuestion className="h-12 w-12 text-primary" />
        </div>
        <h1 className="mb-3 text-3xl font-bold text-foreground">
          Question not found
        </h1>
        <p className="mb-8 text-muted-foreground">
          The question you&apos;re looking for doesn&apos;t exist or has been
          removed. Let&apos;s get you back on track.
        </p>
        <Link
          href="/"
          className="rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md active:scale-[0.98]"
        >
          Browse All Questions
        </Link>
      </div>
    </div>
  );
}
