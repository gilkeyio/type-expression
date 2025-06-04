import type { Add, Subtract, Multiply, Divide, Mod, Pow } from "ts-arithmetic";
import { Expect, Equal } from "./test_utilities";
import { Evaluate } from "../src/evaluate";

/**
 * 1. Single literal
 * "n:5" => 5
 */
type EvalSingleLiteral = Expect<Equal<Evaluate<"n:5">, 5>>;

/**
 * 2. Simple sum
 * "+(n:5,n:3)" => Add<5, 3>
 */
type EvalSimpleSum = Expect<Equal<Evaluate<"+(n:5,n:3)">, Add<5, 3>>>;

/**
 * 3. Simple subtraction
 * "-(n:10,n:3)" => Subtract<10, 3>
 */
type EvalSimpleSubtraction = Expect<Equal<Evaluate<"-(n:10,n:3)">, Subtract<10, 3>>>;

/**
 * 4. Mixed operators, shallow nesting
 * "+(n:1, -(n:2,n:3))" => Add<1, Subtract<2, 3>>
 */
type EvalMixedOperatorsShallow = Expect<
  Equal<Evaluate<"+(n:1, -(n:2,n:3))">, Add<1, Subtract<2, 3>>>
>;

/**
 * 5. Multiplying zero by a nested expression
 * "*(n:0, +(n:1,n:2))" => Multiply<0, Add<1, 2>>
 */
type EvalMultiplyZeroNested = Expect<
  Equal<Evaluate<"*(n:0, +(n:1,n:2))">, Multiply<0, Add<1, 2>>>
>;

/**
 * 6. Deep nesting on the left side
 * "*(+(n:1, +(n:2,n:3)), +(n:4,n:5))" => Multiply<Add<1, Add<2, 3>>, Add<4, 5>>
 */
type EvalDeepNestingLeft = Expect<
  Equal<
    Evaluate<"*(+(n:1, +(n:2,n:3)), +(n:4,n:5))">,
    Multiply<Add<1, Add<2, 3>>, Add<4, 5>>
  >
>;

/**
 * 7. Multiple nested operations inside one set of parentheses
 * "*(+(n:1,n:2), *(n:3, +(n:4,n:5)))" => Multiply<Add<1, 2>, Multiply<3, Add<4, 5>>>
 */
type EvalMultipleNestedOps = Expect<
  Equal<
    Evaluate<"*(+(n:1,n:2), *(n:3, +(n:4,n:5)))">,
    Multiply<Add<1, 2>, Multiply<3, Add<4, 5>>>
  >
>;

/**
 * 8. Deep multi-operator chaining
 * "+(*(+(n:1,n:2), *(n:3,n:4)), n:5)" => Add<Multiply<Add<1, 2>, Multiply<3, 4>>, 5>
 */
type EvalDeepChaining = Expect<
  Equal<
    Evaluate<"+(*(+(n:1,n:2), *(n:3,n:4)), n:5)">,
    Add<Multiply<Add<1, 2>, Multiply<3, 4>>, 5>
  >
>;

/**
 * 9. Nested sums inside a sum
 * "+(+(n:1,n:2), +(n:3,n:4))" => Add<Add<1, 2>, Add<3, 4>>
 */
type EvalNestedSums = Expect<
  Equal<Evaluate<"+(+(n:1,n:2), +(n:3,n:4))">, Add<Add<1, 2>, Add<3, 4>>>
>;

/**
 * 10. Several layers of parentheses, combining + and -
 * "-(+(n:1,n:2), -(n:3, +(n:4,n:5)))" => Subtract<Add<1, 2>, Subtract<3, Add<4, 5>>>
 */
type EvalParensAddSubtract = Expect<
  Equal<
    Evaluate<"-(+(n:1,n:2), -(n:3, +(n:4,n:5)))">,
    Subtract<Add<1, 2>, Subtract<3, Add<4, 5>>>
  >
>;

/**
 * 11. Combining all operators, more deeply nested
 * "*(+(n:1,n:2), -(+(n:3,n:4), +(n:5,n:6)))" => Multiply<Add<1, 2>, Subtract<Add<3, 4>, Add<5, 6>>>
 */
type EvalAllOperatorsDeep = Expect<
  Equal<
    Evaluate<"*(+(n:1,n:2), -(+(n:3,n:4), +(n:5,n:6)))">,
    Multiply<Add<1, 2>, Subtract<Add<3, 4>, Add<5, 6>>>
  >
>;

/**
 * 12. A “chain” of multiplications
 * "*( *(n:2,n:3), *(n:4, *(n:5,n:6)) )" => Multiply<Multiply<2, 3>, Multiply<4, Multiply<5, 6>>>
 */
type EvalMultiplyChain = Expect<
  Equal<
    Evaluate<"*( *(n:2,n:3), *(n:4, *(n:5,n:6)) )">,
    Multiply<Multiply<2, 3>, Multiply<4, Multiply<5, 6>>>
  >
