
/** Operators we allow */
type Operator = "+" | "-" | "*" | "/" | "%" | "^" | "&" | "|";

/** Single-character whitespace, for trimming input */
type Whitespace = " " | "\n" | "\r" | "\t";

/** A 'digit' we allow in numbers (no sign allowed here) */
type Digit = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";

/** A 'number char' we allow in numbers, including decimal point */
type NumberChar = Digit | ".";

/**
 * A NumberToken stores the exact digits as literal type V.
 * Example: NumberToken<"42">
 */
export interface NumberToken<V extends string> {
  type: "number";
  value: V;
}

export interface OperatorToken {
  type: "operator";
  value: Operator;
}

export interface ParenToken {
  type: "paren";
  value: "(" | ")";
}

/** A token is either a NumberToken, OperatorToken, or ParenToken. */
type Token = NumberToken<string> | OperatorToken | ParenToken;

/** A list of tokens (possibly empty) */
export type TokenList = Token[];

/** Remove leading whitespace from S. */
type TrimLeft<S extends string> = S extends `${Whitespace}${infer Rest}`
  ? TrimLeft<Rest>
  : S;

// Recursive descent parser

type TokenizeNumber<
  S extends string,
  Acc extends string,
  HasDecimal extends boolean = false
> = S extends `${infer C}${infer Rest}`
  ? C extends NumberChar
    ? C extends "."
      ? HasDecimal extends true
        ? never // Second decimal point is invalid
        : TokenizeNumber<Rest, `${Acc}${C}`, true>
      : TokenizeNumber<Rest, `${Acc}${C}`, HasDecimal>
    : [{ type: "number"; value: Acc }, S]
  : [{ type: "number"; value: Acc }, S];

type TokenizeOne<S extends string> = TrimLeft<S> extends ""
  ? // nothing left => no token
    never
  : TrimLeft<S> extends `${infer C}${infer Rest}`
  ? C extends Digit
    ? // consume a number starting with digit C
      TokenizeNumber<Rest, C>
    : // single-character operator or paren?
    C extends Operator
    ? [{ type: "operator"; value: C }, Rest]
    : C extends "(" | ")"
    ? [{ type: "paren"; value: C }, Rest]
    : // unknown char => error
      never
  : // can't match => error
    never;

type TokenizeAll<
  S extends string,
  Acc extends Token[] = []
> = TrimLeft<S> extends ""
  ? // finished
    Acc
  : // try to consume one token
  TokenizeOne<S> extends [infer T, infer R]
  ? T extends Token
    ? R extends string
      ? TokenizeAll<R, [...Acc, T]>
      : never
    : never
  : never;

/** Main entry point to tokenize an entire string at the type level. */
export type Tokenize<S extends string> = TokenizeAll<S>;
