import { log } from "console";
import { readFileSync } from "fs";
import { Deque } from "@blakeembrey/deque";
import { mk2n } from "../utils.js";

const input = readFileSync("./src/day16/input.txt", "utf8");

type Direction = "r" | "d" | "l" | "u";

const frameBuffer: string[] = [];
const buffFrame = (map: string[][], visitedTiles: Set<number>) => {
  const buff = [];
  for (let y = 0; y < map.length; y++) {
    let line = "";
    for (let x = 0; x < map[y]!.length; x++) {
      if (map[y]![x] === ".") {
        if (visitedTiles.has(mk2n(x, y))) {
          line += "\x1b[31mo\x1b[0m";
        } else {
          line += " ";
        }
      } else {
        line += `\x1b[36m${map[y]![x]}\x1b[0m`;
      }
    }
    buff.push(line);
  }
  frameBuffer.push(buff.join("\n"));
};

const render = () => {
  const t = setInterval(() => {
    console.clear();
    console.log(frameBuffer.shift());
    if (frameBuffer.length === 0) {
      clearInterval(t);
    }
  }, 100);
};
const dirMap = {
  r: 1,
  d: 2,
  l: 3,
  u: 4,
};

const getKey = (x: number, y: number, d: Direction) =>
  (x * 1000 + y) * 1000 + dirMap[d];

const getEnergizedTileCount = (
  map: string[][],
  sx: number,
  sy: number,
  d: Direction,
) => {
  const queue = new Deque<[number, number, Direction]>();
  const visitedStates = new Set<number>();
  const visitedTiles = new Set<number>();

  queue.push([sx, sy, d]);
  visitedStates.add(getKey(sx, sy, d));

  let beams = 1;
  let moves = 0;

  while (queue.size > 0) {
    const [x, y, direction] = queue.popLeft();

    const tile = map[y]![x];

    moves++;
    visitedTiles.add(mk2n(x, y));

    const nextTiles = [];

    if (tile === ".") {
      let ny = y;
      let nx = x;

      if (direction === "r") nx = x + 1;
      if (direction === "d") ny = y + 1;
      if (direction === "l") nx = x - 1;
      if (direction === "u") ny = y - 1;

      nextTiles.push([nx, ny, direction]);
    }

    if (tile === "\\") {
      const nextDirection =
        direction === "r"
          ? "d"
          : direction === "d"
          ? "r"
          : direction === "l"
          ? "u"
          : "l";

      let ny = y;
      let nx = x;

      if (direction === "r") ny = y + 1;
      if (direction === "d") nx = x + 1;
      if (direction === "l") ny = y - 1;
      if (direction === "u") nx = x - 1;

      nextTiles.push([nx, ny, nextDirection]);
    }

    if (tile === "/") {
      const nextDirection =
        direction === "r"
          ? "u"
          : direction === "d"
          ? "l"
          : direction === "l"
          ? "d"
          : "r";
      let ny = y;
      let nx = x;

      if (direction === "r") ny = y - 1;
      if (direction === "d") nx = x - 1;
      if (direction === "l") ny = y + 1;
      if (direction === "u") nx = x + 1;

      nextTiles.push([nx, ny, nextDirection]);
    }

    if (tile === "|") {
      if (direction === "d" || direction === "u") {
        let ny: number;

        if (direction === "d") ny = y + 1;
        if (direction === "u") ny = y - 1;

        nextTiles.push([x, ny!, direction]);
      }
      if (direction === "r" || direction === "l") {
        nextTiles.push([x, y + 1, "d"]);
        nextTiles.push([x, y - 1, "u"]);
      }
    }

    if (tile === "-") {
      if (direction === "r" || direction === "l") {
        let nx: number;

        if (direction === "r") nx = x + 1;
        if (direction === "l") nx = x - 1;

        nextTiles.push([nx!, y, direction]);
      } else {
        nextTiles.push([x + 1, y, "r"]);
        nextTiles.push([x - 1, y, "l"]);
      }
    }

    for (let i = 0; i < nextTiles.length; i++) {
      // @ts-ignore
      const [nx, ny, nd] = nextTiles[i];
      if (!map[ny]?.[nx]) continue;

      const key = getKey(nx, ny, nd);
      if (!visitedStates.has(key)) {
        visitedStates.add(key);
        if (i > 0) beams++;
        queue.push([nx, ny, nd]);
      }
    }

    // if (moves % beams === 0) {
    //   buffFrame(map, visitedTiles);
    // }
  }

  // render();
  return visitedTiles;
};

export const getEnergizedTiles = (input: string) =>
  getEnergizedTileCount(
    input.split("\n").map((line) => line.split("")),
    0,
    0,
    "r",
  ).size;

export const getMaxEnergizedTiles = (input: string) => {
  const map = input.split("\n").map((line) => line.split(""));

  let maxVisited = 0;

  for (let y = 0; y < map.length; y++) {
    let visitedTiles = getEnergizedTileCount(map, 0, y, "r");
    maxVisited =
      visitedTiles.size > maxVisited ? visitedTiles.size : maxVisited;

    visitedTiles = getEnergizedTileCount(map, map[0]!.length - 1, y, "l");
    maxVisited =
      visitedTiles.size > maxVisited ? visitedTiles.size : maxVisited;
  }

  for (let x = 0; x < map[0]!.length; x++) {
    let visitedTiles = getEnergizedTileCount(map, x, 0, "d");
    maxVisited =
      visitedTiles.size > maxVisited ? visitedTiles.size : maxVisited;

    visitedTiles = getEnergizedTileCount(map, x, map.length - 1, "u");
    maxVisited =
      visitedTiles.size > maxVisited ? visitedTiles.size : maxVisited;
  }

  return maxVisited;
};

log(getEnergizedTiles(input));
log(getMaxEnergizedTiles(input));
