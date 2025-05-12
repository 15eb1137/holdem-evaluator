import { assert, assertEquals } from "@std/assert";
import { Evaluator } from "../mod.ts";

Deno.test("Royal flush condition", () => {
  // Test case for royal flush condition
  const cards1 = [
    { rank: "T", suit: "s" },
    { rank: "J", suit: "s" },
    { rank: "Q", suit: "s" },
    { rank: "K", suit: "s" },
    { rank: "A", suit: "s" },
    { rank: "2", suit: "h" },
    { rank: "3", suit: "d" },
  ];
  const royalFlush = new Evaluator(cards1);
  royalFlush.evaluate();
  assert(
    royalFlush.royalFlush,
    "The made hand meets the royal flush condition",
  );
  // Test case for no royal flush condition
  const cards2 = [
    { rank: "K", suit: "s" },
    { rank: "Q", suit: "s" },
    { rank: "J", suit: "s" },
    { rank: "T", suit: "s" },
    { rank: "9", suit: "s" },
    { rank: "2", suit: "d" },
    { rank: "3", suit: "d" },
  ];
  const noRoyalFlush = new Evaluator(cards2);
  noRoyalFlush.evaluate();
  assert(
    !noRoyalFlush.royalFlush,
    "The made hand does not meet the royal flush condition",
  );
});

Deno.test("Straight flush condition", () => {
  // Test case for straight flush condition
  const cards1 = [
    { rank: "2", suit: "s" },
    { rank: "3", suit: "s" },
    { rank: "4", suit: "s" },
    { rank: "5", suit: "s" },
    { rank: "6", suit: "s" },
    { rank: "Q", suit: "h" },
    { rank: "K", suit: "d" },
  ];
  const straightFlush = new Evaluator(cards1);
  straightFlush.evaluate();
  assert(
    straightFlush.straightFlush,
    "The made hand meets the straight flush condition",
  );

  // Test case for no straight flush condition
  const cards2 = [
    { rank: "2", suit: "s" },
    { rank: "3", suit: "s" },
    { rank: "4", suit: "s" },
    { rank: "5", suit: "s" },
    { rank: "6", suit: "h" },
    { rank: "Q", suit: "d" },
    { rank: "K", suit: "d" },
  ];
  const noStraightFlush = new Evaluator(cards2);
  noStraightFlush.evaluate();
  assert(
    !noStraightFlush.straightFlush,
    "The made hand does not meet the straight flush condition",
  );

  // Test case for straight flush with Ace low
  const cards3 = [
    { rank: "A", suit: "s" },
    { rank: "2", suit: "s" },
    { rank: "3", suit: "s" },
    { rank: "4", suit: "s" },
    { rank: "5", suit: "s" },
    { rank: "Q", suit: "h" },
    { rank: "K", suit: "d" },
  ];
  const straightFlushWithAceLow = new Evaluator(cards3);
  straightFlushWithAceLow.evaluate();
  assert(
    straightFlushWithAceLow.straightFlush,
    "The made hand meets the straight flush condition with Ace low",
  );
});

Deno.test("Four of a kind condition", () => {
  // Test case for four of a kind condition
  const cards1 = [
    { rank: "A", suit: "s" },
    { rank: "A", suit: "h" },
    { rank: "A", suit: "d" },
    { rank: "A", suit: "c" },
    { rank: "2", suit: "s" },
    { rank: "2", suit: "h" },
    { rank: "2", suit: "d" },
  ];

  const fourOfAKind = new Evaluator(cards1);
  fourOfAKind.evaluate();
  assert(
    fourOfAKind.fourOfAKind,
    "The made hand meets the four of a kind condition",
  );

  // Test case for no four of a kind condition
  const cards2 = [
    { rank: "A", suit: "s" },
    { rank: "A", suit: "h" },
    { rank: "A", suit: "d" },
    { rank: "2", suit: "c" },
    { rank: "2", suit: "s" },
    { rank: "2", suit: "h" },
    { rank: "3", suit: "d" },
  ];
  const noFourOfAKind = new Evaluator(cards2);
  noFourOfAKind.evaluate();
  assert(
    !noFourOfAKind.fourOfAKind,
    "The made hand does not meet the four of a kind condition",
  );
});

