import { Tokenize } from "../src/tokenize";
import { Expect, Equal } from "./test_utilities";


/**
 * 1. Single literal
 * "5" => [{ type: "number"; value: 5 }]
 */
type TokenSingleLiteral = Expect<
  Equal<
    Tokenize<"5">,
    [
      {
        type: "number";
        value: 5;
      }
    ]
  >
>;

/**
 * 2. Double digit number
 * "42" => [{ type: "number"; value: 42 }]
 */
type TokenDoubleDigitNumber = Expect<
  Equal<Tokenize<"42">, [{ type: "number"; value: 42 }]>
>;

/**
 * 3. Simple sum
 * "5 + 3" => [
 *   { type: "number"; value: 5 },
 *   { type: "operator"; value: "+" },
 *   { type: "number"; value: 3 }
 * ]
 */
type TokenSimpleSum = Expect<
  Equal<
    Tokenize<"5 + 3">,
    [
      { type: "number"; value: 5 },
      { type: "operator"; value: "+" },
      { type: "number"; value: 3 }
    ]
  >
>;

/**
 * 4. Simple subtraction
 * "10 - 4" => [
 *   { type: "number"; value: 10 },
 *   { type: "operator"; value: "-" },
 *   { type: "number"; value: 4 }
 * ]
 */
type TokenSimpleSubtraction = Expect<
  Equal<
    Tokenize<"10 - 4">,
    [
      { type: "number"; value: 10 },
      { type: "operator"; value: "-" },
      { type: "number"; value: 4 }
    ]
  >
>;

/**
 * 5. Simple multiplication
 * "6 * 7" => [
 *   { type: "number"; value: 6 },
 *   { type: "operator"; value: "*" },
 *   { type: "number"; value: 7 }
 * ]
 */
type TokenSimpleMultiplication = Expect<
  Equal<
    Tokenize<"6 * 7">,
    [
      { type: "number"; value: 6 },
      { type: "operator"; value: "*" },
      { type: "number"; value: 7 }
    ]
  >
>;

/**
 * 6. Simple division
 * "20 / 5" => [
 *   { type: "number"; value: 20 },
 *   { type: "operator"; value: "/" },
 *   { type: "number"; value: 5 }
 * ]
 */
type TokenSimpleDivision = Expect<
  Equal<
    Tokenize<"20 / 5">,
    [
      { type: "number"; value: 20 },
      { type: "operator"; value: "/" },
      { type: "number"; value: 5 }
    ]
  >
>;

/**
 * 7. Modulo operation
 * "7 % 3" => [
 *   { type: "number"; value: 7 },
 *   { type: "operator"; value: "%" },
 *   { type: "number"; value: 3 }
 * ]
 */
type TokenModuloOperation = Expect<
  Equal<
    Tokenize<"7 % 3">,
    [
      { type: "number"; value: 7 },
      { type: "operator"; value: "%" },
      { type: "number"; value: 3 }
    ]
  >
>;

/**
 * 8. Exponentiation
 * "2 ** 3" => [
 *   { type: "number"; value: 2 },
 *   { type: "operator"; value: "**" },
 *   { type: "number"; value: 3 }
 * ]
 */
type TokenExponentiation = Expect<
  Equal<
    Tokenize<"2 ** 3">,
    [
      { type: "number"; value: 2 },
      { type: "operator"; value: "**" },
      { type: "number"; value: 3 }
    ]
  >
>;

/**
 * 9. Mixed operators, shallow nesting
 * "5 + 3 * 2" => [
 *   { type: "number"; value: 5 },
 *   { type: "operator"; value: "+" },
 *   { type: "number"; value: 3 },
 *   { type: "operator"; value: "*" },
 *   { type: "number"; value: 2 }
 * ]
 */
type TokenMixedOperators = Expect<
  Equal<
    Tokenize<"5 + 3 * 2">,
    [
      { type: "number"; value: 5 },
      { type: "operator"; value: "+" },
      { type: "number"; value: 3 },
      { type: "operator"; value: "*" },
      { type: "number"; value: 2 }
    ]
  >
>;

