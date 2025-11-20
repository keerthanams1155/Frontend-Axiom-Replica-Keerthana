import { cn } from "@/lib/utils";

interface ShimmerLoaderProps {
  className?: string;
  lines?: number;
}

/**
 * Shimmer loading effect component
 * Provides a smooth animated loading state
 */
export function ShimmerLoader({ className, lines = 1 }: ShimmerLoaderProps) {
  return (
    <div className={cn("space-y-2", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="h-4 w-full animate-shimmer rounded bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 bg-[length:1000px_100%]"
        />
      ))}
    </div>
  );
}

