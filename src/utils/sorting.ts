import type { Card } from '../types/index.ts';
import { SUIT_PRIORITIES } from '../types/constants.ts';

export function sortCards(cards: Card[]): Card[] {
  return [...cards].sort((a, b) => {
    // First sort by rank value (high to low)
    if (b.rank.value !== a.rank.value) {
      return b.rank.value - a.rank.value;
    }
    // If ranks are the same, sort by suit priority (s > h > d > c)
    return SUIT_PRIORITIES[b.suit] - SUIT_PRIORITIES[a.suit];
  });
}

export function getUniqueRanks(cards: Card[]): { ranks: number[]; cardMap: Map<number, Card> } {
  const sortedCards = sortCards(cards);
  const uniqueRanks: number[] = [];
  const uniqueRankCardsMap: Map<number, Card> = new Map();

  for (const card of sortedCards) {
    if (!uniqueRanks.includes(card.rank.value)) {
      uniqueRanks.push(card.rank.value);
      uniqueRankCardsMap.set(card.rank.value, card);
    }
  }

  return { ranks: uniqueRanks, cardMap: uniqueRankCardsMap };
}
