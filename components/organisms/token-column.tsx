"use client";

import * as React from "react";
import { Token } from "@/types/token";
import { TokenCard } from "@/components/molecules/token-card";
import { Skeleton } from "@/components/atoms/skeleton";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface TokenColumnProps {
  title: string;
  tokens: Token[];
  previousPrices: Map<string, number>;
  flashStates: Map<string, "green" | "red" | null>;
  sortColumn: keyof Token | null;
  sortDirection: "asc" | "desc";
  onSort: (column: keyof Token) => void;
  onTokenClick: (token: Token) => void;
  isLoading?: boolean;
}

/**
 * Token column component for 3-column layout
 * Each column is independently scrollable
 */
export const TokenColumn = React.memo<TokenColumnProps>(
  ({
    title,
    tokens,
    previousPrices,
    flashStates,
    sortColumn,
    sortDirection,
    onSort,
    onTokenClick,
    isLoading,
  }) => {
    const handleSortClick = React.useCallback(() => {
      onSort("price");
    }, [onSort]);

    return (
      <div className="flex h-full flex-col">
        {/* Header */}
        <div className="mb-[12px] flex items-center justify-between px-[4px]">
          <h3 className="text-[16px] font-semibold text-white">{title}</h3>
          <button
            onClick={handleSortClick}
            className="flex items-center gap-[4px] rounded-[6px] p-[4px] text-[12px] text-[rgba(255,255,255,0.6)] transition-colors hover:bg-[#1A1A1D] hover:text-white"
          >
            {sortColumn === "price" ? (
              sortDirection === "asc" ? (
                <ArrowUp className="h-[14px] w-[14px]" />
              ) : (
                <ArrowDown className="h-[14px] w-[14px]" />
              )
            ) : (
              <ArrowUpDown className="h-[14px] w-[14px]" />
            )}
            Sort
          </button>
        </div>

        {/* Scrollable Token List */}
        <div className="flex-1 space-y-[8px] overflow-y-auto pr-[4px]">
          {isLoading ? (
            // Skeleton loaders
            Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-[12px] rounded-[12px] border border-[#1A1A1D] bg-[#0F0F12] p-[12px]"
              >
                <Skeleton className="h-[40px] w-[40px] rounded-[8px]" />
                <div className="flex-1 space-y-[4px]">
                  <Skeleton className="h-[14px] w-[100px]" />
                  <Skeleton className="h-[12px] w-[150px]" />
                  <Skeleton className="h-[11px] w-[200px]" />
                </div>
                <Skeleton className="h-[40px] w-[60px]" />
              </div>
            ))
          ) : tokens.length === 0 ? (
            <div className="py-[24px] text-center text-[14px] text-[rgba(255,255,255,0.4)]">
              No tokens found
            </div>
          ) : (
            tokens.map((token) => (
              <TokenCard
                key={token.id}
                token={token}
                previousPrice={previousPrices.get(token.id)}
                flashColor={flashStates.get(token.id) || null}
                onTokenClick={onTokenClick}
              />
            ))
          )}
        </div>
      </div>
    );
  }
);

TokenColumn.displayName = "TokenColumn";

