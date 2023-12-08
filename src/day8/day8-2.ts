import { log } from "console";
import { readFileSync } from "fs";

export default function day8_2(input: string) {
  const lines = input.split("\n");
  const nodes: Record<string, { L: string; R: string }> = {};

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i] as string;
    nodes[line.substring(0, 3)] = {
      L: line.substring(7, 10),
      R: line.substring(12, 15),
    };
  }

  const instructions = lines[0]!.split("") as Array<"R" | "L">;
  const starts = [];
  for (const key in nodes) {
    if (Object.prototype.hasOwnProperty.call(nodes, key) && key[2] === "A") {
      starts.push(key);
    }
  }

  const lengths = starts.map((start) => {
    let steps = 0;
    let curr = start;
    for (let i = 0; curr[2] !== "Z"; i = (i + 1) % instructions.length) {
      steps++;
      curr = nodes[curr]![instructions[i]!];
    }
    return steps;
  });

  const gcd = (a: number, b: number) => {
    while (b > 0) [a, b] = [b, a % b];
    return a;
  };
  const lcm = (a: number, b: number) => (a * b) / gcd(a, b);
  return lengths.reduce((n, x) => lcm(x, n), 1);
}

log(day8_2(readFileSync("./src/day8/input/input.txt", "utf8")));
