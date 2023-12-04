import { log } from "console";
import { readFileSync } from "fs";

const gameNumberRange = 9;
const input = readFileSync("./src/day4/input/input.txt", "utf8").split(
  "\n",
) as string[];
let gamesPoints = 0;

const getGameNumber = (str: string): string => {
  let i = "Game ".length;
  let currChar = str.charAt(i);
  let gameNumber = "";
  while (!isNaN(parseInt(currChar))) {
    gameNumber = `${gameNumber}${currChar}`;
    currChar = str.charAt(++i);
  }
  return gameNumber;
};

input.forEach((line) => {
  const gameNumber = getGameNumber(line);
  let gamePoints = 0;
  let i = "Game ".length + gameNumber.length + 2;
  const matchingRows = line.split(" | ");
  matchingRows[0] = matchingRows[0]!.slice(i);
  const [firstRow, secondRow] = matchingRows;
  const firstRowSplit = firstRow.split(" ");
  const secondRowSplit = secondRow!.split(" ");
  for (let i = 0; i < firstRowSplit.length; i++) {
    const firstRowElement = firstRowSplit[i];
    for (let j = 0; j < secondRowSplit.length; j++) {
      const secondRowElement = secondRowSplit[j];
      if (firstRowElement === "") break;
      if (secondRowElement === "") continue;
      if (firstRowElement === secondRowElement) {
        if (gamePoints === 0) {
          gamePoints = 1;
        } else {
          gamePoints *= 2;
        }
      }
    }
  }
  gamesPoints += gamePoints;
});

log(gamesPoints);
