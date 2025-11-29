# Question Explorer

A clean, modern web application for browsing and filtering interview questions. Built with Next.js 16, React 19, and Tailwind CSS.

![Next.js](https://img.shields.io/badge/Next.js-16-black)
![React](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8)

## Features

### Core Features

- **Browse Questions** — View 100+ interview questions in a clean, scannable list
- **Filter & Search** — Filter by difficulty, type, company, and status (completed/incomplete/bookmarked); search by title, summary, or company
- **Sort Options** — Sort by votes, difficulty, or title (ascending/descending)
- **Question Details** — View full question details with metadata, company info, and problem description
- **Responsive Design** — Works beautifully on mobile and desktop

### Interactive Features

- **Code Editor** — Monaco Editor with syntax highlighting, language selector, and local storage persistence
- **Voting System** — Upvote or Downvote questions with persistent vote counts
- **Progress Tracking** — Mark questions as completed with visual indicators and progress stats
- **Bookmarks/Favorites** — Bookmark questions for quick access with filtering support
- **Random Question** — Get a random question to practice with one click

### User Experience

- **Dark Mode** — Toggle between light and dark themes
- **Local Storage** — All user data (votes, progress, bookmarks, code solutions) persists across sessions
- **Smooth Animations** — Polished UI with smooth transitions and hover effects
- **Progress Statistics** — Track your completion progress with visual indicators

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **UI:** React 19, Tailwind CSS 4, shadcn/ui
- **Language:** TypeScript
- **State Management:** Zustand with localStorage persistence
- **Code Editor:** Monaco Editor (@monaco-editor/react)
- **Icons:** Lucide React
- **Linting:** Biome

## Getting Started

```bash
# Install dependencies
bun install

# Run development server
bun dev

# Build for production
bun run build
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── page.tsx           # Home page (question list)
│   ├── questions/[id]/    # Question detail page
│   └── globals.css        # Global styles & theme
├── components/            # React components
│   ├── ui/               # shadcn/ui primitives
│   ├── bookmark-button.tsx
│   ├── code-editor.tsx
│   ├── completed-checkbox.tsx
│   ├── filters.tsx
│   ├── progress-stats.tsx
│   ├── question-list.tsx
│   ├── question-row.tsx
│   ├── random-question-button.tsx
│   ├── search-bar.tsx
│   ├── sort-select.tsx
│   └── vote-buttons.tsx
├── stores/                # Zustand stores
│   ├── bookmark-store.ts
│   ├── progress-store.ts
│   └── vote-store.ts
├── lib/                   # Utilities & data loading
│   ├── questions.ts      # CSV parsing & question utilities
│   └── utils.ts          # Helper functions
└── types/                # TypeScript types
    └── question.ts       # Question type definitions
```

## License

MIT
