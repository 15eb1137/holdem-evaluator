import { type Card, HandType } from '../types/index.ts';
import { BaseHandEvaluator, type HandEvaluatorResult } from './base.ts';
import { countRanks, findRankOfCount } from '../utils/counting.ts';
import { getCardsOfRank } from '../utils/kickers.ts';
import { RANKS } from '../types/constants.ts';

export class FullHouseEvaluator extends BaseHandEvaluator {
  getHandType(): HandType {
    return HandType.FULL_HOUSE;
  }

  evaluate(cards: Card[]): HandEvaluatorResult {
    const rankCounts = countRanks(cards);
    const threeOfAKindRanks = findRankOfCount(rankCounts, 3);
    const pairRanks = findRankOfCount(rankCounts, 2);
    
    // Add three of a kind ranks to pair ranks (in case we have two three of a kinds)
    const allPairRanks = [...pairRanks, ...threeOfAKindRanks];
    
    if (threeOfAKindRanks.length > 0 && allPairRanks.length > 1) {
      // Sort three of a kind ranks by value
      threeOfAKindRanks.sort((a, b) => RANKS[b].value - RANKS[a].value);
      const bestThreeOfAKind = threeOfAKindRanks[0];
      
      // Get remaining pairs (excluding the three of a kind we're using)
      const remainingPairRanks = allPairRanks.filter(rank => rank !== bestThreeOfAKind);
      remainingPairRanks.sort((a, b) => RANKS[b].value - RANKS[a].value);
      const bestPair = remainingPairRanks[0];
      
      const threeCards = getCardsOfRank(cards, bestThreeOfAKind, 3);
      const pairCards = getCardsOfRank(cards, bestPair, 2);
      
      return {
        match: true,
        cards: [...threeCards, ...pairCards],
      };
    }
    
    return { match: false, cards: [] };
  }
}
