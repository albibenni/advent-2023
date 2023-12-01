import { readFileSync } from "fs";

const charDigits: any = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

let sum = 0;
const input = readFileSync("./input/input.txt", "utf8").split("\n");
input.forEach((line) => {
  const newLine = getDigits(line);
  const digits = [];
  for (let i = 0; i < newLine.length; i++) {
    if (!isNaN(parseInt(newLine[i]!))) {
      digits.push(newLine[i]);
    }
  }
  const num = parseInt(digits[0] + "" + digits.at(-1));
  sum += num;
});

console.log(sum);

function getDigits(str: string) {
  Object.keys(charDigits).forEach((key) => {
    str = str.replaceAll(key, key[0] + charDigits[key] + key.at(-1));
  });
  return str;
}
