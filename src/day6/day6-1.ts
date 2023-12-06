import { log } from "console";
import { readFileSync } from "fs";

const input = readFileSync("./src/day6/input/input.txt", "utf8").split(
  "\n",
) as string[];

const getNumbers = (line: string): number[] => {
  const numbers: number[] = [];
  for (let i = 11; i < line.length; i++) {
    let numString = "";
    while (!isNaN(parseInt(line[i] as string))) {
      numString = numString + "" + line[i];
      i++;
    }
    if (numString !== "") numbers.push(parseInt(numString));
  }

  return numbers;
};

const raceTimes = getNumbers(input[0] as string);
const distancesToBeat = getNumbers(input[1] as string);

const distanceCounter = (time: number, speed: number): number => time * speed;

const getWinningTimes = (time: number, distanceToBeat: number): number => {
  const winnerTimes: number[] = [];
  for (let i = 0; i < time; i++) {
    const speed = i;
    log("speed", speed);
    const distance = distanceCounter(time - i, speed);
    log("distance", distance);
    if (distance > distanceToBeat) {
      winnerTimes.push(distance as number);
    }
  }
  return winnerTimes.length;
};

const totalRaceWinningPossibilities = (): number => {
  let totalWinningPossibilities = 0;
  for (let index = 0; index < raceTimes.length; index++) {
    const winningTimes = getWinningTimes(
      raceTimes[index] as number,
      distancesToBeat[index] as number,
    );
    totalWinningPossibilities === 0
      ? (totalWinningPossibilities = winningTimes)
      : (totalWinningPossibilities *= winningTimes);
  }
  return totalWinningPossibilities;
};

log(totalRaceWinningPossibilities());
