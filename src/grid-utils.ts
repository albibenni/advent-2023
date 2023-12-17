export type Point = [x: number, y: number];

export function pointsEqual([lx, ly]: Point, [rx, ry]: Point): boolean {
  const ret = lx == rx && ly == ry;
  return ret;
}
export class Points<TPoint extends Point = Point> {
  #set: Set<string>;

  constructor(iterable?: TPoint[] | Points<TPoint> | Set<TPoint>) {
    if (!iterable) {
      this.#set = new Set<string>();
      return;
    }

    const strings = [...iterable].map((point) => JSON.stringify(point));
    this.#set = new Set<string>(strings);
  }

  get size() {
    return this.#set.size;
  }

  *[Symbol.iterator]() {
    for (const value of this.#set[Symbol.iterator]()) {
      yield JSON.parse(value) as TPoint;
    }
  }

  add(point: TPoint) {
    this.#set.add(JSON.stringify(point));
    return this;
  }

  clear() {
    this.#set.clear();
  }

  delete(point: TPoint) {
    return this.#set.delete(JSON.stringify(point));
  }

  *entries(): IterableIterator<[TPoint, TPoint]> {
    for (const [value1, value2] of this.#set.entries()) {
      yield [JSON.parse(value1), JSON.parse(value2)] as [
        point: TPoint,
        point: TPoint,
      ];
    }
  }

  forEach(
    callbackfn: (point: TPoint, point2: TPoint, points: Points<TPoint>) => void,
    thisArg?: any,
  ) {
    this.#set.forEach((value) => {
      const point = JSON.parse(value) as TPoint;
      callbackfn.call(thisArg, point, point, this);
    });
  }

  has(point: TPoint) {
    return this.#set.has(JSON.stringify(point));
  }

  *keys(): IterableIterator<TPoint> {
    for (const key of this.#set.keys()) {
      yield JSON.parse(key) as TPoint;
    }
  }

  *values(): IterableIterator<TPoint> {
    for (const value of this.#set.values()) {
      yield JSON.parse(value) as TPoint;
    }
  }
}
export function manhattanDistance(l: Point, r: Point): number {
  const [lx, ly] = l;
  const [rx, ry] = r;
  const dist = Math.abs(lx - rx) + Math.abs(ly - ry);
  return dist;
}

export function pointToKey([x, y]: Point): string {
  return x + "," + y;
}

export type Grid<T = string> = T[][];

export function parseGrid<T>(
  lines: string[],
  callback?: (pos: Point, tile: T) => void,
): Grid<T> {
  if (typeof callback == "undefined")
    return lines.map((l) => l.split("") as T[]);
  else {
    return lines.map((l, y) =>
      l.split("").map((c, x) => {
        const t = c as T;
        callback([x, y], t);
        return t;
      }),
    );
  }
}

export function maxY(grid: Grid<unknown>): number {
  return grid.length;
}

export function maxX(grid: Grid<unknown>): number {
  return grid[0]!.length;
}

export function column<T>(grid: Grid<T>, x: number) {
  return grid.map((line) => line[x]);
}

export function getTileFrom<T>([x, y]: Point, grid: Grid<T>): T {
  return grid[y]![x]!;
}

export function setTile<T>([x, y]: Point, grid: Grid<T>, t: T) {
  grid[y]![x] = t;
}

export function findAll<T>(grid: Grid<T>, tile: T): Point[] {
  return grid.flatMap((line, y) =>
    line.reduce((acc, cur, x) => {
      if (cur == tile) acc.push([x, y]);
      return acc;
    }, [] as Point[]),
  );
}

export function renderGrid<T>(g: Grid<T>) {
  return g.map((l) => l.join("")).join("\n");
}

export function renderPoints<T>(g: Grid<T>, loop: Point[], char: T) {
  const copy = g.map((l) => [...l]);
  for (const p of loop) {
    setTile(p, copy, char);
  }
  return renderGrid(copy);
}
