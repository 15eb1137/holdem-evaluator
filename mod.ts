// Define rank interface
interface Rank {
  symbol: string; // 'A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'
  value: number;  // Numeric value of the rank (14 for Ace high, 13 for King, etc.)
}

// Define card interface with Rank
interface Card {
  rank: Rank;
  suit: string;
}

// Define valid ranks and suits
const VALID_RANKS: string[] = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];
const VALID_SUITS: string[] = ['s', 'h', 'd', 'c'];

// Create Rank objects for all possible ranks
const Ranks: { [key: string]: Rank } = {
  'A': { symbol: 'A', value: 14 },
  'K': { symbol: 'K', value: 13 },
  'Q': { symbol: 'Q', value: 12 },
  'J': { symbol: 'J', value: 11 },
  'T': { symbol: 'T', value: 10 },
  '9': { symbol: '9', value: 9 },
  '8': { symbol: '8', value: 8 },
  '7': { symbol: '7', value: 7 },
  '6': { symbol: '6', value: 6 },
  '5': { symbol: '5', value: 5 },
  '4': { symbol: '4', value: 4 },
  '3': { symbol: '3', value: 3 },
  '2': { symbol: '2', value: 2 },
};

// Create Card objects for all possible ranks and suits
export const Cards: { [key: string]: Card } = {
  'As': { rank: Ranks['A'], suit: 's' },
  'Ah': { rank: Ranks['A'], suit: 'h' },
  'Ad': { rank: Ranks['A'], suit: 'd' },
  'Ac': { rank: Ranks['A'], suit: 'c' },
  'Ks': { rank: Ranks['K'], suit: 's' },
  'Kh': { rank: Ranks['K'], suit: 'h' },
  'Kd': { rank: Ranks['K'], suit: 'd' },
  'Kc': { rank: Ranks['K'], suit: 'c' },
  'Qs': { rank: Ranks['Q'], suit: 's' },
  'Qh': { rank: Ranks['Q'], suit: 'h' },
  'Qd': { rank: Ranks['Q'], suit: 'd' },
  'Qc': { rank: Ranks['Q'], suit: 'c' },
  'Js': { rank: Ranks['J'], suit: 's' },
  'Jh': { rank: Ranks['J'], suit: 'h' },
  'Jd': { rank: Ranks['J'], suit: 'd' },
  'Jc': { rank: Ranks['J'], suit: 'c' },
  'Ts': { rank: Ranks['T'], suit: 's' },
  'Th': { rank: Ranks['T'], suit: 'h' },
  'Td': { rank: Ranks['T'], suit: 'd' },
  'Tc': { rank: Ranks['T'], suit: 'c' },
  '9s': { rank: Ranks['9'], suit: 's' },
  '9h': { rank: Ranks['9'], suit: 'h' },
  '9d': { rank: Ranks['9'], suit: 'd' },
  '9c': { rank: Ranks['9'], suit: 'c' },
  '8s': { rank: Ranks['8'], suit: 's' },
  '8h': { rank: Ranks['8'], suit: 'h' },
  '8d': { rank: Ranks['8'], suit: 'd' },
  '8c': { rank: Ranks['8'], suit: 'c' },
  '7s': { rank: Ranks['7'], suit: 's' },
  '7h': { rank: Ranks['7'], suit: 'h' },
  '7d': { rank: Ranks['7'], suit: 'd' },
  '7c': { rank: Ranks['7'], suit: 'c' },
  '6s': { rank: Ranks['6'], suit: 's' },
  '6h': { rank: Ranks['6'], suit: 'h' },
  '6d': { rank: Ranks['6'], suit: 'd' },
  '6c': { rank: Ranks['6'], suit: 'c' },
  '5s': { rank: Ranks['5'], suit: 's' },
  '5h': { rank: Ranks['5'], suit: 'h' },
  '5d': { rank: Ranks['5'], suit: 'd' },
  '5c': { rank: Ranks['5'], suit: 'c' },
  '4s': { rank: Ranks['4'], suit: 's' },
  '4h': { rank: Ranks['4'], suit: 'h' },
  '4d': { rank: Ranks['4'], suit: 'd' },
  '4c': { rank: Ranks['4'], suit: 'c' },
  '3s': { rank: Ranks['3'], suit: 's' },
  '3h': { rank: Ranks['3'], suit: 'h' },
  '3d': { rank: Ranks['3'], suit: 'd' },
  '3c': { rank: Ranks['3'], suit: 'c' },
  '2s': { rank: Ranks['2'], suit: 's' },
  '2h': { rank: Ranks['2'], suit: 'h' },
  '2d': { rank: Ranks['2'], suit: 'd' },
  '2c': { rank: Ranks['2'], suit: 'c' },
};

