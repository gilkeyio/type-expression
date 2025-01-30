import { Expect, Equal } from "./test_utilities";

/** Operators we allow */
type Operator = "+" | "-" | "*" | "/" | "%" | "^";

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

/**
 * 1. Single literal
 * "5" => [{ type: "number"; value: "5" }]
 */
type Tokenize1 = Expect<
  Equal<
    Tokenize<"5">,
    [
      {
        type: "number";
        value: "5";
      }
    ]
  >
>;

/**
 * 2. Double digit number
 * "42" => [{ type: "number"; value: "42" }]
 */
type Tokenize2 = Expect<
  Equal<Tokenize<"42">, [{ type: "number"; value: "42" }]>
>;

/**
 * 3. Simple sum
 * "5 + 3" => [
 *   { type: "number"; value: "5" },
 *   { type: "operator"; value: "+" },
 *   { type: "number"; value: "3" }
 * ]
 */
type Tokenize3 = Expect<
  Equal<
    Tokenize<"5 + 3">,
    [
      { type: "number"; value: "5" },
      { type: "operator"; value: "+" },
      { type: "number"; value: "3" }
    ]
  >
>;

/**
 * 4. Simple subtraction
 * "10 - 4" => [
 *   { type: "number"; value: "10" },
 *   { type: "operator"; value: "-" },
 *   { type: "number"; value: "4" }
 * ]
 */
type Tokenize4 = Expect<
  Equal<
    Tokenize<"10 - 4">,
    [
      { type: "number"; value: "10" },
      { type: "operator"; value: "-" },
      { type: "number"; value: "4" }
    ]
  >
>;

/**
 * 5. Simple multiplication
 * "6 * 7" => [
 *   { type: "number"; value: "6" },
 *   { type: "operator"; value: "*" },
 *   { type: "number"; value: "7" }
 * ]
 */
type Tokenize5 = Expect<
  Equal<
    Tokenize<"6 * 7">,
    [
      { type: "number"; value: "6" },
      { type: "operator"; value: "*" },
      { type: "number"; value: "7" }
    ]
  >
>;

/**
 * 6. Simple division
 * "20 / 5" => [
 *   { type: "number"; value: "20" },
 *   { type: "operator"; value: "/" },
 *   { type: "number"; value: "5" }
 * ]
 */
type Tokenize6 = Expect<
  Equal<
    Tokenize<"20 / 5">,
    [
      { type: "number"; value: "20" },
      { type: "operator"; value: "/" },
      { type: "number"; value: "5" }
    ]
  >
>;

/**
 * 7. Modulo operation
 * "7 % 3" => [
 *   { type: "number"; value: "7" },
 *   { type: "operator"; value: "%" },
 *   { type: "number"; value: "3" }
 * ]
 */
type Tokenize7 = Expect<
  Equal<
    Tokenize<"7 % 3">,
    [
      { type: "number"; value: "7" },
      { type: "operator"; value: "%" },
      { type: "number"; value: "3" }
    ]
  >
>;

/**
 * 8. Exponentiation
 * "2 ^ 3" => [
 *   { type: "number"; value: "2" },
 *   { type: "operator"; value: "^" },
 *   { type: "number"; value: "3" }
 * ]
 */
type Tokenize8 = Expect<
  Equal<
    Tokenize<"2 ^ 3">,
    [
      { type: "number"; value: "2" },
      { type: "operator"; value: "^" },
      { type: "number"; value: "3" }
    ]
  >
>;

/**
 * 9. Mixed operators, shallow nesting
 * "5 + 3 * 2" => [
 *   { type: "number"; value: "5" },
 *   { type: "operator"; value: "+" },
 *   { type: "number"; value: "3" },
 *   { type: "operator"; value: "*" },
 *   { type: "number"; value: "2" }
 * ]
 */
type Tokenize9 = Expect<
  Equal<
    Tokenize<"5 + 3 * 2">,
    [
      { type: "number"; value: "5" },
      { type: "operator"; value: "+" },
      { type: "number"; value: "3" },
      { type: "operator"; value: "*" },
      { type: "number"; value: "2" }
    ]
  >
>;

/**
 * 10. Parentheses affecting operation order
 * "(5 + 3) * 2" => [
 *   { type: "paren"; value: "(" },
 *   { type: "number"; value: "5" },
 *   { type: "operator"; value: "+" },
 *   { type: "number"; value: "3" },
 *   { type: "paren"; value: ")" },
 *   { type: "operator"; value: "*" },
 *   { type: "number"; value: "2" }
 * ]
 */
