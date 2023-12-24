import fs from "fs";

const input = fs.readFileSync("./src/day18/input.txt", "utf8").split("\n");

const handleMovements = (char, x, y) => {
  switch (char) {
    case "R":
      return [++x, y];
    case "L":
      return [--x, y];
    case "U":
      return [x, ++y];
    case "D":
      return [x, --y];
  }
};

const getAmountOfMovements = (input) => {
  let amountOfMovements = "";
  for (let index = 2; index < input.length; index++) {
    if (!isNaN(char)) amountOfMovements = `${amountOfMovements}${char}`;
    else break;
  }
  return amountOfMovements;
};

const part1 = () => {
  let grid = [];
  for (let i = 0; i < input.length; i++) {
    const movementDirection = input[0];
    let lastIndexBeforeColor = 2;
    let amountOfMovements = getAmountOfMovements(input);
  }
};
