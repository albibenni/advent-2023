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

const isSymbolAdjacent = (
  rowNumber: number,
  index: number,
  number: string,
): boolean => {
  const numberLength = number.length;
  //! same line
  // check next in line
  if (index < rowLength - 1) {
    const element = input[rowNumber]![index + 1] as string;
    if (isSymbol(element)) {
      return true;
    }
  }
  // check previous in line counting number length
  if (index - numberLength > 0) {
    const element = input[rowNumber]![index - (numberLength + 1)] as string;
    if (isSymbol(element)) {
      return true;
    }
  }
  //! above line
  if (rowLength > 0) {
    const aboveLine = input[rowNumber - 1]!;

    // check top left diagonal counting number length
    if (index - numberLength > 0) {
      const element = aboveLine[index - (numberLength + 1)] as string;
      if (isSymbol(element)) {
        return true;
      }
    }
    // check top right diagonal counting number length
    if (index < rowLength - 1) {
      //! check length
      const element = aboveLine[index + 1] as string;
      if (isSymbol(element)) {
        return true;
      }
    }
    // check for all number length
    for (let i = 0; i < numberLength; i++) {
      const element = aboveLine[index - numberLength + i] as string;
      if (isSymbol(element)) {
        return true;
      }
    }
  }

  return false;
};

const inputLength = input.length;
const rowLength = input[0]!.length;

for (let rowNumber = 0; rowNumber < inputLength; rowNumber++) {
  const line = input[rowNumber] as string;
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
      isSymbolAdjacent(rowNumber, index, number);
    }
  }
}

// const number = `${""}${getNextElement(input[0]!, 0, input[0]![0]!)}`;
// log(number);
