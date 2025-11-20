# Axiom Token Trading Table

A pixel-perfect replica of Axiom Trade's token discovery table built with Next.js 14, TypeScript, and modern React patterns.

## Core Features:
- All token columns(New pairs, Final Stretch, Migrated)
- Different interaction patterns: hover effects, click actions
- Real-time price updates (WebSocket mock) with smooth color transitions
- Loading states: skeleton, shimmer, progressive loading, error boundaries
- Pixel-perfect visual match to website (≤ 2 px diff verified with a visual-regression tool)


## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit
- **Data Fetching**: React Query (TanStack Query)
- **UI Components**: Radix UI / shadcn/ui
- **Architecture**: Atomic Design Pattern

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # Atomic architecture
│   ├── atoms/            # Basic UI components
│   ├── molecules/        # Composite components
│   └── organisms/        # Complex components
├── hooks/                # Custom React hooks
├── lib/                  # Utilities and store
│   ├── store/           # Redux store and slices
│   └── utils.ts         # Helper functions
└── types/               # TypeScript type definitions
```



