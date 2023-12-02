import { readFileSync } from "fs";

const input = readFileSync("./src/day2/input/test.txt", "utf8").split("\n");
const possibleGames: number[] = [];
const extractedCubes: Map<string, number> = new Map([
  ["red", 12],
  ["blue", 14],
  ["green", 13],
]);

// map.get(key) returns the value associated with the key, or undefined if there is none.

const getStringDigit = (str: string, key: string): string => {
  console.log(str);

  const newStr = str.replace(key, "").trim();
  console.log(newStr);

  return newStr;
};

const getGameNumber = (str: string): number => {
  let i = 4;
  let currChar = str.charAt(i++);
  let gameNumber = 0;
  while (!isNaN(parseInt(currChar))) {
    if (gameNumber !== 0) {
      gameNumber = parseInt(gameNumber + "" + currChar);
    }
    gameNumber = parseInt(currChar);
  }
  return gameNumber;
};

const matchMap = (
  str: string,
  map: Map<string, number>,
): Map<string, number> => {
  let myKey = "";
  let num = 0;

  Object.keys(map).forEach((key) => {
    console.log(key);
    if (str.includes(key)) {
      myKey = key;
      num = parseInt(getStringDigit(str, key));
    }
    map.set(myKey, num);
  });
  return map;
};

input.forEach((line) => {
  const gameNumber = getGameNumber(line);
  let currentCubes: Map<string, number> = new Map([
    ["red", 0],
    ["blue", 0],
    ["green", 0],
  ]);
  let count = 0;
  let i = 6 + gameNumber.toString.length;
  let start = i;
  for (i; i < line.length - 2; i++) {
    if (line.charAt(i) === "," || line.charAt(i) === ";") {
      const str = line.substring(start, i);
      start = i + 1;
      currentCubes = matchMap(str, currentCubes);
    }
  }
  for (let i = 0; i < currentCubes.size; i++) {
    if (currentCubes.get("red")! !== extractedCubes.get("red")!) {
      break;
    }
    if (currentCubes.get("blue")! !== extractedCubes.get("blue")!) {
      break;
    }
    if (currentCubes.get("green")! !== extractedCubes.get("green")!) {
      break;
    }
    possibleGames.push(gameNumber);
  }
});

const sumPossibleGames = possibleGames.reduce((a, b) => a + b, 0);

console.log(sumPossibleGames);
