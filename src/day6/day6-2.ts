import { log } from "console";
import { readFileSync } from "fs";

// const raceTime = 71530;
// const distanceToBeat = 940200;
const raceTime = 40828492;
const distanceToBeat = 233101111101487;

const distanceCounter = (time: number, speed: number): number => time * speed;

const getWinningTimes = (time: number, distanceToBeat: number): number => {
  const winnerTimes: number[] = [];
  for (let i = 0; i < time; i++) {
    const speed = i;
    const distance = distanceCounter(time - i, speed);
    if (distance > distanceToBeat) {
      winnerTimes.push(distance as number);
    }
  }
  return winnerTimes.length;
};

log(getWinningTimes(raceTime, distanceToBeat));