Deno.test("Full house condition", () => {
  // Test case for full house condition
  const cards1 = [
    { rank: "A", suit: "s" },
    { rank: "A", suit: "h" },
    { rank: "A", suit: "d" },
    { rank: "2", suit: "c" },
    { rank: "2", suit: "s" },
    { rank: "6", suit: "h" },
    { rank: "7", suit: "d" },
  ];
  const fullHouse = new Evaluator(cards1);
  fullHouse.evaluate();
  assert(
    fullHouse.fullHouse,
    "The made hand meets the full house condition",
  );

  // Test case for no full house condition
  const cards2 = [
    { rank: "A", suit: "s" },
    { rank: "A", suit: "h" },
    { rank: "A", suit: "d" },
    { rank: "2", suit: "c" },
    { rank: "3", suit: "s" },
    { rank: "6", suit: "h" },
    { rank: "7", suit: "d" },
  ];
  const noFullHouse = new Evaluator(cards2);
  noFullHouse.evaluate();
  assert(
    !noFullHouse.fullHouse,
    "The made hand does not meet the full house condition",
  );
});

Deno.test("Flush condition", () => {
  // Test case for flush condition
  const cards1 = [
    { rank: "2", suit: "s" },
    { rank: "4", suit: "s" },
    { rank: "6", suit: "s" },
    { rank: "8", suit: "s" },
    { rank: "T", suit: "s" },
    { rank: "Q", suit: "h" },
    { rank: "A", suit: "d" },
  ];

  const flush = new Evaluator(cards1);
  flush.evaluate();
  assert(flush.flush, "The made hand meets the flush condition");

  // Test case for no flush condition
  const cards2 = [
    { rank: "2", suit: "s" },
    { rank: "4", suit: "s" },
    { rank: "6", suit: "s" },
    { rank: "8", suit: "s" },
    { rank: "T", suit: "h" },
    { rank: "Q", suit: "d" },
    { rank: "A", suit: "c" },
  ];
  const noFlush = new Evaluator(cards2);
  noFlush.evaluate();
  assert(
    !noFlush.flush,
    "The made hand does not meet the flush condition",
  );
});

Deno.test("Straight condition", () => {
  // Test case for straight condition
  const cards1 = [
    { rank: "2", suit: "s" },
    { rank: "3", suit: "h" },
    { rank: "4", suit: "d" },
    { rank: "5", suit: "c" },
    { rank: "6", suit: "s" },
    { rank: "Q", suit: "h" },
    { rank: "K", suit: "d" },
  ];

  const straight = new Evaluator(cards1);
  straight.evaluate();
  assert(straight.straight, "The made hand meets the straight condition");

  // Test case for no straight condition
  const cards2 = [
    { rank: "2", suit: "s" },
    { rank: "3", suit: "h" },
    { rank: "4", suit: "d" },
    { rank: "5", suit: "c" },
    { rank: "K", suit: "s" },
    { rank: "Q", suit: "h" },
    { rank: "J", suit: "d" },
  ];
  const noStraight = new Evaluator(cards2);
  noStraight.evaluate();
  assert(
    !noStraight.straight,
    "The made hand does not meet the straight condition",
  );

  // Test case for straight with Ace low
  const cards3 = [
    { rank: "A", suit: "s" },
    { rank: "2", suit: "h" },
    { rank: "3", suit: "d" },
    { rank: "4", suit: "c" },
    { rank: "5", suit: "s" },
    { rank: "Q", suit: "h" },
    { rank: "K", suit: "d" },
  ];
  const straightWithAceLow = new Evaluator(cards3);
  straightWithAceLow.evaluate();
  assert(
    straightWithAceLow.straight,
    "The made hand meets the straight condition with Ace low",
  );
});

