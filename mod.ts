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
  public straight: boolean = false;
  public threeOfAKind: boolean = false;
  public twoPairs: boolean = false;

  constructor(cards: Card[]) {
    this.cards = cards;
  }

  // Method to evaluate the hand
  evaluate(): void {
    // Check for four of a kind condition
    this.evaluateFourOfAKind();
    // Check for flush condition
    this.evaluateFlush();
    // Check for straight condition
    this.evaluateStraight();
    // Check for three of a kind condition
    this.evaluateThreeOfAKind();
    // Check for two pairs condition
    this.evaluateTwoPairs();
  }

  // Helper method to count occurrences of each rank
  private countRanks(): { [rank: string]: number } {
    const rankCounts: { [rank: string]: number } = {};

    for (const card of this.cards) {
      if (!rankCounts[card.rank]) {
        rankCounts[card.rank] = 0;
      }
      rankCounts[card.rank]++;
    }

    return rankCounts;
  }

  // Check if the hand contains four of a kind of the same rank
  private evaluateFourOfAKind(): void {
    const rankCounts = this.countRanks();

    // Check if any rank appears exactly 4 times
    for (const rank in rankCounts) {
      if (rankCounts[rank] === 4) {
        this.fourOfAKind = true;
        return;
      }
    }
  }

  // Helper method to count occurrences of each suit
  private countSuits(): { [suit: string]: number } {
    const suitCounts: { [suit: string]: number } = {};

    for (const card of this.cards) {
      if (!suitCounts[card.suit]) {
        suitCounts[card.suit] = 0;
      }
      suitCounts[card.suit]++;
    }

    return suitCounts;
  }

  // Check if the hand contains five or more cards of the same suit (flush)
  private evaluateFlush(): void {
    const suitCounts = this.countSuits();

    // Check if any suit appears 5 or more times
    for (const suit in suitCounts) {
      if (suitCounts[suit] >= 5) {
        this.flush = true;
        return;
      }
    }
  }

  // Check if the hand contains five consecutive cards (straight)
  private evaluateStraight(): void {
    // Convert card ranks to numeric values
    const rankValues: number[] = this.cards.map((card) => {
      switch (card.rank) {
        case "A":
          return 14; // Ace high
        case "K":
          return 13;
        case "Q":
          return 12;
        case "J":
          return 11;
        case "T":
          return 10;
        default:
          return parseInt(card.rank);
      }
    });

    // Sort ranks in descending order and remove duplicates
    const uniqueRanks = [...new Set(rankValues)].sort((a, b) => b - a);

    // Check for regular straight
    for (let i = 0; i <= uniqueRanks.length - 5; i++) {
      if (
        uniqueRanks[i] - uniqueRanks[i + 4] === 4 &&
        uniqueRanks[i] - uniqueRanks[i + 1] === 1 &&
        uniqueRanks[i + 1] - uniqueRanks[i + 2] === 1 &&
        uniqueRanks[i + 2] - uniqueRanks[i + 3] === 1 &&
        uniqueRanks[i + 3] - uniqueRanks[i + 4] === 1
      ) {
        this.straight = true;
        return;
      }
    }

    // Special case: A-5-4-3-2 (Ace low straight)
    if (
      uniqueRanks.includes(14) && // Ace
      uniqueRanks.includes(5) &&
      uniqueRanks.includes(4) &&
      uniqueRanks.includes(3) &&
      uniqueRanks.includes(2)
    ) {
      this.straight = true;
    }
  }

  // Check if the hand contains exactly three of a kind of the same rank
  private evaluateThreeOfAKind(): void {
    const rankCounts = this.countRanks();

    // Check if any rank appears exactly 3 times
    for (const rank in rankCounts) {
      if (rankCounts[rank] === 3) {
        this.threeOfAKind = true;
        return;
      }
    }
  }

  // Check if the hand contains exactly two pairs
  private evaluateTwoPairs(): void {
    const rankCounts = this.countRanks();
    let pairCount = 0;

    // Count how many pairs exist in the hand
    for (const rank in rankCounts) {
      if (rankCounts[rank] === 2) {
        pairCount++;
      }
    }

    // If exactly two pairs are found, set twoPairs to true
    if (pairCount === 2) {
      this.twoPairs = true;
    }
  }
}

// Default export for Evaluator
export default Evaluator;
