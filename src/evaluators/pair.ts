import { type Card, HandType } from '../types/index.ts';
import { BaseHandEvaluator, type HandEvaluatorResult } from './base.ts';
import { countRanks, findHighestRankOfCount } from '../utils/counting.ts';
import { getCardsOfRank, getKickers } from '../utils/kickers.ts';

export class PairEvaluator extends BaseHandEvaluator {
  getHandType(): HandType {
    return HandType.PAIR;
  }

  evaluate(cards: Card[]): HandEvaluatorResult {
    const rankCounts = countRanks(cards);
    const pairRank = findHighestRankOfCount(rankCounts, 2);
    
    if (pairRank) {
      const pairCards = getCardsOfRank(cards, pairRank, 2);
      const kickers = getKickers(cards, [pairRank], 3);
      
      return {
        match: true,
        cards: [...pairCards, ...kickers],
      };
    }
    
    return { match: false, cards: [] };
  }
}
