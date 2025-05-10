// Define card interface
interface Card {
  rank: string;
  suit: string;
}

// Evaluator class to evaluate poker hands
export class Evaluator {
  private cards: Card[];
  public fourOfAKind: boolean = false;
  public flush: boolean = false;

  constructor(cards: Card[]) {
    this.cards = cards;
  }

  // Method to evaluate the hand
  evaluate(): void {
    // Check for four of a kind condition
    this.evaluateFourOfAKind();
    // Check for flush condition
    this.evaluateFlush();
  }

  // Check if the hand contains four of a kind of the same rank
  private evaluateFourOfAKind(): void {
    // Count occurrences of each rank
    const rankCounts: { [rank: string]: number } = {};

    for (const card of this.cards) {
      if (!rankCounts[card.rank]) {
        rankCounts[card.rank] = 0;
      }
      rankCounts[card.rank]++;
    }

    // Check if any rank appears exactly 4 times
    for (const rank in rankCounts) {
      if (rankCounts[rank] === 4) {
        this.fourOfAKind = true;
        return;
      }
    }
  }

  // Check if the hand contains five or more cards of the same suit (flush)
  private evaluateFlush(): void {
    // Count occurrences of each suit
    const suitCounts: { [suit: string]: number } = {};

    for (const card of this.cards) {
      if (!suitCounts[card.suit]) {
        suitCounts[card.suit] = 0;
      }
      suitCounts[card.suit]++;
    }

    // Check if any suit appears 5 or more times
    for (const suit in suitCounts) {
      if (suitCounts[suit] >= 5) {
        this.flush = true;
        return;
      }
    }
  }
}

// Default export for Evaluator
export default Evaluator;
