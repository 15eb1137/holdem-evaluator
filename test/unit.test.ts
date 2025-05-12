import { assertEquals } from "@std/assert";
import { Cards, Evaluator, getCardName } from "../mod.ts";

Deno.test("Evaluate hand", () => {
  // 0. High card
  const board0 = [
    Cards["2s"],
    Cards["4h"],
    Cards["6d"],
    Cards["8c"],
    Cards["Ts"],
  ];
  const startingHands0 = [
    Cards["Qh"],
    Cards["Ad"],
  ];
  const expectedUsedCards0 = [
    Cards["Ad"],
    Cards["Qh"],
    Cards["Ts"],
    Cards["8c"],
    Cards["6d"],
  ];
  const highCard = new Evaluator(board0);
  const hand0 = highCard.evaluate(startingHands0);
  assertEquals(hand0.rank, 0, "The made hand is a high card");
  assertEquals(hand0.name, "High card", "The made hand name is a high card");
  assertEquals(
    hand0.nameJp,
    "ハイカード",
    "The made hand name in Japanese is a high card",
  );
  assertEquals(
    hand0.usedCards,
    expectedUsedCards0,
    `The made hand using cards are ${
      expectedUsedCards0.map((card) => getCardName(card)).join(", ")
    }`,
  );

  // 1. Pair
  const board1 = [
    Cards["As"],
    Cards["Ah"],
    Cards["2d"],
    Cards["3c"],
    Cards["4s"],
  ];
  const startingHands1 = [
    Cards["6h"],
    Cards["7d"],
  ];
  const expectedUsedCards1 = [
    Cards["As"],
    Cards["Ah"],
    Cards["7d"],
    Cards["6h"],
    Cards["4s"],
  ];
  const pair = new Evaluator(board1);
  const hand1 = pair.evaluate(startingHands1);
  assertEquals(hand1.rank, 1, "The made hand is a pair");
  assertEquals(hand1.name, "Pair", "The made hand name is a pair");
  assertEquals(
    hand1.nameJp,
    "ワンペア",
    "The made hand name in Japanese is ワンペア",
  );
  assertEquals(
    hand1.usedCards,
    expectedUsedCards1,
    `The made hand using cards are ${
      expectedUsedCards1.map((card) => getCardName(card)).join(", ")
    }`,
  );

  // 2. Two pairs
  const board2 = [
    Cards["As"],
    Cards["Ah"],
    Cards["2d"],
    Cards["2c"],
    Cards["3s"],
  ];
  const startingHands2 = [
    Cards["4h"],
    Cards["6d"],
  ];
  const expectedUsedCards2 = [
    Cards["As"],
    Cards["Ah"],
    Cards["2d"],
    Cards["2c"],
    Cards["6d"],
  ];
  const twoPair = new Evaluator(board2);
  const hand2 = twoPair.evaluate(startingHands2);
  assertEquals(hand2.rank, 2, "The made hand is two pairs");
  assertEquals(hand2.name, "Two pairs", "The made hand name is two pairs");
  assertEquals(
    hand2.nameJp,
    "ツーペア",
    "The made hand name in Japanese is ツーペア",
  );
  assertEquals(
    hand2.usedCards,
    expectedUsedCards2,
    `The made hand using cards are ${
      expectedUsedCards2.map((card) => getCardName(card)).join(", ")
    }`,
  );

  // 3. Three of a kind
  const board3 = [
    Cards["As"],
    Cards["Ah"],
    Cards["Ad"],
    Cards["2c"],
    Cards["3s"],
  ];
  const startingHands3 = [
    Cards["4h"],
    Cards["6d"],
  ];
  const expectedUsedCards3 = [
    Cards["As"],
    Cards["Ah"],
    Cards["Ad"],
    Cards["6d"],
    Cards["4h"],
  ];
  const threeOfAKind = new Evaluator(board3);
  const hand3 = threeOfAKind.evaluate(startingHands3);
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
  assertEquals(
    hand3.usedCards,
    expectedUsedCards3,
    `The made hand using cards are ${
      expectedUsedCards3.map((card) => getCardName(card)).join(", ")
    }`,
  );

  // 4-1. Straight
  const board41 = [
    Cards["2s"],
    Cards["3h"],
    Cards["4d"],
    Cards["5c"],
    Cards["6s"],
  ];
  const startingHands41 = [
    Cards["Qh"],
    Cards["Kd"],
  ];
  const expectedUsedCards41 = [
    Cards["6s"],
    Cards["5c"],
    Cards["4d"],
    Cards["3h"],
    Cards["2s"],
  ];
  const straight = new Evaluator(board41);
  const hand41 = straight.evaluate(startingHands41);
  assertEquals(hand41.rank, 4, "The made hand is straight");
  assertEquals(hand41.name, "Straight", "The made hand name is straight");
  assertEquals(
    hand41.nameJp,
    "ストレート",
    "The made hand name in Japanese is ストレート",
  );
  assertEquals(
    hand41.usedCards,
    expectedUsedCards41,
    `The made hand using cards are ${
      expectedUsedCards41.map((card) => getCardName(card)).join(", ")
    }`,
  );

  // 4-2. Straight with Ace low
  const board42 = [
    Cards["As"],
    Cards["2h"],
    Cards["3d"],
    Cards["4c"],
    Cards["5s"],
  ];
  const startingHands42 = [
    Cards["Qh"],
    Cards["Kd"],
  ];
  const expectedUsedCards42 = [
    Cards["5s"],
    Cards["4c"],
    Cards["3d"],
    Cards["2h"],
    Cards["As"],
  ];
  const straightWithAceLow = new Evaluator(board42);
  const hand42 = straightWithAceLow.evaluate(startingHands42);
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
  assertEquals(
    hand42.usedCards,
    expectedUsedCards42,
    `The made hand using cards are ${
      expectedUsedCards42.map((card) => getCardName(card)).join(", ")
    }`,
  );

  // 5. Flush
  const board5 = [
    Cards["2s"],
    Cards["4s"],
    Cards["6s"],
    Cards["8s"],
    Cards["Ts"],
  ];
  const startingHands5 = [
    Cards["Qh"],
    Cards["Ad"],
  ];
  const expectedUsedCards5 = [
    Cards["Ts"],
    Cards["8s"],
    Cards["6s"],
    Cards["4s"],
    Cards["2s"],
  ];
  const flush = new Evaluator(board5);
  const hand5 = flush.evaluate(startingHands5);
  assertEquals(hand5.rank, 5, "The made hand is flush");
  assertEquals(hand5.name, "Flush", "The made hand name is flush");
  assertEquals(
    hand5.nameJp,
    "フラッシュ",
    "The made hand name in Japanese is フラッシュ",
  );
  assertEquals(
    hand5.usedCards,
    expectedUsedCards5,
    `The made hand using cards are ${
      expectedUsedCards5.map((card) => getCardName(card)).join(", ")
    }`,
  );

  // 6. Full house
  const board6 = [
    Cards["As"],
    Cards["Ah"],
    Cards["Ad"],
    Cards["2c"],
    Cards["2s"],
  ];
  const startingHands6 = [
    Cards["6h"],
    Cards["7d"],
  ];
  const expectedUsedCards6 = [
    Cards["As"],
    Cards["Ah"],
    Cards["Ad"],
    Cards["2s"],
    Cards["2c"],
  ];
  const fullHouse = new Evaluator(board6);
  const hand6 = fullHouse.evaluate(startingHands6);
  assertEquals(hand6.rank, 6, "The made hand is full house");
  assertEquals(hand6.name, "Full house", "The made hand name is full house");
  assertEquals(
    hand6.nameJp,
    "フルハウス",
    "The made hand name in Japanese is フルハウス",
  );
  assertEquals(
    hand6.usedCards,
    expectedUsedCards6,
    `The made hand using cards are ${
      expectedUsedCards6.map((card) => getCardName(card)).join(", ")
    }`,
  );

  // 7. Four of a kind
  const board7 = [
    Cards["As"],
    Cards["Ah"],
    Cards["Ad"],
    Cards["Ac"],
    Cards["2s"],
  ];
  const startingHands7 = [
    Cards["2h"],
    Cards["2d"],
  ];
  const expectedUsedCards7 = [
    Cards["As"],
    Cards["Ah"],
    Cards["Ad"],
    Cards["Ac"],
    Cards["2s"],
  ];
  const fourOfAKind = new Evaluator(board7);
  const hand7 = fourOfAKind.evaluate(startingHands7);
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
  assertEquals(
    hand7.usedCards,
    expectedUsedCards7,
    `The made hand using cards are ${
      expectedUsedCards7.map((card) => getCardName(card)).join(", ")
    }`,
  );

  // 8. Straight flush
  const board8 = [
    Cards["2s"],
    Cards["3s"],
    Cards["4s"],
    Cards["5s"],
    Cards["6s"],
  ];
  const startingHands8 = [
    Cards["Qh"],
    Cards["Kd"],
  ];
  const expectedUsedCards8 = [
    Cards["6s"],
    Cards["5s"],
    Cards["4s"],
    Cards["3s"],
    Cards["2s"],
  ];
  const straightFlush = new Evaluator(board8);
  const hand8 = straightFlush.evaluate(startingHands8);
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
  assertEquals(
    hand8.usedCards,
    expectedUsedCards8,
    `The made hand using cards are ${
      expectedUsedCards8.map((card) => getCardName(card)).join(", ")
    }`,
  );

  // 9. Royal flush
  const board9 = [
    Cards["Ts"],
    Cards["Js"],
    Cards["Qs"],
    Cards["Ks"],
    Cards["As"],
  ];
  const startingHands9 = [
    Cards["2h"],
    Cards["3d"],
  ];
  const expectedUsedCards9 = [
    Cards["As"],
    Cards["Ks"],
    Cards["Qs"],
    Cards["Js"],
    Cards["Ts"],
  ];
  const royalFlush = new Evaluator(board9);
  const hand9 = royalFlush.evaluate(startingHands9);
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
  assertEquals(
    hand9.usedCards,
    expectedUsedCards9,
    `The made hand using cards are ${
      expectedUsedCards9.map((card) => getCardName(card)).join(", ")
    }`,
  );
});
