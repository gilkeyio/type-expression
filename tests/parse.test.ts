import { ToAstString } from "../src/parse";
import { Expect, Equal } from "./test_utilities";

type ParseSingleLiteral = Expect<Equal<ToAstString<"5">, "n:5">>;

/**
 * 2. Double digit number
 * "42" => "n:42"
 */
type ParseDoubleDigitNumber = Expect<Equal<ToAstString<"42">, "n:42">>;

/**
 * 3. Simple sum
 * "5 + 3" => "+(n:5,n:3)"
 */
type ParseSimpleSum = Expect<Equal<ToAstString<"5 + 3">, "+(n:5,n:3)">>;

/**
 * 4. Simple subtraction
 * "10 - 4" => "-(n:10,n:4)"
 */
type ParseSimpleSubtraction = Expect<Equal<ToAstString<"10 - 4">, "-(n:10,n:4)">>;

/**
 * 5. Simple multiplication
 * "6 * 7" => "*(n:6,n:7)"
 */
type ParseSimpleMultiplication = Expect<Equal<ToAstString<"6 * 7">, "*(n:6,n:7)">>;

/**
 * 6. Simple division
 * "20 / 5" => "/(n:20,n:5)"
 */
type ParseSimpleDivision = Expect<Equal<ToAstString<"20 / 5">, "/(n:20,n:5)">>;

/**
 * 7. Modulo operation
 * "7 % 3" => "%(n:7,n:3)"
 */
type ParseModulo = Expect<Equal<ToAstString<"7 % 3">, "%(n:7,n:3)">>;

/**
 * 8. Exponentiation
 * "2 ** 3" => "**(n:2,n:3)"
 */
type ParseExponentiation = Expect<Equal<ToAstString<"2 ** 3">, "**(n:2,n:3)">>;

/**
 * 9. Mixed operators, shallow nesting
 * "5 + 3 * 2" => "+(n:5,*(n:3,n:2))"
 */
type ParseMixedOperatorsShallow = Expect<Equal<ToAstString<"5 + 3 * 2">, "+(n:5,*(n:3,n:2))">>;

/**
 * 10. Parentheses affecting operation order
 * "(5 + 3) * 2" => "*(+(n:5,n:3),n:2)"
 */
type ParseParenthesesOrder = Expect<Equal<ToAstString<"(5 + 3) * 2">, "*(+(n:5,n:3),n:2)">>;

/**
 * 11. Multiple exponentiations
 * "2 ** 3 ** 2" => "**(n:2,**(n:3,n:2))"
 */
type ParseMultipleExponentiations = Expect<Equal<ToAstString<"2 ** 3 ** 2">, "**(n:2,**(n:3,n:2))">>;

/**
 * 12. Multiple parentheses with different operations
 * "(2 + 3) * (4 + 5)" => "*(+(n:2,n:3),+(n:4,n:5))"
 */
type ParseMultipleParentheses = Expect<
  Equal<ToAstString<"(2 + 3) * (4 + 5)">, "*(+(n:2,n:3),+(n:4,n:5))">
>;

/**
 * 13. Complex multiplication with parentheses
 * "2 * (3 + 4) * 5" => "*(*(n:2,+(n:3,n:4)),n:5)"
 */
type ParseComplexMultiplication = Expect<
  Equal<ToAstString<"2 * (3 + 4) * 5">, "*(*(n:2,+(n:3,n:4)),n:5)">
>;

/**
 * 14. Decimal number literal
 * "3.14" => "n:3.14"
 */
type ParseDecimalLiteral = Expect<Equal<ToAstString<"3.14">, "n:3.14">>;

/**
 * 15. Simple decimal sum
 * "1.5 + 2.5" => "+(n:1.5,n:2.5)"
 */
type ParseDecimalSum = Expect<Equal<ToAstString<"1.5 + 2.5">, "+(n:1.5,n:2.5)">>;

/**
 * 16. Decimal multiplication
 * "2 * 3.5" => "*(n:2,n:3.5)"
 */
type ParseDecimalMultiplication = Expect<Equal<ToAstString<"2 * 3.5">, "*(n:2,n:3.5)">>;

/**
 * 17. Decimal division
 * "10 / 2.5" => "/(n:10,n:2.5)"
 */
type ParseDecimalDivision = Expect<Equal<ToAstString<"10 / 2.5">, "/(n:10,n:2.5)">>;

/**
 * 18. Decimal exponentiation
 * "2.5 ** 2" => "**(n:2.5,n:2)"
 */
