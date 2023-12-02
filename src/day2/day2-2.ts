import { log } from "console";
import { readFileSync } from "fs";
import { getGameNumber, matchMap } from "./day2.js";

const input = readFileSync("./src/day2/input/test.txt", "utf8").split("\n");
const highestPossibleGamesMultiplied: number[] = [];
const extractedCubes: Map<string, number> = new Map();
extractedCubes.set("red", 12);
extractedCubes.set("green", 13);
extractedCubes.set("blue", 14);

input.forEach((line) => {
  const gameNumber = parseInt(getGameNumber(line));
  let i = 6 + gameNumber.toString.length;
  let start = i;
  let fewestRed = 0;
  let fewestGreen = 0;
  let fewestBlue = 0;

  let greenFound = false;
  let redFound = false;
  let blueFound = false;
  for (i; i <= line.length; i++) {
    if (line.charAt(i) === "," || line.charAt(i) === ";" || i === line.length) {
      const str = line.substring(start, i).trim();
      start = i + 2;
      const mapTemp = matchMap(str);
      const [firstKey] = mapTemp.keys();
      const [firstValue] = mapTemp.values();
      if (
        firstKey === "red" &&
        firstValue! > fewestRed
        // firstValue! < extractedCubes.get("red")!
      ) {
        redFound = true;
        fewestRed = firstValue!;
      }
      if (
        firstKey === "blue" &&
        firstValue! > fewestBlue
        // firstValue! < extractedCubes.get("blue")!
      ) {
        blueFound = true;
        fewestBlue = firstValue!;
      }
      if (
        firstKey === "green" &&
        firstValue! > fewestGreen
        // firstValue! < extractedCubes.get("green")!
      ) {
        greenFound = true;
        fewestGreen = firstValue!;
      }
    }
  }
  log(fewestRed, fewestBlue, fewestGreen);
  //   if (
  //     (redFound || fewestRed !== 0) &&
  //     (blueFound || fewestBlue !== 0) &&
  //     (greenFound || fewestGreen !== 0)
  //   ) {
  highestPossibleGamesMultiplied.push(fewestRed * fewestGreen * fewestBlue);
  //   }
});
log(highestPossibleGamesMultiplied);
const result = highestPossibleGamesMultiplied.reduce((a, b) => a + b, 0);

log(result);
