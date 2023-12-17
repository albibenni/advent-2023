import {
  track,
  Swapper,
  effect,
  ForEach,
  makeLocalStyle,
  defaultTracker,
} from "mutraction-dom";

const storageKey = "aoc-input";

const model = track({
  input: sessionStorage.getItem(storageKey) || getDefaultInput(), // value in the textarea
  appliedInput: "", // used for calculation, assigned on click
  runPart: 0, // part 1 or 2?
  startRun(part: number) {
    model.runPart = part;
    model.appliedInput = model.input;
  },
});

function parseInput(input: string) {
  return new CharGrid(input);
}

function runPart1() {
  const map = parseInput(model.appliedInput);
  const display = track(parseInput(model.appliedInput));

  type Path = { pos: Position; dir: Direction; dist: number };
  let queue: Path[][] = [
    [{ pos: new Position(0, 0), dir: Direction.right, dist: 0 }],
  ];

  const seen = new Set<string>();
  const state = track({ heatLoss: 0, complete: false });

  function checkStep() {
    defaultTracker.startTransaction();
    try {
      for (const path of queue[state.heatLoss] ?? []) {
        if (display.at(path.pos) !== "▓") display.set(path.pos, "▓");
        if (path.pos.row === map.height - 1 && path.pos.col === map.width - 1) {
          state.complete = true;
          return;
        }
        tryMove(path, path.dir);
        tryMove(path, path.dir.turnLeft());
        tryMove(path, path.dir.turnRight());
      }
    } finally {
      defaultTracker.commit();
    }

    function tryMove(basePath: Path, dir: Direction) {
      const candidate: Path = {
        pos: basePath.pos.move(dir),
        dir,
        dist: dir === basePath.dir ? basePath.dist + 1 : 1,
      };
      if (candidate.dist > 3 || !map.contains(candidate.pos)) return;

      const identifier = [
        candidate.pos.row,
        candidate.pos.col,
        candidate.dir.row,
        candidate.dir.col,
        candidate.dist,
      ].join();
      if (seen.has(identifier)) return;

      seen.add(identifier);
      const newHeatLoss = state.heatLoss + parseInt(map.at(candidate.pos));
      queue[newHeatLoss] ??= [];
      queue[newHeatLoss].push(candidate);
    }
    state.heatLoss++;
    requestAnimationFrame(checkStep);
  }
  requestAnimationFrame(checkStep);

  return (
    <>
      <p>
        The elves are checking states reachable with a total heat loss of{" "}
        <strong>{state.heatLoss}</strong>.
        <span mu:if={state.complete}>
          The elves have discovered a path to the destination.
        </span>
      </p>
      {display.render()}
    </>
  );
}

function runPart2() {
  const map = parseInput(model.appliedInput);
  const display = track(parseInput(model.appliedInput));

  type Path = { pos: Position; dir: Direction; dist: number };
  let queue: Path[][] = [
    [
      { pos: new Position(0, 0), dir: Direction.right, dist: 0 },
      { pos: new Position(0, 0), dir: Direction.down, dist: 0 },
    ],
  ];

  const seen = new Set<string>();
  const state = track({ heatLoss: 0, complete: false });

  function checkStep() {
    defaultTracker.startTransaction();
    try {
      for (const path of queue[state.heatLoss] ?? []) {
        if (display.at(path.pos) !== "▓") display.set(path.pos, "▓");
        if (path.pos.row === map.height - 1 && path.pos.col === map.width - 1) {
          state.complete = true;
          return;
        }
        if (path.dist < 10) {
          tryMove(path, path.dir);
        }
        if (path.dist >= 4) {
          tryMove(path, path.dir.turnLeft());
          tryMove(path, path.dir.turnRight());
        }
      }
    } finally {
      defaultTracker.commit();
    }

    function tryMove(basePath: Path, dir: Direction) {
      const candidate: Path = {
        pos: basePath.pos.move(dir),
        dir,
        dist: dir === basePath.dir ? basePath.dist + 1 : 1,
      };
      if (!map.contains(candidate.pos)) return;

      const identifier = [
        candidate.pos.row,
        candidate.pos.col,
        candidate.dir.row,
        candidate.dir.col,
        candidate.dist,
      ].join();
      if (seen.has(identifier)) return;

      seen.add(identifier);
      const newHeatLoss = state.heatLoss + parseInt(map.at(candidate.pos));
      queue[newHeatLoss] ??= [];
      queue[newHeatLoss].push(candidate);
    }
    state.heatLoss++;
    requestAnimationFrame(checkStep);
  }
  requestAnimationFrame(checkStep);

  return (
    <>
      <p>
        The elves are checking states reachable with a total heat loss of{" "}
        <strong>{state.heatLoss}</strong> using the new <em>ultra-crucibles</em>
        .
        <span mu:if={state.complete}>
          The elves have discovered a path to the destination.
        </span>
      </p>
      {display.render()}
    </>
  );
}

