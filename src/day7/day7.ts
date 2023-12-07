import { log } from "console";
import { readFileSync } from "fs";

const strength = [
  "A",
  "K",
  "Q",
  "J",
  "T",
  "9",
  "8",
  "7",
  "6",
  "5",
  "4",
  "3",
  "2",
];
const strengthWithJoker = [
  "A",
  "K",
  "Q",
  "T",
  "9",
  "8",
  "7",
  "6",
  "5",
  "4",
  "3",
  "2",
  "J",
];
const letters = "abcdefghijklmnopqrstuvwxyz";
const parseInput = (rawInput: string) =>
  rawInput.split("\n").map((l) => l.split(" "));

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const types = input
    .map(([cards, bid]) => {
      const same = [...new Set(cards!.split(""))]
        .map((c) => cards!.split("").filter((x) => x === c).length)
        .sort((a, b) => b - a)
        .join("");
      const cardsPoints = cards!
        .split("")
        .map((c) => letters[strength.indexOf(c)])
        .join("");
      return { same, cards, bid: Number(bid), cardsPoints };
    })
    .sort((a, b) => b.cardsPoints.localeCompare(a.cardsPoints))
    .sort((a, b) => a.same.localeCompare(b.same))
    .map((x, i) => ({ ...x, rank: i + 1 }))
    .reduce((acc, v) => acc + v.bid * v.rank, 0);
  return types;
};

log(part1(readFileSync("./src/day7/input/input.txt", "utf8") as string));