Deno.test("Three of a kind condition", () => {
  // Test case for three of a kind condition
  const cards1 = [
    { rank: "A", suit: "s" },
    { rank: "A", suit: "h" },
    { rank: "A", suit: "d" },
    { rank: "2", suit: "c" },
    { rank: "2", suit: "s" },
    { rank: "3", suit: "h" },
    { rank: "3", suit: "d" },
  ];

  const threeOfAKind = new Evaluator(cards1);
  threeOfAKind.evaluate();
  assert(
    threeOfAKind.threeOfAKind,
    "The made hand meets the three of a kind condition",
  );

  // Test case for no three of a kind condition
  const cards2 = [
    { rank: "A", suit: "s" },
    { rank: "A", suit: "h" },
    { rank: "2", suit: "d" },
    { rank: "2", suit: "c" },
    { rank: "3", suit: "s" },
    { rank: "3", suit: "h" },
    { rank: "4", suit: "d" },
  ];
  const noThreeOfAKind = new Evaluator(cards2);
  noThreeOfAKind.evaluate();
  assert(
    !noThreeOfAKind.threeOfAKind,
    "The made hand does not meet the three of a kind condition",
  );
});

Deno.test("Two pairs condition", () => {
  // Test case for two pairs condition
  const cards1 = [
    { rank: "A", suit: "s" },
    { rank: "A", suit: "h" },
    { rank: "2", suit: "d" },
    { rank: "2", suit: "c" },
    { rank: "3", suit: "s" },
    { rank: "4", suit: "h" },
    { rank: "6", suit: "d" },
  ];

  const twoPairs = new Evaluator(cards1);
  twoPairs.evaluate();
  assert(
    twoPairs.twoPairs,
    "The made hand meets the two pairs condition",
  );

  // Test case for no two pairs condition
  const cards2 = [
    { rank: "A", suit: "s" },
    { rank: "A", suit: "h" },
    { rank: "2", suit: "d" },
    { rank: "3", suit: "c" },
    { rank: "4", suit: "s" },
    { rank: "6", suit: "h" },
    { rank: "7", suit: "d" },
  ];
  const noTwoPairs = new Evaluator(cards2);
  noTwoPairs.evaluate();
  assert(
    !noTwoPairs.twoPairs,
    "The made hand does not meet the two pairs condition",
  );
});

Deno.test("Pair condition", () => {
  // Test case for a pair condition
  const cards1 = [
    { rank: "A", suit: "s" },
    { rank: "A", suit: "h" },
    { rank: "2", suit: "d" },
    { rank: "3", suit: "c" },
    { rank: "4", suit: "s" },
    { rank: "6", suit: "h" },
    { rank: "7", suit: "d" },
  ];

  const pair = new Evaluator(cards1);
  pair.evaluate();
  assert(pair.pair, "The made hand meets the pair condition");

  // Test case for no pair condition
  const cards2 = [
    { rank: "A", suit: "s" },
    { rank: "2", suit: "h" },
    { rank: "3", suit: "d" },
    { rank: "4", suit: "c" },
    { rank: "6", suit: "s" },
    { rank: "7", suit: "h" },
    { rank: "8", suit: "d" },
  ];
  const noPair = new Evaluator(cards2);
  noPair.evaluate();
  assert(
    !noPair.pair,
    "The made hand does not meet the pair condition",
  );
});

