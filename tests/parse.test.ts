import { ToAstString } from "../src/parse";
import { Expect, Equal } from "./test_utilities";

type AstTest1 = Expect<Equal<ToAstString<"5">, "n:5">>;

/**
 * 2. Double digit number
 * "42" => "n:42"
 */
type AstTest2 = Expect<Equal<ToAstString<"42">, "n:42">>;

/**
 * 3. Simple sum
 * "5 + 3" => "+(n:5,n:3)"
 */
type AstTest3 = Expect<Equal<ToAstString<"5 + 3">, "+(n:5,n:3)">>;

/**
 * 4. Simple subtraction
 * "10 - 4" => "-(n:10,n:4)"
 */
type AstTest4 = Expect<Equal<ToAstString<"10 - 4">, "-(n:10,n:4)">>;

/**
 * 5. Simple multiplication
 * "6 * 7" => "*(n:6,n:7)"
 */
type AstTest5 = Expect<Equal<ToAstString<"6 * 7">, "*(n:6,n:7)">>;

/**
 * 6. Simple division
 * "20 / 5" => "/(n:20,n:5)"
 */
type AstTest6 = Expect<Equal<ToAstString<"20 / 5">, "/(n:20,n:5)">>;

/**
 * 7. Modulo operation
 * "7 % 3" => "%(n:7,n:3)"
 */
type AstTest7 = Expect<Equal<ToAstString<"7 % 3">, "%(n:7,n:3)">>;

/**
 * 8. Exponentiation
 * "2 ^ 3" => "^(n:2,n:3)"
 */
type AstTest8 = Expect<Equal<ToAstString<"2 ^ 3">, "^(n:2,n:3)">>;

/**
 * 9. Mixed operators, shallow nesting
 * "5 + 3 * 2" => "+(n:5,*(n:3,n:2))"
 */
type AstTest9 = Expect<Equal<ToAstString<"5 + 3 * 2">, "+(n:5,*(n:3,n:2))">>;

/**
 * 10. Parentheses affecting operation order
 * "(5 + 3) * 2" => "*(+(n:5,n:3),n:2)"
 */
type AstTest10 = Expect<Equal<ToAstString<"(5 + 3) * 2">, "*(+(n:5,n:3),n:2)">>;

/**
 * 11. Multiple exponentiations
 * "2 ^ 3 ^ 2" => "^(n:2,^(n:3,n:2))"
 */
type AstTest11 = Expect<Equal<ToAstString<"2 ^ 3 ^ 2">, "^(n:2,^(n:3,n:2))">>;

/**
 * 12. Multiple parentheses with different operations
 * "(2 + 3) * (4 + 5)" => "*(+(n:2,n:3),+(n:4,n:5))"
 */
type AstTest12 = Expect<
  Equal<ToAstString<"(2 + 3) * (4 + 5)">, "*(+(n:2,n:3),+(n:4,n:5))">
>;

/**
 * 13. Complex multiplication with parentheses
 * "2 * (3 + 4) * 5" => "*(*(n:2,+(n:3,n:4)),n:5)"
 */
type AstTest13 = Expect<
  Equal<ToAstString<"2 * (3 + 4) * 5">, "*(*(n:2,+(n:3,n:4)),n:5)">
>;

/**
 * 14. Decimal number literal
 * "3.14" => "n:3.14"
 */
type AstTest14 = Expect<Equal<ToAstString<"3.14">, "n:3.14">>;

/**
 * 15. Simple decimal sum
 * "1.5 + 2.5" => "+(n:1.5,n:2.5)"
 */
type AstTest15 = Expect<Equal<ToAstString<"1.5 + 2.5">, "+(n:1.5,n:2.5)">>;

/**
 * 16. Decimal multiplication
 * "2 * 3.5" => "*(n:2,n:3.5)"
 */
type AstTest16 = Expect<Equal<ToAstString<"2 * 3.5">, "*(n:2,n:3.5)">>;

/**
 * 17. Decimal division
 * "10 / 2.5" => "/(n:10,n:2.5)"
 */
type AstTest17 = Expect<Equal<ToAstString<"10 / 2.5">, "/(n:10,n:2.5)">>;

