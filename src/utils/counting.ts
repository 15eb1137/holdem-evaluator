import type { Card } from '../types/index.ts';

export function countRanks(cards: Card[]): Record<string, number> {
  const rankCounts: Record<string, number> = {};

  for (const card of cards) {
    const rankSymbol = card.rank.symbol;
    if (!rankCounts[rankSymbol]) {
      rankCounts[rankSymbol] = 0;
    }
    rankCounts[rankSymbol]++;
  }

  return rankCounts;
}

export function countSuits(cards: Card[]): Record<string, number> {
  const suitCounts: Record<string, number> = {};

  for (const card of cards) {
    if (!suitCounts[card.suit]) {
      suitCounts[card.suit] = 0;
    }
    suitCounts[card.suit]++;
  }

  return suitCounts;
}

export function findRankOfCount(rankCounts: Record<string, number>, count: number): string[] {
  const ranks: string[] = [];
  
  for (const rankSymbol in rankCounts) {
    if (rankCounts[rankSymbol] === count) {
      ranks.push(rankSymbol);
    }
  }
  
  return ranks;
}

export function findHighestRankOfCount(rankCounts: Record<string, number>, count: number): string | null {
  const ranks = findRankOfCount(rankCounts, count);
  
  if (ranks.length === 0) {
    return null;
  }
  
  // Sort by rank value (high to low)
  const rankValues: Record<string, number> = {
    'A': 14, 'K': 13, 'Q': 12, 'J': 11, 'T': 10,
    '9': 9, '8': 8, '7': 7, '6': 6, '5': 5, '4': 4, '3': 3, '2': 2
  };
  
  ranks.sort((a, b) => {
    const aValue = rankValues[a] || parseInt(a) || 0;
    const bValue = rankValues[b] || parseInt(b) || 0;
    return bValue - aValue;
  });
  
  return ranks[0];
}
