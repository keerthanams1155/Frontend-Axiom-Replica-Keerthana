/**
 * Token category types
 */
export type TokenCategory = "new" | "final-stretch" | "migrated";

/**
 * Token interface representing a trading token
 */
export interface Token {
  id: string;
  symbol: string;
  name: string;
  price: number;
  priceChange24h: number;
  volume24h: number;
  marketCap: number;
  liquidity: number;
  category: TokenCategory;
  pairAddress: string;
  createdAt: number;
  lastUpdated: number;
  // Metrics for Axiom Pulse style
  age: number; // in hours
  txCount: number;
  holders: number;
  imageUrl?: string;
  profit?: number; // profit percentage
  wins?: number; // number of wins
}

/**
 * WebSocket message type for price updates
 */
export interface PriceUpdate {
  tokenId: string;
  price: number;
  priceChange24h: number;
  timestamp: number;
}

