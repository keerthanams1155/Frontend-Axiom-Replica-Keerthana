# Quick Start Guide

## Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Building for Production

```bash
npm run build
npm start
```

## Project Structure Overview

```
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout with providers
│   ├── page.tsx                 # Home page
│   ├── loading.tsx              # Loading UI
│   ├── error.tsx                # Error UI
│   └── globals.css              # Global styles
│
├── components/                   # Atomic architecture
│   ├── atoms/                   # Basic UI components
│   │   ├── button.tsx
│   │   ├── badge.tsx
│   │   └── skeleton.tsx
│   ├── molecules/              # Composite components
│   │   ├── tooltip.tsx
│   │   ├── popover.tsx
│   │   ├── dialog.tsx
│   │   ├── sortable-header.tsx
│   │   ├── price-cell.tsx
│   │   ├── shimmer-loader.tsx
│   │   ├── progressive-loader.tsx
│   │   └── error-boundary.tsx
│   ├── organisms/              # Complex components
│   │   ├── token-row.tsx
│   │   └── token-trading-table.tsx
│   └── providers.tsx           # Redux & React Query providers
│
├── hooks/                       # Custom React hooks
│   ├── useTokens.ts            # Token data fetching
│   └── useMockWebSocket.ts     # WebSocket simulation
│
├── lib/                         # Utilities & store
│   ├── store.ts                # Redux store
│   ├── store/slices/
│   │   └── tokenTableSlice.ts  # Table state management
│   ├── hooks.ts                # Typed Redux hooks
│   ├── utils.ts                # Helper functions
│   └── constants.ts            # App constants
│
└── types/                       # TypeScript definitions
    └── token.ts                # Token interface
```

## Key Features to Test

1. **Sorting**: Click on any column header to sort
2. **Filtering**: Use the category tabs to filter tokens
3. **Real-time Updates**: Watch prices update automatically
4. **Interactions**: 
   - Hover over info icon for tooltip
   - Click info icon for popover
   - Click token row for modal
5. **Loading States**: Refresh page to see skeleton loaders

## Performance Testing

To verify Lighthouse scores:

1. Build the project: `npm run build`
2. Start production server: `npm start`
3. Run Lighthouse audit in Chrome DevTools
4. Target: ≥90 on mobile and desktop

## Customization

### Adding New Token Categories

1. Update `TokenCategory` type in `types/token.ts`
2. Add category to filter tabs in `token-trading-table.tsx`
3. Update badge logic in `token-row.tsx`

### Modifying WebSocket Update Frequency

Edit `hooks/useMockWebSocket.ts`:
```typescript
const interval = setInterval(() => {
  // Update logic
}, YOUR_INTERVAL_MS);
```

### Styling

All styles use Tailwind CSS. Modify `tailwind.config.ts` for theme customization.

## Troubleshooting

### TypeScript Errors
- Ensure all dependencies are installed: `npm install`
- Check `tsconfig.json` paths are correct

### Build Errors
- Clear `.next` folder: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`

### Performance Issues
- Check React DevTools Profiler
- Verify memoization is working
- Ensure WebSocket updates are batched

