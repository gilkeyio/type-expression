
import { CompileTimeError } from "./error";

/** Operators we allow */
type Operator =
  | "+"
  | "-"
  | "*"
  | "/"
  | "%"
  | "**"
  | "&"
  | "^"
  | "|"
  | "<<"
  | ">>"
  | "<"
  | "<="
  | ">"
  | ">="
  | "=="
  | "!="
  | "?"
  | ":";

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
type StrToNumber<S extends string> = S extends `${infer N extends number}`
  ? N
  : never;

export interface NumberToken<V extends number> {
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
type Token = NumberToken<number> | OperatorToken | ParenToken;

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
        ? CompileTimeError<`Invalid number '${Acc}.' - multiple decimals`>
        : TokenizeNumber<Rest, `${Acc}${C}`, true>
      : TokenizeNumber<Rest, `${Acc}${C}`, HasDecimal>
    : [{ type: "number"; value: StrToNumber<Acc> }, S]
  : [{ type: "number"; value: StrToNumber<Acc> }, S];

type TokenizeOne<S extends string> = TrimLeft<S> extends ""
  ? // nothing left => no token
    CompileTimeError<"Unexpected end of input">
  : TrimLeft<S> extends `${infer C}${infer Rest}`
  ? C extends Digit
    ? // consume a number starting with digit C
      TokenizeNumber<Rest, C>
    : C extends "(" | ")"
    ? [{ type: "paren"; value: C }, Rest]
    : // operators, including multi-character tokens
    C extends "<"
    ? Rest extends `<${infer R2}`
      ? [{ type: "operator"; value: "<<" }, R2]
      : Rest extends `=${infer R2}`
      ? [{ type: "operator"; value: "<=" }, R2]
      : [{ type: "operator"; value: "<" }, Rest]
    : C extends ">"
    ? Rest extends `>${infer R2}`
      ? [{ type: "operator"; value: ">>" }, R2]
      : Rest extends `=${infer R2}`
      ? [{ type: "operator"; value: ">=" }, R2]
      : [{ type: "operator"; value: ">" }, Rest]
    : C extends "="
    ? Rest extends `=${infer R2}`
      ? [{ type: "operator"; value: "==" }, R2]
      : CompileTimeError<"Unexpected '='">
    : C extends "!"
    ? Rest extends `=${infer R2}`
      ? [{ type: "operator"; value: "!=" }, R2]
      : CompileTimeError<"Unexpected '!'">
    : C extends "*"
    ? Rest extends `*${infer R2}`
      ? [{ type: "operator"; value: "**" }, R2]
      : [{ type: "operator"; value: "*" }, Rest]
    : C extends "?" | ":" | "+" | "-" | "/" | "%" | "&" | "^" | "|"
    ? [{ type: "operator"; value: C }, Rest]
    : // unknown char => error
      CompileTimeError<`Unexpected character '${C}'`>
  : // can't match => error
    CompileTimeError<"Unable to tokenize input">;

type TokenizeAll<
  S extends string,
  Acc extends Token[] = []
> = TrimLeft<S> extends ""
  ? // finished
    Acc
  : // try to consume one token
  TokenizeOne<S> extends CompileTimeError<infer M>
  ? CompileTimeError<M>
  : TokenizeOne<S> extends [infer T, infer R]
  ? T extends Token
    ? R extends string
      ? TokenizeAll<R, [...Acc, T]>
      : CompileTimeError<"Invalid remainder while tokenizing">
    : CompileTimeError<"Invalid token produced">
  : CompileTimeError<"Unable to tokenize">;

/** Main entry point to tokenize an entire string at the type level. */
export type Tokenize<S extends string> = TokenizeAll<S>;