/**
 * 10. Parentheses affecting operation order
 * "(5 + 3) * 2" => [
 *   { type: "paren"; value: "(" },
 *   { type: "number"; value: 5 },
 *   { type: "operator"; value: "+" },
 *   { type: "number"; value: 3 },
 *   { type: "paren"; value: ")" },
 *   { type: "operator"; value: "*" },
 *   { type: "number"; value: 2 }
 * ]
 */
type TokenParenthesesOrder = Expect<
  Equal<
    Tokenize<"(5 + 3) * 2">,
    [
      { type: "paren"; value: "(" },
      { type: "number"; value: 5 },
      { type: "operator"; value: "+" },
      { type: "number"; value: 3 },
      { type: "paren"; value: ")" },
      { type: "operator"; value: "*" },
      { type: "number"; value: 2 }
    ]
  >
>;

/**
 * 11. Multiple exponentiations
 * "2 ** 3 ** 2" => [
 *   { type: "number"; value: 2 },
 *   { type: "operator"; value: "**" },
 *   { type: "number"; value: 3 },
 *   { type: "operator"; value: "**" },
 *   { type: "number"; value: 2 }
 * ]
 */
type TokenMultipleExponentiations = Expect<
  Equal<
    Tokenize<"2 ** 3 ** 2">,
    [
      { type: "number"; value: 2 },
      { type: "operator"; value: "**" },
      { type: "number"; value: 3 },
      { type: "operator"; value: "**" },
      { type: "number"; value: 2 }
    ]
  >
>;

/**
 * 12. Multiple parentheses with different operations
 * "(2 + 3) * (4 + 5)" => [
 *   { type: "paren"; value: "(" },
 *   { type: "number"; value: 2 },
 *   { type: "operator"; value: "+" },
 *   { type: "number"; value: 3 },
 *   { type: "paren"; value: ")" },
 *   { type: "operator"; value: "*" },
 *   { type: "paren"; value: "(" },
 *   { type: "number"; value: 4 },
 *   { type: "operator"; value: "+" },
 *   { type: "number"; value: 5 },
 *   { type: "paren"; value: ")" }
 * ]
 */
type TokenMultipleParentheses = Expect<
  Equal<
    Tokenize<"(2 + 3) * (4 + 5)">,
    [
      { type: "paren"; value: "(" },
      { type: "number"; value: 2 },
      { type: "operator"; value: "+" },
      { type: "number"; value: 3 },
      { type: "paren"; value: ")" },
      { type: "operator"; value: "*" },
      { type: "paren"; value: "(" },
      { type: "number"; value: 4 },
      { type: "operator"; value: "+" },
      { type: "number"; value: 5 },
      { type: "paren"; value: ")" }
    ]
  >
>;

/**
 * 13. Complex multiplication with parentheses
 * "2 * (3 + 4) * 5" => [
 *   { type: "number"; value: 2 },
 *   { type: "operator"; value: "*" },
 *   { type: "paren"; value: "(" },
 *   { type: "number"; value: 3 },
 *   { type: "operator"; value: "+" },
 *   { type: "number"; value: 4 },
 *   { type: "paren"; value: ")" },
 *   { type: "operator"; value: "*" },
 *   { type: "number"; value: 5 }
 * ]
 */
type TokenComplexMultiplication = Expect<
  Equal<
    Tokenize<"2 * (3 + 4) * 5">,
    [
      { type: "number"; value: 2 },
      { type: "operator"; value: "*" },
      { type: "paren"; value: "(" },
      { type: "number"; value: 3 },
      { type: "operator"; value: "+" },
      { type: "number"; value: 4 },
      { type: "paren"; value: ")" },
      { type: "operator"; value: "*" },
      { type: "number"; value: 5 }
    ]
  >
>;

/**
 * 14. Decimal number literal
 * "3.14" => [{ type: "number"; value: 3.14 }]
 */
type TokenDecimalLiteral = Expect<
  Equal<Tokenize<"3.14">, [{ type: "number"; value: 3.14 }]>
>;

/**
 * 15. Simple decimal sum
 * "1.5 + 2.5" => [
 *   { type: "number"; value: 1.5 },
 *   { type: "operator"; value: "+" },
 *   { type: "number"; value: 2.5 }
 * ]
 */
type TokenDecimalSum = Expect<
  Equal<
    Tokenize<"1.5 + 2.5">,
    [
      { type: "number"; value: 1.5 },
      { type: "operator"; value: "+" },
      { type: "number"; value: 2.5 }
    ]
  >
