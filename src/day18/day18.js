import { log } from "console";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const input = fs
  .readFileSync(path.resolve(__dirname, "test.txt"), "utf8")
  .split("\n");

const handleMovements = (char, x, y) => {
  switch (char) {
    case "R":
      return [++x, y];
    case "L":
      return [--x, y];
    case "U":
      return [x, --y];
    case "D":
      return [x, ++y];
  }
};

const getGridDimension = () => {
  let maxX = 0;
  let maxY = 0;
  let x = 0;
  let y = 0;
  input.forEach((line) => {
    const amount = getAmountOfMovements(line);
    for (let index = 0; index < amount; index++) {
      [x, y] = handleMovements(line[0], x, y);
    }
    if (x > maxX) maxX = x;
    if (y > maxY) maxY = y;
  });
  return [maxX, maxY];
};

const getAmountOfMovements = (line) => {
  let amountOfMovements = "";
  for (let index = 2; index < line.length; index++) {
    const char = line[index];
    if (!isNaN(parseInt(char)))
      amountOfMovements = `${amountOfMovements}${char}`;
    else break;
  }
  return amountOfMovements;
};

const getFirstAndLastAsh = (line) => {
  const firstAsh = line.indexOf("#");
  let lastAsh = undefined;
  for (let i = line.length; i > firstAsh; i--) {
    if (line[i] === "#") {
      lastAsh = i;
      break;
    }
  }
  return [firstAsh, lastAsh];
};

const part1 = () => {
  const [maxX, maxY] = getGridDimension();
  let grid = Array.from({ length: maxY + 1 }, (e) => Array(maxX + 1).fill("."));
  grid[0][0] = "#";
  let indexPosition = [0, 0];
  for (let i = 0; i < input.length; i++) {
    const movementDirection = input[i][0];
    let amountOfMovements = parseInt(getAmountOfMovements(input[i]));
    for (let i = 0; i < amountOfMovements; i++) {
      indexPosition = handleMovements(
        movementDirection,
        indexPosition[0],
        indexPosition[1],
      );
      grid[indexPosition[1]][indexPosition[0]] = "#";
    }
  }
  for (let index = 0; index < grid.length; index++) {
    const firstAndLast = getFirstAndLastAsh(grid[index]);
    if (firstAndLast[1] !== undefined) {
      grid[index].fill("#", firstAndLast[0], firstAndLast[1]);
    }
  }
  let total = 0;
  grid.forEach((line) => line.forEach((char) => char === "#" && total++));
  log(total);
};

part1();
