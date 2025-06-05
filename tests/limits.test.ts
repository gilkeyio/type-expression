import { TypeExpr } from "../src/expression_string";
import { Expect, Equal } from "./test_utilities";

/**
 * 1. Deeply nested parentheses
 * "((((((((((1))))))))))" => 1
 */
export type DeepParentheses = Expect<Equal<TypeExpr<"((((((((((1))))))))))">, 1>>;

/**
 * 2. Long addition chain
 * "1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 + 9 + 10" => 55
 */
export type LongAdditionChain = Expect<Equal<TypeExpr<"1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 + 9 + 10">, 55>>;

/**
 * 3. Bitwise OR chain with many operands
 * "1 | 2 | 4 | 8 | 16 | 32 | 64 | 128" => 255
 */
export type LongBitwiseOrChain = Expect<Equal<TypeExpr<"1 | 2 | 4 | 8 | 16 | 32 | 64 | 128">, 255>>;

/**
 * 4. Large integer addition
 * "123456789 + 987654321" => 1111111110
 */
export type LargeIntegerAddition = Expect<Equal<TypeExpr<"123456789 + 987654321">, 1111111110>>;

/**
 * 5. Very deeply nested parentheses
 * "(((((((((1)))))))))" => 1
 */
export type VeryDeepParentheses = Expect<
  Equal<TypeExpr<"(((((((((1)))))))))">, 1>
>;

/**
 * 6. Extremely long addition chain
 * "1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 + 9 + 10 + 11 + 12 + 13 + 14 + 15 + 16 + 17 + 18 + 19 + 20" => 210
 */
export type ExtremelyLongAdditionChain = Expect<
  Equal<
    TypeExpr<
      "1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 + 9 + 10 + 11 + 12 + 13 + 14 + 15 + 16 + 17 + 18 + 19 + 20"
    >,
    210
  >
>;

/**
 * 7. Huge bitwise OR chain
 * "1 | 2 | 4 | 8 | 16 | 32 | 64 | 128 | 256 | 512 | 1024 | 2048 | 4096 | 8192 | 16384 | 32768" => 65535
 */
export type HugeBitwiseOrChain = Expect<
  Equal<
    TypeExpr<
      "1 | 2 | 4 | 8 | 16 | 32 | 64 | 128 | 256 | 512 | 1024 | 2048 | 4096 | 8192 | 16384 | 32768"
    >,
    65535
  >
>;



/**
 * 8. Exponentiation chain
 * "2 ** 2 ** 2 ** 2" => 65536
 */
export type ExponentiationChain = Expect<Equal<TypeExpr<"2 ** 2 ** 2 ** 2">, 65536>>;

/**
 * 9. Mixed complex expression with bitwise and arithmetic operators
 * "((1 + 2) * (3 + 4) ** 2) & (1 | 2 | 4 | 8)" => 3
 */
export type MixedComplexExpression = Expect<
  Equal<TypeExpr<"((1 + 2) * (3 + 4) ** 2) & (1 | 2 | 4 | 8)">, 3>
>;