>;

/**
 * 16. Decimal multiplication
 * "2 * 3.5" => [
 *   { type: "number"; value: 2 },
 *   { type: "operator"; value: "*" },
 *   { type: "number"; value: 3.5 }
 * ]
 */
type TokenDecimalMultiplication = Expect<
  Equal<
    Tokenize<"2 * 3.5">,
    [
      { type: "number"; value: 2 },
      { type: "operator"; value: "*" },
      { type: "number"; value: 3.5 }
    ]
  >
>;

/**
 * 17. Decimal division
 * "10 / 2.5" => [
 *   { type: "number"; value: 10 },
 *   { type: "operator"; value: "/" },
 *   { type: "number"; value: 2.5 }
 * ]
 */
type TokenDecimalDivision = Expect<
  Equal<
    Tokenize<"10 / 2.5">,
    [
      { type: "number"; value: 10 },
      { type: "operator"; value: "/" },
      { type: "number"; value: 2.5 }
    ]
  >
>;

/**
 * 18. Decimal exponentiation
 * "2.5 ** 2" => [
 *   { type: "number"; value: 2.5 },
 *   { type: "operator"; value: "**" },
 *   { type: "number"; value: 2 }
 * ]
 */
type TokenDecimalExponentiation = Expect<
  Equal<
    Tokenize<"2.5 ** 2">,
    [
      { type: "number"; value: 2.5 },
      { type: "operator"; value: "**" },
      { type: "number"; value: 2 }
    ]
  >
>;

/**
 * 19. Decimal parentheses
 * "(1.5 + 0.5) * 2" => [
 *   { type: "paren"; value: "(" },
 *   { type: "number"; value: 1.5 },
 *   { type: "operator"; value: "+" },
 *   { type: "number"; value: 0.5 },
 *   { type: "paren"; value: ")" },
 *   { type: "operator"; value: "*" },
 *   { type: "number"; value: 2 }
 * ]
 */
type TokenDecimalParentheses = Expect<
  Equal<
    Tokenize<"(1.5 + 0.5) * 2">,
    [
      { type: "paren"; value: "(" },
      { type: "number"; value: 1.5 },
      { type: "operator"; value: "+" },
      { type: "number"; value: 0.5 },
      { type: "paren"; value: ")" },
      { type: "operator"; value: "*" },
      { type: "number"; value: 2 }
    ]
  >
>;

/**
 * 20. Mixed decimal and integer operations
 * "3 + 2 * 1.5" => [
 *   { type: "number"; value: 3 },
 *   { type: "operator"; value: "+" },
 *   { type: "number"; value: 2 },
 *   { type: "operator"; value: "*" },
 *   { type: "number"; value: 1.5 }
 * ]
 */
type TokenMixedDecimalInteger = Expect<
  Equal<
    Tokenize<"3 + 2 * 1.5">,
    [
      { type: "number"; value: 3 },
      { type: "operator"; value: "+" },
      { type: "number"; value: 2 },
      { type: "operator"; value: "*" },
      { type: "number"; value: 1.5 }
    ]
  >
>;

/**
 * 21. Unary minus
 * "-5" => [
 *   { type: "operator"; value: "-" },
 *   { type: "number"; value: 5 }
 * ]
 */
type TokenUnaryMinus = Expect<
  Equal<
    Tokenize<"-5">,
    [{ type: "operator"; value: "-" }, { type: "number"; value: 5 }]
  >
>;

/**
 * 22. Unary plus
 * "+5" => [
 *   { type: "operator"; value: "+" },
 *   { type: "number"; value: 5 }
 * ]
 */
type TokenUnaryPlus = Expect<
  Equal<
    Tokenize<"+5">,
    [{ type: "operator"; value: "+" }, { type: "number"; value: 5 }]
  >
>;

/**
 * 23. Unary minus with decimal
 * "-3.14" => [
 *   { type: "operator"; value: "-" },
 *   { type: "number"; value: 3.14 }
 * ]
 */
type TokenUnaryMinusDecimal = Expect<
  Equal<
    Tokenize<"-3.14">,
    [{ type: "operator"; value: "-" }, { type: "number"; value: 3.14 }]
  >
>;

