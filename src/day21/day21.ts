import { log } from "console";
import { readFileSync } from "fs";
import { get } from "http";

const input = readFileSync(`./src/day21/test.txt`, "utf8").trim().split("\n");
const inputPlot = input.map((line) => line.split(""));
// getInput("day21");

type Start = "S";
type GardenPlot = ".";
type Rock = "#";
type Point = { x: number; y: number };

const isRock = (str: string): str is Rock => str === "#";
const isStart = (str: string): str is Start => str === "S";
const isGardenPlot = (str: string): str is GardenPlot => str === ".";

const getStartingPointCoordinates = (): Point => {
  for (let i = 0; i < input.length; i++) {
    const line = input[i];
    for (let j = 0; j < line!.length; j++) {
      if (isStart(line![j]!)) {
        return { i, j } as unknown as Point;
      }
    }
  }
  return { x: -1, y: -1 };
};

const startingPointCoordinates = getStartingPointCoordinates();

let plotReached: Point[] = [];

function getTo64Steps<const T, S, U>(position: T, nSteps: S, plot: U): void;

function getTo64Steps(position: Point, nSteps: number, plot: string[][]) {
  if (nSteps === 6) {
    log("reached 64 steps");
    plotReached.push(position);
    return;
  }
  //left
  if (
    position.x > 0 &&
    (isGardenPlot(plot[position.x - 1]![position.y]!) ||
      isStart(plot[position.x - 1]![position.y]!))
  ) {
    log("is left", position);
    let nextPlot = plot;
    nextPlot[position.x]![position.y] = "O";
    getTo64Steps(
      { x: position.x - 1, y: position.y } as unknown as Point,
      nSteps + 1,
      plot,
    );
  }
  //Right
  if (
    position.x < plot[0]!.length &&
    (isGardenPlot(plot[position.x + 1]![position.y]!) ||
      isStart(plot[position.x + 1]![position.y]!))
  ) {
    log("is right", position);
    let nextPlot = plot;
    nextPlot[position.x]![position.y] = "O";
    getTo64Steps(
      { x: position.x + 1, y: position.y } as unknown as Point,
      nSteps + 1,
      nextPlot,
    );
  }
  //Top
  if (
    position.y > 0 &&
    (isGardenPlot(plot[position.x]![position.y - 1]!) ||
      isStart(plot[position.x]![position.y - 1]!))
  ) {
    log("is top", position);
    let nextPlot = plot;
    nextPlot[position.x]![position.y] = "O";
    getTo64Steps(
      { x: position.x, y: position.y - 1 } as unknown as Point,
      nSteps + 1,
      nextPlot,
    );
  }
  //Bottom
  if (
    position.y < plot.length &&
    (isGardenPlot(plot[position.x]![position.y + 1]!) ||
      isStart(plot[position.x]![position.y + 1]!))
  ) {
    log("is bottom", position);
    let nextPlot = plot;
    nextPlot[position.x]![position.y] = "O";
    getTo64Steps(
      { x: position.x, y: position.y + 1 } as unknown as Point,
      nSteps + 1,
      nextPlot,
    );
  }
}
getTo64Steps(startingPointCoordinates, 0, inputPlot);
log(plotReached);
plotReached = [...new Set(plotReached)];
log(plotReached.length);
