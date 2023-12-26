// export type Main = (inputLines: string[]) => Promise<void>;
// export async function runMain(main: Main) {
//   const [_, mode = "e"] = Deno.args;

import { readFileSync } from "fs";

//   const fileToLoad = mode == "m" ? "input.txt" : "example.txt";
//   const inputLines = (await Deno.readTextFile(fileToLoad)).split(/\r|\n|\r\n/);

//   await main(inputLines);
// }

export function sum(nums: number[], mapper?: (v: number) => number): number;
export function sum<T>(nums: T[], mapper: (v: T) => number): number;

export function sum<T>(nums: T[], mapper?: (v: T) => number): number {
  const reducer: (acc: number, curr: T) => number =
    typeof mapper === "function"
      ? (acc, curr) => acc + mapper(curr)
      : (acc, curr) => acc + +curr;

  return nums.reduce(reducer, 0);
}

export function product(nums: number[], mapper?: (v: number) => number): number;
export function product<T>(nums: T[], mapper: (v: T) => number): number;

export function product<T>(nums: T[], mapper?: (v: T) => number): number {
  const reducer: (acc: number, curr: T) => number =
    typeof mapper === "function"
      ? (acc, curr) => acc * mapper(curr)
      : (acc, curr) => acc * +curr;

  return nums.reduce(reducer, 1);
}

export function setIntersection<T>(a: Set<T>, b: Set<T>): Set<T> {
  const [larger, smaller] = a.size > b.size ? [a, b] : [b, a];

  return new Set(_intersect(larger, smaller));
}
function* _intersect<T>(larger: Set<T>, smaller: Set<T>) {
  for (const item of smaller) if (larger.has(item)) yield item;
}

export function arraysEqual<T>(l: T[], r: T[]): boolean {
  return l.length == r.length && l.every((e, i) => e === r[i]);
}

// these 3 stolen from https://stackoverflow.com/a/61352020/
export const gcd = (a: number, b: number): number =>
  b == 0 ? a : gcd(b, a % b);
export const lcm = (a: number, b: number) => (a / gcd(a, b)) * b;
export const lcmAll = (ns: number[]) => ns.reduce(lcm, 1);

/**
 * Returns a unique integer (as key) from 2 unsigned integers
 * Uses Elegant Pairing
 * @param x
 * @param y
 */
export const mk2n = (x: number, y: number): number =>
  x >= y ? x * x + x + y : y * y + x;

/**
 * Unpair elegant pairing
 * @param z
 */
export const umk2n = (z: number): [number, number] => {
  const q = Math.floor(Math.sqrt(z));
  const l = z - q * q;
  return l < q ? [l, q] : [q, l - q];
};

export function getLines(day: string, separator = "\n"): string[] {
  return getInput(day).split(separator);
}

export function getInput(day: string): string {
  return readFileSync(`./src/${day}/input.txt`, "utf8").replace(/\r/g, "");
}