>;

/**
 * 13. Big complex expression
 * "+(*( +(n:1, *(n:2, n:3)), +(n:4, n:5)), -(n:6, n:7))" => Add<Multiply<Add<1, Multiply<2, 3>>, Add<4, 5>>, Subtract<6, 7>>
 */
type EvalBigExpression = Expect<
  Equal<
    Evaluate<"+(*( +(n:1, *(n:2, n:3)), +(n:4, n:5)), -(n:6, n:7))">,
    Add<Multiply<Add<1, Multiply<2, 3>>, Add<4, 5>>, Subtract<6, 7>>
  >
>;

/**
 * 14. Decimal number literal
 * "n:3.14" => 3.14
 */
type EvalDecimalLiteral = Expect<Equal<Evaluate<"n:3.14">, 3.14>>;

/**
 * 15. Simple decimal sum
 * "+(n:1.5,n:2.5)" => Add<1.5, 2.5>
 */
type EvalDecimalSum = Expect<Equal<Evaluate<"+(n:1.5,n:2.5)">, Add<1.5, 2.5>>>;

/**
 * 16. Decimal multiplication
 * "*(n:2,n:3.5)" => Multiply<2, 3.5>
 */
type EvalDecimalMultiply = Expect<Equal<Evaluate<"*(n:2,n:3.5)">, Multiply<2, 3.5>>>;

/**
 * 17. Decimal division
 * "/(n:10,n:2.5)" => Divide<10, 2.5>
 */
type EvalDecimalDivision = Expect<Equal<Evaluate<"/(n:10,n:2.5)">, Divide<10, 2.5>>>;

/**
 * 18. Decimal power
 * "^(n:2.5,n:2)" => Pow<2.5, 2>
 */
type EvalDecimalPower = Expect<Equal<Evaluate<"^(n:2.5,n:2)">, Pow<2.5, 2>>>;

/**
 * 19. Decimal parentheses
 * "*(+(n:1.5,n:0.5),n:2)" => Multiply<Add<1.5, 0.5>, 2>
 */
type EvalDecimalParentheses = Expect<
  Equal<Evaluate<"*(+(n:1.5,n:0.5),n:2)">, Multiply<Add<1.5, 0.5>, 2>>
>;

/**
 * 20. Mixed decimal and integer operations
 * "+(n:3,*(n:2,n:1.5))" => Add<3, Multiply<2, 1.5>>
 */
type EvalMixedDecimalInteger = Expect<
  Equal<Evaluate<"+(n:3,*(n:2,n:1.5))">, Add<3, Multiply<2, 1.5>>>
>;

/**
 * 21. Unary minus literal
 * "-(n:5)" => Subtract<0, 5>
 */
type EvalUnaryMinusLiteral = Expect<Equal<Evaluate<"-(n:5)">, Subtract<0, 5>>>;

/**
 * 22. Unary plus literal
 * "+(n:5)" => 5
 */
type EvalUnaryPlusLiteral = Expect<Equal<Evaluate<"+(n:5)">, 5>>;

/**
 * 23. Unary minus decimal literal
 * "-(n:3.14)" => Subtract<0, 3.14>
 */
type EvalUnaryMinusDecimal = Expect<Equal<Evaluate<"-(n:3.14)">, Subtract<0, 3.14>>>;

/**
 * 24. Unary minus in expression
 * "+(n:5,-(n:3))" => Add<5, Subtract<0, 3>>
 */
type EvalUnaryMinusExpression = Expect<Equal<Evaluate<"+(n:5,-(n:3))">, Add<5, Subtract<0, 3>>>>;

/**
 * 25. Unary minus with multiplication
 * "*( -(n:5),n:2)" => Multiply<Subtract<0, 5>, 2>
 */
type EvalUnaryMinusMultiplication = Expect<
  Equal<Evaluate<"*( -(n:5),n:2)">, Multiply<Subtract<0, 5>, 2>>
>;

/**
 * 26. Unary minus with parentheses
 * "-(+(n:5,n:2))" => Subtract<0, Add<5, 2>>
 */
type EvalUnaryMinusParentheses = Expect<Equal<Evaluate<"-(+(n:5,n:2))">, Subtract<0, Add<5, 2>>>>;

/**
 * 27. Unary minus with space and parentheses
 * "-(+(n:5,n:2))" => Subtract<0, Add<5, 2>>
 */
type EvalUnaryMinusSpaceParens = Expect<Equal<Evaluate<"-(+(n:5,n:2))">, Subtract<0, Add<5, 2>>>>;

/**
 * 28. Double unary minus
 * "-( -(n:5))" => Subtract<0, Subtract<0, 5>>
 */
type EvalDoubleUnaryMinus = Expect<
  Equal<Evaluate<"-( -(n:5))">, Subtract<0, Subtract<0, 5>>>
>;

