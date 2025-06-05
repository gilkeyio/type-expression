# TypeExpression

**TypeExpression** is a zero-runtime, type-level expression engine for TypeScript. It tokenises an arithmetic string literal, builds an abstract syntax tree (AST), and evaluates the result, entirely during compilation, so the final value is available as a literal type.

## Why?

- **Instant feedback** – catch numeric mistakes before your code runs.  
- **No runtime cost** – all computation happens in the TypeScript compiler; the emitted JavaScript is unchanged.  
- **Strongly typed results** – the evaluated number is available as a literal type that can be used anywhere the type system expects a value.
- **It was fun to make** - if you find an actual use for something like this I would love to hear it

## Features

| Capability | Details |
|------------|---------|
| Tokenisation | Splits input into `NumberToken`, `OperatorToken`, and `ParenToken` at the type level. Supported operators include arithmetic, bitwise (`&`, `|`, `^`, `<<`, `>>`), comparison, and ternary tokens. |
| Parser | Recursive-descent parser with correct precedence, associativity, parentheses, and unary ± support. Produces a canonical AST string. |
| Evaluator | Delegates arithmetic to [`ts-arithmetic`](https://github.com/arielhs/ts-arithmetic) for arbitrary-precision math at the type level. |
| Decimals & negatives | Works with decimal literals and unary operators out of the box. |
| Comparisons & conditional | Supports `>`, `<`, `>=`, `<=`, `==`, `!=` and the `?:` ternary operator. |
| Extensive tests | Dozens of compile-time test cases cover tricky edge cases. |
| MIT-licensed | Free for personal and commercial use. |

## Installation

```bash
npm install @gilkeyio/type-expression

# or work directly from the repo
npm install gilkeyio/TypeExpression
ts-arithmetic is already listed as a dependency.
```

## Quick start

```typescript
import type { TypeExpr } from "type-expression";

type Width  = TypeExpr<"6">;          // 6
type Height = TypeExpr<"8">;          // 8
type Area   = TypeExpr<"6 * 8">;      // 48 ✅

```
The result Area is literally the number 48 in the type system - you can use it to define array lengths, tuple sizes, conditional types, and more.

## More examples

```typescript
type A = TypeExpr<"2 ** 3 ** 2">;     // 512
type B = TypeExpr<"(5 + 3) * 2">;     // 16
type C = TypeExpr<"-(7 % 4) * 3">;    // -9
type D = TypeExpr<"5 & 3">;           // 1
type E = TypeExpr<"5 | 2">;           // 7
type F = TypeExpr<"3 > 2">;           // true
type G = TypeExpr<"1 > 2 ? 8 : 9">;  // 9
type H = TypeExpr<"5 ^ 2">;           // 7
type I = TypeExpr<"1 << 3">;         // 8
type J = TypeExpr<"8 >> 2">;         // 2
```

These correspond to the reference tests in the source.

How it works
1.	`tokenize.ts` –  A conditional-type state machine scans the string and emits a TokenList.
2.	`parse.ts` –  Recursive types consume that list, building an AST string such as "+(n:5,*(n:3,n:2))".
3.	`evaluate.ts` –  Pattern-matches on the AST and delegates arithmetic to Add, Subtract, Multiply, etc. from ts-arithmetic.
4.	`expression_string.ts` –  Exposes the public TypeExpr<expr> helper that pipes the whole flow together.

## API

```typescript
// Main helper
type TypeExpr<S extends string> = Evaluate<ToAstString<S>>;

// Advanced: access intermediate stages
type Tokens = Tokenize<"3 * (1 + 2)">;
type Ast    = ToAstString<"3 * (1 + 2)">;
type Value  = Evaluate<Ast>;          // 9
```

## Limitations
- Relies on TypeScript’s recursive-type depth; extremely large expressions may hit compiler limits.
- Division is floating-point; exact rationals aren’t supported (yet).

## Contributing

PRs and suggestions welcome, especially for performance or language-feature ideas inspired by the wider type-level community.

## License

MIT © 2025 Kimberly Gilkey. See LICENSE for details.
