"use client";

import * as React from "react";
import { useTokens } from "@/hooks/useTokens";
import { useMockWebSocket } from "@/hooks/useMockWebSocket";
import { Token } from "@/types/token";
import { TokenCard } from "@/components/molecules/token-card";
import { ColumnHeader } from "@/components/molecules/column-header";
import { SkeletonCard } from "@/components/molecules/skeleton-card";
import { ErrorBoundary } from "@/components/molecules/error-boundary";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/molecules/dialog";
import { formatCurrency, formatPercent } from "@/lib/utils";

/**
 * Main token trading table component with 3-column layout
 * Matches Axiom Pulse design with card-style rows
 */
export function TokenTradingTable() {
  const { data: tokens, isLoading, isError, error } = useTokens();
  
  // Local state for sorting and selection (no Redux)
  const [sortColumn, setSortColumn] = React.useState<keyof Token | null>(null);
  const [sortDirection, setSortDirection] = React.useState<"asc" | "desc">("asc");
  const [selectedToken, setSelectedToken] = React.useState<Token | null>(null);
  const [presets, setPresets] = React.useState<{
    new: "P1" | "P2" | "P3" | null;
    "final-stretch": "P1" | "P2" | "P3" | null;
    migrated: "P1" | "P2" | "P3" | null;
  }>({
    new: null,
    "final-stretch": null,
    migrated: null,
  });

  // Get token IDs for WebSocket updates
  const tokenIds = React.useMemo(
    () => tokens?.map((t) => t.id) || [],
    [tokens]
  );

  const { updates, isConnected, priceDirections } = useMockWebSocket(tokenIds);

  // Merge WebSocket updates with token data
  const tokensWithUpdates = React.useMemo(() => {
    if (!tokens) return [];
    return tokens.map((token) => {
      const update = updates.get(token.id);
      if (update) {
        return {
          ...token,
          price: update.price,
          priceChange24h: update.priceChange24h,
          lastUpdated: update.timestamp,
        };
      }
      return token;
    });
  }, [tokens, updates]);

  // Store previous prices for flash animations
  const previousPricesRef = React.useRef<Map<string, number>>(new Map());
  React.useEffect(() => {
    if (tokensWithUpdates) {
      tokensWithUpdates.forEach((token) => {
        const prev = previousPricesRef.current.get(token.id);
        if (prev !== token.price) {
          previousPricesRef.current.set(token.id, token.price);
        }
      });
    }
  }, [tokensWithUpdates]);

  // Filter tokens by category
  const tokensByCategory = React.useMemo(() => {
    if (!tokensWithUpdates) {
      return {
        new: [],
        "final-stretch": [],
        migrated: [],
      };
    }

    return {
      new: tokensWithUpdates.filter((t) => t.category === "new"),
      "final-stretch": tokensWithUpdates.filter(
        (t) => t.category === "final-stretch"
      ),
      migrated: tokensWithUpdates.filter((t) => t.category === "migrated"),
    };
  }, [tokensWithUpdates]);

  // Sort function
  const sortTokens = React.useCallback(
    (tokenList: Token[]) => {
      if (!sortColumn) return tokenList;

      return [...tokenList].sort((a, b) => {
        const aValue = a[sortColumn];
        const bValue = b[sortColumn];

        if (typeof aValue === "number" && typeof bValue === "number") {
          return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
        }

        if (typeof aValue === "string" && typeof bValue === "string") {
          return sortDirection === "asc"
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }

        return 0;
      });
    },
    [sortColumn, sortDirection]
  );

  // Sorted tokens by category
  const sortedTokens = React.useMemo(
    () => ({
      new: sortTokens(tokensByCategory.new),
      "final-stretch": sortTokens(tokensByCategory["final-stretch"]),
      migrated: sortTokens(tokensByCategory.migrated),
    }),
    [tokensByCategory, sortTokens]
  );

  const handleSort = React.useCallback(
    (column: string, direction: "asc" | "desc") => {
      setSortColumn(column as keyof Token);
      setSortDirection(direction);
    },
    []
  );

  const handleTokenClick = React.useCallback((token: Token) => {
    setSelectedToken(token);
  }, []);

  const handleCloseModal = React.useCallback(() => {
    setSelectedToken(null);
  }, []);

  // Loading state
  if (isLoading) {
    return (
      <div className="grid grid-cols-3 gap-[16px]">
        {Array.from({ length: 3 }).map((_, colIndex) => (
          <div key={colIndex} className="flex flex-col">
            <div className="mb-[12px] h-5 w-24 animate-pulse rounded bg-[#1A1A1D]" />
            <div className="flex flex-col gap-[8px]">
              {Array.from({ length: 8 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <ErrorBoundary>
        <div className="rounded-lg border border-red-500/50 bg-red-500/10 p-8 text-center">
          <p className="text-red-400">Failed to load tokens</p>
          <p className="mt-2 text-sm text-gray-400">
            {error instanceof Error ? error.message : "Unknown error"}
          </p>
        </div>
      </ErrorBoundary>
    );
  }

  const columns = [
    { key: "new" as const, title: "New Pairs" },
    { key: "final-stretch" as const, title: "Final Stretch" },
    { key: "migrated" as const, title: "Migrated" },
  ];

  return (
    <ErrorBoundary>
      <div className="space-y-[16px]">
        {/* Connection status */}
        {isConnected && (
          <div className="flex items-center gap-2 text-xs text-[#10B981]">
            <div className="h-2 w-2 animate-pulse rounded-full bg-[#10B981]" />
            Live updates active
          </div>
        )}

        {/* 3-Column Layout */}
        <div className="grid grid-cols-3 gap-[16px]">
          {columns.map((column) => (
            <div
              key={column.key}
              className="flex flex-col"
            >
              {/* Column Container: Title → P1/P2/P3 → Toolbar → Scroll → Cards */}
              <div className="flex flex-col gap-[8px]">
                {/* Column Header: Title + Count + Sort */}
                <ColumnHeader
                  title={column.title}
                  count={sortedTokens[column.key].length}
                  sortKey="price"
                  currentSort={{
                    column: sortColumn,
                    direction: sortDirection,
                  }}
                  onSort={handleSort}
                  preset={presets[column.key]}
                  onPresetChange={(preset) =>
                    setPresets((prev) => ({ ...prev, [column.key]: preset }))
                  }
                />

                {/* Scrollable Token List with Custom Scrollbar */}
                <div className="custom-scrollbar flex max-h-[800px] flex-col gap-[8px] overflow-y-auto">
                {sortedTokens[column.key].length === 0 ? (
                  <div className="py-8 text-center text-sm text-[rgba(255,255,255,0.4)]">
                    No tokens
                  </div>
                ) : (
                  sortedTokens[column.key].map((token) => {
                    const previousPrice =
                      previousPricesRef.current.get(token.id);
                    const priceDirection = priceDirections.get(token.id);

                    return (
                      <TokenCard
                        key={token.id}
                        token={token}
                        previousPrice={previousPrice}
                        priceDirection={priceDirection}
                        onTokenClick={handleTokenClick}
                      />
                    );
                  })
                )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Token detail modal */}
        <Dialog open={!!selectedToken} onOpenChange={handleCloseModal}>
          <DialogContent className="max-w-2xl bg-[#0F0F12] border-[#1A1A1D]">
            {selectedToken && (
              <>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-lg font-bold text-white">
                      {selectedToken.symbol.charAt(0)}
                    </div>
                    <div>
                      <div className="text-xl text-white">
                        {selectedToken.symbol}
                      </div>
                      <div className="text-sm font-normal text-[rgba(255,255,255,0.6)]">
                        {selectedToken.name}
                      </div>
                    </div>
                  </DialogTitle>
                  <DialogDescription className="text-[rgba(255,255,255,0.6)]">
                    Detailed information about {selectedToken.symbol}
                  </DialogDescription>
                </DialogHeader>
                <div className="mt-4 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-lg border border-[#1A1A1D] bg-[#0F0F12] p-4">
                      <div className="text-xs text-[rgba(255,255,255,0.4)]">
                        Current Price
                      </div>
                      <div className="mt-1 text-2xl font-bold text-white">
                        ${formatCurrency(selectedToken.price)}
                      </div>
                      <div
                        className={`mt-1 text-sm ${
                          selectedToken.priceChange24h >= 0
                            ? "text-[#10B981]"
                            : "text-[#EF4444]"
                        }`}
                      >
                        {formatPercent(selectedToken.priceChange24h)} (24h)
                      </div>
                    </div>
                    <div className="rounded-lg border border-[#1A1A1D] bg-[#0F0F12] p-4">
                      <div className="text-xs text-[rgba(255,255,255,0.4)]">
                        Market Cap
                      </div>
                      <div className="mt-1 text-2xl font-bold text-white">
                        ${formatCurrency(selectedToken.marketCap, 0)}
                      </div>
                    </div>
                    <div className="rounded-lg border border-[#1A1A1D] bg-[#0F0F12] p-4">
                      <div className="text-xs text-[rgba(255,255,255,0.4)]">
                        24h Volume
                      </div>
                      <div className="mt-1 text-2xl font-bold text-white">
                        ${formatCurrency(selectedToken.volume24h, 0)}
                      </div>
                    </div>
                    <div className="rounded-lg border border-[#1A1A1D] bg-[#0F0F12] p-4">
                      <div className="text-xs text-[rgba(255,255,255,0.4)]">
                        Liquidity
                      </div>
                      <div className="mt-1 text-2xl font-bold text-white">
                        ${formatCurrency(selectedToken.liquidity, 0)}
                      </div>
                    </div>
                  </div>
                  <div className="rounded-lg border border-[#1A1A1D] bg-[#0F0F12] p-4">
                    <div className="text-xs text-[rgba(255,255,255,0.4)]">
                      Pair Address
                    </div>
                    <div className="mt-1 font-mono text-sm text-white">
                      {selectedToken.pairAddress}
                    </div>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </ErrorBoundary>
  );
}