/**
 * 24. Unary minus in expression
 * "5 + -3" => [
 *   { type: "number"; value: 5 },
 *   { type: "operator"; value: "+" },
 *   { type: "operator"; value: "-" },
 *   { type: "number"; value: 3 }
 * ]
 */
type TokenUnaryMinusExpression = Expect<
  Equal<
    Tokenize<"5 + -3">,
    [
      { type: "number"; value: 5 },
      { type: "operator"; value: "+" },
      { type: "operator"; value: "-" },
      { type: "number"; value: 3 }
    ]
  >
>;

/**
 * 25. Unary minus with multiplication
 * "-5 * 2" => [
 *   { type: "operator"; value: "-" },
 *   { type: "number"; value: 5 },
 *   { type: "operator"; value: "*" },
 *   { type: "number"; value: 2 }
 * ]
 */
type TokenUnaryMinusMultiplication = Expect<
  Equal<
    Tokenize<"-5 * 2">,
    [
      { type: "operator"; value: "-" },
      { type: "number"; value: 5 },
      { type: "operator"; value: "*" },
      { type: "number"; value: 2 }
    ]
  >
>;

/**
 * 26. Unary minus with parentheses
 * "-(5 + 2)" => [
 *   { type: "operator"; value: "-" },
 *   { type: "paren"; value: "(" },
 *   { type: "number"; value: 5 },
 *   { type: "operator"; value: "+" },
 *   { type: "number"; value: 2 },
 *   { type: "paren"; value: ")" }
 * ]
 */
type TokenUnaryMinusParentheses = Expect<
  Equal<
    Tokenize<"-(5 + 2)">,
    [
      { type: "operator"; value: "-" },
      { type: "paren"; value: "(" },
      { type: "number"; value: 5 },
      { type: "operator"; value: "+" },
      { type: "number"; value: 2 },
      { type: "paren"; value: ")" }
    ]
  >
>;

/**
 * 27. Unary minus with space and parentheses
 * "- (5 + 2)" => [
 *   { type: "operator"; value: "-" },
 *   { type: "paren"; value: "(" },
 *   { type: "number"; value: 5 },
 *   { type: "operator"; value: "+" },
 *   { type: "number"; value: 2 },
 *   { type: "paren"; value: ")" }
 * ]
 */
type TokenUnaryMinusSpaceParentheses = Expect<
  Equal<
    Tokenize<"- (5 + 2)">,
    [
      { type: "operator"; value: "-" },
      { type: "paren"; value: "(" },
      { type: "number"; value: 5 },
      { type: "operator"; value: "+" },
      { type: "number"; value: 2 },
      { type: "paren"; value: ")" }
    ]
  >
>;

/**
 * 28. Double unary minus
 * "- -5" => [
 *   { type: "operator"; value: "-" },
 *   { type: "operator"; value: "-" },
 *   { type: "number"; value: 5 }
 * ]
 */
type TokenDoubleUnaryMinus = Expect<
  Equal<
    Tokenize<"- -5">,
    [
      { type: "operator"; value: "-" },
      { type: "operator"; value: "-" },
      { type: "number"; value: 5 }
    ]
  >
>;

/**
 * 29. Double unary plus
 * "+ +5" => [
 *   { type: "operator"; value: "+" },
 *   { type: "operator"; value: "+" },
 *   { type: "number"; value: 5 }
 * ]
 */
type TokenDoubleUnaryPlus = Expect<
  Equal<
    Tokenize<"+ +5">,
    [
      { type: "operator"; value: "+" },
      { type: "operator"; value: "+" },
      { type: "number"; value: 5 }
    ]
  >
>;

/**
 * 30. Combined unary plus and minus
 * "+-5" => [
 *   { type: "operator"; value: "+" },
 *   { type: "operator"; value: "-" },
 *   { type: "number"; value: 5 }
 * ]
 */
type TokenUnaryPlusMinus = Expect<
  Equal<
    Tokenize<"+-5">,
    [
      { type: "operator"; value: "+" },
      { type: "operator"; value: "-" },
      { type: "number"; value: 5 }
    ]
  >
>;

/**
 * 31. Combined unary minus and plus
 * "-+5" => [
 *   { type: "operator"; value: "-" },
 *   { type: "operator"; value: "+" },
 *   { type: "number"; value: 5 }
 * ]
 */
