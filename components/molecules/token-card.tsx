"use client";

import * as React from "react";
import { Token } from "@/types/token";
import { formatCurrency, formatPercent } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { Clock, Eye, Flame, Link2, Trophy, Lock, Wallet } from "lucide-react";

interface TokenCardProps {
  token: Token;
  previousPrice?: number;
  priceDirection?: "up" | "down";
  flashColor?: "green" | "red" | null;
  onTokenClick?: (token: Token) => void;
}

/**
 * Card-style token row component matching Axiom Pulse design EXACTLY
 * Layout: LEFT (avatar + name + icons) | MIDDLE (metrics) | RIGHT (price)
 */
export const TokenCard = React.memo<TokenCardProps>(
  ({ token, previousPrice, priceDirection, flashColor, onTokenClick }) => {
    const [isHovered, setIsHovered] = React.useState(false);
    const [flashClass, setFlashClass] = React.useState<string>("");

    // Flash animation on price change
    React.useEffect(() => {
      if (flashColor) {
        setFlashClass(flashColor === "green" ? "flash-green" : "flash-red");
        const timer = setTimeout(() => setFlashClass(""), 200);
        return () => clearTimeout(timer);
      } else if (priceDirection && previousPrice !== undefined) {
        setFlashClass(priceDirection === "up" ? "flash-green" : "flash-red");
        const timer = setTimeout(() => setFlashClass(""), 200);
        return () => clearTimeout(timer);
      }
    }, [flashColor, priceDirection, previousPrice]);

    const handleClick = React.useCallback(() => {
      onTokenClick?.(token);
    }, [token, onTokenClick]);

    const getCategoryBadge = (category: Token["category"]) => {
      const baseClasses = "h-[18px] rounded-[6px] px-[6px] text-[10px] font-[600] leading-[14px]";
      switch (category) {
        case "new":
          return (
            <div className={cn("bg-[#3175FF] text-white", baseClasses)}>
              New Pair
            </div>
          );
        case "final-stretch":
          return (
            <div className={cn("bg-[#C99C00] text-white", baseClasses)}>
              Final Stretch
            </div>
          );
        case "migrated":
          return (
            <div className={cn("bg-[#0D9E59] text-white", baseClasses)}>
              Migrated
            </div>
          );
        default:
          return null;
      }
    };

    // Generate truncated address (like "Cqkk…cgTR")
    const truncatedAddress = React.useMemo(() => {
      const first = token.pairAddress.substring(0, 4);
      const last = token.pairAddress.substring(token.pairAddress.length - 4);
      return `${first}…${last}`;
    }, [token.pairAddress]);

    // Format time (age in hours to "3s", "5s", "15h", etc.)
    const formatTime = React.useMemo(() => {
      const hours = Math.floor(token.age);
      if (hours < 1) {
        const seconds = Math.floor(token.age * 3600);
        return `${seconds}s`;
      }
      return `${hours}h`;
    }, [token.age]);

    // Price colors match Axiom Pulse exactly
    // Positive = #0AFF6C, Negative = #FF3A3A

    return (
      <div
        className={cn(
          "group relative flex w-full cursor-pointer items-center gap-[12px] rounded-[12px] border border-[#23232A] bg-gradient-to-br from-[#111115] to-[#16161A] px-[12px] py-[8px] shadow-[0_0_4px_rgba(0,0,0,0.4)] transition-all duration-200",
          flashClass,
          isHovered && "scale-[1.02] brightness-110"
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
      >
        {/* LEFT SECTION: Avatar + Name + Subtitle + Icons Row */}
        <div className="flex min-w-0 flex-1 items-start gap-[12px]">
          {/* Avatar with Live Dot and Short-hand ID */}
          <div className="flex shrink-0 flex-col items-center gap-[4px]">
            <div className="relative">
              <div className="relative flex h-[48px] w-[48px] items-center justify-center overflow-hidden rounded-[8px] border border-[#23232A] bg-gradient-to-br from-blue-500 to-purple-600 shadow-sm">
                {token.imageUrl ? (
                  <img
                    src={token.imageUrl}
                    alt={token.symbol}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-base font-[700] text-white">
                    {token.symbol.charAt(0)}
                  </span>
                )}
              </div>
              {/* Green Live Dot */}
              <div className="absolute -right-[2px] -top-[2px] h-[10px] w-[10px] rounded-full border-2 border-[#111115] bg-[#10B981]" />
            </div>
            {/* Short-hand ID under avatar */}
            <span className="text-[9px] font-[500] leading-[11px] text-[rgba(255,255,255,0.45)]">
              {truncatedAddress}
            </span>
          </div>

          {/* Name, Subtitle, and Icons */}
          <div className="flex min-w-0 flex-1 flex-col gap-[4px]">
            {/* Name and Badge */}
            <div className="flex items-center gap-[6px]">
              <span className="truncate text-sm font-[600] leading-[18px] text-white">
                {token.symbol}
              </span>
              {getCategoryBadge(token.category)}
            </div>

            {/* Subtitle */}
            <span className="truncate text-xs font-[500] leading-[14px] text-[rgba(255,255,255,0.65)]">
              {token.name}
            </span>

            {/* Icons Row - Exact order from screenshot */}
            <div className="flex items-center gap-[4px]">
              {/* Time */}
              <div className="flex items-center gap-[3px]">
                <Clock className="h-[12px] w-[12px] text-[rgba(255,255,255,0.45)]" />
                <span className="text-[10px] font-[500] leading-[12px] text-[rgba(255,255,255,0.65)]">
                  {formatTime}
                </span>
              </div>

              {/* Eye (views) */}
              <div className="flex items-center gap-[3px]">
                <Eye className="h-[12px] w-[12px] text-[rgba(255,255,255,0.45)]" />
                <span className="text-[10px] font-[500] leading-[12px] text-[rgba(255,255,255,0.65)]">
                  {Math.floor(token.holders / 10)}
                </span>
              </div>

              {/* Fire (hot) */}
              <div className="flex items-center gap-[3px]">
                <Flame className="h-[12px] w-[12px] text-[rgba(255,255,255,0.45)]" />
                <span className="text-[10px] font-[500] leading-[12px] text-[rgba(255,255,255,0.65)]">
                  {Math.floor(token.txCount / 100)}
                </span>
              </div>

              {/* Chain */}
              <div className="flex items-center gap-[3px]">
                <Link2 className="h-[12px] w-[12px] text-[rgba(255,255,255,0.45)]" />
                <span className="text-[10px] font-[500] leading-[12px] text-[rgba(255,255,255,0.65)]">
                  {Math.floor(token.holders / 5)}
                </span>
              </div>

              {/* Trophy */}
              {token.profit !== undefined && (
                <div className="flex items-center gap-[3px]">
                  <Trophy className="h-[12px] w-[12px] text-[rgba(255,255,255,0.45)]" />
                  <span className="text-[10px] font-[500] leading-[12px] text-[rgba(255,255,255,0.65)]">
                    {token.wins || 0}
                  </span>
                </div>
              )}

              {/* Lock */}
              {token.wins !== undefined && token.wins > 0 && (
                <div className="flex items-center gap-[3px]">
                  <Lock className="h-[12px] w-[12px] text-[rgba(255,255,255,0.45)]" />
                  <span className="text-[10px] font-[500] leading-[12px] text-[rgba(255,255,255,0.65)]">
                    {token.wins}/{token.holders || 0}
                  </span>
                </div>
              )}

              {/* Wallet */}
              <div className="flex items-center gap-[3px]">
                <Wallet className="h-[12px] w-[12px] text-[rgba(255,255,255,0.45)]" />
                <span className="text-[10px] font-[500] leading-[12px] text-[rgba(255,255,255,0.65)]">
                  {token.holders}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* MIDDLE SECTION: Metrics Group (MC, V, F, TX) */}
        <div className="flex shrink-0 flex-col gap-[4px]">
          {/* MC (Market Cap) - Green */}
          <div className="flex items-center gap-[4px]">
            <span className="text-[10px] font-[500] leading-[12px] text-[rgba(255,255,255,0.45)]">
              MC:
            </span>
            <span className="text-[10px] font-[600] leading-[12px] text-[#10B981]">
              ${(token.marketCap / 1000).toFixed(2)}K
            </span>
          </div>

          {/* V (Volume) - Pink */}
          <div className="flex items-center gap-[4px]">
            <span className="text-[10px] font-[500] leading-[12px] text-[rgba(255,255,255,0.45)]">
              V:
            </span>
            <span className="text-[10px] font-[600] leading-[12px] text-[#EC4899]">
              ${(token.volume24h / 1000).toFixed(1)}K
            </span>
          </div>

          {/* F (Fee) */}
          <div className="flex items-center gap-[4px]">
            <span className="text-[10px] font-[500] leading-[12px] text-[rgba(255,255,255,0.45)]">
              F:
            </span>
            <span className="text-[10px] font-[600] leading-[12px] text-[rgba(255,255,255,0.65)]">
              {((token.liquidity / token.volume24h) * 100).toFixed(2)}
            </span>
          </div>

          {/* TX (Transactions) */}
          <div className="flex items-center gap-[4px]">
            <span className="text-[10px] font-[500] leading-[12px] text-[rgba(255,255,255,0.45)]">
              TX:
            </span>
            <span className="text-[10px] font-[600] leading-[12px] text-[rgba(255,255,255,0.65)]">
              {token.txCount}
            </span>
          </div>
        </div>

        {/* RIGHT SECTION: Price + Percentage */}
        <div className="flex shrink-0 flex-col items-end gap-[4px]">
          {/* Large Price on Top - Bright White */}
          <span className="text-sm font-[700] leading-[18px] text-[#FFFFFF]">
            ${formatCurrency(token.price)}
          </span>
          {/* Smaller Percentage Below - Exact Axiom Colors */}
          <span
            className={cn(
              "text-xs font-[600] leading-[14px]",
              token.priceChange24h >= 0
                ? "text-[#0AFF6C]"
                : "text-[#FF3A3A]"
            )}
          >
            {formatPercent(token.priceChange24h)}
          </span>
        </div>
      </div>
    );
  }
);

TokenCard.displayName = "TokenCard";
