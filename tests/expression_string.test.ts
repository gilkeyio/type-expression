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
 * "2 ^ 3" => 8
 */
type ExprExponentiation = Expect<Equal<TypeExpr<"2 ^ 3">, 8>>;

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
 * "2 ^ 3 ^ 2" => 512
 */
type ExprMultipleExponentiations = Expect<Equal<TypeExpr<"2 ^ 3 ^ 2">, 512>>;

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
 * "2.5 ^ 2" => 6.25
 */
type ExprDecimalExponentiation = Expect<Equal<TypeExpr<"2.5 ^ 2">, 6.25>>;

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
 * 34. Bitwise AND
 * "13 & 11" => 9
 */
type ExprBitwiseAndLarge = Expect<Equal<TypeExpr<"13 & 11">, 9>>;
/**
 * 35. Bitwise AND with zero
 * "7 & 0" => 0
 */
type ExprBitwiseAndZero = Expect<Equal<TypeExpr<"7 & 0">, 0>>;

/**
 * 36. Bitwise AND chain
 * "15 & 7 & 3" => 3
 */
type ExprBitwiseAndChain = Expect<Equal<TypeExpr<"15 & 7 & 3">, 3>>;

/**
 * 37. Bitwise AND nested chain
 * "8 & 6 & 1" => 0
 */
type ExprBitwiseAndNested = Expect<Equal<TypeExpr<"8 & 6 & 1">, 0>>;

/**
 * 38. Bitwise OR
 * "5 | 3" => 7
 */
type ExprBitwiseOr = Expect<Equal<TypeExpr<"5 | 3">, 7>>;

/**
 * 39. Bitwise OR chain
 * "1 | 2 | 4" => 7
 */
type ExprBitwiseOrChain = Expect<Equal<TypeExpr<"1 | 2 | 4">, 7>>;

/**
 * 40. Bitwise OR with zero
 * "0 | 7" => 7
 */
type ExprBitwiseOrZero = Expect<Equal<TypeExpr<"0 | 7">, 7>>;

/**
 * 41. Mixed OR and AND
 * "4 & 1 | 2" => 2
 */
type ExprMixedPrecedence = Expect<Equal<TypeExpr<"4 & 1 | 2">, 2>>;

/**
 * 42. Bitwise OR multiple operands
 * "0 | 1 | 8" => 9
 */
type ExprBitwiseOrMulti = Expect<Equal<TypeExpr<"0 | 1 | 8">, 9>>;

/**
 * 43. Simple comparison
 * "3 > 2" => true
 */
type ExprSimpleComparison = Expect<Equal<TypeExpr<"3 > 2">, true>>;

/**
 * 44. Equality with arithmetic
 * "3 + 2 == 5" => true
 */
type ExprEquality = Expect<Equal<TypeExpr<"3 + 2 == 5">, true>>;

/**
 * 45. Ternary conditional
 * "1 > 2 ? 8 : 9" => 9
 */
type ExprTernary = Expect<Equal<TypeExpr<"1 > 2 ? 8 : 9">, 9>>;
