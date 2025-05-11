import { assert } from "@std/assert";
import { Evaluator } from "../mod.ts";

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
  assert(fourOfAKind.fourOfAKind, "The made hand meets the four of a kind condition");

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
