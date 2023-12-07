import { log } from "console";
import { readFileSync } from "fs";

//two hands identical -> first card in hand wins (highest card) then second card etc.

// 2nd part = bid amount
// win = bid amount * rank (rank = ranking of the hands, 1 for the lowest, hands length for the highest)
// result = sum of all wins (for each hand)

const cardsRanking = new Map<string, number>([
  ["A", 14],
  ["K", 13],
  ["Q", 12],
  ["J", 11],
  ["T", 10],
  ["9", 9],
  ["8", 8],
  ["7", 7],
  ["6", 6],
  ["5", 5],
  ["4", 4],
  ["3", 3],
  ["2", 2],
]);
const cardsHandsRanking = new Map<string, number>([
  ["Five of a kind", 7],
  ["Four of a kind", 6],
  ["Full house", 5],
  ["Three of a kind", 4],
  ["Two pair", 3],
  ["One pair", 2],
  ["High card", 1],
]);

const handRankingByCards: number[] = [];
const handsRanks = new Map<number, number>(); //key = hand, value = handValue (ex: "High card 9")

// const assignCardsHand = (hand: string[]): string => {};

const getHandValue = (hand: string): Map<string, number> => {
  const handMatches = new Map<string, number>();
  for (let i = 0; i < 5; i++) {
    let matches = 0;
    const card = hand[i];
    for (let j = 0; j < 5; j++) {
      if (j === i) continue;
      if (card === hand[j]) matches++;
    }
    if (matches > 0) handMatches.set(card as string, matches);
  }
  return handMatches;
};

const assignHandsRanking = (handsMatches: Map<string, number>): number => {
  const handsRanking: number[] = [];
  const entries = handsMatches.keys();
  while (true) {
    const keyValue = entries.next().value;
    // handsMatches.get(keyValue);
    if (keyValue === undefined) break;

    // log("key", keyValue);
    handsRanking.push(handsMatches.get(keyValue) as number);
  }

  if (handsRanking.length === 0) {
    return 1;
  }
  if (handsRanking.length === 1) {
    if (handsRanking[0] === 4) {
      return 7;
    }
    if (handsRanking[0] === 3) {
      return 6;
    }
    if (handsRanking[0] === 2) {
      return 4;
    }
    if (handsRanking[0] === 1) {
      return 2;
    }
  }
  if (handsRanking.length === 2) {
    if (handsRanking[0] === 2 && handsRanking[1] === 1) {
      return 5;
    }
    if (handsRanking[0] === 1 && handsRanking[1] === 1) {
      return 3;
    }
  }
  return 0;
};

const input = readFileSync("./src/day7/input/test.txt", "utf8").split(
  "\n",
) as string[];

input.forEach((line) => {
  const handAndBid = line.split(" ");
  const handMatches: Map<string, number> = getHandValue(
    handAndBid[0] as string,
  );
  handRankingByCards.push(assignHandsRanking(handMatches));
});

const handRankingByCardsSorted = new Map<number, number>(
  [...handRankingByCards.entries()].sort((a, b) => a[1] - b[1]),
);

log("handRankingByCardsSorted", handRankingByCardsSorted);
let handsRanking: number[] = [];
// for (let i = 0; i < handRankingByCards.length; i++) {
//   let j = 0;
//   const similarHands: Map<number, number> = new Map<number, number>();
//   const element = handRankingByCards[i] as number;
//   similarHands.set(i, element);
//   while (++j < handRankingByCards.length) {
//     if (j === i) continue;
//     if (handRankingByCards[j] === element) {
//       similarHands.set(j, handRankingByCards[j] as number);
//     }
//   }
//   log("similarHands", similarHands);
// }
let currRanking = 1;

const getCardsValue = (
  handsRankingCheck: Map<number, number>,
  index: number,
): Map<number, number> => {
  const cardsValue = new Map<number, number>();
  handsRankingCheck.forEach((value, key) => {
    log(
      cardsValue.set(
        key,
        cardsRanking.get(input[key]![index] as string) as number,
      ),
    );
  });
  return cardsValue;
};

for (const [key, value] of handRankingByCardsSorted.entries()) {
  const handsRankingCheck = new Map<number, number>();
  handsRankingCheck.set(key, value);
  while (true) {
    const [key2, value2] = handRankingByCardsSorted.entries().next().value;
    if (key2 === undefined) break;
    if (value === value2) {
      handsRankingCheck.set(key2, value2);
    } else {
      break;
    }
  }
  if (handsRankingCheck.size > 1) {
    let i = 0;
    while (i < 5) {
      const firstCardCheck: Map<number, number> = getCardsValue(
        handsRankingCheck,
        i,
      );
      log("firstCardCheck", firstCardCheck);
      i++;
    }
  } else {
    handsRanks.set(key, currRanking++);
  }
}
