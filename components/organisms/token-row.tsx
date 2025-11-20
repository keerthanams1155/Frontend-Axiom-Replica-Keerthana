"use client";

import * as React from "react";
import { Token } from "@/types/token";
import { formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/atoms/badge";
import { PriceCell } from "@/components/molecules/price-cell";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/molecules/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/molecules/popover";
import { ExternalLink, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface TokenRowProps {
  token: Token;
  previousPrice?: number;
  onTokenClick?: (token: Token) => void;
}

/**
 * Token row component with interactive elements
 * Includes tooltips, popovers, and hover effects
 */
export const TokenRow = React.memo<TokenRowProps>(
  ({ token, previousPrice, onTokenClick }) => {
    const handleClick = React.useCallback(() => {
      onTokenClick?.(token);
    }, [token, onTokenClick]);

    const getCategoryBadge = (category: Token["category"]) => {
      switch (category) {
        case "new":
          return <Badge variant="info">New</Badge>;
        case "final-stretch":
          return <Badge variant="warning">Final Stretch</Badge>;
        case "migrated":
          return <Badge variant="success">Migrated</Badge>;
        default:
          return null;
      }
    };

    return (
      <tr
        className={cn(
          "group border-b border-gray-800 transition-colors hover:bg-gray-900/50",
          "cursor-pointer"
        )}
        onClick={handleClick}
      >
        <td className="px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-sm font-bold text-white">
              {token.symbol.charAt(0)}
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-white">{token.symbol}</span>
                {getCategoryBadge(token.category)}
              </div>
              <span className="text-xs text-gray-400">{token.name}</span>
            </div>
          </div>
        </td>

        <td className="px-4 py-4">
          <PriceCell
            price={token.price}
            priceChange24h={token.priceChange24h}
            previousPrice={previousPrice}
          />
        </td>

        <td className="px-4 py-4">
          <div className="flex flex-col">
            <span className="text-sm text-white">
              ${formatCurrency(token.volume24h, 0)}
            </span>
            <span className="text-xs text-gray-400">24h volume</span>
          </div>
        </td>

        <td className="px-4 py-4">
          <div className="flex flex-col">
            <span className="text-sm text-white">
              ${formatCurrency(token.marketCap, 0)}
            </span>
            <span className="text-xs text-gray-400">Market cap</span>
          </div>
        </td>

        <td className="px-4 py-4">
          <div className="flex flex-col">
            <span className="text-sm text-white">
              ${formatCurrency(token.liquidity, 0)}
            </span>
            <span className="text-xs text-gray-400">Liquidity</span>
          </div>
        </td>

        <td className="px-4 py-4">
          <div className="flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    className="rounded p-1 text-gray-400 transition-colors hover:bg-gray-800 hover:text-white"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Info className="h-4 w-4" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Token Information</p>
                  <p className="text-xs text-gray-300">
                    Pair: {token.pairAddress.slice(0, 6)}...
                    {token.pairAddress.slice(-4)}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <Popover>
              <PopoverTrigger asChild>
                <button
                  className="rounded p-1 text-gray-400 transition-colors hover:bg-gray-800 hover:text-white"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink className="h-4 w-4" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="space-y-3">
                  <h4 className="font-semibold text-white">Token Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Symbol:</span>
                      <span className="text-white">{token.symbol}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Name:</span>
                      <span className="text-white">{token.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Pair Address:</span>
                      <span className="font-mono text-xs text-white">
                        {token.pairAddress}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Category:</span>
                      <span className="text-white capitalize">
                        {token.category.replace("-", " ")}
                      </span>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </td>
      </tr>
    );
  }
);

TokenRow.displayName = "TokenRow";

