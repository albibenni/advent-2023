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

const isNumeric = (str: string): boolean => {
  return !isNaN(Number(str));
};

const getNextElement = (
  line: string,
  index: number,
  strNumber: string,
): string | null => {
  const nextIndex = index + 1;
  if (index < line.length - 2 && isNumeric(line[nextIndex] as string)) {
    // log("nextIndex ", nextIndex, " currNumber ", strNumber);
    return getNextElement(line, nextIndex, line[nextIndex] as string);
  }
  return strNumber;
};

const inputLength = input.length;
const rowLength = input[0]!.length;

for (let row = 0; row < inputLength; row++) {
  const line = input[row] as string;
  let number = "";
  for (let index = 0; index < rowLength; index++) {
    number = "";
    const element = line[index] as string;
    if (isNumeric(element)) {
      number = `${number}${element}`;
      while (index < line.length - 2 && isNumeric(line[index + 1] as string)) {
        number = `${number}${line[index + 1] as string}`;
        index++;
      }
      log(number);
    }
  }
}

// const number = `${""}${getNextElement(input[0]!, 0, input[0]![0]!)}`;
// log(number);
