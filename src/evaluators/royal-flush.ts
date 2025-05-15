import { type Card, HandType } from '../types/index.ts';
import { BaseHandEvaluator, type HandEvaluatorResult } from './base.ts';
import { countSuits } from '../utils/counting.ts';
import { sortCards, getUniqueRanks } from '../utils/sorting.ts';
import { isRoyalFlush } from '../utils/straight.ts';

export class RoyalFlushEvaluator extends BaseHandEvaluator {
  getHandType(): HandType {
    return HandType.ROYAL_FLUSH;
  }

  evaluate(cards: Card[]): HandEvaluatorResult {
    const suitCounts = countSuits(cards);
    
    // Check each suit for a royal flush
    for (const suit in suitCounts) {
      if (suitCounts[suit] >= 5) {
        const suitedCards = cards.filter(card => card.suit === suit);
        const sortedCards = sortCards(suitedCards);
        const { ranks } = getUniqueRanks(suitedCards);
        
        if (isRoyalFlush(ranks)) {
          // Get the royal flush cards
          const royalFlushCards = sortedCards.filter(card => 
            [14, 13, 12, 11, 10].includes(card.rank.value)
          );
          
          return {
            match: true,
            cards: royalFlushCards.slice(0, 5),
          };
        }
      }
    }
    
    return { match: false, cards: [] };
  }
}
