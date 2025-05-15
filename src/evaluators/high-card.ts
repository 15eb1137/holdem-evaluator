import { type Card, HandType } from '../types/index.ts';
import { BaseHandEvaluator, type HandEvaluatorResult } from './base.ts';
import { sortCards } from '../utils/sorting.ts';

export class HighCardEvaluator extends BaseHandEvaluator {
  getHandType(): HandType {
    return HandType.HIGH_CARD;
  }

  evaluate(cards: Card[]): HandEvaluatorResult {
    const sortedCards = sortCards(cards);
    
    return {
      match: true,
      cards: sortedCards.slice(0, 5),
    };
  }
}
