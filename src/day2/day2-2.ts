import { log } from "console";
import { readFileSync } from "fs";

const input = readFileSync("./src/day2/input/input.txt", "utf8").split("\n");
const possibleGames: number[] = [];
const extractedCubes: Map<string, number> = new Map();
extractedCubes.set("red", 12);
extractedCubes.set("green", 13);
extractedCubes.set("blue", 14);

input.forEach((line) => {
  const gameNumber = parseInt(getGameNumber(line));
});
