import { type Card, HandType } from '../types/index.ts';
import { BaseHandEvaluator, type HandEvaluatorResult } from './base.ts';
import { getUniqueRanks } from '../utils/sorting.ts';
import { findStraights } from '../utils/straight.ts';

export class StraightEvaluator extends BaseHandEvaluator {
  getHandType(): HandType {
    return HandType.STRAIGHT;
  }

  evaluate(cards: Card[]): HandEvaluatorResult {
    const { ranks, cardMap } = getUniqueRanks(cards);
    const straights = findStraights(ranks);
    
    if (straights.length > 0) {
      const highestStraight = straights[0];
      const straightCards: Card[] = [];
      
      for (const value of highestStraight) {
        const card = cardMap.get(value);
        if (card) {
          straightCards.push(card);
        }
      }
      
      return {
        match: true,
        cards: straightCards,
      };
    }
    
    return { match: false, cards: [] };
  }
}