/**
 * 29. Double unary plus
 * "+(+(n:5))" => 5
 */
type EvalDoubleUnaryPlus = Expect<Equal<Evaluate<"+(+(n:5))">, 5>>;

/**
 * 30. Unary plus and minus combined
 * "+(-(n:5))" => Subtract<0, 5>
 */
type EvalUnaryPlusMinus = Expect<Equal<Evaluate<"+(-(n:5))">, Subtract<0, 5>>>;

/**
 * 31. Unary minus and plus combined
 * "-(+(n:5))" => Subtract<0, 5>
 */
type EvalUnaryMinusPlus = Expect<Equal<Evaluate<"-(+(n:5))">, Subtract<0, 5>>>;

/**
 * 32. Unary minus in complex expression
 * "+(*(n:2,-(n:3)),n:4)" => Add<Multiply<2, Subtract<0, 3>>, 4>
 */
type EvalUnaryMinusComplex = Expect<
  Equal<Evaluate<"+(*(n:2,-(n:3)),n:4)">, Add<Multiply<2, Subtract<0, 3>>, 4>>
>;

/**
 * 33. Unary plus in complex expression
 * "+(*(n:2,+(n:3)),n:4)" => Add<Multiply<2, 3>, 4>
 */
type EvalUnaryPlusComplex = Expect<
  Equal<Evaluate<"+(*(n:2,+(n:3)),n:4)">, Add<Multiply<2, 3>, 4>>
>;

/**
 * 34. Bitwise AND
 * "&(n:5,n:3)" => 1
 */
type EvalBitwiseAnd = Expect<Equal<Evaluate<"&(n:5,n:3)">, 1>>;
/**
 * 35. Bitwise AND with different numbers
 * "&(n:13,n:11)" => 9
 */
type EvalBitwiseAndDiff = Expect<Equal<Evaluate<"&(n:13,n:11)">, 9>>;

/**
 * 36. Bitwise AND with zero
 * "&(n:7,n:0)" => 0
 */
type EvalBitwiseAndZero = Expect<Equal<Evaluate<"&(n:7,n:0)">, 0>>;

/**
 * 37. Bitwise AND multiple
 * "&( &(n:15,n:7),n:3)" => 3
 */
type EvalBitwiseAndMulti = Expect<Equal<Evaluate<"&( &(n:15,n:7),n:3)">, 3>>;

/**
 * 38. Bitwise AND chain
 * "&( &(n:8,n:6),n:1)" => 0
 */
type EvalBitwiseAndChain = Expect<Equal<Evaluate<"&( &(n:8,n:6),n:1)">, 0>>;

/**
 * 39. Bitwise OR simple
 * "|(n:5,n:3)" => 7
 */
type EvalBitwiseOr = Expect<Equal<Evaluate<"|(n:5,n:3)">, 7>>;

/**
 * 40. Bitwise OR with zero
 * "|(n:1,n:0)" => 1
 */
type EvalBitwiseOrZero = Expect<Equal<Evaluate<"|(n:1,n:0)">, 1>>;

/**
 * 41. Bitwise OR chain
 * "|( |(n:1,n:2),n:4)" => 7
 */
type EvalBitwiseOrChain = Expect<Equal<Evaluate<"|( |(n:1,n:2),n:4)">, 7>>;

/**
 * 42. Mixed OR and AND precedence
 * "|(n:1,&(n:2,n:3))" => 3
 */
type EvalMixedOrAnd = Expect<Equal<Evaluate<"|(n:1,&(n:2,n:3))">, 3>>;

/**
 * 43. Mixed precedence chain
 * "|( &(n:4,n:1),n:2)" => 2
 */
type EvalMixedChain = Expect<Equal<Evaluate<"|( &(n:4,n:1),n:2)">, 2>>;

/**
 * 44. Bitwise OR multiple operands
 * "|( |(n:1,n:0),n:8)" => 9
 */
type EvalBitwiseOrMulti = Expect<Equal<Evaluate<"|( |(n:1,n:0),n:8)">, 9>>;

/**
 * 45. Bitwise OR symmetric check
 * "|(n:2,n:4)" => 6
 */
type EvalBitwiseOrSymmetric = Expect<Equal<Evaluate<"|(n:2,n:4)">, 6>>;

/**
 * 46. Simple greater than
 * ">(n:3,n:2)" => "true"
 */
type EvalGreaterThan = Expect<Equal<Evaluate<">(n:3,n:2)">, "true">>;

/**
 * 47. Equality comparison
 * "==(+(n:3,n:2),n:5)" => "true"
 */
type EvalEquality = Expect<Equal<Evaluate<"==(+(n:3,n:2),n:5)">, "true">>;

/**
 * 48. Ternary evaluation
 * "?:(>(n:1,n:2),n:8,n:9)" => 9
 */
type EvalTernary = Expect<Equal<Evaluate<"?:(>(n:1,n:2),n:8,n:9)">, 9>>;
