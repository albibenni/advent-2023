import { Add, Subtract, Pow } from "ts-arithmetic";
import { S, L } from "ts-toolbelt";

//! Recursion limit exceeded on real input

type Take<T extends any[], N extends number, Accum extends any[] = []> = [
  N,
] extends [0]
  ? Accum
  : T extends [infer First, ...infer Rest]
  ? Take<Rest, Subtract<N, 1>, [...Accum, First]>
  : Accum;

type Slice<T extends any[], N extends number> = [N] extends [0]
  ? T
  : T extends [any, ...infer Rest extends any[]]
  ? Slice<Rest, Subtract<N, 1>>
  : [];

type ExtractNumbers<T extends string> = L.Filter<
  S.Split<S.Replace<T, "  ", " ">, " ">,
  ""
>;

type ProcessLine<T extends string> =
  T extends `Card ${infer CardNumber}: ${infer WinnersStr} | ${infer CardStr}`
    ? ExtractNumbers<WinnersStr> extends infer Winners extends string[]
      ? ExtractNumbers<CardStr> extends infer Card extends string[]
        ? Subtract<
            Card["length"],
            L.Filter<Card, Winners[number]>["length"]
          > extends infer WinnerCount extends number
          ? WinnerCount
          : never
        : never
      : never
    : never;

type SplitLines<
  T extends string,
  Acc extends number[] = [],
> = T extends `${infer Head}\n${infer Rest}`
  ? SplitLines<Rest, [...Acc, ProcessLine<Head>]>
  : [...Acc, ProcessLine<T>];

type Sum<T extends number[], Acc extends number = 0> = T extends [
  infer Head extends number,
  ...infer Rest extends number[],
]
  ? Sum<Rest, Add<Acc, Head>>
  : Acc;

type IncrementBy<
  T extends number[],
  By extends number,
  Acc extends number[] = [],
> = T extends [infer Head extends number, ...infer Rest extends number[]]
  ? IncrementBy<Rest, By, [...Acc, Add<Head, By>]>
  : Acc;

type ApplyDuplications<
  T extends number[],
  Index extends number = 0,
  Counts extends number[] = L.Repeat<1, T["length"]>,
> = T extends [infer Head extends number, ...infer Rest extends number[]]
  ? ApplyDuplications<
      Rest,
      Add<Index, 1>,
      [
        ...Take<Counts, Add<Index, 1>>,
        ...IncrementBy<Take<Slice<Counts, Add<Index, 1>>, Head>, Counts[Index]>,
        ...Slice<Counts, Add<Add<Index, 1>, Head>>,
      ]
    >
  : Counts;

type Answer = Sum<ApplyDuplications<SplitLines<Input>>>;
//   ^?

type Input = `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`;
