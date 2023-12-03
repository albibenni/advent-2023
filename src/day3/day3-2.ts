import { log } from "console";
import { readFileSync } from "fs";

const input = readFileSync("./src/day3/input/test2.txt", "utf8").split("\n");
const inputLength = input.length;
const rowHeight = input.length;
const rowLength = input[0]!.length;
const validNumbers = [] as number[];

const symbol = ["*"] as const;
type Symbols = (typeof symbol)[number];
const isSymbol = (str: string): str is Symbols =>
  symbol.includes(str as Symbols);

const isNumeric = (str: string): boolean => {
  return !isNaN(Number(str));
};

// const isSymbolCheck = (element: string, position: string): boolean => {
//   if (isSymbol(element)) {
//     log(element, " ", true, " position: ", position);
//     return true;
//   }
//   log(element, " ", false, " position: ", position);

//   return false;
// };

const getNearbyNumbers = (
  rowNumber: number,
  index: number,
  number: string,
): string => {
  let combinedNumber = number;
  //! same line next to right
  log(input[rowNumber]![index + 1]);
  for (let i = index + 1; i < rowLength; i++) {
    const element = input[rowNumber]![i] as string;
    if (isNumeric(element)) {
      log("right: ", element, " row: ", rowNumber, " index: ", i);
      combinedNumber = `${combinedNumber}${element}`;
    } else {
      break;
    }
  }
  for (let y = index - 1; y > 0; y--) {
    const element = input[rowNumber]![y] as string;
    if (isNumeric(element)) {
      log("left: ", element, " row: ", rowNumber, " index: ", y);
      combinedNumber = `${element}${combinedNumber}`;
      //   log(combinedNumber);
    } else {
      break;
    }
  }
  return combinedNumber;
};

const getAdjacentNumbers = (rowNumber: number, index: number): number[] => {
  let adjacentNumbers: number[] = [];
  //! same line
  // check right next in line
  if (index < rowLength - 1) {
    let element = input[rowNumber]![index + 1] as string;
    if (isNumeric(element)) {
      adjacentNumbers.push(
        parseInt(getNearbyNumbers(rowNumber, index + 1, element)),
      );
    }
  }
  // check left in line
  if (index - 1 > 0) {
    const element = input[rowNumber]![index - 1] as string;
    // log(rowNumber + " " + index + " " + (index - numberLength));
    if (isNumeric(element)) {
      adjacentNumbers.push(
        parseInt(getNearbyNumbers(rowNumber, index - 1, element)),
      );
    }
  }
  //! above line
  if (rowNumber > 0) {
    const aboveLine = input[rowNumber - 1]!;

    // check top left diagonal
    if (index - 1 > 0) {
      const element = aboveLine[index - 1] as string;
      if (isNumeric(element)) {
        adjacentNumbers.push(
          parseInt(getNearbyNumbers(rowNumber - 1, index + 1, element)),
        );
      }
    }
    // check top right diagonal
    if (index < rowLength - 1) {
      //! check length
      const element = aboveLine[index + 1] as string;
      if (isNumeric(element)) {
        adjacentNumbers.push(
          parseInt(getNearbyNumbers(rowNumber - 1, index + 1, element)),
        );
      }
    }
    // check top center
    const element = aboveLine[index] as string;
    if (isNumeric(element)) {
      adjacentNumbers.push(
        parseInt(getNearbyNumbers(rowNumber - 1, index, element)),
      );
    }
  }
  //! below line
  if (rowNumber < rowHeight - 1) {
    //! check length
    const belowLine = input[rowNumber + 1]!;

    // check bottom left diagonal counting number length
    if (index - 1 > 0) {
      const element = belowLine[index - 1] as string;
      if (isNumeric(element)) {
        adjacentNumbers.push(
          parseInt(getNearbyNumbers(rowNumber + 1, index - 1, element)),
        );
      }
    }
    // check bottom right diagonal counting number length
    if (index < rowLength - 1) {
      //! check length
      const element = belowLine[index + 1] as string;
      log(element);
      if (isNumeric(element)) {
        adjacentNumbers.push(
          parseInt(getNearbyNumbers(rowNumber + 1, index + 1, element)),
        );
      }
    }
    // check bottom center
    const element = belowLine[index] as string;
    if (isNumeric(element)) {
      adjacentNumbers.push(
        parseInt(getNearbyNumbers(rowNumber + 1, index + 1, element)),
      );
    }
  }

  return adjacentNumbers;
};

// for (let rowNumber = 0; rowNumber < inputLength; rowNumber++) {
//   const line = input[rowNumber] as string;
//   for (let index = 0; index < rowLength; index++) {
//     if (isSymbol(line[index] as string)) {
//       log("symbol: ", line[index], " row: ", rowNumber, " index: ", index);
//       validNumbers.push(
//         getAdjacentNumbers(rowNumber, index).reduce((a, b) => a * b, 0),
//       );
//     }
//   }
// }

// const number = `${""}${getNextElement(input[0]!, 0, input[0]![0]!)}`;
// log(number);

// log(isSymbolAdjacent(2, 4, "35"), " ", " 35");

// log(validNumbers.reduce((a, b) => a + b, 0));

// log(getAdjacentNumbers(0, 9));
