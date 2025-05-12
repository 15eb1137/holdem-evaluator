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

export function getCardName(card: Card): string {
  return card.rank.symbol + card.suit;
}

// Define valid ranks and suits
const VALID_RANKS: string[] = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];
const VALID_SUITS: string[] = ['s', 'h', 'd', 'c'];

// Define suit priorities (s > h > d > c)
const SUIT_PRIORITIES: { [key: string]: number } = {
  's': 3,
  'h': 2,
  'd': 1,
  'c': 0
};

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
  private usedCards: Card[] = [];

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
  public evaluate(): { rank: number; name: string; nameJp: string; usedCards: Card[] } {
    // Reset usedCards
    this.usedCards = [];

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
    // Check for high card condition
    this.evaluateHighCard();

    // Return hand rank, name, and used cards
    if (this.royalFlush) {
      return { rank: 9, name: "Royal flush", nameJp: "ロイヤルフラッシュ", usedCards: this.usedCards };
    } else if (this.straightFlush) {
      return { rank: 8, name: "Straight flush", nameJp: "ストレートフラッシュ", usedCards: this.usedCards };
    } else if (this.fourOfAKind) {
      return { rank: 7, name: "Four of a kind", nameJp: "フォーカード", usedCards: this.usedCards };
    } else if (this.fullHouse) {
      return { rank: 6, name: "Full house", nameJp: "フルハウス", usedCards: this.usedCards };
    } else if (this.flush) {
      return { rank: 5, name: "Flush", nameJp: "フラッシュ", usedCards: this.usedCards };
    } else if (this.straight) {
      return { rank: 4, name: "Straight", nameJp: "ストレート", usedCards: this.usedCards };
    } else if (this.threeOfAKind) {
      return { rank: 3, name: "Three of a kind", nameJp: "スリーカード", usedCards: this.usedCards };
    } else if (this.twoPairs) {
      return { rank: 2, name: "Two pairs", nameJp: "ツーペア", usedCards: this.usedCards };
    } else if (this.pair) {
      return { rank: 1, name: "Pair", nameJp: "ワンペア", usedCards: this.usedCards };
    } else {
      return { rank: 0, name: "High card", nameJp: "ハイカード", usedCards: this.usedCards };
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

  // Sort cards by rank (high to low) and then by suit priority (s > h > d > c)
  private sortCards(cards: Card[]): Card[] {
    return [...cards].sort((a, b) => {
      // First sort by rank value (high to low)
      if (b.rank.value !== a.rank.value) {
        return b.rank.value - a.rank.value;
      }
      // If ranks are the same, sort by suit priority (s > h > d > c)
      return SUIT_PRIORITIES[b.suit] - SUIT_PRIORITIES[a.suit];
    });
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
        // Sort cards by rank value (high to low)
        const sortedCards = this.sortCards(cards);
        
        // Remove duplicates while preserving order
        const uniqueRanks: number[] = [];
        const uniqueRankCards: Card[] = [];
        for (let i = 0; i < sortedCards.length; i++) {
          if (!uniqueRanks.includes(sortedCards[i].rank.value)) {
            uniqueRanks.push(sortedCards[i].rank.value);
            uniqueRankCards.push(sortedCards[i]);
          }
        }

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
          
          // Set used cards for royal flush (A, K, Q, J, T of the same suit)
          this.usedCards = sortedCards.filter(card => 
            card.rank.value === 14 || // Ace
            card.rank.value === 13 || // King
            card.rank.value === 12 || // Queen
            card.rank.value === 11 || // Jack
            card.rank.value === 10    // Ten
          );
          
          return;
        }

        // Check for regular straight flush
        for (let i = 0; i <= uniqueRanks.length - 5; i++) {
          if (
            uniqueRanks[i] - uniqueRanks[i + 4] === 4 &&
            uniqueRanks[i] - uniqueRanks[i + 1] === 1 &&
            uniqueRanks[i + 1] - uniqueRanks[i + 2] === 1 &&
            uniqueRanks[i + 2] - uniqueRanks[i + 3] === 1 &&
            uniqueRanks[i + 3] - uniqueRanks[i + 4] === 1
          ) {
            this.straightFlush = true;
            
            // Set used cards for straight flush (5 consecutive cards of the same suit)
            this.usedCards = uniqueRankCards.slice(i, i + 5);
            
            return;
          }
        }

        // Special case: 5-4-3-2-A (Ace low straight flush)
        if (
          uniqueRanks.includes(5) &&
          uniqueRanks.includes(4) &&
          uniqueRanks.includes(3) &&
          uniqueRanks.includes(2) &&
          uniqueRanks.includes(14) // Ace
        ) {
          this.straightFlush = true;
          
          // Find the cards for 5-4-3-2-A straight flush
          const aceLowStraightFlush = [];
          for (const value of [5, 4, 3, 2, 14]) { // Order matters for display
            const card = sortedCards.find(c => c.rank.value === value);
            if (card) aceLowStraightFlush.push(card);
          }
          
          // Set used cards for Ace-low straight flush
          this.usedCards = aceLowStraightFlush;
          
          return;
        }
      }
    }
  }

  // Check if the hand contains four of a kind of the same rank
  private evaluateFourOfAKind(): void {
    // Skip if we already found a higher hand
    if (this.royalFlush || this.straightFlush) return;
    
    const rankCounts = this.countRanks();
    let fourOfAKindRank: string | null = null;

    // Check if any rank appears exactly 4 times
    for (const rankSymbol in rankCounts) {
      if (rankCounts[rankSymbol] === 4) {
        fourOfAKindRank = rankSymbol;
        this.fourOfAKind = true;
        break;
      }
    }

    if (this.fourOfAKind && fourOfAKindRank) {
      // Get the four cards of the same rank, sorted by suit priority
      const fourOfAKindCards = this.sortCards(this.cards.filter(card => card.rank.symbol === fourOfAKindRank));
      
      // Get the highest card that is not part of the four of a kind
      const excludeRanks = [fourOfAKindRank];
      const highCard = this.sortCards(this.cards.filter(card => !excludeRanks.includes(card.rank.symbol)))[0];
      
      // Set used cards (four of a kind + highest kicker)
      this.usedCards = [...fourOfAKindCards, highCard];
    }
  }

  // Check if the hand contains a full house (three of a kind and a pair)
  private evaluateFullHouse(): void {
    // Skip if we already found a higher hand
    if (this.royalFlush || this.straightFlush || this.fourOfAKind) return;
    
    const rankCounts = this.countRanks();
    let threeOfAKindRank: string | null = null;
    let pairRank: string | null = null;

    // Find the highest three of a kind
    for (const rankSymbol in rankCounts) {
      if (rankCounts[rankSymbol] === 3) {
        if (!threeOfAKindRank || Ranks[rankSymbol].value > Ranks[threeOfAKindRank].value) {
          threeOfAKindRank = rankSymbol;
        }
      }
    }

    // Find the highest pair
    for (const rankSymbol in rankCounts) {
      if (rankCounts[rankSymbol] === 2 || (rankCounts[rankSymbol] === 3 && rankSymbol !== threeOfAKindRank)) {
        if (rankSymbol !== threeOfAKindRank && (!pairRank || Ranks[rankSymbol].value > Ranks[pairRank].value)) {
          pairRank = rankSymbol;
        }
      }
    }

    // If both three of a kind and pair are found, set fullHouse to true
    if (threeOfAKindRank && pairRank) {
      this.fullHouse = true;
      
      // Get three of a kind cards sorted by suit priority
      const threeCards = this.sortCards(this.cards.filter(card => card.rank.symbol === threeOfAKindRank)).slice(0, 3);
      
      // Get pair cards sorted by suit priority
      const pairCards = this.sortCards(this.cards.filter(card => card.rank.symbol === pairRank)).slice(0, 2);
      
      // Set used cards (three of a kind + pair)
      this.usedCards = [...threeCards, ...pairCards];
    }
  }

  // Check if the hand contains five or more cards of the same suit (flush)
  private evaluateFlush(): void {
    // Skip if we already found a higher hand
    if (this.royalFlush || this.straightFlush || this.fourOfAKind || this.fullHouse) return;
    
    const suitCounts = this.countSuits();
    let flushSuit: string | null = null;

    // Check if any suit appears 5 or more times
    for (const suit in suitCounts) {
      if (suitCounts[suit] >= 5) {
        flushSuit = suit;
        this.flush = true;
        break;
      }
    }

    if (this.flush && flushSuit) {
      // Get all cards of the flush suit
      const flushCards = this.cards.filter(card => card.suit === flushSuit);
      
      // Sort by rank (high to low)
      const sortedFlushCards = this.sortCards(flushCards);
      
      // Take top 5 cards
      this.usedCards = sortedFlushCards.slice(0, 5);
    }
  }

  // Check if the hand contains five consecutive cards (straight)
  private evaluateStraight(): void {
    // Skip if we already found a higher hand
    if (this.royalFlush || this.straightFlush || this.fourOfAKind || this.fullHouse || this.flush) return;
    
    // Sort cards by rank (high to low) and suit priority
    const sortedCards = this.sortCards(this.cards);
    
    // Remove duplicates while preserving order for ranks
    const uniqueRanks: number[] = [];
    const uniqueRankCardsMap: Map<number, Card> = new Map();
    
    for (const card of sortedCards) {
      if (!uniqueRanks.includes(card.rank.value)) {
        uniqueRanks.push(card.rank.value);
        uniqueRankCardsMap.set(card.rank.value, card);
      }
    }
    
    // Sort ranks in descending order
    uniqueRanks.sort((a, b) => b - a);

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
        
        // Get the cards for the straight
        const straightCards: Card[] = [];
        for (let j = i; j < i + 5; j++) {
          const card = uniqueRankCardsMap.get(uniqueRanks[j]);
          if (card) straightCards.push(card);
        }
        
        // Set used cards (5 consecutive cards)
        this.usedCards = straightCards;
        
        return;
      }
    }

    // Special case: 5-4-3-2-A (Ace low straight)
    if (
      uniqueRanks.includes(5) &&
      uniqueRanks.includes(4) &&
      uniqueRanks.includes(3) &&
      uniqueRanks.includes(2) &&
      uniqueRanks.includes(14) // Ace
    ) {
      this.straight = true;
      
      // Get the cards for 5-4-3-2-A straight in correct order
      const straightCards: Card[] = [];
      for (const value of [5, 4, 3, 2, 14]) { // Order matters for display
        const card = uniqueRankCardsMap.get(value);
        if (card) straightCards.push(card);
      }
      
      // Set used cards for Ace-low straight
      this.usedCards = straightCards;
    }
  }

  // Check if the hand contains exactly three of a kind of the same rank
  private evaluateThreeOfAKind(): void {
    // Skip if we already found a higher hand
    if (this.royalFlush || this.straightFlush || this.fourOfAKind || this.fullHouse || this.flush || this.straight) return;
    
    const rankCounts = this.countRanks();
    let threeOfAKindRank: string | null = null;

    // Check if any rank appears exactly 3 times
    for (const rankSymbol in rankCounts) {
      if (rankCounts[rankSymbol] === 3) {
        threeOfAKindRank = rankSymbol;
        this.threeOfAKind = true;
        break;
      }
    }

    if (this.threeOfAKind && threeOfAKindRank) {
      // Get the three cards of the same rank, sorted by suit priority
      const threeOfAKindCards = this.sortCards(this.cards.filter(card => card.rank.symbol === threeOfAKindRank));
      
      // Get the two highest cards that are not part of the three of a kind
      const excludeRanks = [threeOfAKindRank];
      const highCards = this.sortCards(this.cards.filter(card => !excludeRanks.includes(card.rank.symbol))).slice(0, 2);
      
      // Set used cards (three of a kind + two highest kickers)
      this.usedCards = [...threeOfAKindCards, ...highCards];
    }
  }

  // Check if the hand contains exactly two pairs
  private evaluateTwoPairs(): void {
    // Skip if we already found a higher hand
    if (this.royalFlush || this.straightFlush || this.fourOfAKind || this.fullHouse || this.flush || this.straight || this.threeOfAKind) return;
    
    const rankCounts = this.countRanks();
    const pairRanks: string[] = [];

    // Find all pairs in the hand
    for (const rankSymbol in rankCounts) {
      if (rankCounts[rankSymbol] === 2) {
        pairRanks.push(rankSymbol);
      }
    }

    // If exactly two pairs are found, set twoPairs to true
    if (pairRanks.length >= 2) {
      this.twoPairs = true;
      
      // Sort pairs by rank (high to low)
      pairRanks.sort((a, b) => Ranks[b].value - Ranks[a].value);
      
      // Get top two pairs
      const topTwoPairRanks = pairRanks.slice(0, 2);
      
      // Get cards from first pair sorted by suit priority
      const firstPairCards = this.sortCards(this.cards.filter(card => card.rank.symbol === topTwoPairRanks[0]))
      
      // Get cards from second pair sorted by suit priority
      const secondPairCards = this.sortCards(this.cards.filter(card => card.rank.symbol === topTwoPairRanks[1]))
      
      // Get the highest card that is not part of the pairs
      const excludeRanks = [...topTwoPairRanks];
      const highCard = this.sortCards(this.cards.filter(card => !excludeRanks.includes(card.rank.symbol)))[0];
      
      // Set used cards (highest pair + second pair + highest kicker)
      this.usedCards = [...firstPairCards, ...secondPairCards, highCard];
    }
  }

  // Check if the hand contains exactly a pair
  private evaluatePair(): void {
    // Skip if we already found a higher hand
    if (this.royalFlush || this.straightFlush || this.fourOfAKind || this.fullHouse || this.flush || this.straight || this.threeOfAKind || this.twoPairs) return;
    
    const rankCounts = this.countRanks();
    let pairRank: string | null = null;

    // Find the highest pair in the hand
    for (const rankSymbol in rankCounts) {
      if (rankCounts[rankSymbol] === 2) {
        if (!pairRank || Ranks[rankSymbol].value > Ranks[pairRank].value) {
          pairRank = rankSymbol;
        }
      }
    }

    // If a pair is found, set pair to true
    if (pairRank) {
      this.pair = true;
      
      // Get the pair cards sorted by suit priority
      const pairCards = this.sortCards(this.cards.filter(card => card.rank.symbol === pairRank));
      
      // Get the three highest cards that are not part of the pair
      const excludeRanks = [pairRank];
      const highCards = this.sortCards(this.cards.filter(card => !excludeRanks.includes(card.rank.symbol))).slice(0, 3);
      
      // Set used cards (pair + three highest kickers)
      this.usedCards = [...pairCards, ...highCards];
    }
  }

  // Evaluate high card (when no other hand is found)
  private evaluateHighCard(): void {
    // Skip if we already found a higher hand
    if (this.royalFlush || this.straightFlush || this.fourOfAKind || this.fullHouse || this.flush || this.straight || this.threeOfAKind || this.twoPairs || this.pair) return;
    
    // Sort cards by rank (high to low) and suit priority
    const sortedCards = this.sortCards(this.cards);
    
    // Take top 5 cards
    this.usedCards = sortedCards.slice(0, 5);
  }
}

// Default export for Evaluator
export default Evaluator;
