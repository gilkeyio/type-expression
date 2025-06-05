import {
  NumberToken,
  OperatorToken,
  ParenToken,
  Tokenize,
  TokenList,
} from "./tokenize";

type ParsePrimary<T extends TokenList> = T extends [
  infer H,
  ...infer R extends TokenList
]
  ? H extends ParenToken
    ? H["value"] extends "("
      ? // parse sub-expression after '('
        ParseExpression<R> extends [infer InnerAst, infer R2 extends TokenList]
        ? R2 extends [infer H2, ...infer R3 extends TokenList]
          ? H2 extends ParenToken
            ? H2["value"] extends ")"
              ? [InnerAst & string, R3] // done
              : never
            : never
          : never
        : never
      : // token was ')' => can't start a primary
        never
    : H extends NumberToken<infer V>
    ? [`n:${V}`, R]
    : H extends OperatorToken // Handle unary minus and plus here
    ? H["value"] extends "-" | "+"
      ? ParsePrimary<R> extends [infer OperandAst, infer R2 extends TokenList] // Parse primary after unary -/+
        ? OperandAst extends string
          ? [`${H["value"] extends "-" ? "-" : "+"}(${OperandAst})`, R2] // Represent unary -/+ in AST
          : never
        : never
      : never // Other operators are not unary in ParsePrimary
    : never // Not a ParenToken or NumberToken
  : never;

type ParseExponent<T extends TokenList> = ParsePrimary<T> extends [
  infer BaseAst,
  infer Tail1 extends TokenList
]
  ? BaseAst extends string
    ? Tail1 extends [infer H, ...infer R extends TokenList]
      ? H extends OperatorToken
        ? H["value"] extends "**"
          ? // parse exponent (right-associative)
            ParseExponent<R> extends [
              infer RightAst,
              infer Tail2 extends TokenList
            ]
            ? RightAst extends string
              ? [`**(${BaseAst},${RightAst})`, Tail2]
              : never
            : never
          : // next operator not '**' => done
            [BaseAst, Tail1]
        : // next token not operator => done
          [BaseAst, Tail1]
      : // no more tokens => done
        [BaseAst, Tail1]
    : never
  : never;

type ParseMulDivMod<T extends TokenList> = ParseExponent<T> extends [
  infer FirstAst,
  infer Tail1 extends TokenList
]
  ? FirstAst extends string
    ? ParseMulDivModRest<FirstAst, Tail1>
    : never
  : never;

type ParseMulDivModRest<
  LhsAst extends string,
  T extends TokenList
> = T extends [infer H, ...infer R extends TokenList]
  ? H extends OperatorToken
    ? H["value"] extends "*" | "/" | "%"
      ? ParseExponent<R> extends [infer RhsAst, infer Tail2 extends TokenList]
        ? RhsAst extends string
          ? ParseMulDivModRest<`${H["value"]}(${LhsAst},${RhsAst})`, Tail2>
          : never
        : never
      : // operator is not * / % => stop
        [LhsAst, T]
    : // not an operator => stop
      [LhsAst, T]
  : // no more tokens => done
    [LhsAst, T];

type ParseAddSub<T extends TokenList> = ParseMulDivMod<T> extends [
  infer FirstAst,
  infer Tail1 extends TokenList
]
  ? FirstAst extends string
    ? ParseAddSubRest<FirstAst, Tail1>
    : never
  : never;

type ParseAddSubRest<LhsAst extends string, T extends TokenList> = T extends [
  infer H,
  ...infer R extends TokenList
]
  ? H extends OperatorToken
    ? H["value"] extends "+" | "-"
      ? ParseMulDivMod<R> extends [infer RhsAst, infer Tail2 extends TokenList]
        ? RhsAst extends string
          ? ParseAddSubRest<`${H["value"]}(${LhsAst},${RhsAst})`, Tail2>
          : never
        : never
      : // operator not + or - => stop
        [LhsAst, T]
    : // not an operator => stop
      [LhsAst, T]
  : // no more tokens => done
    [LhsAst, T];

type ParseBitAnd<T extends TokenList> = ParseAddSub<T> extends [
  infer FirstAst,
  infer Tail1 extends TokenList
] ? (FirstAst extends string
    ? ParseBitAndRest<FirstAst, Tail1>
    : never)
  : never;

