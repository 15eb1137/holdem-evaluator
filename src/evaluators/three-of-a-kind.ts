import { type Card, HandType } from '../types/index.ts';
import { BaseHandEvaluator, type HandEvaluatorResult } from './base.ts';
import { countRanks, findHighestRankOfCount } from '../utils/counting.ts';
import { getCardsOfRank, getKickers } from '../utils/kickers.ts';

export class ThreeOfAKindEvaluator extends BaseHandEvaluator {
  getHandType(): HandType {
    return HandType.THREE_OF_A_KIND;
  }

  evaluate(cards: Card[]): HandEvaluatorResult {
    const rankCounts = countRanks(cards);
    const threeOfAKindRank = findHighestRankOfCount(rankCounts, 3);
    
    if (threeOfAKindRank) {
      const threeOfAKindCards = getCardsOfRank(cards, threeOfAKindRank, 3);
      const kickers = getKickers(cards, [threeOfAKindRank], 2);
      
      return {
        match: true,
        cards: [...threeOfAKindCards, ...kickers],
      };
    }
    
    return { match: false, cards: [] };
  }
}
