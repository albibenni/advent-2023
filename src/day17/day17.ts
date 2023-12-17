import { log } from "console";
import { readFileSync } from "fs";

const grid = await getInput("./src/day17/input.txt");

export type Grid = number[][];

export async function getInput(path: string) {
  const file = readFileSync(path, "utf8");

  return file.split("\n").map((line) => line.split("").map(Number)) as Grid;
}

export type Queued = [
  heatLoss: number,
  row: number,
  column: number,
  deltaRow: number,
  deltaColumn: number,
  steps: number,
];

export function getMinimalHeatLoss(grid: Grid, withUltraCrucibles: boolean) {
  const queue: Queued[] = [[0, 0, 0, 0, 0, 0]];

  const seen = new Set<string>();

  while (queue.length) {
    const [hl, r, c, dr, dc, n] = queue
      .sort(([prevCost], [nextCost]) => nextCost - prevCost)
      .pop()!;

    if (
      r === grid.length - 1 &&
      c === grid[0]!.length - 1 &&
      (withUltraCrucibles ? n >= 4 : true)
    )
      return hl;

    const key = JSON.stringify([r, c, dr, dc, n]);

    if (seen.has(key)) continue;

    seen.add(key);

    if (
      n < (withUltraCrucibles ? 10 : 3) &&
      ![dr, dc].every((coord) => coord === 0)
    ) {
      const nr = r + dr;
      const nc = c + dc;

      if (0 <= nr && nr < grid.length && 0 <= nc && nc < grid[0]!.length) {
        queue.push([hl + grid[nr]![nc]!, nr, nc, dr, dc, n + 1]);
      }
    }

    if (
      withUltraCrucibles
        ? n >= 4 || [dr, dc].every((coord) => coord === 0)
        : true
    ) {
      for (const [ndr, ndc] of [
        [0, 1],
        [1, 0],
        [0, -1],
        [-1, 0],
      ]) {
        if (
          JSON.stringify([ndr, ndc]) !== JSON.stringify([dr, dc]) &&
          JSON.stringify([ndr, ndc]) !== JSON.stringify([-dr, -dc])
        ) {
          const nr = r + ndr!;
          const nc = c + ndc!;

          if (0 <= nr && nr < grid.length && 0 <= nc && nc < grid[0]!.length) {
            queue.push([hl + grid[nr]![nc]!, nr, nc, ndr!, ndc!, 1]);
          }
        }
      }
    }
  }

  return 0;
}

export function getMinimalHeatLossWithRegularCrucibles(grid: Grid) {
  return getMinimalHeatLoss(grid, false);
}

export function getMinimalHeatLossWithUltraCrucibles(grid: Grid) {
  return getMinimalHeatLoss(grid, true);
}

const minimalHeatLossWithRegularCrucibles =
  getMinimalHeatLossWithRegularCrucibles(grid);

console.log(
  "Minimal heat loss with regular crucibles:",
  minimalHeatLossWithRegularCrucibles,
  "(Part 1)",
);

const minimalHeatLossWithUltraCrucibles =
  getMinimalHeatLossWithUltraCrucibles(grid);

console.log(
  "Minimal heat loss with ultra crucibles:",
  minimalHeatLossWithUltraCrucibles,
  "(Part 2)",
);
