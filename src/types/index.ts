// Define core interfaces and types
export interface Rank {
  symbol: string;
  value: number;
}

export interface Card {
  rank: Rank;
  suit: string;
}

export interface EvaluatedHand {
  rank: number;
  name: string;
  nameJp: string;
  usedCards: Card[];
}

export enum HandType {
  ROYAL_FLUSH = 9,
  STRAIGHT_FLUSH = 8,
  FOUR_OF_A_KIND = 7,
  FULL_HOUSE = 6,
  FLUSH = 5,
  STRAIGHT = 4,
  THREE_OF_A_KIND = 3,
  TWO_PAIRS = 2,
  PAIR = 1,
  HIGH_CARD = 0,
}

export const HAND_NAMES: Record<HandType, { en: string; jp: string }> = {
  [HandType.ROYAL_FLUSH]: { en: "Royal flush", jp: "ロイヤルフラッシュ" },
  [HandType.STRAIGHT_FLUSH]: { en: "Straight flush", jp: "ストレートフラッシュ" },
  [HandType.FOUR_OF_A_KIND]: { en: "Four of a kind", jp: "フォーカード" },
  [HandType.FULL_HOUSE]: { en: "Full house", jp: "フルハウス" },
  [HandType.FLUSH]: { en: "Flush", jp: "フラッシュ" },
  [HandType.STRAIGHT]: { en: "Straight", jp: "ストレート" },
  [HandType.THREE_OF_A_KIND]: { en: "Three of a kind", jp: "スリーカード" },
  [HandType.TWO_PAIRS]: { en: "Two pairs", jp: "ツーペア" },
  [HandType.PAIR]: { en: "Pair", jp: "ワンペア" },
  [HandType.HIGH_CARD]: { en: "High card", jp: "ハイカード" },
};
