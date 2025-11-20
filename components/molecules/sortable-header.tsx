"use client";

import * as React from "react";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface SortableHeaderProps {
  label: string;
  sortKey: string;
  currentSort?: { column: string | null; direction: "asc" | "desc" };
  onSort: (column: string, direction: "asc" | "desc") => void;
  className?: string;
}

/**
 * Sortable table header component
 * Handles click-to-sort functionality with visual indicators
 */
export const SortableHeader = React.memo<SortableHeaderProps>(
  ({ label, sortKey, currentSort, onSort, className }) => {
    const handleClick = React.useCallback(() => {
      if (currentSort?.column === sortKey) {
        // Toggle direction if already sorted by this column
        onSort(
          sortKey,
          currentSort.direction === "asc" ? "desc" : "asc"
        );
      } else {
        // Default to ascending for new column
        onSort(sortKey, "asc");
      }
    }, [sortKey, currentSort, onSort]);

    const isSorted = currentSort?.column === sortKey;
    const sortIcon =
      isSorted && currentSort.direction === "asc" ? (
        <ArrowUp className="ml-1 h-3 w-3" />
      ) : isSorted && currentSort.direction === "desc" ? (
        <ArrowDown className="ml-1 h-3 w-3" />
      ) : (
        <ArrowUpDown className="ml-1 h-3 w-3 opacity-50" />
      );

    return (
      <th
        className={cn(
          "cursor-pointer select-none px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400 transition-colors hover:bg-gray-800 hover:text-white",
          className
        )}
        onClick={handleClick}
      >
        <div className="flex items-center">
          {label}
          {sortIcon}
        </div>
      </th>
    );
  }
);

SortableHeader.displayName = "SortableHeader";

