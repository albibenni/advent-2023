import { readFileSync } from "fs";

const input = readFileSync("./src/day9/input/input.txt", "utf8").replace(
  /\r/g,
  "",
);

export function predict(str: string): number {
  const history = str.split(" ").map(Number);

  const seq = [history] as number[][];

  while (seq.at(-1)!.some((n) => n !== 0)) {
    const last = seq.at(-1) as number[];
    const next = last.slice(1).map((v, i) => v - last[i]!);

    seq.push(next);
  }

  seq.at(-1)!.push(0);

  for (let i = seq.length - 2; i >= 0; i--) {
    const currSeq = seq[i];
    seq[i]!.push(currSeq!.at(-1)! + seq[i + 1]!.at(-1)!);
  }

  return seq[0]!.at(-1)!;
}

export function predictBackwards(str: string): number {
  return predict(str.split(" ").reverse().join(" "));
}

export function getExtrapolatedSum(input: string, backwards = false): number {
  return input
    .split("\n")
    .map(backwards ? predictBackwards : predict)
    .reduce((a, b) => a + b);
}

console.log(getExtrapolatedSum(input));

console.log(getExtrapolatedSum(input, true));