// Evaluator class to evaluate poker hands
export class Evaluator {
  private cards: Card[];
  private royalFlush: boolean = false;
  private straightFlush: boolean = false;
  private fourOfAKind: boolean = false;
  private fullHouse: boolean = false;
  private flush: boolean = false;
  private straight: boolean = false;
  private threeOfAKind: boolean = false;
  private twoPairs: boolean = false;
  private pair: boolean = false;

  constructor(cards: Card[]) {
    // Validate cards
    this.validateCards(cards);
    this.cards = cards;
  }

  // Validate cards
  private validateCards(cards: Card[]): void {
    // Check for invalid suits
    for (const card of cards) {
      if (!VALID_SUITS.includes(card.suit)) {
        throw new Error(`Invalid suit: ${card.suit}. Valid suits are: ${VALID_SUITS.join(', ')}`);
      }
      if (!VALID_RANKS.includes(card.rank.symbol)) {
        throw new Error(`Invalid rank: ${card.rank.symbol}. Valid ranks are: ${VALID_RANKS.join(', ')}`);
      }
    }

    // Check for more than 4 cards of the same rank
    const rankCounts: { [rankSymbol: string]: number } = {};
    for (const card of cards) {
      const rankSymbol = card.rank.symbol;
      if (!rankCounts[rankSymbol]) {
        rankCounts[rankSymbol] = 0;
      }
      rankCounts[rankSymbol]++;
      
      if (rankCounts[rankSymbol] >= 5) {
        throw new Error(`Invalid hand: More than 4 cards of rank ${rankSymbol}`);
      }
    }
  }

  // Method to evaluate the hand
  public evaluate(): { rank: number; name: string; nameJp: string } {
    // Check for straight flush condition (includes royal flush)
    this.evaluateStraightFlush();
    // Check for four of a kind condition
    this.evaluateFourOfAKind();
    // Check for full house condition
    this.evaluateFullHouse();
    // Check for flush condition
    this.evaluateFlush();
    // Check for straight condition
    this.evaluateStraight();
    // Check for three of a kind condition
    this.evaluateThreeOfAKind();
    // Check for two pairs condition
    this.evaluateTwoPairs();
    // Check for pair condition
    this.evaluatePair();

    // Return hand rank and name
    if (this.royalFlush) {
      return { rank: 9, name: "Royal flush", nameJp: "ロイヤルフラッシュ" };
    } else if (this.straightFlush) {
      return { rank: 8, name: "Straight flush", nameJp: "ストレートフラッシュ" };
    } else if (this.fourOfAKind) {
      return { rank: 7, name: "Four of a kind", nameJp: "フォーカード" };
    } else if (this.fullHouse) {
      return { rank: 6, name: "Full house", nameJp: "フルハウス" };
    } else if (this.flush) {
      return { rank: 5, name: "Flush", nameJp: "フラッシュ" };
    } else if (this.straight) {
      return { rank: 4, name: "Straight", nameJp: "ストレート" };
    } else if (this.threeOfAKind) {
      return { rank: 3, name: "Three of a kind", nameJp: "スリーカード" };
    } else if (this.twoPairs) {
      return { rank: 2, name: "Two pairs", nameJp: "ツーペア" };
    } else if (this.pair) {
      return { rank: 1, name: "Pair", nameJp: "ワンペア" };
    } else {
      return { rank: 0, name: "High card", nameJp: "ハイカード" };
    }
  }

