import { assert } from "@std/assert";
import { Evaluator } from "../mod.ts";

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