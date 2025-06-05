import type {
  Add,
  Subtract,
  Multiply,
  Divide,
  Mod,
  Pow,
  Gt,
  GtOrEq,
  Lt,
  LtOrEq,
  Eq,
} from "ts-arithmetic";

/**
 * Helper: split a string `S` at the *first* top-level comma
 * and return `[left, right]`. If no comma at the top level, then
 * `right` will be `""`.
 */
type SplitTopLevel<
  S extends string,
  Depth extends number = 0,
  Acc extends string = ""
> = S extends `${infer C}${infer Rest}`
  ? C extends "("
    ? SplitTopLevel<Rest, Add<Depth, 1>, `${Acc}${C}`>
    : C extends ")"
    ? SplitTopLevel<Rest, Subtract<Depth, 1>, `${Acc}${C}`>
    : C extends ","
    ? Depth extends 0
      ? [Acc, Rest]
      : SplitTopLevel<Rest, Depth, `${Acc},`>
    : SplitTopLevel<Rest, Depth, `${Acc}${C}`>
  : [Acc, ""];

// Simple trim for leftover strings
type Trim<S extends string> = S extends ` ${infer T}`
  ? Trim<T>
  : S extends `${infer T} `
  ? Trim<T>
  : S;

// --- Bitwise AND implementation for non-negative integers ---
type Bit = 0 | 1;
type AndBits<A extends Bit, B extends Bit> = A extends 1
  ? (B extends 1 ? 1 : 0)
  : 0;
type ShiftRight<N extends number> = Divide<Subtract<N, Mod<N, 2>>, 2>;
type BitwiseAnd<A extends number, B extends number> =
  A extends 0
    ? 0
    : B extends 0
    ? 0
    : Add<
        Multiply<BitwiseAnd<ShiftRight<A>, ShiftRight<B>>, 2>,
        AndBits<Mod<A, 2> & Bit, Mod<B, 2> & Bit>
      >;

type BitwiseOr<A extends number, B extends number> = Subtract<
  Add<A, B>,
  BitwiseAnd<A, B>
>;

type BitwiseXor<A extends number, B extends number> = BitwiseOr<
  A,
  B
> extends infer OR extends number
  ? BitwiseAnd<A, B> extends infer AND extends number
    ? Subtract<OR, AND>
    : never
  : never;

type LeftShift<A extends number, B extends number> = Multiply<A, Pow<2, B>>;

type RightShift<A extends number, B extends number> = Divide<
  Subtract<A, Mod<A, Pow<2, B>>>,
  Pow<2, B>
>;

/**
 * The *key* is to handle +(...) and -(...) with a single pattern each,
 * then decide whether it’s unary or binary based on SplitTopLevel.
 */
export type Evaluate<S extends string> = S extends `n:${infer N extends number}`
  ? N
  : // ---- Handle "+(...)" unary or binary
  S extends `+(${infer Body})`
  ? EvaluatePlus<Body>
  : // ---- Handle "-(...)" unary or binary
  S extends `-(${infer Body})`
  ? EvaluateMinus<Body>
  : // ---- The purely-binary operators
  S extends `*(${infer Body})`
  ? EvaluateMul<Body>
  : S extends `/(${infer Body})`
  ? EvaluateDiv<Body>
  : S extends `**(${infer Body})`
  ? EvaluatePow<Body>
  : S extends `%(${infer Body})`
  ? EvaluateMod<Body>
  : S extends `&(${infer Body})`
  ? EvaluateAnd<Body>
  : S extends `<<(${infer Body})`
  ? EvaluateLeftShift<Body>
  : S extends `>>(${infer Body})`
  ? EvaluateRightShift<Body>
  : S extends `^(${infer Body})`
  ? EvaluateXor<Body>
  : S extends `|(${infer Body})`
  ? EvaluateOr<Body>
  : S extends `<(${infer Body})`
  ? EvaluateLt<Body>
  : S extends `<=(${infer Body})`
  ? EvaluateLte<Body>
  : S extends `>(${infer Body})`
  ? EvaluateGt<Body>
  : S extends `>=(${infer Body})`
  ? EvaluateGte<Body>
  : S extends `==(${infer Body})`
  ? EvaluateEqFn<Body>
  : S extends `!=(${infer Body})`
  ? EvaluateNeq<Body>
  : S extends `?:(${infer Body})`
  ? EvaluateTernary<Body>
  : never;

// Now each operator’s “evaluate” function can do the split
type EvaluatePlus<S extends string> = SplitTopLevel<S> extends [
  infer L,
  infer R
]
  ? R extends ""
    ? // No top-level comma => unary plus
      Evaluate<Trim<Extract<L, string>>>
    : // Has top-level comma => binary plus
      Add<
        Evaluate<Trim<Extract<L, string>>>,
        Evaluate<Trim<Extract<R, string>>>
      >
  : never;

type EvaluateMinus<S extends string> = SplitTopLevel<S> extends [
  infer L,
  infer R
]
  ? R extends ""
    ? // No top-level comma => unary minus
      Subtract<0, Evaluate<Trim<Extract<L, string>>>>
    : // Has top-level comma => binary minus
      Subtract<
        Evaluate<Trim<Extract<L, string>>>,
        Evaluate<Trim<Extract<R, string>>>
      >
  : never;

