import { useQuery } from "@tanstack/react-query";
import { Token } from "@/types/token";
import { randomBetween } from "@/lib/utils";

/**
 * Mock function to fetch tokens
 * In production, this would be an API call
 */
async function fetchTokens(): Promise<Token[]> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const categories: Token["category"][] = ["new", "final-stretch", "migrated"];
  const tokens: Token[] = [];

  // Real token names matching Axiom Pulse style
  const tokenNames = [
    { symbol: "son son", name: "son son" },
    { symbol: "bb0", name: "babb0s" },
    { symbol: "WEIRD", name: "WeirdBrad" },
    { symbol: "GGN", name: "GreenGnome" },
    { symbol: "El Jefe", name: "El Jefe Pequeno" },
    { symbol: "xAI", name: "xAI" },
    { symbol: "Experiment", name: "The Mushroom Experiment" },
    { symbol: "BEARSASTER", name: "Bearsaster" },
    { symbol: "Bear Disaster", name: "Bear" },
    { symbol: "NIGBOB", name: "Niggerbob RapePants" },
    { symbol: "COCOTLAS", name: "The Spirit of Coconut" },
  ];

  // Generate mock tokens with real names
  for (let i = 0; i < 30; i++) {
    const category = categories[i % 3];
    const tokenName = tokenNames[i % tokenNames.length];
    const price = randomBetween(0.01, 1000);
    const priceChange = randomBetween(-50, 50);

    tokens.push({
      id: `token-${i}`,
      symbol: tokenName.symbol,
      name: tokenName.name,
      price,
      priceChange24h: priceChange,
      volume24h: randomBetween(10000, 1000000),
      marketCap: randomBetween(100000, 10000000),
      liquidity: randomBetween(50000, 500000),
      category,
      pairAddress: `0x${Math.random().toString(16).substring(2, 42)}`,
      createdAt: Date.now() - randomBetween(0, 86400000 * 7),
      lastUpdated: Date.now(),
      age: randomBetween(0.001, 168), // Can be seconds or hours
      txCount: randomBetween(100, 10000),
      holders: randomBetween(50, 5000),
      profit: randomBetween(-20, 100), // profit percentage
      wins: randomBetween(0, 50), // number of wins
    });
  }

  return tokens;
}

/**
 * Custom hook to fetch tokens using React Query
 */
export function useTokens() {
  return useQuery({
    queryKey: ["tokens"],
    queryFn: fetchTokens,
    staleTime: 30000, // Consider data fresh for 30 seconds
    refetchInterval: 60000, // Refetch every minute
  });
}