type TokenUnaryMinusPlus = Expect<
  Equal<
    Tokenize<"-+5">,
    [
      { type: "operator"; value: "-" },
      { type: "operator"; value: "+" },
      { type: "number"; value: 5 }
    ]
  >
>;

/**
 * 32. Unary minus in complex expression
 * "2 * -3 + 4" => [
 *   { type: "number"; value: 2 },
 *   { type: "operator"; value: "*" },
 *   { type: "operator"; value: "-" },
 *   { type: "number"; value: 3 },
 *   { type: "operator"; value: "+" },
 *   { type: "number"; value: 4 }
 * ]
 */
type TokenUnaryMinusComplex = Expect<
  Equal<
    Tokenize<"2 * -3 + 4">,
    [
      { type: "number"; value: 2 },
      { type: "operator"; value: "*" },
      { type: "operator"; value: "-" },
      { type: "number"; value: 3 },
      { type: "operator"; value: "+" },
      { type: "number"; value: 4 }
    ]
  >
>;

/**
 * 33. Unary plus in complex expression
 * "2 * +3 + 4" => [
 *   { type: "number"; value: 2 },
 *   { type: "operator"; value: "*" },
 *   { type: "operator"; value: "+" },
 *   { type: "number"; value: 3 },
 *   { type: "operator"; value: "+" },
 *   { type: "number"; value: 4 }
 * ]
 */
type TokenUnaryPlusComplex = Expect<
  Equal<
    Tokenize<"2 * +3 + 4">,
    [
      { type: "number"; value: 2 },
      { type: "operator"; value: "*" },
      { type: "operator"; value: "+" },
      { type: "number"; value: 3 },
      { type: "operator"; value: "+" },
      { type: "number"; value: 4 }
    ]
  >
>;
/**
 * 34. Bitwise AND
 * "5 & 3" => [
 *   { type: "number"; value: 5 },
 *   { type: "operator"; value: "&" },
 *   { type: "number"; value: 3 }
 * ]
 */
type TokenBitwiseAnd = Expect<
  Equal<
    Tokenize<"5 & 3">,
    [
      { type: "number"; value: 5 },
      { type: "operator"; value: "&" },
      { type: "number"; value: 3 }
    ]
  >
>;
/**
 * 35. Bitwise AND chain
 * "8 & 3 & 1" => [
 *   { type: "number"; value: 8 },
 *   { type: "operator"; value: "&" },
 *   { type: "number"; value: 3 },
 *   { type: "operator"; value: "&" },
 *   { type: "number"; value: 1 }
 * ]
 */
type TokenAndChain = Expect<
  Equal<
    Tokenize<"8 & 3 & 1">,
    [
      { type: "number"; value: 8 },
      { type: "operator"; value: "&" },
      { type: "number"; value: 3 },
      { type: "operator"; value: "&" },
      { type: "number"; value: 1 }
    ]
  >
>;

/**
 * 36. Bitwise AND with zero
 * "7 & 0" => [
 *   { type: "number"; value: 7 },
 *   { type: "operator"; value: "&" },
 *   { type: "number"; value: 0 }
 * ]
 */
type TokenAndZero = Expect<
  Equal<
    Tokenize<"7 & 0">,
    [
      { type: "number"; value: 7 },
      { type: "operator"; value: "&" },
      { type: "number"; value: 0 }
    ]
  >
>;

/**
 * 37. Bitwise OR
 * "5 | 3" => [
 *   { type: "number"; value: 5 },
 *   { type: "operator"; value: "|" },
 *   { type: "number"; value: 3 }
 * ]
 */
type TokenOrSimple = Expect<
  Equal<
    Tokenize<"5 | 3">,
    [
      { type: "number"; value: 5 },
      { type: "operator"; value: "|" },
      { type: "number"; value: 3 }
    ]
  >
>;

/**
 * 38. Bitwise OR chain
 * "1 | 2 | 4" => [
 *   { type: "number"; value: 1 },
 *   { type: "operator"; value: "|" },
 *   { type: "number"; value: 2 },
 *   { type: "operator"; value: "|" },
 *   { type: "number"; value: 4 }
 * ]
 */
