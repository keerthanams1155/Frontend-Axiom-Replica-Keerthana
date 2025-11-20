import { useEffect, useState, useCallback } from "react";
import { PriceUpdate } from "@/types/token";

/**
 * Custom hook to mock WebSocket connection for real-time price updates
 * Updates every 2 seconds with price changes
 */
export function useMockWebSocket(tokenIds: string[]) {
  const [updates, setUpdates] = useState<Map<string, PriceUpdate>>(new Map());
  const [isConnected, setIsConnected] = useState(false);
  const [priceDirections, setPriceDirections] = useState<
    Map<string, "up" | "down">
  >(new Map());

  const generateUpdate = useCallback(
    (
      tokenId: string,
      currentPrice?: number,
      currentChange?: number
    ): PriceUpdate => {
      const basePrice = currentPrice || 0.5;
      const baseChange = currentChange || 0;

      // Simulate realistic price movements
      const priceChange = (Math.random() - 0.5) * 0.1;
      const newPrice = Math.max(0.01, basePrice + priceChange);
      const newChange = baseChange + (Math.random() - 0.5) * 2;

      // Track direction for flash animation (only if price actually changed)
      if (currentPrice !== undefined && newPrice !== currentPrice) {
        const direction = newPrice > currentPrice ? "up" : "down";
        setPriceDirections((prev) => {
          const newDirs = new Map(prev);
          newDirs.set(tokenId, direction);
          // Clear direction after 200ms (flash duration)
          setTimeout(() => {
            setPriceDirections((p) => {
              const cleared = new Map(p);
              cleared.delete(tokenId);
              return cleared;
            });
          }, 200);
          return newDirs;
        });
      }

      return {
        tokenId,
        price: newPrice,
        priceChange24h: Math.max(-100, Math.min(100, newChange)),
        timestamp: Date.now(),
      };
    },
    []
  );

  useEffect(() => {
    if (tokenIds.length === 0) return;

    setIsConnected(true);

    // Initialize updates for all tokens
    const initialUpdates = new Map<string, PriceUpdate>();
    tokenIds.forEach((id) => {
      initialUpdates.set(id, generateUpdate(id));
    });
    setUpdates(initialUpdates);

    // Simulate WebSocket updates every 2 seconds
    const interval = setInterval(() => {
      setUpdates((prev) => {
        const newUpdates = new Map(prev);
        tokenIds.forEach((id) => {
          const current = prev.get(id);
          newUpdates.set(
            id,
            generateUpdate(id, current?.price, current?.priceChange24h)
          );
        });
        return newUpdates;
      });
    }, 2000);

    return () => {
      clearInterval(interval);
      setIsConnected(false);
    };
  }, [tokenIds, generateUpdate]);

  return { updates, isConnected, priceDirections };
}