type Tokenize10 = Expect<
  Equal<
    Tokenize<"(5 + 3) * 2">,
    [
      { type: "paren"; value: "(" },
      { type: "number"; value: "5" },
      { type: "operator"; value: "+" },
      { type: "number"; value: "3" },
      { type: "paren"; value: ")" },
      { type: "operator"; value: "*" },
      { type: "number"; value: "2" }
    ]
  >
>;

/**
 * 11. Multiple exponentiations
 * "2 ^ 3 ^ 2" => [
 *   { type: "number"; value: "2" },
 *   { type: "operator"; value: "^" },
 *   { type: "number"; value: "3" },
 *   { type: "operator"; value: "^" },
 *   { type: "number"; value: "2" }
 * ]
 */
type Tokenize11 = Expect<
  Equal<
    Tokenize<"2 ^ 3 ^ 2">,
    [
      { type: "number"; value: "2" },
      { type: "operator"; value: "^" },
      { type: "number"; value: "3" },
      { type: "operator"; value: "^" },
      { type: "number"; value: "2" }
    ]
  >
>;

/**
 * 12. Multiple parentheses with different operations
 * "(2 + 3) * (4 + 5)" => [
 *   { type: "paren"; value: "(" },
 *   { type: "number"; value: "2" },
 *   { type: "operator"; value: "+" },
 *   { type: "number"; value: "3" },
 *   { type: "paren"; value: ")" },
 *   { type: "operator"; value: "*" },
 *   { type: "paren"; value: "(" },
 *   { type: "number"; value: "4" },
 *   { type: "operator"; value: "+" },
 *   { type: "number"; value: "5" },
 *   { type: "paren"; value: ")" }
 * ]
 */
type Tokenize12 = Expect<
  Equal<
    Tokenize<"(2 + 3) * (4 + 5)">,
    [
      { type: "paren"; value: "(" },
      { type: "number"; value: "2" },
      { type: "operator"; value: "+" },
      { type: "number"; value: "3" },
      { type: "paren"; value: ")" },
      { type: "operator"; value: "*" },
      { type: "paren"; value: "(" },
      { type: "number"; value: "4" },
      { type: "operator"; value: "+" },
      { type: "number"; value: "5" },
      { type: "paren"; value: ")" }
    ]
  >
>;

/**
 * 13. Complex multiplication with parentheses
 * "2 * (3 + 4) * 5" => [
 *   { type: "number"; value: "2" },
 *   { type: "operator"; value: "*" },
 *   { type: "paren"; value: "(" },
 *   { type: "number"; value: "3" },
 *   { type: "operator"; value: "+" },
 *   { type: "number"; value: "4" },
 *   { type: "paren"; value: ")" },
 *   { type: "operator"; value: "*" },
 *   { type: "number"; value: "5" }
 * ]
 */
type Tokenize13 = Expect<
  Equal<
    Tokenize<"2 * (3 + 4) * 5">,
    [
      { type: "number"; value: "2" },
      { type: "operator"; value: "*" },
      { type: "paren"; value: "(" },
      { type: "number"; value: "3" },
      { type: "operator"; value: "+" },
      { type: "number"; value: "4" },
      { type: "paren"; value: ")" },
      { type: "operator"; value: "*" },
      { type: "number"; value: "5" }
    ]
  >
>;

/**
 * 14. Decimal number literal
 * "3.14" => [{ type: "number"; value: "3.14" }]
 */
type Tokenize14 = Expect<
  Equal<Tokenize<"3.14">, [{ type: "number"; value: "3.14" }]>
>;

/**
 * 15. Simple decimal sum
 * "1.5 + 2.5" => [
 *   { type: "number"; value: "1.5" },
 *   { type: "operator"; value: "+" },
 *   { type: "number"; value: "2.5" }
 * ]
 */
type Tokenize15 = Expect<
  Equal<
    Tokenize<"1.5 + 2.5">,
    [
      { type: "number"; value: "1.5" },
      { type: "operator"; value: "+" },
      { type: "number"; value: "2.5" }
    ]
  >
>;

/**
 * 16. Decimal multiplication
 * "2 * 3.5" => [
 *   { type: "number"; value: "2" },
 *   { type: "operator"; value: "*" },
 *   { type: "number"; value: "3.5" }
 * ]
 */
type Tokenize16 = Expect<
  Equal<
    Tokenize<"2 * 3.5">,
    [
      { type: "number"; value: "2" },
      { type: "operator"; value: "*" },
      { type: "number"; value: "3.5" }
    ]
  >
>;

/**
 * 17. Decimal division
 * "10 / 2.5" => [
 *   { type: "number"; value: "10" },
 *   { type: "operator"; value: "/" },
 *   { type: "number"; value: "2.5" }
 * ]
 */
