import type { Card, HandType } from '../types/index.ts';

export interface HandEvaluatorResult {
  match: boolean;
  cards: Card[];
}

export abstract class BaseHandEvaluator {
  abstract evaluate(cards: Card[]): HandEvaluatorResult;
  abstract getHandType(): HandType;
}
