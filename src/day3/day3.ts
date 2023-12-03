import { log } from "console";
import { readFileSync } from "fs";

const input = readFileSync("./src/day3/input/test2.txt", "utf8").split("\n");
const inputLength = input.length;
const rowHeight = input.length;
const rowLength = input[0]!.length;
const validNumbers = [] as number[];

const symbol = ["$", "%", "&", "#", "@", "*", "+", "=", "-", "/"] as const;
type Symbols = (typeof symbol)[number];
const isSymbol = (str: string): str is Symbols =>
  symbol.includes(str as Symbols);

const isNumeric = (str: string): boolean => {
  return !isNaN(Number(str));
};

const isSymbolCheck = (element: string, position: string): boolean => {
  if (isSymbol(element)) {
    log(element, " ", true, " position: ", position);
    return true;
  }
  log(element, " ", false, " position: ", position);

  return false;
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
    if (isSymbolCheck(element, "next in line")) {
      return true;
    }
  }
  // check previous in line counting number length
  if (index - numberLength > 0) {
    const element = input[rowNumber]![index - numberLength] as string;
    // log(rowNumber + " " + index + " " + (index - numberLength));
    if (isSymbolCheck(element, "previous in line")) {
      return true;
    }
  }
  //! above line
  if (rowNumber > 0) {
    const aboveLine = input[rowNumber - 1]!;

    // check top left diagonal counting number length
    if (index - numberLength > 0) {
      const element = aboveLine[index - numberLength] as string;
      if (isSymbolCheck(element, "top left diagonal")) {
        return true;
      }
    }
    // check top right diagonal counting number length
    if (index < rowLength - 1) {
      //! check length
      const element = aboveLine[index + 1] as string;
      if (isSymbolCheck(element, "top right diagonal")) {
        return true;
      }
    }
    // check for all number length
    for (let i = 0; i < numberLength; i++) {
      const element = aboveLine[index - numberLength + i + 1] as string;
      if (isSymbolCheck(element, `top ${index + 1 - numberLength + i + 1}`)) {
        return true;
      }
    }
  }
  //! below line
  if (rowNumber < rowHeight - 1) {
    //! check length
    const belowLine = input[rowNumber + 1]!;

    // check bottom left diagonal counting number length
    if (index - numberLength > 0) {
      const element = belowLine[index - numberLength] as string;
      if (isSymbolCheck(element, "bottom left diagonal")) {
        return true;
      }
    }
    // check bottom right diagonal counting number length
    if (index < rowLength - 1) {
      //! check length
      const element = belowLine[index + 1] as string;
      if (isSymbolCheck(element, "bottom right diagonal")) {
        return true;
      }
    }
    // check for all number length
    for (let i = 0; i < numberLength; i++) {
      const element = belowLine[index - numberLength + i + 1] as string;
      if (isSymbolCheck(element, `bottom ${index - numberLength + i + 1}`)) {
        return true;
      }
    }
  }

  return false;
};

for (let rowNumber = 0; rowNumber < inputLength; rowNumber++) {
  const line = input[rowNumber] as string;
  let number = "";
  for (let index = 0; index < rowLength; index++) {
    number = "";
    const element = line[index] as string;
    if (isNumeric(element)) {
      number = `${number}${element}`;
      while (index < line.length - 1 && isNumeric(line[index + 1] as string)) {
        number = `${number}${line[index + 1] as string}`;
        index++;
      }
      log("index: ", index, " number: ", number);
      //   log(isSymbolAdjacent(rowNumber, index, number), " ", number);
      if (isSymbolAdjacent(rowNumber, index, number))
        validNumbers.push(parseInt(number));
    }
  }
}

// const number = `${""}${getNextElement(input[0]!, 0, input[0]![0]!)}`;
// log(number);

// log(isSymbolAdjacent(2, 4, "35"), " ", " 35");

log(validNumbers.reduce((a, b) => a + b, 0));
