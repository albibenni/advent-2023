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

const currentCardRanking = new Map<string, number>();
const hands = new Map<string, string>(); //key = hand, value = handValue (ex: "High card 9")

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

const input = readFileSync("./src/day7/input/test.txt", "utf8").split(
  "\n",
) as string[];

input.forEach((line) => {
  const handAndBid = line.split(" ");
  log(getHandValue(handAndBid[0] as string));
});