type Tokenize17 = Expect<
  Equal<
    Tokenize<"10 / 2.5">,
    [
      { type: "number"; value: "10" },
      { type: "operator"; value: "/" },
      { type: "number"; value: "2.5" }
    ]
  >
>;

/**
 * 18. Decimal exponentiation
 * "2.5 ^ 2" => [
 *   { type: "number"; value: "2.5" },
 *   { type: "operator"; value: "^" },
 *   { type: "number"; value: "2" }
 * ]
 */
type Tokenize18 = Expect<
  Equal<
    Tokenize<"2.5 ^ 2">,
    [
      { type: "number"; value: "2.5" },
      { type: "operator"; value: "^" },
      { type: "number"; value: "2" }
    ]
  >
>;

/**
 * 19. Decimal parentheses
 * "(1.5 + 0.5) * 2" => [
 *   { type: "paren"; value: "(" },
 *   { type: "number"; value: "1.5" },
 *   { type: "operator"; value: "+" },
 *   { type: "number"; value: "0.5" },
 *   { type: "paren"; value: ")" },
 *   { type: "operator"; value: "*" },
 *   { type: "number"; value: "2" }
 * ]
 */
type Tokenize19 = Expect<
  Equal<
    Tokenize<"(1.5 + 0.5) * 2">,
    [
      { type: "paren"; value: "(" },
      { type: "number"; value: "1.5" },
      { type: "operator"; value: "+" },
      { type: "number"; value: "0.5" },
      { type: "paren"; value: ")" },
      { type: "operator"; value: "*" },
      { type: "number"; value: "2" }
    ]
  >
>;

/**
 * 20. Mixed decimal and integer operations
 * "3 + 2 * 1.5" => [
 *   { type: "number"; value: "3" },
 *   { type: "operator"; value: "+" },
 *   { type: "number"; value: "2" },
 *   { type: "operator"; value: "*" },
 *   { type: "number"; value: "1.5" }
 * ]
 */
type Tokenize20 = Expect<
  Equal<
    Tokenize<"3 + 2 * 1.5">,
    [
      { type: "number"; value: "3" },
      { type: "operator"; value: "+" },
      { type: "number"; value: "2" },
      { type: "operator"; value: "*" },
      { type: "number"; value: "1.5" }
    ]
  >
>;

/**
 * 21. Unary minus
 * "-5" => [
 *   { type: "operator"; value: "-" },
 *   { type: "number"; value: "5" }
 * ]
 */
type Tokenize21 = Expect<
  Equal<
    Tokenize<"-5">,
    [{ type: "operator"; value: "-" }, { type: "number"; value: "5" }]
  >
>;

/**
 * 22. Unary plus
 * "+5" => [
 *   { type: "operator"; value: "+" },
 *   { type: "number"; value: "5" }
 * ]
 */
type Tokenize22 = Expect<
  Equal<
    Tokenize<"+5">,
    [{ type: "operator"; value: "+" }, { type: "number"; value: "5" }]
  >
>;

/**
 * 23. Unary minus with decimal
 * "-3.14" => [
 *   { type: "operator"; value: "-" },
 *   { type: "number"; value: "3.14" }
 * ]
 */
type Tokenize23 = Expect<
  Equal<
    Tokenize<"-3.14">,
    [{ type: "operator"; value: "-" }, { type: "number"; value: "3.14" }]
  >
>;

/**
 * 24. Unary minus in expression
 * "5 + -3" => [
 *   { type: "number"; value: "5" },
 *   { type: "operator"; value: "+" },
 *   { type: "operator"; value: "-" },
 *   { type: "number"; value: "3" }
 * ]
 */
type Tokenize24 = Expect<
  Equal<
    Tokenize<"5 + -3">,
    [
      { type: "number"; value: "5" },
      { type: "operator"; value: "+" },
      { type: "operator"; value: "-" },
      { type: "number"; value: "3" }
    ]
  >
>;

/**
 * 25. Unary minus with multiplication
 * "-5 * 2" => [
 *   { type: "operator"; value: "-" },
 *   { type: "number"; value: "5" },
 *   { type: "operator"; value: "*" },
 *   { type: "number"; value: "2" }
 * ]
 */
type Tokenize25 = Expect<
  Equal<
    Tokenize<"-5 * 2">,
    [
      { type: "operator"; value: "-" },
      { type: "number"; value: "5" },
      { type: "operator"; value: "*" },
      { type: "number"; value: "2" }
    ]
  >
>;

