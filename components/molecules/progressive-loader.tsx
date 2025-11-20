"use client";

import * as React from "react";
import { Skeleton } from "@/components/atoms/skeleton";
import { ShimmerLoader } from "./shimmer-loader";

interface ProgressiveLoaderProps {
  items: number;
  loaded: number;
  total: number;
}

/**
 * Progressive loading component
 * Shows loading state while data is being fetched incrementally
 */
export function ProgressiveLoader({
  items,
  loaded,
  total,
}: ProgressiveLoaderProps) {
  const progress = total > 0 ? (loaded / total) * 100 : 0;

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {Array.from({ length: items }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 rounded-lg border border-gray-800 bg-gray-900/50 p-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="flex-1 space-y-2">
              <ShimmerLoader lines={1} />
              <ShimmerLoader lines={1} className="w-3/4" />
            </div>
          </div>
        ))}
      </div>
      {total > 0 && (
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-gray-400">
            <span>Loading tokens...</span>
            <span>
              {loaded} / {total}
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-gray-800">
            <div
              className="h-full bg-blue-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

