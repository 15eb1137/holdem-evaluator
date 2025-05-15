import type { Card } from '../types/index.ts';
import { RANKS, VALID_RANKS, VALID_SUITS } from '../types/constants.ts';

export function generateCards(): Record<string, Card> {
  const cards: Record<string, Card> = {};
  
  for (const rank of VALID_RANKS) {
    for (const suit of VALID_SUITS) {
      const key = `${rank}${suit}`;
      cards[key] = { rank: RANKS[rank], suit };
    }
  }
  
  return cards;
}

export const Cards = generateCards();

export function getCardName(card: Card): string {
  return card.rank.symbol + card.suit;
}

export function parseCard(cardStr: string): Card {
  if (cardStr.length !== 2) {
    throw new Error(`Invalid card string: ${cardStr}`);
  }
  
  const rank = cardStr[0];
  const suit = cardStr[1];
  
  if (!VALID_RANKS.includes(rank as typeof VALID_RANKS[number])) {
    throw new Error(`Invalid rank: ${rank}`);
  }
  
  if (!VALID_SUITS.includes(suit as typeof VALID_SUITS[number])) {
    throw new Error(`Invalid suit: ${suit}`);
  }
  
  return { rank: RANKS[rank], suit };
}
