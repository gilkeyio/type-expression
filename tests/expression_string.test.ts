import { TypeExpr } from "../src/expression_string";
import { Expect, Equal } from "./test_utilities";

/**
 * 1. Single literal
 * "5" => 5
 */
type ExprSingleLiteral = Expect<Equal<TypeExpr<"5">, 5>>;

/**
 * 2. Double digit number
 * "42" => 42
 */
type ExprDoubleDigitNumber = Expect<Equal<TypeExpr<"42">, 42>>;

/**
 * 3. Simple sum
 * "5 + 3" => 8
 */
type ExprSimpleSum = Expect<Equal<TypeExpr<"5 + 3">, 8>>;

/**
 * 4. Simple subtraction
 * "10 - 4" => 6
 */
type ExprSimpleSubtraction = Expect<Equal<TypeExpr<"10 - 4">, 6>>;

/**
 * 5. Simple multiplication
 * "6 * 7" => 42
 */
type ExprSimpleMultiplication = Expect<Equal<TypeExpr<"6 * 7">, 42>>;

/**
 * 6. Simple division
 * "20 / 5" => 4
 */
type ExprSimpleDivision = Expect<Equal<TypeExpr<"20 / 5">, 4>>;

/**
 * 7. Modulo operation
 * "7 % 3" => 1
 */
type ExprModuloOperation = Expect<Equal<TypeExpr<"7 % 3">, 1>>;

/**
 * 8. Exponentiation
 * "2 ** 3" => 8
 */
type ExprExponentiation = Expect<Equal<TypeExpr<"2 ** 3">, 8>>;

/**
 * 9. Mixed operators, shallow nesting
 * "5 + 3 * 2" => 11
 */
type ExprMixedOperatorsShallow = Expect<Equal<TypeExpr<"5 + 3 * 2">, 11>>;

/**
 * 10. Parentheses affecting operation order
 * "(5 + 3) * 2" => 16
 */
type ExprParenthesesOrder = Expect<Equal<TypeExpr<"(5 + 3) * 2">, 16>>;

/**
 * 11. Multiple exponentiations
 * "2 ** 3 ** 2" => 512
 */
type ExprMultipleExponentiations = Expect<Equal<TypeExpr<"2 ** 3 ** 2">, 512>>;

/**
 * 12. Multiple parentheses with different operations
 * "(2 + 3) * (4 + 5)" => 45
 */
type ExprMultipleParentheses = Expect<Equal<TypeExpr<"(2 + 3) * (4 + 5)">, 45>>;

/**
 * 13. Complex multiplication with parentheses
 * "2 * (3 + 4) * 5" => 70
 */
type ExprComplexMultiplication = Expect<Equal<TypeExpr<"2 * (3 + 4) * 5">, 70>>;

/**
 * 14. Decimal number literal
 * "3.14" => 3.14
 */
type ExprDecimalLiteral = Expect<Equal<TypeExpr<"3.14">, 3.14>>;

/**
 * 15. Simple decimal sum
 * "1.5 + 2.5" => 4
 */
type ExprDecimalSum = Expect<Equal<TypeExpr<"1.5 + 2.5">, 4>>;

/**
 * 16. Decimal multiplication
 * "2 * 3.5" => 7
 */
type ExprDecimalMultiplication = Expect<Equal<TypeExpr<"2 * 3.5">, 7>>;

/**
 * 17. Decimal division
 * "10 / 2.5" => 4
 */
type ExprDecimalDivision = Expect<Equal<TypeExpr<"10 / 2.5">, 4>>;

/**
 * 18. Decimal exponentiation
 * "2.5 ** 2" => 6.25
 */
type ExprDecimalExponentiation = Expect<Equal<TypeExpr<"2.5 ** 2">, 6.25>>;

/**
 * 19. Decimal parentheses
 * "(1.5 + 0.5) * 2" => 4
 */
type ExprDecimalParentheses = Expect<Equal<TypeExpr<"(1.5 + 0.5) * 2">, 4>>;

/**
 * 20. Mixed decimal and integer operations
 * "3 + 2 * 1.5" => 6
 */
type ExprMixedDecimalInteger = Expect<Equal<TypeExpr<"3 + 2 * 1.5">, 6>>;

/**
 * 21. Unary minus
 * "-5" => -5
 */
type ExprUnaryMinus = Expect<Equal<TypeExpr<"-5">, -5>>;

/**
 * 22. Unary plus
 * "+5" => 5
 */
type ExprUnaryPlus = Expect<Equal<TypeExpr<"+5">, 5>>;

/**
 * 23. Unary minus with decimal
 * "-3.14" => -3.14
 */
type ExprUnaryMinusDecimal = Expect<Equal<TypeExpr<"-3.14">, -3.14>>;

/**
 * 24. Unary minus in expression
 * "5 + -3" => 2
 */
