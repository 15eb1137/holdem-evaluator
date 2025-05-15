import { type Card, HandType } from '../types/index.ts';
import { BaseHandEvaluator, type HandEvaluatorResult } from './base.ts';
import { countRanks, findRankOfCount } from '../utils/counting.ts';
import { getCardsOfRank, getHighestCard } from '../utils/kickers.ts';
import { RANKS } from '../types/constants.ts';

export class TwoPairsEvaluator extends BaseHandEvaluator {
  getHandType(): HandType {
    return HandType.TWO_PAIRS;
  }

  evaluate(cards: Card[]): HandEvaluatorResult {
    const rankCounts = countRanks(cards);
    const pairRanks = findRankOfCount(rankCounts, 2);
    
    if (pairRanks.length >= 2) {
      // Sort pairs by rank value
      pairRanks.sort((a, b) => RANKS[b].value - RANKS[a].value);
      const topTwoPairRanks = pairRanks.slice(0, 2);
      
      const firstPairCards = getCardsOfRank(cards, topTwoPairRanks[0], 2);
      const secondPairCards = getCardsOfRank(cards, topTwoPairRanks[1], 2);
      const kicker = getHighestCard(cards, topTwoPairRanks);
      
      const resultCards = kicker 
        ? [...firstPairCards, ...secondPairCards, kicker]
        : [...firstPairCards, ...secondPairCards];
      
      return {
        match: true,
        cards: resultCards,
      };
    }
    
    return { match: false, cards: [] };
  }
}
