import { type Card, type EvaluatedHand, HAND_NAMES } from './types/index.ts';
import { validateCards, validateStartingHands } from './utils/validation.ts';
import { HandComparator } from './comparator.ts';
import {
  RoyalFlushEvaluator,
  StraightFlushEvaluator,
  FourOfAKindEvaluator,
  FullHouseEvaluator,
  FlushEvaluator,
  StraightEvaluator,
  ThreeOfAKindEvaluator,
  TwoPairsEvaluator,
  PairEvaluator,
  HighCardEvaluator,
} from './evaluators/index.ts';

export class Evaluator {
  private board: Card[];
  private evaluators = [
    new RoyalFlushEvaluator(),
    new StraightFlushEvaluator(),
    new FourOfAKindEvaluator(),
    new FullHouseEvaluator(),
    new FlushEvaluator(),
    new StraightEvaluator(),
    new ThreeOfAKindEvaluator(),
    new TwoPairsEvaluator(),
    new PairEvaluator(),
    new HighCardEvaluator(),
  ];

  constructor(board: Card[]) {
    validateCards(board);
    this.board = board;
  }

  public evaluate(startingHands: Card[]): EvaluatedHand {
    validateStartingHands(startingHands);
    
    const allCards = [...this.board, ...startingHands];
    validateCards(allCards);
    
    // Try each evaluator in order (from highest hand to lowest)
    for (const evaluator of this.evaluators) {
      const result = evaluator.evaluate(allCards);
      
      if (result.match) {
        const handType = evaluator.getHandType();
        const { en, jp } = HAND_NAMES[handType];
        
        return {
          rank: handType,
          name: en,
          nameJp: jp,
          usedCards: result.cards,
        };
      }
    }
    
    // This should never happen since high card always matches
    throw new Error('No valid hand found');
  }
  
  public compare(hands: EvaluatedHand[]): number[] {
    return HandComparator.compare(hands);
  }
}
