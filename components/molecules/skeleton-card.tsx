import { Skeleton } from "@/components/atoms/skeleton";
import { cn } from "@/lib/utils";

interface SkeletonCardProps {
  className?: string;
}

/**
 * Skeleton loader for token cards with shimmer effect
 */
export function SkeletonCard({ className }: SkeletonCardProps) {
  return (
    <div
      className={cn(
        "flex items-start gap-[12px] rounded-[12px] border border-[#23232A] bg-gradient-to-br from-[#111115] to-[#16161A] p-[12px] shadow-[0_0_4px_rgba(0,0,0,0.4)]",
        className
      )}
    >
      {/* Avatar skeleton with mini abbr */}
      <div className="flex shrink-0 flex-col items-center gap-[4px]">
        <Skeleton className="h-[40px] w-[40px] rounded-full" />
        <Skeleton className="h-[11px] w-[40px]" />
      </div>

      {/* Content skeleton */}
      <div className="flex min-w-0 flex-1 flex-col gap-[3px]">
        <div className="flex items-center gap-[6px]">
          <Skeleton className="h-[18px] w-20 animate-shimmer bg-gradient-to-r from-[#1A1A1D] via-[#2A2A2D] to-[#1A1A1D] bg-[length:1000px_100%]" />
          <Skeleton className="h-[18px] w-16 rounded-[6px]" />
        </div>
        <Skeleton className="h-[14px] w-32" />
        <div className="flex flex-wrap items-center gap-[4px]">
          <Skeleton className="h-[16px] w-12 rounded-[4px]" />
          <Skeleton className="h-[16px] w-12 rounded-[4px]" />
          <Skeleton className="h-[16px] w-12 rounded-[4px]" />
          <Skeleton className="h-[16px] w-12 rounded-[4px]" />
        </div>
      </div>

      {/* Price skeleton */}
      <div className="flex shrink-0 flex-col items-end gap-[4px]">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-3 w-12" />
      </div>
    </div>
  );
}

