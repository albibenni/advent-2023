import { log } from "console";
import fs from "fs";

function getPathLength(start, end) {
  return Math.abs(start[0] - end[0]) + Math.abs(start[1] - end[1]);
}

function part1() {
  //   const myInput = input.find((r) => r);
  fs.readFile("./src/day11/input.txt", "utf-8", (err, data) => {
    const input = data.split("\n").filter((n) => n);

    const grid = input.map((line) => line.split(""));

    const newRows = [];
    for (const row of grid) {
      if (row.some((cell) => cell === "#")) {
        newRows.push(row);
      } else {
        newRows.push(row);
        newRows.push(row);
      }
    }

    const newGrid = new Array(newRows.length).fill(0).map(() => []);

    for (let i = 0; i < newRows[0].length; i++) {
      let empty = true;
      for (let j = 0; j < newRows.length; j++) {
        if (newRows[j][i] === "#") {
          empty = false;
          break;
        }
      }

      if (!empty) {
        for (let j = 0; j < newRows.length; j++) {
          newGrid[j].push(newRows[j][i]);
        }
      } else {
        for (let j = 0; j < newRows.length; j++) {
          newGrid[j].push(".");
          newGrid[j].push(".");
        }
      }
    }

    const galaxies = [];

    for (let i = 0; i < newGrid[0].length; i++) {
      for (let j = 0; j < newGrid.length; j++) {
        if (newGrid[j][i] === "#") {
          galaxies.push([i, j]);
        }
      }
    }

    let sum = 0;

    for (let i = 0; i < galaxies.length; i++) {
      for (let j = i + 1; j < galaxies.length; j++) {
        sum += getPathLength(galaxies[i], galaxies[j]);
      }
    }

    console.log(sum);
  });
}

function part2() {
  fs.readFile("./src/day11/input.txt", "utf-8", (err, data) => {
    const input = data.split("\n").filter((n) => n);

    const grid = input.map((line) => line.split(""));

    const galaxies = [];

    for (let i = 0; i < grid[0].length; i++) {
      for (let j = 0; j < grid.length; j++) {
        if (grid[j][i] === "#") {
          galaxies.push([i, j]);
        }
      }
    }

    //empty rows
    for (let y = grid.length - 1; y >= 0; y--) {
      let emptyRow = true;
      for (let x = 0; x < grid[0].length; x++) {
        if (grid[y][x] !== ".") {
          emptyRow = false;
          break;
        }
      }

      if (emptyRow) {
        for (let c = 0; c < galaxies.length; c++) {
          if (galaxies[c][1] > y) {
            galaxies[c][1] += 999_999;
          }
        }
      }
    }

    //empty columns
    for (let x = grid[0].length - 1; x >= 0; x--) {
      let emptyCols = true;
      for (let y = 0; y < grid.length; y++) {
        if (grid[y][x] !== ".") {
          emptyCols = false;
          break;
        }
      }

      if (emptyCols) {
        for (const galaxy of galaxies) {
          if (galaxy[0] > x) {
            galaxy[0] += 999_999;
          }
        }
      }
    }

    let sum = 0;

    for (let i = 0; i < galaxies.length; i++) {
      for (let j = i + 1; j < galaxies.length; j++) {
        sum += getPathLength(galaxies[i], galaxies[j]);
      }
    }

    console.log(sum);
  });
}

part1();
part2();
