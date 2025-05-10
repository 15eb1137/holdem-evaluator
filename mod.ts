
// Define card interface
interface Card {
    rank: string;
    suit: string;
}

// Evaluator class to evaluate poker hands
export class Evaluator {
    private cards: Card[];
    public fourOfAKind: boolean = false;

    constructor(cards: Card[]) {
        this.cards = cards;
    }

    // Method to evaluate the hand
    evaluate(): void {
        // Check for four of a kind condition
        this.evaluateFourOfAKind();
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
}

// Default export for Evaluator
export default Evaluator;
