# Question Explorer

A clean, modern web application for browsing and filtering interview questions. Built with Next.js 16, React 19, and Tailwind CSS.

![Next.js](https://img.shields.io/badge/Next.js-16-black)
![React](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8)

## Features

- **Browse Questions** — View 100+ interview questions in a clean, scannable list
- **Filter & Search** — Filter by difficulty, type, and company; search by title or summary
- **Sort Options** — Sort by votes, difficulty, or title
- **Question Details** — View full question details with metadata
- **Responsive Design** — Works beautifully on mobile and desktop

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **UI:** React 19, Tailwind CSS 4, shadcn/ui
- **Language:** TypeScript
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
│   └── ...               # Feature components
├── lib/                   # Utilities & data loading
└── types/                # TypeScript types
```

## License

MIT
