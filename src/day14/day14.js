import fs from "fs";

let lines = fs
  .readFileSync("./src/day14/input.txt", "utf8")
  .split(/\r?\n/)
  .map((line) => line.split(""));

const part1 = () => {
  lines.map((line, i) => {
    line.map((char, j) => {
      let up = i - 1;
      if (char === "O") {
        while (up >= 0 && lines[up][j] === ".") {
          up--;
        }
        up++;
        if (i !== up) {
          lines[i][j] = ".";
          lines[up][j] = "O";
        }
      }
    });
  });
  let sum = 0;
  lines.map((line, i) => {
    line.map((char) => {
      if (char === "O") sum += lines.length - i;
    });
  });
  return sum;
};

const part2 = () => {
  const inside = (nx, ny) =>
    ny >= 0 && ny < lines.length && nx >= 0 && nx < lines[0].length;
  function roll(dir = 0) {
    // N:0 W:1 S:2 E:3
    const dx = [0, -1, 0, 1][dir];
    const dy = [-1, 0, 1, 0][dir];
    for (
      let y = dir > 1 ? lines.length - 1 : 0;
      dir > 1 ? y >= 0 : y < lines.length;
      y += dir > 1 ? -1 : 1
    ) {
      for (
        let x = dir > 1 ? lines[y].length - 1 : 0;
        dir > 1 ? x >= 0 : x < lines[y].length;
        x += dir > 1 ? -1 : 1
      ) {
        if (lines[y][x] === "O") {
          let [nx, ny] = [x + dx, y + dy];
          while (inside(nx, ny) && lines[ny][nx] === ".") {
            nx += dx;
            ny += dy;
          }
          nx -= dx;
          ny -= dy;
          if (nx !== x || ny !== y) {
            lines[ny][nx] = "O";
            lines[y][x] = ".";
          }
        }
      }
    }
    return lines;
  }
  const cycle = () => [0, 1, 2, 3].map((dir) => (lines = roll(dir)));
  function load(lines) {
    let sum = 0;
    lines.map((line, i) => {
      line.map((char) => {
        if (char === "O") sum += lines.length - i;
      });
    });
    return sum;
  }
  let memo = [JSON.stringify(lines)]; // deep copy lines array
  cycle();
  while (memo.indexOf(JSON.stringify(lines)) === -1) {
    memo.push(JSON.stringify(lines));
    cycle();
  }
  const hitt = memo.indexOf(JSON.stringify(lines));
  const fold = (begin, end, target) => ((target - hitt) % (end - begin)) + hitt;
  lines = JSON.parse(memo[fold(hitt, memo.length, 1000000000)]);
  return load(lines);
};

console.log("p1:", part1(), "(112773)");
console.log("p2:", part2(), "(98894)");