type ParseDecimalExponentiation = Expect<Equal<ToAstString<"2.5 ** 2">, "**(n:2.5,n:2)">>;

/**
 * 19. Decimal parentheses
 * "(1.5 + 0.5) * 2" => "*(+(n:1.5,n:0.5),n:2)"
 */
type ParseDecimalParentheses = Expect<
  Equal<ToAstString<"(1.5 + 0.5) * 2">, "*(+(n:1.5,n:0.5),n:2)">
>;

/**
 * 20. Mixed decimal and integer operations
 * "3 + 2 * 1.5" => "+(n:3,*(n:2,n:1.5))"
 */
type ParseMixedDecimalInteger = Expect<
  Equal<ToAstString<"3 + 2 * 1.5">, "+(n:3,*(n:2,n:1.5))">
>;

/**
 * 21. Unary minus
 * "-5" => "-(n:5)"
 */
type ParseUnaryMinus = Expect<Equal<ToAstString<"-5">, "-(n:5)">>;

/**
 * 22. Unary plus
 * "+5" => "+(n:5)"
 */
type ParseUnaryPlus = Expect<Equal<ToAstString<"+5">, "+(n:5)">>;

/**
 * 23. Unary minus with decimal
 * "-3.14" => "-(n:3.14)"
 */
type ParseUnaryMinusDecimal = Expect<Equal<ToAstString<"-3.14">, "-(n:3.14)">>;

/**
 * 24. Unary minus in expression
 * "5 + -3" => "+(n:5,-(n:3))"
 */
type ParseUnaryMinusExpression = Expect<Equal<ToAstString<"5 + -3">, "+(n:5,-(n:3))">>;

/**
 * 25. Unary minus with multiplication
 * "-5 * 2" => "*(-(n:5),n:2)"
 */
type ParseUnaryMinusMultiplication = Expect<Equal<ToAstString<"-5 * 2">, "*(-(n:5),n:2)">>;

/**
 * 26. Unary minus with parentheses
 * "-(5 + 2)" => "-(+(n:5,n:2))"
 */
type ParseUnaryMinusParentheses = Expect<Equal<ToAstString<"-(5 + 2)">, "-(+(n:5,n:2))">>;

/**
 * 27. Unary minus with space and parentheses
 * "- (5 + 2)" => "-(+(n:5,n:2))"
 */
type ParseUnaryMinusSpaceParentheses = Expect<Equal<ToAstString<"- (5 + 2)">, "-(+(n:5,n:2))">>;

/**
 * 28. Double unary minus
 * "- -5" => "-(-(n:5))"
 */
type ParseDoubleUnaryMinus = Expect<Equal<ToAstString<"- -5">, "-(-(n:5))">>;

/**
 * 29. Double unary plus
 * "+ +5" => "+(+(n:5))"
 */
type ParseDoubleUnaryPlus = Expect<Equal<ToAstString<"+ +5">, "+(+(n:5))">>;

/**
 * 30. Combined unary plus and minus
 * "+-5" => "+(-(n:5))"
 */
type ParseUnaryPlusMinus = Expect<Equal<ToAstString<"+-5">, "+(-(n:5))">>;

/**
 * 31. Combined unary minus and plus
 * "-+5" => "-(+(n:5))"
 */
type ParseUnaryMinusPlus = Expect<Equal<ToAstString<"-+5">, "-(+(n:5))">>;

/**
 * 32. Unary minus in complex expression
 * "2 * -3 + 4" => "+(*(n:2,-(n:3)),n:4)"
 */
type ParseUnaryMinusComplex = Expect<
  Equal<ToAstString<"2 * -3 + 4">, "+(*(n:2,-(n:3)),n:4)">
>;

/**
 * 33. Unary plus in complex expression
 * "2 * +3 + 4" => "+(*(n:2,+(n:3)),n:4)"
 */
type ParseUnaryPlusComplex = Expect<
  Equal<ToAstString<"2 * +3 + 4">, "+(*(n:2,+(n:3)),n:4)">
>;

/**
 * 34. Bitwise AND
 * "5 & 3" => "&(n:5,n:3)"
 */
type ParseBitwiseAnd = Expect<Equal<ToAstString<"5 & 3">, "&(n:5,n:3)">>;

/**
 * 35. Bitwise AND chain
 * "8 & 6 & 1" => "&(&(n:8,n:6),n:1)"
 */
type ParseBitwiseAndChain = Expect<
  Equal<ToAstString<"8 & 6 & 1">, "&(&(n:8,n:6),n:1)">
>;

/**
 * 36. Bitwise OR
 * "5 | 3" => "|(n:5,n:3)"
 */