/**
 * 18. Decimal exponentiation
 * "2.5 ^ 2" => "^(n:2.5,n:2)"
 */
type AstTest18 = Expect<Equal<ToAstString<"2.5 ^ 2">, "^(n:2.5,n:2)">>;

/**
 * 19. Decimal parentheses
 * "(1.5 + 0.5) * 2" => "*(+(n:1.5,n:0.5),n:2)"
 */
type AstTest19 = Expect<
  Equal<ToAstString<"(1.5 + 0.5) * 2">, "*(+(n:1.5,n:0.5),n:2)">
>;

/**
 * 20. Mixed decimal and integer operations
 * "3 + 2 * 1.5" => "+(n:3,*(n:2,n:1.5))"
 */
type AstTest20 = Expect<
  Equal<ToAstString<"3 + 2 * 1.5">, "+(n:3,*(n:2,n:1.5))">
>;

/**
 * 21. Unary minus
 * "-5" => "-(n:5)"
 */
type AstTest21 = Expect<Equal<ToAstString<"-5">, "-(n:5)">>;

/**
 * 22. Unary plus
 * "+5" => "+(n:5)"
 */
type AstTest22 = Expect<Equal<ToAstString<"+5">, "+(n:5)">>;

/**
 * 23. Unary minus with decimal
 * "-3.14" => "-(n:3.14)"
 */
type AstTest23 = Expect<Equal<ToAstString<"-3.14">, "-(n:3.14)">>;

/**
 * 24. Unary minus in expression
 * "5 + -3" => "+(n:5,-(n:3))"
 */
type AstTest24 = Expect<Equal<ToAstString<"5 + -3">, "+(n:5,-(n:3))">>;

/**
 * 25. Unary minus with multiplication
 * "-5 * 2" => "*(-(n:5),n:2)"
 */
type AstTest25 = Expect<Equal<ToAstString<"-5 * 2">, "*(-(n:5),n:2)">>;

/**
 * 26. Unary minus with parentheses
 * "-(5 + 2)" => "-(+(n:5,n:2))"
 */
type AstTest26 = Expect<Equal<ToAstString<"-(5 + 2)">, "-(+(n:5,n:2))">>;

/**
 * 27. Unary minus with space and parentheses
 * "- (5 + 2)" => "-(+(n:5,n:2))"
 */
type AstTest27 = Expect<Equal<ToAstString<"- (5 + 2)">, "-(+(n:5,n:2))">>;

/**
 * 28. Double unary minus
 * "- -5" => "-(-(n:5))"
 */
type AstTest28 = Expect<Equal<ToAstString<"- -5">, "-(-(n:5))">>;

/**
 * 29. Double unary plus
 * "+ +5" => "+(+(n:5))"
 */
type AstTest29 = Expect<Equal<ToAstString<"+ +5">, "+(+(n:5))">>;

/**
 * 30. Combined unary plus and minus
 * "+-5" => "+(-(n:5))"
 */
type AstTest30 = Expect<Equal<ToAstString<"+-5">, "+(-(n:5))">>;

/**
 * 31. Combined unary minus and plus
 * "-+5" => "-(+(n:5))"
 */
type AstTest31 = Expect<Equal<ToAstString<"-+5">, "-(+(n:5))">>;

/**
 * 32. Unary minus in complex expression
 * "2 * -3 + 4" => "+(*(n:2,-(n:3)),n:4)"
 */
type AstTest32 = Expect<
  Equal<ToAstString<"2 * -3 + 4">, "+(*(n:2,-(n:3)),n:4)">
>;

/**
 * 33. Unary plus in complex expression
 * "2 * +3 + 4" => "+(*(n:2,+(n:3)),n:4)"
 */
type AstTest33 = Expect<
  Equal<ToAstString<"2 * +3 + 4">, "+(*(n:2,+(n:3)),n:4)">
>;


/**
 * 34. Bitwise AND
 * "5 & 3" => "&(n:5,n:3)"
 */
type AstTest34 = Expect<Equal<ToAstString<"5 & 3">, "&(n:5,n:3)">>;
