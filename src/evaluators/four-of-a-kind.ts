import { type Card, HandType } from '../types/index.ts';
import { BaseHandEvaluator, type HandEvaluatorResult } from './base.ts';
import { countRanks, findHighestRankOfCount } from '../utils/counting.ts';
import { getCardsOfRank, getHighestCard } from '../utils/kickers.ts';

export class FourOfAKindEvaluator extends BaseHandEvaluator {
  getHandType(): HandType {
    return HandType.FOUR_OF_A_KIND;
  }

  evaluate(cards: Card[]): HandEvaluatorResult {
    const rankCounts = countRanks(cards);
    const fourOfAKindRank = findHighestRankOfCount(rankCounts, 4);
    
    if (fourOfAKindRank) {
      const fourOfAKindCards = getCardsOfRank(cards, fourOfAKindRank, 4);
      const kicker = getHighestCard(cards, [fourOfAKindRank]);
      
      const resultCards = kicker 
        ? [...fourOfAKindCards, kicker]
        : fourOfAKindCards;
      
      return {
        match: true,
        cards: resultCards,
      };
    }
    
    return { match: false, cards: [] };
  }
}
