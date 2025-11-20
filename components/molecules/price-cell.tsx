"use client";

import * as React from "react";
import { formatCurrency, formatPercent, getPriceChangeColor } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface PriceCellProps {
  price: number;
  priceChange24h: number;
  previousPrice?: number;
  className?: string;
}

/**
 * Price cell component with smooth color transitions
 * Shows price and 24h change with visual feedback
 */
export const PriceCell = React.memo<PriceCellProps>(
  ({ price, priceChange24h, previousPrice, className }) => {
    const [isUpdating, setIsUpdating] = React.useState(false);
    const priceRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
      if (previousPrice !== undefined && previousPrice !== price) {
        setIsUpdating(true);
        const timer = setTimeout(() => setIsUpdating(false), 500);
        return () => clearTimeout(timer);
      }
    }, [price, previousPrice]);

    const changeColor = getPriceChangeColor(priceChange24h);
    const bgColor =
      priceChange24h > 0
        ? "bg-green-500/10"
        : priceChange24h < 0
        ? "bg-red-500/10"
        : "bg-gray-800/50";

    return (
      <div
        className={cn(
          "flex flex-col gap-1 rounded px-2 py-1 transition-all duration-300",
          isUpdating && "scale-105",
          bgColor,
          className
        )}
        ref={priceRef}
      >
        <span className="text-sm font-semibold text-white">
          ${formatCurrency(price)}
        </span>
        <span className={cn("text-xs", changeColor)}>
          {formatPercent(priceChange24h)}
        </span>
      </div>
    );
  }
);

PriceCell.displayName = "PriceCell";

