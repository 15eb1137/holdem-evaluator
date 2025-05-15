import { assertEquals } from "@std/assert";
import Evaluator, { Cards, type EvaluatedHand } from "../src/index.ts";

Deno.test("Compare hands", () => {
  const board0 = [
    Cards["Ad"],
    Cards["Ts"],
    Cards["8c"],
    Cards["6d"],
    Cards["4s"],
  ];
  const hand0A = <EvaluatedHand>{
    rank: 0,
    name: "High card",
    nameJp: "ハイカード",
    usedCards: [
    Cards["Ad"],
    Cards["Qh"],
    Cards["Ts"],
    Cards["8c"],
    Cards["6d"],
    ],
  };
  const hand0B = <EvaluatedHand>{
    rank: 1,
    name: "Pair",
    nameJp: "ワンペア",
    usedCards: [
      Cards["Ah"],
      Cards["Ad"],
      Cards["Ts"],
      Cards["8c"],
      Cards["6d"],
    ],
  };
  const evaluater0 = new Evaluator(board0);
  assertEquals(
    evaluater0.compare([hand0A, hand0B]),
    [0, 1],
    "High card should be less than pair",
  );

  const board1 = [
    Cards["Ts"],
    Cards["8c"],
    Cards["5d"],
    Cards["4s"],
    Cards["3h"],
  ];
  const hand1A = <EvaluatedHand>{
    rank: 1,
    name: "Pair",
    nameJp: "ワンペア",
    usedCards: [
      Cards["As"],
      Cards["Ah"],
      Cards["Ts"],
      Cards["8c"],
      Cards["5d"],
    ],
  };
  const hand1B = <EvaluatedHand>{
    rank: 1,
    name: "Pair",
    nameJp: "ワンペア",
    usedCards: [
      Cards["Ks"],
      Cards["Kh"],
      Cards["Ts"],
      Cards["8c"],
      Cards["5d"],
    ],
  };
  const evaluater1 = new Evaluator(board1);
  assertEquals(
    evaluater1.compare([hand1A, hand1B]),
    [1, 0],
    "Higher pair should be greater",
  );

  const board2 = [
    Cards["As"],
    Cards["Ah"],
    Cards["Ts"],
    Cards["5d"],
    Cards["2d"],
  ];
  const hand2A = <EvaluatedHand>{
    rank: 1,
    name: "Pair",
    nameJp: "ワンペア",
    usedCards: [
      Cards["As"],
      Cards["Ah"],
      Cards["Ts"],
      Cards["8s"],
      Cards["6d"],
    ],
  };
  const hand2B = <EvaluatedHand>{
    rank: 1,
    name: "Pair",
    nameJp: "ワンペア",
    usedCards: [
      Cards["As"],
      Cards["Ah"],
      Cards["Ts"],
      Cards["8c"],
      Cards["7h"],
    ],
  };
  const evaluater2 = new Evaluator(board2);
  assertEquals(
    evaluater2.compare([hand2A, hand2B]),
    [0, 1],
    "Higher kicker should be greater",);

  const board3 = [
    Cards["2s"],
    Cards["3h"],
    Cards["4s"],
    Cards["5d"],
    Cards["3d"],
  ];
  const hand3A = <EvaluatedHand>{
    rank: 2,
    name: "Two pairs",
    nameJp: "ツーペア",
    usedCards: [
      Cards["5h"],
      Cards["5d"],
      Cards["4s"],
      Cards["4c"],
      Cards["3h"],
    ],
  };
  const hand3B = <EvaluatedHand>{
    rank: 2,
    name: "Two pairs",
    nameJp: "ツーペア",
    usedCards: [
      Cards["9h"],
      Cards["9c"],
      Cards["3h"],
      Cards["3d"],
      Cards["5d"],
    ],
  };
  const evaluater3 = new Evaluator(board3);
  assertEquals(
    evaluater3.compare([hand3A, hand3B]),
    [0, 1],
    "Higher two pairs should be greater",
  );

  const board4 = [
    Cards["As"],
    Cards["Ah"],
    Cards["Tc"],
    Cards["5d"],
    Cards["2d"],
  ];
  const hand4A = <EvaluatedHand>{
    rank: 2,
    name: "Two pairs",
    nameJp: "ツーペア",
    usedCards: [
      Cards["As"],
      Cards["Ah"],
      Cards["5d"],
      Cards["5c"],
      Cards["Tc"],
    ],
  };
  const hand4B = <EvaluatedHand>{
    rank: 2,
    name: "Two pairs",
    nameJp: "ツーペア",
    usedCards: [
      Cards["As"],
      Cards["Ah"],
      Cards["Ts"],
      Cards["Tc"],
      Cards["5s"],
    ],
  };
  const evaluater4 = new Evaluator(board4);
  assertEquals(
    evaluater4.compare([hand4A, hand4B]),
    [0, 1],
    "Higher two pairs should be greater",
  );

  const board5 = [
    Cards["As"],
    Cards["Ks"],
    Cards["Qs"],
    Cards["Js"],
    Cards["Ts"],
  ];
  const hand5A = <EvaluatedHand>{
    rank: 9,
    name: "Royal flush",
    nameJp: "ロイヤルフラッシュ",
    usedCards: [
      Cards["As"],
      Cards["Ks"],
      Cards["Qs"],
      Cards["Js"],
      Cards["Ts"],
    ],
  };
  const hand5B = <EvaluatedHand>{
    rank: 9,
    name: "Royal flush",
    nameJp: "ロイヤルフラッシュ",
    usedCards: [
      Cards["As"],
      Cards["Ks"],
      Cards["Qs"],
      Cards["Js"],
      Cards["Ts"],
    ],
  };
  const evaluater5 = new Evaluator(board5);
  assertEquals(
    evaluater5.compare([hand5A, hand5B]),
    [0.5, 0.5],
    "Royal flush should be equal, share the pot",
  );
});
