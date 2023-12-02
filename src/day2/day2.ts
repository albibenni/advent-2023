import { log } from "console";
import { readFileSync } from "fs";

const input = readFileSync("./src/day2/input/input.txt", "utf8").split("\n");
const possibleGames: number[] = [];
const extractedCubes: Map<string, number> = new Map();
extractedCubes.set("red", 12);
extractedCubes.set("green", 13);
extractedCubes.set("blue", 14);

export const getStringDigit = (str: string): string => {
  const newStr = str.replace(/\D/g, "");
  return newStr;
};

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

export const matchMap = (str: string): Map<string, number> => {
  let myKey = "";
  let num = 0;
  const map: Map<string, number> = new Map();
  for (let key of extractedCubes.keys()) {
    if (str.includes(key)) {
      myKey = key;
      num = parseInt(getStringDigit(str));
      map.set(myKey, num);
    }
  }
  return map;
};

input.forEach((line) => {
  const gameNumber = parseInt(getGameNumber(line));
  let i = 6 + gameNumber.toString.length;
  let start = i;
  for (i; i <= line.length; i++) {
    let isPossible = true;
    const currentCubes: Map<string, number> = new Map();
    if (line.charAt(i) === "," || line.charAt(i) === ";" || i === line.length) {
      currentCubes.set("red", 0);
      currentCubes.set("green", 0);
      currentCubes.set("blue", 0);
      const str = line.substring(start, i).trim();
      start = i + 2;
      const mapTemp = matchMap(str);
      const [firstKey] = mapTemp.keys();
      const [firstValue] = mapTemp.values();
      currentCubes.set(firstKey!, firstValue! + currentCubes.get(firstKey!)!);
      if (
        currentCubes.get("red")! > extractedCubes.get("red")! ||
        currentCubes.get("blue")! > extractedCubes.get("blue")! ||
        currentCubes.get("green")! > extractedCubes.get("green")!
      ) {
        isPossible = false;
        break;
      }
    }
    if (i === line.length && isPossible) {
      possibleGames.push(gameNumber);
    }
  }
});

const sumPossibleGames = possibleGames.reduce((a, b) => a + b, 0);

log(sumPossibleGames);