type TokenOrChain = Expect<
  Equal<
    Tokenize<"1 | 2 | 4">,
    [
      { type: "number"; value: 1 },
      { type: "operator"; value: "|" },
      { type: "number"; value: 2 },
      { type: "operator"; value: "|" },
      { type: "number"; value: 4 }
    ]
  >
>;

/**
 * 39. Mixed OR and AND
 * "1 | 2 & 3" => [
 *   { type: "number"; value: 1 },
 *   { type: "operator"; value: "|" },
 *   { type: "number"; value: 2 },
 *   { type: "operator"; value: "&" },
 *   { type: "number"; value: 3 }
 * ]
 */
type TokenOrAndMix = Expect<
  Equal<
    Tokenize<"1 | 2 & 3">,
    [
      { type: "number"; value: 1 },
      { type: "operator"; value: "|" },
      { type: "number"; value: 2 },
      { type: "operator"; value: "&" },
      { type: "number"; value: 3 }
    ]
  >
>;

/**
 * 40. Bitwise OR with zero
 * "0 | 7" => [
 *   { type: "number"; value: 0 },
 *   { type: "operator"; value: "|" },
 *   { type: "number"; value: 7 }
 * ]
 */
type TokenOrZero = Expect<
  Equal<
    Tokenize<"0 | 7">,
    [
      { type: "number"; value: 0 },
      { type: "operator"; value: "|" },
      { type: "number"; value: 7 }
    ]
  >
>;

/**
 * 41. Mixed precedence chain
 * "4 & 1 | 2" => [
 *   { type: "number"; value: 4 },
 *   { type: "operator"; value: "&" },
 *   { type: "number"; value: 1 },
 *   { type: "operator"; value: "|" },
 *   { type: "number"; value: 2 }
 * ]
 */
type TokenMixPrecedence = Expect<
  Equal<
    Tokenize<"4 & 1 | 2">,
    [
      { type: "number"; value: 4 },
      { type: "operator"; value: "&" },
      { type: "number"; value: 1 },
      { type: "operator"; value: "|" },
      { type: "number"; value: 2 }
    ]
  >
>;

/**
 * 42. Ternary conditional tokens
 * "1 > 2 ? 3 : 4" => [
 *   { type: "number"; value: 1 },
 *   { type: "operator"; value: ">" },
 *   { type: "number"; value: 2 },
 *   { type: "operator"; value: "?" },
 *   { type: "number"; value: 3 },
 *   { type: "operator"; value: ":" },
 *   { type: "number"; value: 4 }
 * ]
 */
type TokenTernary = Expect<
  Equal<
    Tokenize<"1 > 2 ? 3 : 4">,
    [
      { type: "number"; value: 1 },
      { type: "operator"; value: ">" },
      { type: "number"; value: 2 },
      { type: "operator"; value: "?" },
      { type: "number"; value: 3 },
      { type: "operator"; value: ":" },
      { type: "number"; value: 4 }
    ]
  >
>;

/**
 * 43. Bitwise XOR
 * "5 ^ 2" => [
 *   { type: "number"; value: 5 },
 *   { type: "operator"; value: "^" },
 *   { type: "number"; value: 2 }
 * ]
 */
type TokenXor = Expect<
  Equal<
    Tokenize<"5 ^ 2">,
    [
      { type: "number"; value: 5 },
      { type: "operator"; value: "^" },
      { type: "number"; value: 2 }
    ]
  >
>;

/**
 * 44. Left shift
 * "1 << 3" => [
 *   { type: "number"; value: 1 },
 *   { type: "operator"; value: "<<" },
 *   { type: "number"; value: 3 }
 * ]
 */
type TokenLeftShift = Expect<
  Equal<
    Tokenize<"1 << 3">,
    [
      { type: "number"; value: 1 },
      { type: "operator"; value: "<<" },
      { type: "number"; value: 3 }
    ]
  >
>;

/**
 * 45. Right shift
 * "8 >> 2" => [
 *   { type: "number"; value: 8 },
 *   { type: "operator"; value: ">>" },
 *   { type: "number"; value: 2 }
 * ]
 */
type TokenRightShift = Expect<
  Equal<
    Tokenize<"8 >> 2">,
    [
      { type: "number"; value: 8 },
      { type: "operator"; value: ">>" },
      { type: "number"; value: 2 }
    ]
  >
>;
