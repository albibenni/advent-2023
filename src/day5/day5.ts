import { log } from "console";
import { readFileSync } from "fs";

const input = readFileSync("./src/day5/input/input.txt", "utf8") as string;

interface range {
  destination: number;
  source: number;
  range: number;
  isInRange: (nb: number) => boolean;
}
interface map {
  source: string;
  destination: string;
  ranges: range[];
}
const parseInput = (rawInput: string) => {
  const lines = rawInput.split("\n\n");
  const seeds = lines[0]!.replace("seeds: ", "").split(" ").map(Number);
  const maps = lines.slice(1, lines.length).map((line) => {
    const map = line.split("\n");
    const [source, destination] = map[0]!.replace(" map:", "").split("-to-");
    const ranges = map.slice(1, map.length).map((r) => {
      const [destination, source, range] = r.split(" ").map(Number);
      const isInRange = (nb: number) => source! <= nb && nb < source! + range!;
      return { destination, source, range, isInRange };
    });
    return { destination, source, ranges };
  });
  return { seeds, maps };
};

const findLocation = (maps: map[], seed: number, from: string): number => {
  const map = maps.find(({ source }) => source === from);
  if (!map) return seed;
  const range = map.ranges.find(
    (r) => r.source <= seed && seed < r.source + r.range,
  )!;
  const newSeed = range ? range.destination + (seed - range.source) : seed;
  return findLocation(maps, newSeed, map.destination);
};

const part1 = (rawInput: string) => {
  const { seeds, maps } = parseInput(rawInput);
  // @ts-ignore
  const locations = seeds.map((s) => findLocation(maps, s, "seed"));
  return Math.min(...locations);
};

const part2 = (rawInput: string) => {
  const { seeds, maps } = parseInput(rawInput);
  const seedRanges = [];
  for (let i = 0; i < seeds.length; i += 2) {
    seedRanges.push([seeds[i], seeds[i]! + seeds[i + 1]!]);
  }
  console.log(seedRanges);

  let lowest = Number.POSITIVE_INFINITY;
  for (const [start, end] of seedRanges) {
    for (let s = start; s! < end!; s!++) {
      // @ts-ignore
      const location = findLocation(maps, s, "seed");
      if (location < lowest) {
        lowest = location;
      }
    }
    console.log(start, lowest);
  }
  return lowest;
};

log(part1(input));
log(part2(input));
