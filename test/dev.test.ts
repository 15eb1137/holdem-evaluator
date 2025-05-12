import { assertEquals } from "@std/assert";
import { Cards, Evaluator } from "../mod.ts";

Deno.test("Evaluate hand", () => {
  // 0. High card
  const cards0 = [
    Cards["2s"],
    Cards["4h"],
    Cards["6d"],
    Cards["8c"],
    Cards["Ts"],
    Cards["Qh"],
    Cards["Ad"],
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
    Cards["As"],
    Cards["Ah"],
    Cards["2d"],
    Cards["3c"],
    Cards["4s"],
    Cards["6h"],
    Cards["7d"],
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
    Cards["As"],
    Cards["Ah"],
    Cards["2d"],
    Cards["2c"],
    Cards["3s"],
    Cards["4h"],
    Cards["6d"],
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
    Cards["As"],
    Cards["Ah"],
    Cards["Ad"],
    Cards["2c"],
    Cards["3s"],
    Cards["4h"],
    Cards["6d"],
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
    Cards["2s"],
    Cards["3h"],
    Cards["4d"],
    Cards["5c"],
    Cards["6s"],
    Cards["Qh"],
    Cards["Kd"],
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
    Cards["As"],
    Cards["2h"],
    Cards["3d"],
    Cards["4c"],
    Cards["5s"],
    Cards["Qh"],
    Cards["Kd"],
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
    Cards["2s"],
    Cards["4s"],
    Cards["6s"],
    Cards["8s"],
    Cards["Ts"],
    Cards["Qh"],
    Cards["Ad"],
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
    Cards["As"],
    Cards["Ah"],
    Cards["Ad"],
    Cards["2c"],
    Cards["2s"],
    Cards["6h"],
    Cards["7d"],
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
    Cards["As"],
    Cards["Ah"],
    Cards["Ad"],
    Cards["Ac"],
    Cards["2s"],
    Cards["2h"],
    Cards["2d"],
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
    Cards["2s"],
    Cards["3s"],
    Cards["4s"],
    Cards["5s"],
    Cards["6s"],
    Cards["Qh"],
    Cards["Kd"],
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
    Cards["Ts"],
    Cards["Js"],
    Cards["Qs"],
    Cards["Ks"],
    Cards["As"],
    Cards["2h"],
    Cards["3d"],
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
