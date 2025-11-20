import { cn } from "@/lib/utils";

/**
 * Skeleton loader component for loading states
 */
function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-gray-800", className)}
      {...props}
    />
  );
}

export { Skeleton };

