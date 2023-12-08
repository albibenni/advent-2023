import { log } from "console";
import { readFileSync } from "fs";

const input = readFileSync("./src/day8/input/input.txt", "utf8").split(
  "\n",
) as string[];

const commands = (input[0] as string).split("") as string[];

const realInput = input.slice(2).map((line) => line.split(" = ") as string[]);

let numberOfCommandsCalled = 0;
let commandIterator = 0;

const commandMap = new Map<string, PositionOptions>();

type PositionOptions = {
  l: string;
  r: string;
};

realInput.forEach((line) => {
  const [position, positionOptions] = line;
  commandMap.set(position as string, {
    l: (positionOptions as string).replace("(", "").split(", ")[0] as string,
    r: (positionOptions as string).replace(")", "").split(", ")[1] as string,
  });
});

let currentPosition = "AAA";

const endPosition = "ZZZ";

while (true) {
  const currentCommand = commands[commandIterator++] as string;
  currentPosition = (commandMap.get(currentPosition) as PositionOptions)[
    currentCommand.toLowerCase() as keyof PositionOptions
  ] as string;
  numberOfCommandsCalled++;
  if (endPosition === currentPosition) {
    break;
  }
  if (commandIterator === commands.length) {
    commandIterator = 0;
  }
}
log(numberOfCommandsCalled);
