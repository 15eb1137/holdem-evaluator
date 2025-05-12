# Holdem Evaluator

テキサスホールデムのハンド評価ツール

## 機能

- ホールデムのハンド評価
- 複数ハンドの比較

## 使用例

```typescript
import Evaluator, { Cards } from "./mod.ts";

// ボードカードの定義
const board = [
  Cards["As"],
  Cards["Ah"],
  Cards["Kd"],
  Cards["7c"],
  Cards["2s"],
];

// プレイヤーのハンドカードの定義
const hand = [
  Cards["Jh"],
  Cards["Jd"],
];

// 評価
const evaluator = new Evaluator(board);
const result = evaluator.evaluate(hand);

console.log(result);
// {
//   rank: 2,
//   name: "Two pairs",
//   nameJp: "ツーペア",
//   usedCards: [
//     { rank: { symbol: "A", value: 14 }, suit: "s" },
//     { rank: { symbol: "A", value: 14 }, suit: "h" },
//     { rank: { symbol: "J", value: 11 }, suit: "h" },
//     { rank: { symbol: "J", value: 11 }, suit: "d" },
//     { rank: { symbol: "K", value: 13 }, suit: "d" }
//   ]
// }

// 比較
const board2 = [
  Cards["As"],
  Cards["Kd"],
  Cards["Qh"],
  Cards["5c"],
  Cards["2s"],
];

const evaluator2 = new Evaluator(board2);

// プレイヤー1のハンドを評価
const hand1 = evaluator2.evaluate([Cards["Ah"], Cards["Jd"]]);  // ワンペア（A）

// プレイヤー2のハンドを評価
const hand2 = evaluator2.evaluate([Cards["Kh"], Cards["Qc"]]);  // ツーペア（KとQ）

// ハンドの比較
const compResult = evaluator2.compare([hand1, hand2]);
console.log(compResult); // [0, 1] - プレイヤー2の勝ち
```

## 役の強さ

強い順に：

9. ロイヤルフラッシュ (Royal flush)
8. ストレートフラッシュ (Straight flush)
7. フォーカード (Four of a kind)
6. フルハウス (Full house)
5. フラッシュ (Flush)
4. ストレート (Straight)
3. スリーカード (Three of a kind)
2. ツーペア (Two pairs)
1. ワンペア (Pair)
0. ハイカード (High card)
