import type { EvaluatedHand } from './types/index.ts';

export class HandComparator {
  static createStrengthKey(hand: EvaluatedHand): string {
    const values = hand.usedCards.map(card => card.rank.value);
    return `${hand.rank}:${values.join(':')}`;
  }
  
  static compare(hands: EvaluatedHand[]): number[] {
    if (hands.length === 0) {
      return [];
    }

    // Create a copy of the hands array with index
    const handsWithIndex = hands.map((hand, index) => ({ hand, index }));

    // Group hands by their strength
    const strengthGroups: Record<string, number[]> = {};

    for (const { hand, index } of handsWithIndex) {
      // Calculate a strength string for comparing hands
      const strengthKey = this.createStrengthKey(hand);
      
      if (!strengthGroups[strengthKey]) {
        strengthGroups[strengthKey] = [];
      }
      
      strengthGroups[strengthKey].push(index);
    }

    // Sort strength keys in descending order (highest strength first)
    const sortedStrengths = Object.keys(strengthGroups).sort((a, b) => {
      const valuesA = a.split(':').map(Number);
      const valuesB = b.split(':').map(Number);
      
      // Compare each strength component
      for (let i = 0; i < Math.min(valuesA.length, valuesB.length); i++) {
        if (valuesA[i] !== valuesB[i]) {
          return valuesB[i] - valuesA[i];
        }
      }
      
      return 0;
    });

    // Create result array (will contain 0 for losers, 1 for winners, 0.5 for ties)
    const result = Array(hands.length).fill(0);

    // Assign points to winners
    if (sortedStrengths.length > 0) {
      const winnersGroup = strengthGroups[sortedStrengths[0]];
      const valueToAssign = winnersGroup.length > 1 ? 0.5 : 1;
      
      for (const winnerIndex of winnersGroup) {
        result[winnerIndex] = valueToAssign;
      }
    }

    return result;
  }
}
