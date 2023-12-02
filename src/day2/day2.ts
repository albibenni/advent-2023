import { log } from "console";
import { readFileSync } from "fs";

const input = readFileSync("./src/day2/input/test.txt", "utf8").split("\n");
const possibleGames: number[] = [];
const extractedCubes: Map<string, number> = new Map();
extractedCubes.set("red", 12);
extractedCubes.set("blue", 14);
extractedCubes.set("green", 13);
// map.get(key) returns the value associated with the key, or undefined if there is none.

const getStringDigit = (str: string): string => {
  const newStr = str.replace(/\D/g, "");
  //   const newStr = str.replace(key, "").trim();
  //   console.log(newStr);

  return newStr;
};

const getGameNumber = (str: string): number => {
  let i = 5;
  let currChar = str.charAt(i);
  let gameNumber = 0;
  while (!isNaN(parseInt(currChar))) {
    if (gameNumber !== 0) {
      gameNumber = parseInt(gameNumber + "" + currChar);
    }
    gameNumber = parseInt(currChar);
    currChar = str.charAt(++i);
  }
  return gameNumber;
};

const matchMap = (str: string): Map<string, number> => {
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
  const gameNumber = getGameNumber(line);
  const currentCubes: Map<string, number> = new Map();
  currentCubes.set("red", 0);
  currentCubes.set("blue", 0);
  currentCubes.set("green", 0);
  let i = 6 + gameNumber.toString.length;
  let start = i;
  for (i; i < line.length - 2; i++) {
    if (line.charAt(i) === "," || line.charAt(i) === ";") {
      const str = line.substring(start, i).trim();
      start = i + 1;
      const mapTemp = matchMap(str);
      const [firstKey] = mapTemp.keys();
      const [firstValue] = mapTemp.values();
      currentCubes.set(firstKey!, firstValue! + currentCubes.get(firstKey!)!);
    }
  }

  if (
    currentCubes.get("red")! <= extractedCubes.get("red")! &&
    currentCubes.get("blue")! <= extractedCubes.get("blue")! &&
    currentCubes.get("green")! <= extractedCubes.get("green")!
  ) {
    possibleGames.push(gameNumber);
  }
});

const sumPossibleGames = possibleGames.reduce((a, b) => a + b, 0);

console.log(sumPossibleGames);
