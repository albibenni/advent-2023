import fs from "fs";

const dirs = { R: [1, 0], L: [-1, 0], U: [0, -1], D: [0, 1] };

const part1 = () => {
  fs.readFile("./src/day18/input.txt", (err, data) => {
    if (err) throw new Error("data :(");
    const commands = data
      .toString()
      .trim()
      .split(/\r?\n/gm)
      .map((x) => {
        const [dir, steps] = x.trim().split(" ");
        return {
          dir,
          steps: Number(steps),
        };
      });
    const pool = new Map([[`0, 0`, { x: 0, y: 0 }]]);
    let position = { x: 0, y: 0 };
    for (const command of commands) {
      const [xDir, yDir] = dirs[command.dir];
      for (let i = 0; i < command.steps; i++) {
        position = {
          x: position.x + xDir,
          y: position.y + yDir,
        };
        pool.set(`${position.x}, ${position.y}`, {
          x: position.x,
          y: position.y,
        });
      }
    }
    const maxRow = [...pool.values()].reduce((a, b) => (a.y > b.y ? a : b), {
      x: 0,
      y: 0,
    }).y;
    const maxCol = [...pool.values()].reduce((a, b) => (a.x > b.x ? a : b), {
      x: 0,
      y: 0,
    }).x;
    const minRow = [...pool.values()].reduce((a, b) => (a.y < b.y ? a : b), {
      x: 0,
      y: 0,
    }).y;
    const minCol = [...pool.values()].reduce((a, b) => (a.x < b.x ? a : b), {
      x: 0,
      y: 0,
    }).x;
    let goodPoint;
    for (let y = minRow; y <= maxRow && !goodPoint; y++) {
      for (let x = minCol; x <= maxCol && !goodPoint; x++) {
        const isWall = pool.has(`${x}, ${y}`);
        if (!goodPoint && !isWall) {
          if (pool.has(`${x - 1}, ${y}`) && pool.has(`${x}, ${y - 1}`)) {
            goodPoint = { x, y };
          }
        }
      }
    }

    let toVisit = new Set([`${goodPoint.x}, ${goodPoint.y}`]);
    for (const point of toVisit) {
      if (pool.has(point)) {
        continue;
      }
      const [pointX, pointY] = point.split(", ").map(Number);
      pool.set(point);
      for (const curDir of ["U", "D", "L", "R"]) {
        const [xDir, yDir] = dirs[curDir];
        const nextX = pointX + xDir;
        const nextY = pointY + yDir;
        toVisit.add(`${nextX}, ${nextY}`);
      }
    }

    console.log(pool.size);
  });
};

const part2 = () => {
  fs.readFile("./src/day18/input.txt", (err, data) => {
    if (err) throw new Error("data :(");
    const commands = data
      .toString()
      .trim()
      .split(/\r?\n/gm)
      .map((x) => {
        const [_, __, color] = x.trim().split(" ");
        const colorify = color.substring(1, color.length - 1);
        const steps = parseInt(colorify.substring(1, 6), 16);
        const dir = parseInt(colorify.substring(6, 7), 16);
        return {
          dir: dir === 0 ? "R" : dir === 1 ? "D" : dir === 2 ? "L" : "U",
          steps: Number(steps),
        };
      });

    let position = { x: 0, y: 0 };
    const ranges = [];
    for (const command of commands) {
      const [xDir, yDir] = dirs[command.dir];
      let range = {
        xStart: position.x,
        yStart: position.y,
        xEnd: position.x + xDir * command.steps,
        yEnd: position.y + yDir * command.steps,
        len: command.steps + 1,
        dir: command.dir,
      };
      ranges.push(range);
      position = {
        x: position.x + xDir * command.steps,
        y: position.y + yDir * command.steps,
      };
    }

    const minCol = ranges.reduce(
      (acc, cur) => Math.min(cur.xStart, cur.xEnd, acc),
      0,
    );
    const leftMost = ranges.find(
      (x) => x.xStart === minCol && (x.dir === "U" || x.dir === "D"),
    );
    let matchingDir = leftMost.dir === "U" ? "D" : "U";
    let interior = 0;
    const wallSize = ranges.reduce((acc, cur) => {
      if (cur.dir === matchingDir || cur.dir === leftMost.dir) {
        return acc + cur.len;
      }
      return acc + cur.len - 2;
    }, 0);

    const rightWalls = ranges
      .filter((opWall) => opWall.dir === matchingDir)
      .sort((a, b) => a.xStart - b.xStart);
    const leftWalls = ranges
      .filter((x) => x.dir === leftMost.dir)
      .sort((a, b) => a.xStart - b.xStart);
    const blockingWalls = ranges.filter((x) => x.dir === "R" || x.dir === "L");
    for (const curWall of leftWalls) {
      const topPoint = Math.min(curWall.yStart, curWall.yEnd);
      const bottomPoint = Math.max(curWall.yStart, curWall.yEnd);
      for (let y = topPoint; y <= bottomPoint; y++) {
        if (y === topPoint || y === bottomPoint) {
          const isBlocked = blockingWalls.find(
            (blocker) =>
              blocker.yEnd === y &&
              ((blocker.dir === "L" && blocker.xEnd === curWall.xStart) ||
                (blocker.dir === "R" && blocker.xStart === curWall.xStart)),
          );
          if (isBlocked) {
            continue;
          }
        }
        const matchingWall = rightWalls.find(
          (opWall) =>
            opWall.xStart > curWall.xStart &&
            Math.min(opWall.yStart, opWall.yEnd) <= y &&
            Math.max(opWall.yStart, opWall.yEnd) >= y,
        );
        interior += matchingWall.xStart - curWall.xStart - 1;
      }
    }
    console.log(interior + wallSize);
  });
};
part1();
part2();
