import { type Card, HandType } from '../types/index.ts';
import { BaseHandEvaluator, type HandEvaluatorResult } from './base.ts';
import { countSuits } from '../utils/counting.ts';
import { sortCards, getUniqueRanks } from '../utils/sorting.ts';
import { findStraights } from '../utils/straight.ts';

export class StraightFlushEvaluator extends BaseHandEvaluator {
  getHandType(): HandType {
    return HandType.STRAIGHT_FLUSH;
  }

  evaluate(cards: Card[]): HandEvaluatorResult {
    const suitCounts = countSuits(cards);
    
    // Check each suit for a straight flush
    for (const suit in suitCounts) {
      if (suitCounts[suit] >= 5) {
        const suitedCards = cards.filter(card => card.suit === suit);
        const sortedCards = sortCards(suitedCards);
        const { ranks, cardMap } = getUniqueRanks(suitedCards);
        
        // Find all straights in this suit
        const straights = findStraights(ranks);
        
        if (straights.length > 0) {
          // Get the highest straight
          const highestStraight = straights[0];
          const straightFlushCards: Card[] = [];
          
          for (const value of highestStraight) {
            const card = cardMap.get(value);
            if (card) {
              straightFlushCards.push(card);
            }
          }
          
          return {
            match: true,
            cards: straightFlushCards,
          };
        }
      }
    }
    
    return { match: false, cards: [] };
  }
}
