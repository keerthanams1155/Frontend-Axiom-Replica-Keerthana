# Axiom Token Trading Table

A pixel-perfect replica of Axiom Trade's token discovery table built with Next.js 14, TypeScript, and modern React patterns.

## Features

- ✅ All token columns (New pairs, Final Stretch, Migrated)
- ✅ Interactive components: Popover, Tooltip, Modal, Sorting
- ✅ Real-time price updates with WebSocket mock and smooth color transitions
- ✅ Comprehensive loading states: Skeleton, Shimmer, Progressive loading, Error boundaries
- ✅ Pixel-perfect design matching Axiom Trade's interface

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

## Performance

- Memoized components to prevent unnecessary re-renders
- Optimized WebSocket updates with batched state changes
- No layout shifts with proper skeleton loaders
- Target: <100ms interactions
- Lighthouse score: ≥90 (mobile & desktop)

## Code Quality

- Comprehensive TypeScript typing
- Error boundaries for graceful error handling
- Documented complex logic
- DRY principles throughout
- Accessible components (ARIA compliant)

