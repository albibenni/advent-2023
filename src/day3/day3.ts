import { log } from "console";
import { readFileSync } from "fs";

const input = readFileSync("./src/day3/input/test.txt", "utf8").split("\n");

const getSymbolsFromString = (line: string): Map<string, number> => {
  const map: Map<string, number> = new Map();

  return map;
};
const symbol = [
  "$",
  "%",
  "&",
  "#",
  "@",
  "!",
  "^",
  "~",
  "*",
  "+",
  "=",
  "-",
  "/",
  "<",
  ">",
] as const;
type Symbols = (typeof symbol)[number];
const isSymbol = (str: string): str is Symbols =>
  symbol.includes(str as Symbols);

input.forEach((line) => {});

// const res = input[8]?.match(/\*/);
for (let index = 0; index < input[7]!.length; index++) {
  const element = input[1]![index];
  log(isSymbol(element!));
}

// log(res);