type ExprUnaryMinusExpression = Expect<Equal<TypeExpr<"5 + -3">, 2>>;

/**
 * 25. Unary minus with multiplication
 * "-5 * 2" => -10
 */
type ExprUnaryMinusMultiplication = Expect<Equal<TypeExpr<"-5 * 2">, -10>>;

/**
 * 26. Unary minus with parentheses
 * "-(5 + 2)" => -7
 */
type ExprUnaryMinusParentheses = Expect<Equal<TypeExpr<"-(5 + 2)">, -7>>;

/**
 * 27. Unary minus with space and parentheses
 * "- (5 + 2)" => -7
 */
type ExprUnaryMinusSpaceParentheses = Expect<Equal<TypeExpr<"- (5 + 2)">, -7>>;

/**
 * 28. Double unary minus
 * "- -5" => 5
 */
type ExprDoubleUnaryMinus = Expect<Equal<TypeExpr<"- -5">, 5>>;

/**
 * 29. Double unary plus
 * "+ +5" => 5
 */
type ExprDoubleUnaryPlus = Expect<Equal<TypeExpr<"+ +5">, 5>>;

/**
 * 30. Combined unary plus and minus
 * "+-5" => -5
 */
type ExprUnaryPlusMinus = Expect<Equal<TypeExpr<"+-5">, -5>>;

/**
 * 31. Combined unary minus and plus
 * "-+5" => -5
 */
type ExprUnaryMinusPlus = Expect<Equal<TypeExpr<"-+5">, -5>>;

/**
 * 32. Unary minus in complex expression
 * "2 * -3 + 4" => -2
 */
type ExprUnaryMinusComplex = Expect<Equal<TypeExpr<"2 * -3 + 4">, -2>>;

/**
 * 33. Unary plus in complex expression
 * "2 * +3 + 4" => 10
 */
type ExprUnaryPlusComplex = Expect<Equal<TypeExpr<"2 * +3 + 4">, 10>>;

/**
 * 34. Bitwise AND
 * "5 & 3" => 1
 */
type ExprBitwiseAnd = Expect<Equal<TypeExpr<"5 & 3">, 1>>;


/**
 * 35. Bitwise AND
 * "13 & 11" => 9
 */
type ExprBitwiseAndLarge = Expect<Equal<TypeExpr<"13 & 11">, 9>>;
/**
 * 36. Bitwise AND with zero
 * "7 & 0" => 0
 */
type ExprBitwiseAndZero = Expect<Equal<TypeExpr<"7 & 0">, 0>>;

/**
 * 37. Bitwise AND chain
 * "15 & 7 & 3" => 3
 */
type ExprBitwiseAndChain = Expect<Equal<TypeExpr<"15 & 7 & 3">, 3>>;

/**
 * 38. Bitwise AND nested chain
 * "8 & 6 & 1" => 0
 */
type ExprBitwiseAndNested = Expect<Equal<TypeExpr<"8 & 6 & 1">, 0>>;

/**
 * 39. Bitwise OR
 * "5 | 3" => 7
 */
type ExprBitwiseOr = Expect<Equal<TypeExpr<"5 | 3">, 7>>;

/**
 * 40. Bitwise OR chain
 * "1 | 2 | 4" => 7
 */
type ExprBitwiseOrChain = Expect<Equal<TypeExpr<"1 | 2 | 4">, 7>>;

/**
 * 41. Bitwise OR with zero
 * "0 | 7" => 7
 */
type ExprBitwiseOrZero = Expect<Equal<TypeExpr<"0 | 7">, 7>>;

/**
 * 42. Mixed OR and AND
 * "4 & 1 | 2" => 2
 */
type ExprMixedPrecedence = Expect<Equal<TypeExpr<"4 & 1 | 2">, 2>>;

/**
 * 43. Bitwise OR multiple operands
 * "0 | 1 | 8" => 9
 */
type ExprBitwiseOrMulti = Expect<Equal<TypeExpr<"0 | 1 | 8">, 9>>;

/**
 * 44. Simple comparison
 * "3 > 2" => true
 */
type ExprSimpleComparison = Expect<Equal<TypeExpr<"3 > 2">, true>>;

/**
 * 45. Equality with arithmetic
 * "3 + 2 == 5" => true
 */
type ExprEquality = Expect<Equal<TypeExpr<"3 + 2 == 5">, true>>;

/**
 * 46. Ternary conditional
 * "1 > 2 ? 8 : 9" => 9
 */
type ExprTernary = Expect<Equal<TypeExpr<"1 > 2 ? 8 : 9">, 9>>;

/**
 * 47. Conditional true branch
 * "2 == 2 ? 10 : 20" => 10
 */
type ExprTernaryTrue = Expect<Equal<TypeExpr<"2 == 2 ? 10 : 20">, 10>>;

