import { log } from "console";
import { readFileSync } from "fs";

const gameNumberRange = 9;
const input = readFileSync("./src/day4/input/test.txt", "utf8").split(
  "\n",
) as string[];

export const getGameNumber = (str: string): string => {
  let i = "Game ".length;
  let currChar = str.charAt(i);
  let gameNumber = "";
  while (!isNaN(parseInt(currChar))) {
    gameNumber = `${gameNumber}${currChar}`;
    currChar = str.charAt(++i);
  }
  return gameNumber;
};

log(getGameNumber(input[0]!));