  // Helper method to count occurrences of each rank
  private countRanks(): { [rankSymbol: string]: number } {
    const rankCounts: { [rankSymbol: string]: number } = {};

    for (const card of this.cards) {
      const rankSymbol = card.rank.symbol;
      if (!rankCounts[rankSymbol]) {
        rankCounts[rankSymbol] = 0;
      }
      rankCounts[rankSymbol]++;
    }

    return rankCounts;
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

  // Check if the hand contains a straight flush
  private evaluateStraightFlush(): void {
    // Get cards of each suit
    const suitedCards: { [suit: string]: Card[] } = {};

    for (const card of this.cards) {
      if (!suitedCards[card.suit]) {
        suitedCards[card.suit] = [];
      }
      suitedCards[card.suit].push(card);
    }

    // Check each suit group for a straight
    for (const suit in suitedCards) {
      const cards = suitedCards[suit];

      // Only proceed if we have at least 5 cards of this suit
      if (cards.length >= 5) {
        // Get rank values directly from Rank interface
        const rankValues: number[] = cards.map(card => card.rank.value);

        // Sort ranks in descending order and remove duplicates
        const uniqueRanks = [...new Set(rankValues)].sort((a, b) => b - a);

        // Check for Royal Flush (A, K, Q, J, T of the same suit)
        if (
          uniqueRanks.includes(14) && // Ace
          uniqueRanks.includes(13) && // King
          uniqueRanks.includes(12) && // Queen
          uniqueRanks.includes(11) && // Jack
          uniqueRanks.includes(10) // Ten
        ) {
          this.royalFlush = true;
          this.straightFlush = true; // Royal flush is also a straight flush
          return;
        }

        // Check for regular straight
        for (let i = 0; i <= uniqueRanks.length - 5; i++) {
          if (
            uniqueRanks[i] - uniqueRanks[i + 4] === 4 &&
            uniqueRanks[i] - uniqueRanks[i + 1] === 1 &&
            uniqueRanks[i + 1] - uniqueRanks[i + 2] === 1 &&
            uniqueRanks[i + 2] - uniqueRanks[i + 3] === 1 &&
            uniqueRanks[i + 3] - uniqueRanks[i + 4] === 1
          ) {
            this.straightFlush = true;
            return;
          }
        }

        // Special case: A-5-4-3-2 (Ace low straight)
        if (
          uniqueRanks.includes(5) &&
          uniqueRanks.includes(4) &&
          uniqueRanks.includes(3) &&
          uniqueRanks.includes(2) &&
          uniqueRanks.includes(14) // Ace
        ) {
          this.straightFlush = true;
          return;
        }
      }
    }
  }

  // Check if the hand contains four of a kind of the same rank
  private evaluateFourOfAKind(): void {
    const rankCounts = this.countRanks();

    // Check if any rank appears exactly 4 times
    for (const rankSymbol in rankCounts) {
      if (rankCounts[rankSymbol] === 4) {
        this.fourOfAKind = true;
        return;
      }
    }
  }

  // Check if the hand contains a full house (three of a kind and a pair)
  private evaluateFullHouse(): void {
    const rankCounts = this.countRanks();
    let hasThreeOfAKind = false;
    let hasPair = false;

    // Check for three of a kind and pair in the hand
    for (const rankSymbol in rankCounts) {
      if (rankCounts[rankSymbol] === 3) {
        hasThreeOfAKind = true;
      } else if (rankCounts[rankSymbol] === 2) {
        hasPair = true;
      }
    }

    // If both three of a kind and pair are found, set fullHouse to true
    if (hasThreeOfAKind && hasPair) {
      this.fullHouse = true;
    }
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
    // Get rank values directly from Rank interface
    const rankValues: number[] = this.cards.map(card => card.rank.value);

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
    for (const rankSymbol in rankCounts) {
      if (rankCounts[rankSymbol] === 3) {
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
    for (const rankSymbol in rankCounts) {
      if (rankCounts[rankSymbol] === 2) {
        pairCount++;
      }
    }

    // If exactly two pairs are found, set twoPairs to true
    if (pairCount === 2) {
      this.twoPairs = true;
    }
  }

  // Check if the hand contains exactly a pair
  private evaluatePair(): void {
    const rankCounts = this.countRanks();
    let pairCount = 0;

    // Count pairs in the hand
    for (const rankSymbol in rankCounts) {
      if (rankCounts[rankSymbol] === 2) {
        pairCount++;
      }
    }

    // If exactly a pair is found, set pair to true
    if (pairCount === 1) {
      this.pair = true;
    }
  }
}

// Default export for Evaluator
export default Evaluator;