/**
 * 26. Unary minus with parentheses
 * "-(5 + 2)" => [
 *   { type: "operator"; value: "-" },
 *   { type: "paren"; value: "(" },
 *   { type: "number"; value: "5" },
 *   { type: "operator"; value: "+" },
 *   { type: "number"; value: "2" },
 *   { type: "paren"; value: ")" }
 * ]
 */
type Tokenize26 = Expect<
  Equal<
    Tokenize<"-(5 + 2)">,
    [
      { type: "operator"; value: "-" },
      { type: "paren"; value: "(" },
      { type: "number"; value: "5" },
      { type: "operator"; value: "+" },
      { type: "number"; value: "2" },
      { type: "paren"; value: ")" }
    ]
  >
>;

/**
 * 27. Unary minus with space and parentheses
 * "- (5 + 2)" => [
 *   { type: "operator"; value: "-" },
 *   { type: "paren"; value: "(" },
 *   { type: "number"; value: "5" },
 *   { type: "operator"; value: "+" },
 *   { type: "number"; value: "2" },
 *   { type: "paren"; value: ")" }
 * ]
 */
type Tokenize27 = Expect<
  Equal<
    Tokenize<"- (5 + 2)">,
    [
      { type: "operator"; value: "-" },
      { type: "paren"; value: "(" },
      { type: "number"; value: "5" },
      { type: "operator"; value: "+" },
      { type: "number"; value: "2" },
      { type: "paren"; value: ")" }
    ]
  >
>;

/**
 * 28. Double unary minus
 * "- -5" => [
 *   { type: "operator"; value: "-" },
 *   { type: "operator"; value: "-" },
 *   { type: "number"; value: "5" }
 * ]
 */
type Tokenize28 = Expect<
  Equal<
    Tokenize<"- -5">,
    [
      { type: "operator"; value: "-" },
      { type: "operator"; value: "-" },
      { type: "number"; value: "5" }
    ]
  >
>;

/**
 * 29. Double unary plus
 * "+ +5" => [
 *   { type: "operator"; value: "+" },
 *   { type: "operator"; value: "+" },
 *   { type: "number"; value: "5" }
 * ]
 */
type Tokenize29 = Expect<
  Equal<
    Tokenize<"+ +5">,
    [
      { type: "operator"; value: "+" },
      { type: "operator"; value: "+" },
      { type: "number"; value: "5" }
    ]
  >
>;

/**
 * 30. Combined unary plus and minus
 * "+-5" => [
 *   { type: "operator"; value: "+" },
 *   { type: "operator"; value: "-" },
 *   { type: "number"; value: "5" }
 * ]
 */
type Tokenize30 = Expect<
  Equal<
    Tokenize<"+-5">,
    [
      { type: "operator"; value: "+" },
      { type: "operator"; value: "-" },
      { type: "number"; value: "5" }
    ]
  >
>;

/**
 * 31. Combined unary minus and plus
 * "-+5" => [
 *   { type: "operator"; value: "-" },
 *   { type: "operator"; value: "+" },
 *   { type: "number"; value: "5" }
 * ]
 */
type Tokenize31 = Expect<
  Equal<
    Tokenize<"-+5">,
    [
      { type: "operator"; value: "-" },
      { type: "operator"; value: "+" },
      { type: "number"; value: "5" }
    ]
  >
>;

/**
 * 32. Unary minus in complex expression
 * "2 * -3 + 4" => [
 *   { type: "number"; value: "2" },
 *   { type: "operator"; value: "*" },
 *   { type: "operator"; value: "-" },
 *   { type: "number"; value: "3" },
 *   { type: "operator"; value: "+" },
 *   { type: "number"; value: "4" }
 * ]
 */
type Tokenize32 = Expect<
  Equal<
    Tokenize<"2 * -3 + 4">,
    [
      { type: "number"; value: "2" },
      { type: "operator"; value: "*" },
      { type: "operator"; value: "-" },
      { type: "number"; value: "3" },
      { type: "operator"; value: "+" },
      { type: "number"; value: "4" }
    ]
  >
>;

/**
 * 33. Unary plus in complex expression
 * "2 * +3 + 4" => [
 *   { type: "number"; value: "2" },
 *   { type: "operator"; value: "*" },
 *   { type: "operator"; value: "+" },
 *   { type: "number"; value: "3" },
 *   { type: "operator"; value: "+" },
 *   { type: "number"; value: "4" }
 * ]
 */
type Tokenize33 = Expect<
  Equal<
    Tokenize<"2 * +3 + 4">,
    [
      { type: "number"; value: "2" },
      { type: "operator"; value: "*" },
      { type: "operator"; value: "+" },
      { type: "number"; value: "3" },
      { type: "operator"; value: "+" },
      { type: "number"; value: "4" }
    ]
  >
>;