/**
 * 48. Conditional false branch
 * "2 < 1 ? 10 : 20" => 20
 */
type ExprTernaryFalse = Expect<Equal<TypeExpr<"2 < 1 ? 10 : 20">, 20>>;

/**
 * 49. Nested ternary
 * "1 > 2 ? 1 : 3 > 2 ? 2 : 3" => 2
 */
type ExprNestedTernary = Expect<
  Equal<TypeExpr<"1 > 2 ? 1 : 3 > 2 ? 2 : 3">, 2>
>;

/**
 * 50. Bitwise XOR
 * "5 ^ 2" => 7
 */
type ExprBitwiseXor = Expect<Equal<TypeExpr<"5 ^ 2">, 7>>;

/**
 * 51. Bitwise XOR with same inputs
 * "3 ^ 3" => 0
 */
type ExprXorSame = Expect<Equal<TypeExpr<"3 ^ 3">, 0>>

/**
 * 52. Bitwise XOR with 0
 * "42 ^ 0" => 42
 */
type ExprXorZero = Expect<Equal<TypeExpr<"42 ^ 0">, 42>>

/**
 * 53. Bitwise XOR chain
 * "5 ^ 2 ^ 7" => 0
 * Explanation: 5 ^ 2 = 7, 7 ^ 7 = 0
 */
type ExprXorChain = Expect<Equal<TypeExpr<"5 ^ 2 ^ 7">, 0>>

/**
 * 54. Bitwise XOR with parentheses
 * "5 ^ (2 ^ 7)" => 5 ^ 5 => 0
 */
type ExprXorParen = Expect<Equal<TypeExpr<"5 ^ (2 ^ 7)">, 0>>

/**
 * 55. Bitwise XOR with left-associative evaluation
 * "1 ^ 2 ^ 4" => (1 ^ 2) ^ 4 => 3 ^ 4 => 7
 */
type ExprXorLeftAssoc = Expect<Equal<TypeExpr<"1 ^ 2 ^ 4">, 7>>

/**
 * 56. Bitwise XOR across high values
 * "255 ^ 170" => 85
 * Explanation: 0b11111111 ^ 0b10101010 = 0b01010101 = 85
 */
type ExprXorHigh = Expect<Equal<TypeExpr<"255 ^ 170">, 85>>

/**
 * 57. Left shift
 * "1 << 3" => 8
 */
type ExprLeftShift = Expect<Equal<TypeExpr<"1 << 3">, 8>>

/**
 * 58. Right shift
 * "8 >> 2" => 2
 */
type ExprRightShift = Expect<Equal<TypeExpr<"8 >> 2">, 2>>

/**
 * 59. Left shift by zero
 * "4 << 0" => 4
 */
type ExprLeftShiftZero = Expect<Equal<TypeExpr<"4 << 0">, 4>>

/**
 * 60. Right shift by zero
 * "4 >> 0" => 4
 */
type ExprRightShiftZero = Expect<Equal<TypeExpr<"4 >> 0">, 4>>

/**
 * 61. Left shift a power of two
 * "2 << 4" => 32
 */
type ExprLeftShiftPower = Expect<Equal<TypeExpr<"2 << 4">, 32>>

/**
 * 62. Right shift a power of two
 * "64 >> 3" => 8
 */
type ExprRightShiftPower = Expect<Equal<TypeExpr<"64 >> 3">, 8>>

/**
 * 63. Left shift and right shift chain
 * "1 << 4 >> 2" => (1 << 4) = 16, then 16 >> 2 = 4
 */
type ExprShiftChain = Expect<Equal<TypeExpr<"1 << 4 >> 2">, 4>>

/**
 * 64. Left shift with parentheses
 * "1 << (1 << 1)" => 1 << 2 => 4
 */
type ExprLeftShiftNested = Expect<Equal<TypeExpr<"1 << (1 << 1)">, 4>>

/**
 * 65. Right shift with parentheses
 * "32 >> (1 + 2)" => 32 >> 3 => 4
 */
type ExprRightShiftNested = Expect<Equal<TypeExpr<"32 >> (1 + 2)">, 4>>

/**
 * 66. Right shift a non-power-of-two number
 * "19 >> 1" => 9
 */
type ExprRightShiftOdd = Expect<Equal<TypeExpr<"19 >> 1">, 9>>

/**
 * 67. Largest Left shift. (lower than 2 ^ 53 - 1)
 * "1 << 52" => 4503599627370496
 */
type ExprLeftShiftMax = Expect<Equal<TypeExpr<"1 << 52">, 4503599627370496>>

type blah = TypeExpr<"1 << 52">

/**
 * 68. Right shift to zero
 * "1 >> 3" => 0
 */
type ExprRightShiftToZero = Expect<Equal<TypeExpr<"1 >> 3">, 0>>