type EvaluateMul<S extends string> = SplitTopLevel<S> extends [infer L, infer R]
  ? Multiply<
      Evaluate<Trim<Extract<L, string>>>,
      Evaluate<Trim<Extract<R, string>>>
    >
  : never;

type EvaluateDiv<S extends string> = SplitTopLevel<S> extends [infer L, infer R]
  ? Divide<
      Evaluate<Trim<Extract<L, string>>>,
      Evaluate<Trim<Extract<R, string>>>
    >
  : never;

type EvaluateMod<S extends string> = SplitTopLevel<S> extends [infer L, infer R]
  ? Mod<Evaluate<Trim<Extract<L, string>>>, Evaluate<Trim<Extract<R, string>>>>
  : never;

type EvaluateAnd<S extends string> = SplitTopLevel<S> extends [infer L, infer R]
  ? BitwiseAnd<
      Evaluate<Trim<Extract<L, string>>>,
      Evaluate<Trim<Extract<R, string>>>
    >
  : never;

type EvaluateLeftShift<S extends string> = SplitTopLevel<S> extends [infer L, infer R]
  ? LeftShift<
      Evaluate<Trim<Extract<L, string>>>,
      Evaluate<Trim<Extract<R, string>>>
    >
  : never;

type EvaluateRightShift<S extends string> = SplitTopLevel<S> extends [infer L, infer R]
  ? RightShift<
      Evaluate<Trim<Extract<L, string>>>,
      Evaluate<Trim<Extract<R, string>>>
    >
  : never;

type EvaluateXor<S extends string> = SplitTopLevel<S> extends [infer L, infer R]
  ? BitwiseXor<
      Evaluate<Trim<Extract<L, string>>>,
      Evaluate<Trim<Extract<R, string>>>
    >
  : never;

type EvaluateOr<S extends string> = SplitTopLevel<S> extends [infer L, infer R]
  ? BitwiseOr<
      Evaluate<Trim<Extract<L, string>>>,
      Evaluate<Trim<Extract<R, string>>>
    >
  : never;

type EvaluatePow<S extends string> = SplitTopLevel<S> extends [infer L, infer R]
  ? Pow<Evaluate<Trim<Extract<L, string>>>, Evaluate<Trim<Extract<R, string>>>>
  : never;

type BitToBool<B extends Bit> = B extends 1 ? true : false;

type EvaluateLt<S extends string> = SplitTopLevel<S> extends [infer L, infer R]
  ? Evaluate<Trim<Extract<L, string>>> extends infer A
    ? A extends number
      ? Evaluate<Trim<Extract<R, string>>> extends infer B
        ? B extends number
          ? BitToBool<Lt<A, B>>
          : never
        : never
      : never
    : never
  : never;

type EvaluateLte<S extends string> = SplitTopLevel<S> extends [infer L, infer R]
  ? Evaluate<Trim<Extract<L, string>>> extends infer A
    ? A extends number
      ? Evaluate<Trim<Extract<R, string>>> extends infer B
        ? B extends number
          ? BitToBool<LtOrEq<A, B>>
          : never
        : never
      : never
    : never
  : never;

type EvaluateGt<S extends string> = SplitTopLevel<S> extends [infer L, infer R]
  ? Evaluate<Trim<Extract<L, string>>> extends infer A
    ? A extends number
      ? Evaluate<Trim<Extract<R, string>>> extends infer B
        ? B extends number
          ? BitToBool<Gt<A, B>>
          : never
        : never
      : never
    : never
  : never;

type EvaluateGte<S extends string> = SplitTopLevel<S> extends [infer L, infer R]
  ? Evaluate<Trim<Extract<L, string>>> extends infer A
    ? A extends number
      ? Evaluate<Trim<Extract<R, string>>> extends infer B
        ? B extends number
          ? BitToBool<GtOrEq<A, B>>
          : never
        : never
      : never
    : never
  : never;

type EvaluateEqFn<S extends string> = SplitTopLevel<S> extends [infer L, infer R]
  ? Evaluate<Trim<Extract<L, string>>> extends infer A
    ? A extends number
      ? Evaluate<Trim<Extract<R, string>>> extends infer B
        ? B extends number
          ? BitToBool<Eq<A, B>>
          : never
        : never
      : never
    : never
  : never;

type EvaluateNeq<S extends string> = SplitTopLevel<S> extends [infer L, infer R]
  ? Evaluate<Trim<Extract<L, string>>> extends infer A
    ? A extends number
      ? Evaluate<Trim<Extract<R, string>>> extends infer B
        ? B extends number
          ? Eq<A, B> extends 1
            ? false
            : true
          : never
        : never
      : never
    : never
  : never;

type EvaluateTernary<S extends string> = SplitTopLevel<S> extends [
  infer Cond,
  infer Rest
] ? SplitTopLevel<Trim<Extract<Rest, string>>> extends [infer T, infer F]
  ? Evaluate<Trim<Extract<Cond, string>>> extends true
    ? Evaluate<Trim<Extract<T, string>>>
    : Evaluate<Trim<Extract<F, string>>>
  : never
: never;