const app = (
  <>
    <h1>
      <a href="https://mutraction.dev/cases/aoc2023/">AOC 2023</a> /
      <a href="https://adventofcode.com/2023/day/17">Day 17</a>
    </h1>
    <label>Input:</label>
    <textarea
      value={model.input}
      mu:syncEvent="input"
      style={{ resize: "vertical", height: "8em" }}
    />
    <button disabled={model.input === ""} onclick={() => model.startRun(1)}>
      Run part 1
    </button>
    <button disabled={model.input === ""} onclick={() => model.startRun(2)}>
      Run part 2
    </button>

    <section style={{ gridColumn: "1/4" }} mu:if={model.runPart === 1}>
      <h3>Part 1</h3>
      {Swapper(runPart1)}
    </section>
    <section style={{ gridColumn: "1/4" }} mu:if={model.runPart === 2}>
      <h3>Part 2</h3>
      {Swapper(runPart2)}
    </section>
  </>
);

document.body.append(app);

effect(() => sessionStorage.setItem(storageKey, model.input));

class Direction {
  readonly row: number;
  readonly col: number;

  constructor(row: number, col: number) {
    this.row = row;
    this.col = col;
    Object.freeze(this);
  }

  add(other: Direction) {
    return new Direction(this.row + other.row, this.col + other.col);
  }

  reverse() {
    return new Direction(-this.row, -this.col);
  }
  turnLeft() {
    return new Direction(-this.col, this.row);
  }
  turnRight() {
    return new Direction(this.col, -this.row);
  }

  static up = new Direction(-1, 0);
  static down = new Direction(1, 0);
  static left = new Direction(0, -1);
  static right = new Direction(0, 1);
}

class Position {
  readonly row: number;
  readonly col: number;

  constructor(row: number, col: number) {
    this.row = row;
    this.col = col;
    Object.freeze(this);
  }

  clone() {
    return new Position(this.row, this.col);
  }
  up() {
    return new Position(this.row - 1, this.col);
  }
  down() {
    return new Position(this.row + 1, this.col);
  }
  left() {
    return new Position(this.row, this.col - 1);
  }
  right() {
    return new Position(this.row, this.col + 1);
  }
  move(dir: Direction) {
    return new Position(this.row + dir.row, this.col + dir.col);
  }
}

class CharGrid {
  private grid: string[][];
  width = 0;
  height = 0;

  constructor(grid: string | undefined) {
    if (!grid) {
      this.grid = [];
      return;
    }
    this.grid = grid
      .replace(/\n\s*$/, "")
      .split(/\n/)
      .map((row) => [...row]);
    this.height = this.grid.length;
    this.width = Math.max(...this.grid.map((row) => row.length));
  }

  at(pos: Position): string | undefined {
    return this.grid[pos.row]?.[pos.col];
  }

  set(pos: Position, char: string) {
    this.grid[pos.row][pos.col] = char;
  }

  contains(pos: Position): boolean {
    return (
      pos.row >= 0 &&
      pos.row < this.height &&
      pos.col >= 0 &&
      pos.col < this.width
    );
  }

  private static style = makeLocalStyle({
    figure: {
      display: "grid",
      gap: "2px",
      gridAutoColumns: "max-content",
    },
    span: {
      padding: "0 2px",
      fontSize: "9pt",
    },
    ".highlight": {
      color: "var(--bg)",
      background: "var(--text)",
    },
  });

  render(highlight?: (cell: string, row: number, col: number) => boolean) {
    return (
      <figure mu:apply={CharGrid.style}>
        {ForEach(this.grid, (line, row) =>
          ForEach(line, (cell, col) => (
            <span
              innerHTML={cell}
              style={{ gridRow: `${row + 1}`, gridColumn: `${col + 1}` }}
              classList={{ highlight: !!highlight?.(cell, row, col) }}
            />
          )),
        )}
      </figure>
    );
  }
}

function getDefaultInput() {
  return `
2413432311323
3215453535623
3255245654254
3446585845452
4546657867536
1438598798454
4457876987766
3637877979653
4654967986887
4564679986453
1224686865563
2546548887735
4322674655533
`.trim();
}