type ParseBitXor<T extends TokenList> = ParseBitAnd<T> extends [
  infer FirstAst,
  infer Tail1 extends TokenList
] ? (FirstAst extends string ? ParseBitXorRest<FirstAst, Tail1> : never) : never;

type ParseBitOr<T extends TokenList> = ParseBitXor<T> extends [
  infer FirstAst,
  infer Tail1 extends TokenList
] ? (FirstAst extends string ? ParseBitOrRest<FirstAst, Tail1> : never) : never;

type ParseBitAndRest<LhsAst extends string, T extends TokenList> = T extends [
  infer H,
  ...infer R extends TokenList
] ? H extends OperatorToken
  ? H["value"] extends "&"
    ? ParseAddSub<R> extends [infer RhsAst, infer Tail2 extends TokenList]
      ? RhsAst extends string
        ? ParseBitAndRest<`&(${LhsAst},${RhsAst})`, Tail2>
        : never
      : never
    : [LhsAst, T]
  : [LhsAst, T]
: [LhsAst, T];

type ParseBitXorRest<LhsAst extends string, T extends TokenList> = T extends [
  infer H,
  ...infer R extends TokenList
] ? H extends OperatorToken
  ? H["value"] extends "^"
    ? ParseBitAnd<R> extends [infer RhsAst, infer Tail2 extends TokenList]
      ? RhsAst extends string
        ? ParseBitXorRest<`^(${LhsAst},${RhsAst})`, Tail2>
        : never
      : never
    : [LhsAst, T]
  : [LhsAst, T]
: [LhsAst, T];

type ParseBitOrRest<LhsAst extends string, T extends TokenList> = T extends [
  infer H,
  ...infer R extends TokenList
] ? H extends OperatorToken
  ? H["value"] extends "|"
    ? ParseBitXor<R> extends [infer RhsAst, infer Tail2 extends TokenList]
      ? RhsAst extends string
        ? ParseBitOrRest<`|(${LhsAst},${RhsAst})`, Tail2>
        : never
      : never
    : [LhsAst, T]
  : [LhsAst, T]
: [LhsAst, T];
type CompareOperator = "<" | "<=" | ">" | ">=" | "==" | "!=";

type ParseComparison<T extends TokenList> = ParseBitOr<T> extends [
  infer FirstAst,
  infer Tail1 extends TokenList
] ? (FirstAst extends string ? ParseComparisonRest<FirstAst, Tail1> : never) : never;

type ParseComparisonRest<LhsAst extends string, T extends TokenList> = T extends [
  infer H,
  ...infer R extends TokenList
] ? H extends OperatorToken
  ? H["value"] extends CompareOperator
    ? ParseBitOr<R> extends [infer RhsAst, infer Tail2 extends TokenList]
      ? RhsAst extends string
        ? ParseComparisonRest<`${H["value"]}(${LhsAst},${RhsAst})`, Tail2>
        : never
      : never
    : [LhsAst, T]
  : [LhsAst, T]
: [LhsAst, T];

type ParseTernary<T extends TokenList> = ParseComparison<T> extends [
  infer CondAst,
  infer Tail1 extends TokenList
] ? CondAst extends string
  ? Tail1 extends [infer Q, ...infer R1 extends TokenList]
    ? Q extends OperatorToken
      ? Q["value"] extends "?"
        ? ParseTernary<R1> extends [infer TrueAst, infer Tail2 extends TokenList]
          ? Tail2 extends [infer C, ...infer R2 extends TokenList]
            ? C extends OperatorToken
              ? C["value"] extends ":"
                ? ParseTernary<R2> extends [infer FalseAst, infer Tail3 extends TokenList]
                  ? FalseAst extends string
                    ? [`?:(${CondAst},${TrueAst & string},${FalseAst & string})`, Tail3]
                    : never
                  : never
                : never
              : never
            : never
          : never
        : [CondAst, Tail1]
      : [CondAst, Tail1]
    : [CondAst, Tail1]
  : never
: never;

type ParseExpression<T extends TokenList> = ParseTernary<T>;

export type ToAstString<S extends string> = Tokenize<S> extends infer TK
  ? TK extends TokenList
    ? ParseExpression<TK> extends [infer Ast, infer Rem extends TokenList]
      ? Rem extends []
        ? Ast extends string
          ? Ast
          : never
        : never // leftover tokens => invalid
      : never
    : never
  : never;