Deno.test("Evaluate hand", () => {
  // 0. High card
  const cards0 = [
    { rank: "2", suit: "s" },
    { rank: "4", suit: "h" },
    { rank: "6", suit: "d" },
    { rank: "8", suit: "c" },
    { rank: "T", suit: "s" },
    { rank: "Q", suit: "h" },
    { rank: "A", suit: "d" },
  ];
  const highCard = new Evaluator(cards0);
  const hand0 = highCard.evaluate();
  assertEquals(hand0.rank, 0, "The made hand is a high card");
  assertEquals(hand0.name, "High card", "The made hand name is a high card");
  assertEquals(
    hand0.nameJp,
    "ハイカード",
    "The made hand name in Japanese is a high card",
  );

  // 1. Pair
  const cards1 = [
    { rank: "A", suit: "s" },
    { rank: "A", suit: "h" },
    { rank: "2", suit: "d" },
    { rank: "3", suit: "c" },
    { rank: "4", suit: "s" },
    { rank: "6", suit: "h" },
    { rank: "7", suit: "d" },
  ];
  const pair = new Evaluator(cards1);
  const hand1 = pair.evaluate();
  assertEquals(hand1.rank, 1, "The made hand is a pair");
  assertEquals(hand1.name, "Pair", "The made hand name is a pair");
  assertEquals(
    hand1.nameJp,
    "ワンペア",
    "The made hand name in Japanese is ワンペア",
  );

  // 2. Two pairs
  const cards2 = [
    { rank: "A", suit: "s" },
    { rank: "A", suit: "h" },
    { rank: "2", suit: "d" },
    { rank: "2", suit: "c" },
    { rank: "3", suit: "s" },
    { rank: "4", suit: "h" },
    { rank: "6", suit: "d" },
  ];
  const twoPair = new Evaluator(cards2);
  const hand2 = twoPair.evaluate();
  assertEquals(hand2.rank, 2, "The made hand is two pairs");
  assertEquals(hand2.name, "Two pairs", "The made hand name is two pairs");
  assertEquals(
    hand2.nameJp,
    "ツーペア",
    "The made hand name in Japanese is ツーペア",
  );

  // 3. Three of a kind
  const cards3 = [
    { rank: "A", suit: "s" },
    { rank: "A", suit: "h" },
    { rank: "A", suit: "d" },
    { rank: "2", suit: "c" },
    { rank: "3", suit: "s" },
    { rank: "4", suit: "h" },
    { rank: "6", suit: "d" },
  ];
  const threeOfAKind = new Evaluator(cards3);
  const hand3 = threeOfAKind.evaluate();
  assertEquals(hand3.rank, 3, "The made hand is three of a kind");
  assertEquals(
    hand3.name,
    "Three of a kind",
    "The made hand name is three of a kind",
  );
  assertEquals(
    hand3.nameJp,
    "スリーカード",
    "The made hand name in Japanese is スリーカード",
  );

  // 4-1. Straight
  const cards41 = [
    { rank: "2", suit: "s" },
    { rank: "3", suit: "h" },
    { rank: "4", suit: "d" },
    { rank: "5", suit: "c" },
    { rank: "6", suit: "s" },
    { rank: "Q", suit: "h" },
    { rank: "K", suit: "d" },
  ];
  const straight = new Evaluator(cards41);
  const hand41 = straight.evaluate();
  assertEquals(hand41.rank, 4, "The made hand is straight");
  assertEquals(hand41.name, "Straight", "The made hand name is straight");
  assertEquals(
    hand41.nameJp,
    "ストレート",
    "The made hand name in Japanese is ストレート",
  );

  // 4-2. Straight with Ace low
  const cards42 = [
    { rank: "A", suit: "s" },
    { rank: "2", suit: "h" },
    { rank: "3", suit: "d" },
    { rank: "4", suit: "c" },
    { rank: "5", suit: "s" },
    { rank: "Q", suit: "h" },
    { rank: "K", suit: "d" },
  ];
  const straightWithAceLow = new Evaluator(cards42);
  const hand42 = straightWithAceLow.evaluate();
  assertEquals(hand42.rank, 4, "The made hand is straight with Ace low");
  assertEquals(
    hand42.name,
    "Straight",
    "The made hand name is straight",
  );
  assertEquals(
    hand42.nameJp,
    "ストレート",
    "The made hand name in Japanese is ストレート",
  );

  // 5. Flush
  const cards5 = [
    { rank: "2", suit: "s" },
    { rank: "4", suit: "s" },
    { rank: "6", suit: "s" },
    { rank: "8", suit: "s" },
    { rank: "T", suit: "s" },
    { rank: "Q", suit: "h" },
    { rank: "A", suit: "d" },
  ];
  const flush = new Evaluator(cards5);
  const hand5 = flush.evaluate();
  assertEquals(hand5.rank, 5, "The made hand is flush");
  assertEquals(hand5.name, "Flush", "The made hand name is flush");
  assertEquals(
    hand5.nameJp,
    "フラッシュ",
    "The made hand name in Japanese is フラッシュ",
  );

  // 6. Full house
  const cards6 = [
    { rank: "A", suit: "s" },
    { rank: "A", suit: "h" },
    { rank: "A", suit: "d" },
    { rank: "2", suit: "c" },
    { rank: "2", suit: "s" },
    { rank: "6", suit: "h" },
    { rank: "7", suit: "d" },
  ];
  const fullHouse = new Evaluator(cards6);
  const hand6 = fullHouse.evaluate();
  assertEquals(hand6.rank, 6, "The made hand is full house");
  assertEquals(hand6.name, "Full house", "The made hand name is full house");
  assertEquals(
    hand6.nameJp,
    "フルハウス",
    "The made hand name in Japanese is フルハウス",
  );

  // 7. Four of a kind
  const cards7 = [
    { rank: "A", suit: "s" },
    { rank: "A", suit: "h" },
    { rank: "A", suit: "d" },
    { rank: "A", suit: "c" },
    { rank: "2", suit: "s" },
    { rank: "2", suit: "h" },
    { rank: "2", suit: "d" },
  ];
  const fourOfAKind = new Evaluator(cards7);
  const hand7 = fourOfAKind.evaluate();
  assertEquals(hand7.rank, 7, "The made hand is four of a kind");
  assertEquals(
    hand7.name,
    "Four of a kind",
    "The made hand name is four of a kind",
  );
  assertEquals(
    hand7.nameJp,
    "フォーカード",
    "The made hand name in Japanese is フォーカード",
  );

  // 8. Straight flush
  const cards8 = [
    { rank: "2", suit: "s" },
    { rank: "3", suit: "s" },
    { rank: "4", suit: "s" },
    { rank: "5", suit: "s" },
    { rank: "6", suit: "s" },
    { rank: "Q", suit: "h" },
    { rank: "K", suit: "d" },
  ];
  const straightFlush = new Evaluator(cards8);
  const hand8 = straightFlush.evaluate();
  assertEquals(hand8.rank, 8, "The made hand is straight flush");
  assertEquals(
    hand8.name,
    "Straight flush",
    "The made hand name is straight flush",
  );
  assertEquals(
    hand8.nameJp,
    "ストレートフラッシュ",
    "The made hand name in Japanese is ストレートフラッシュ",
  );

  // 9. Royal flush
  const cards9 = [
    { rank: "T", suit: "s" },
    { rank: "J", suit: "s" },
    { rank: "Q", suit: "s" },
    { rank: "K", suit: "s" },
    { rank: "A", suit: "s" },
    { rank: "2", suit: "h" },
    { rank: "3", suit: "d" },
  ];
  const royalFlush = new Evaluator(cards9);
  const hand9 = royalFlush.evaluate();
  assertEquals(hand9.rank, 9, "The made hand is royal flush");
  assertEquals(
    hand9.name,
    "Royal flush",
    "The made hand name is royal flush",
  );
  assertEquals(
    hand9.nameJp,
    "ロイヤルフラッシュ",
    "The made hand name in Japanese is ロイヤルフラッシュ",
  );
});
