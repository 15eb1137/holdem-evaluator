import type { Card } from '../types/index.ts';
import { sortCards } from './sorting.ts';

export function getKickers(cards: Card[], excludeRanks: string[], count: number): Card[] {
  const filteredCards = cards.filter(card => !excludeRanks.includes(card.rank.symbol));
  const sortedCards = sortCards(filteredCards);
  return sortedCards.slice(0, count);
}

export function getHighestCard(cards: Card[], excludeRanks: string[] = []): Card | undefined {
  const kickers = getKickers(cards, excludeRanks, 1);
  return kickers[0];
}

export function getCardsOfRank(cards: Card[], rank: string, limit?: number): Card[] {
  const matchingCards = cards.filter(card => card.rank.symbol === rank);
  const sortedCards = sortCards(matchingCards);
  return limit ? sortedCards.slice(0, limit) : sortedCards;
}
