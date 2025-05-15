import type { Card } from '../types/index.ts';
import { VALID_RANKS, VALID_SUITS } from '../types/constants.ts';

export function validateCards(cards: Card[]): void {
  // Check for invalid suits
  for (const card of cards) {
    if (!VALID_SUITS.includes(card.suit as typeof VALID_SUITS[number])) {
      throw new Error(
        `Invalid suit: ${card.suit}. Valid suits are: ${VALID_SUITS.join(", ")}`,
      );
    }
    if (!VALID_RANKS.includes(card.rank.symbol as typeof VALID_RANKS[number])) {
      throw new Error(
        `Invalid rank: ${card.rank.symbol}. Valid ranks are: ${VALID_RANKS.join(", ")}`,
      );
    }
  }

  // Check for more than 4 cards of the same rank
  const rankCounts: Record<string, number> = {};
  for (const card of cards) {
    const rankSymbol = card.rank.symbol;
    if (!rankCounts[rankSymbol]) {
      rankCounts[rankSymbol] = 0;
    }
    rankCounts[rankSymbol]++;

    if (rankCounts[rankSymbol] >= 5) {
      throw new Error(
        `Invalid hand: More than 4 cards of rank ${rankSymbol}`,
      );
    }
  }
}

export function validateStartingHands(cards: Card[]): void {
  if (cards.length !== 2) {
    throw new Error("Starting hands must contain exactly 2 cards.");
  }
}