type ParseBitwiseOr = Expect<Equal<ToAstString<"5 | 3">, "|(n:5,n:3)">>;

/**
 * 37. Bitwise OR chain
 * "1 | 2 | 4" => "|(|(n:1,n:2),n:4)"
 */
type ParseBitwiseOrChain = Expect<
  Equal<ToAstString<"1 | 2 | 4">, "|(|(n:1,n:2),n:4)">
>;

/**
 * 38. Mixed AND/OR precedence
 * "1 | 2 & 3" => "|(n:1,&(n:2,n:3))"
 */
type ParseMixedOrAnd = Expect<
  Equal<ToAstString<"1 | 2 & 3">, "|(n:1,&(n:2,n:3))">
>;

/**
 * 39. Bitwise OR with zero
 * "0 | 7" => "|(n:0,n:7)"
 */
type ParseBitwiseOrZero = Expect<Equal<ToAstString<"0 | 7">, "|(n:0,n:7)">>;

/**
 * 40. Mixed precedence chain
 * "4 & 1 | 2" => "|(&(n:4,n:1),n:2)"
 */
type ParseMixedChain = Expect<
  Equal<ToAstString<"4 & 1 | 2">, "|(&(n:4,n:1),n:2)">
>;

/**
 * 41. Bitwise OR multiple operands
 * "0 | 1 | 8" => "|(|(n:0,n:1),n:8)"
 */
type ParseBitwiseOrMulti = Expect<
  Equal<ToAstString<"0 | 1 | 8">, "|(|(n:0,n:1),n:8)">
>;

/**
 * 42. Bitwise OR simple pair
 * "2 | 4" => "|(n:2,n:4)"
 */
type ParseBitwiseOrPair = Expect<Equal<ToAstString<"2 | 4">, "|(n:2,n:4)">>;

/**
 * 43. Simple comparison
 * "3 > 2" => ">(n:3,n:2)"
 */
type ParseSimpleComparison = Expect<Equal<ToAstString<"3 > 2">, ">(n:3,n:2)">>;

/**
 * 44. Equality comparison with arithmetic
 * "3 + 2 == 5" => "==(+(n:3,n:2),n:5)"
 */
type ParseEqualityComparison = Expect<
  Equal<ToAstString<"3 + 2 == 5">, "==(+(n:3,n:2),n:5)">
>;

/**
 * 45. Ternary expression
 * "1 > 2 ? 8 : 9" => "?:(>(n:1,n:2),n:8,n:9)"
 */
type ParseTernary = Expect<
  Equal<ToAstString<"1 > 2 ? 8 : 9">, "?:(>(n:1,n:2),n:8,n:9)">
>;

/**
 * 46. Ternary with true branch
 * "2 == 2 ? 10 : 20" => "?:(==(n:2,n:2),n:10,n:20)"
 */
type ParseTernaryTrue = Expect<
  Equal<ToAstString<"2 == 2 ? 10 : 20">, "?:(==(n:2,n:2),n:10,n:20)">
>;

/**
 * 47. Ternary with false branch
 * "2 < 1 ? 10 : 20" => "?:(<(n:2,n:1),n:10,n:20)"
 */
type ParseTernaryFalse = Expect<
  Equal<ToAstString<"2 < 1 ? 10 : 20">, "?:(<(n:2,n:1),n:10,n:20)">
>;

/**
 * 48. Nested ternary
 * "1 > 2 ? 1 : 3 > 2 ? 2 : 3" => "?:(>(n:1,n:2),n:1,?:(>(n:3,n:2),n:2,n:3))"
 */
type ParseNestedTernary = Expect<
  Equal<
    ToAstString<"1 > 2 ? 1 : 3 > 2 ? 2 : 3">,
    "?:(>(n:1,n:2),n:1,?:(>(n:3,n:2),n:2,n:3))"
  >
>;

/**
 * 49. Bitwise XOR
 * "5 ^ 2" => "^(n:5,n:2)"
 */
type ParseBitwiseXor = Expect<Equal<ToAstString<"5 ^ 2">, "^(n:5,n:2)">>;

/**
 * 50. Left shift
 * "1 << 3" => "<<(n:1,n:3)"
 */
type ParseLeftShift = Expect<Equal<ToAstString<"1 << 3">, "<<(n:1,n:3)">>;

/**
 * 51. Right shift
 * "8 >> 2" => ">>(n:8,n:2)"
 */
type ParseRightShift = Expect<Equal<ToAstString<"8 >> 2">, ">>(n:8,n:2)">>;
