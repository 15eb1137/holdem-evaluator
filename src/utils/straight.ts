// Check for consecutive values
export function isConsecutive(values: number[]): boolean {
  if (values.length < 2) {
    return true;
  }
  
  for (let i = 0; i < values.length - 1; i++) {
    if (values[i] - values[i + 1] !== 1) {
      return false;
    }
  }
  
  return true;
}

// Check for Ace-low straight (5-4-3-2-A)
export function isAceLowStraight(uniqueRanks: number[]): boolean {
  const requiredRanks = [5, 4, 3, 2, 14]; // 14 is Ace
  return requiredRanks.every(rank => uniqueRanks.includes(rank));
}

// Check for Royal Flush (A-K-Q-J-T)
export function isRoyalFlush(uniqueRanks: number[]): boolean {
  const requiredRanks = [14, 13, 12, 11, 10]; // A, K, Q, J, T
  return requiredRanks.every(rank => uniqueRanks.includes(rank));
}

// Find all straights in a set of ranks
export function findStraights(uniqueRanks: number[]): number[][] {
  const straights: number[][] = [];
  const sortedRanks = [...uniqueRanks].sort((a, b) => b - a);
  
  // Check for regular straights
  for (let i = 0; i <= sortedRanks.length - 5; i++) {
    const sequence = sortedRanks.slice(i, i + 5);
    if (isConsecutive(sequence)) {
      straights.push(sequence);
    }
  }
  
  // Check for Ace-low straight
  if (isAceLowStraight(sortedRanks)) {
    straights.push([5, 4, 3, 2, 14]);
  }
  
  return straights;
}
