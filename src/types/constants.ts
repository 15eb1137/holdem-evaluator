// Define constants
export const VALID_RANKS = [
  "A",
  "K",
  "Q",
  "J",
  "T",
  "9",
  "8",
  "7",
  "6",
  "5",
  "4",
  "3",
  "2",
] as const;

export const VALID_SUITS = ["s", "h", "d", "c"] as const;

export const SUIT_PRIORITIES: Record<string, number> = {
  "s": 3,
  "h": 2,
  "d": 1,
  "c": 0,
};

export const RANKS: Record<string, { symbol: string; value: number }> = {
  "A": { symbol: "A", value: 14 },
  "K": { symbol: "K", value: 13 },
  "Q": { symbol: "Q", value: 12 },
  "J": { symbol: "J", value: 11 },
  "T": { symbol: "T", value: 10 },
  "9": { symbol: "9", value: 9 },
  "8": { symbol: "8", value: 8 },
  "7": { symbol: "7", value: 7 },
  "6": { symbol: "6", value: 6 },
  "5": { symbol: "5", value: 5 },
  "4": { symbol: "4", value: 4 },
  "3": { symbol: "3", value: 3 },
  "2": { symbol: "2", value: 2 },
};
