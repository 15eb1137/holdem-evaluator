import { type Card, HandType } from '../types/index.ts';
import { BaseHandEvaluator, type HandEvaluatorResult } from './base.ts';
import { countSuits } from '../utils/counting.ts';
import { sortCards } from '../utils/sorting.ts';

export class FlushEvaluator extends BaseHandEvaluator {
  getHandType(): HandType {
    return HandType.FLUSH;
  }

  evaluate(cards: Card[]): HandEvaluatorResult {
    const suitCounts = countSuits(cards);
    
    for (const suit in suitCounts) {
      if (suitCounts[suit] >= 5) {
        const flushCards = cards.filter(card => card.suit === suit);
        const sortedFlushCards = sortCards(flushCards);
        
        return {
          match: true,
          cards: sortedFlushCards.slice(0, 5),
        };
      }
    }
    
    return { match: false, cards: [] };
  }
}
