import { log } from "console";
import { readFileSync } from "fs";

//two hands identical -> first card in hand wins (highest card) then second card etc.

// 2nd part = bid amount
// win = bid amount * rank (rank = ranking of the hands, 1 for the lowest, hands length for the highest)
// result = sum of all wins (for each hand)

const input = readFileSync("./src/day6/input/input.txt", "utf8").split(
  "\n",
) as string[];
