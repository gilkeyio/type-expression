import type { Add, Subtract, Multiply, Divide, Mod, Pow } from "ts-arithmetic";
import { Expect, Equal } from "./test_utilities";
import { Evaluate } from "../src/evaluate";

/**
 * 1. Single literal
 * "n:5" => 5
 */
type Test1 = Expect<Equal<Evaluate<"n:5">, 5>>;

/**
 * 2. Simple sum
 * "+(n:5,n:3)" => Add<5, 3>
 */
type Test2 = Expect<Equal<Evaluate<"+(n:5,n:3)">, Add<5, 3>>>;

/**
 * 3. Simple subtraction
 * "-(n:10,n:3)" => Subtract<10, 3>
 */
type Test3 = Expect<Equal<Evaluate<"-(n:10,n:3)">, Subtract<10, 3>>>;

/**
 * 4. Mixed operators, shallow nesting
 * "+(n:1, -(n:2,n:3))" => Add<1, Subtract<2, 3>>
 */
type Test4 = Expect<
  Equal<Evaluate<"+(n:1, -(n:2,n:3))">, Add<1, Subtract<2, 3>>>
>;

/**
 * 5. Multiplying zero by a nested expression
 * "*(n:0, +(n:1,n:2))" => Multiply<0, Add<1, 2>>
 */
type Test5 = Expect<
  Equal<Evaluate<"*(n:0, +(n:1,n:2))">, Multiply<0, Add<1, 2>>>
>;

/**
 * 6. Deep nesting on the left side
 * "*(+(n:1, +(n:2,n:3)), +(n:4,n:5))" => Multiply<Add<1, Add<2, 3>>, Add<4, 5>>
 */
type Test6 = Expect<
  Equal<
    Evaluate<"*(+(n:1, +(n:2,n:3)), +(n:4,n:5))">,
    Multiply<Add<1, Add<2, 3>>, Add<4, 5>>
  >
>;

/**
 * 7. Multiple nested operations inside one set of parentheses
 * "*(+(n:1,n:2), *(n:3, +(n:4,n:5)))" => Multiply<Add<1, 2>, Multiply<3, Add<4, 5>>>
 */
type Test7 = Expect<
  Equal<
    Evaluate<"*(+(n:1,n:2), *(n:3, +(n:4,n:5)))">,
    Multiply<Add<1, 2>, Multiply<3, Add<4, 5>>>
  >
>;

/**
 * 8. Deep multi-operator chaining
 * "+(*(+(n:1,n:2), *(n:3,n:4)), n:5)" => Add<Multiply<Add<1, 2>, Multiply<3, 4>>, 5>
 */
type Test8 = Expect<
  Equal<
    Evaluate<"+(*(+(n:1,n:2), *(n:3,n:4)), n:5)">,
    Add<Multiply<Add<1, 2>, Multiply<3, 4>>, 5>
  >
>;

/**
 * 9. Nested sums inside a sum
 * "+(+(n:1,n:2), +(n:3,n:4))" => Add<Add<1, 2>, Add<3, 4>>
 */
type Test9 = Expect<
  Equal<Evaluate<"+(+(n:1,n:2), +(n:3,n:4))">, Add<Add<1, 2>, Add<3, 4>>>
>;

/**
 * 10. Several layers of parentheses, combining + and -
 * "-(+(n:1,n:2), -(n:3, +(n:4,n:5)))" => Subtract<Add<1, 2>, Subtract<3, Add<4, 5>>>
 */
type Test10 = Expect<
  Equal<
    Evaluate<"-(+(n:1,n:2), -(n:3, +(n:4,n:5)))">,
    Subtract<Add<1, 2>, Subtract<3, Add<4, 5>>>
  >
>;

/**
 * 11. Combining all operators, more deeply nested
 * "*(+(n:1,n:2), -(+(n:3,n:4), +(n:5,n:6)))" => Multiply<Add<1, 2>, Subtract<Add<3, 4>, Add<5, 6>>>
 */
type Test11 = Expect<
  Equal<
    Evaluate<"*(+(n:1,n:2), -(+(n:3,n:4), +(n:5,n:6)))">,
    Multiply<Add<1, 2>, Subtract<Add<3, 4>, Add<5, 6>>>
  >
>;

/**
 * 12. A “chain” of multiplications
 * "*( *(n:2,n:3), *(n:4, *(n:5,n:6)) )" => Multiply<Multiply<2, 3>, Multiply<4, Multiply<5, 6>>>
 */
type Test12 = Expect<
  Equal<
    Evaluate<"*( *(n:2,n:3), *(n:4, *(n:5,n:6)) )">,
    Multiply<Multiply<2, 3>, Multiply<4, Multiply<5, 6>>>
  >
>;

/**
 * 13. Big complex expression
 * "+(*( +(n:1, *(n:2, n:3)), +(n:4, n:5)), -(n:6, n:7))" => Add<Multiply<Add<1, Multiply<2, 3>>, Add<4, 5>>, Subtract<6, 7>>
 */
type Test13 = Expect<
  Equal<
    Evaluate<"+(*( +(n:1, *(n:2, n:3)), +(n:4, n:5)), -(n:6, n:7))">,
    Add<Multiply<Add<1, Multiply<2, 3>>, Add<4, 5>>, Subtract<6, 7>>
  >
>;

/**
 * 14. Decimal number literal
 * "n:3.14" => 3.14
 */
type Test14 = Expect<Equal<Evaluate<"n:3.14">, 3.14>>;

/**
 * 15. Simple decimal sum
 * "+(n:1.5,n:2.5)" => Add<1.5, 2.5>
 */
type Test15 = Expect<Equal<Evaluate<"+(n:1.5,n:2.5)">, Add<1.5, 2.5>>>;

/**
 * 16. Decimal multiplication
 * "*(n:2,n:3.5)" => Multiply<2, 3.5>
 */
type Test16 = Expect<Equal<Evaluate<"*(n:2,n:3.5)">, Multiply<2, 3.5>>>;

/**
 * 17. Decimal division
 * "/(n:10,n:2.5)" => Divide<10, 2.5>
 */
type Test17 = Expect<Equal<Evaluate<"/(n:10,n:2.5)">, Divide<10, 2.5>>>;

/**
 * 18. Decimal power
 * "^(n:2.5,n:2)" => Pow<2.5, 2>
 */
type Test18 = Expect<Equal<Evaluate<"^(n:2.5,n:2)">, Pow<2.5, 2>>>;

/**
 * 19. Decimal parentheses
 * "*(+(n:1.5,n:0.5),n:2)" => Multiply<Add<1.5, 0.5>, 2>
 */
type Test19 = Expect<
  Equal<Evaluate<"*(+(n:1.5,n:0.5),n:2)">, Multiply<Add<1.5, 0.5>, 2>>
>;

/**
 * 20. Mixed decimal and integer operations
 * "+(n:3,*(n:2,n:1.5))" => Add<3, Multiply<2, 1.5>>
 */
type Test20 = Expect<
  Equal<Evaluate<"+(n:3,*(n:2,n:1.5))">, Add<3, Multiply<2, 1.5>>>
>;

/**
 * 21. Unary minus literal
 * "-(n:5)" => Subtract<0, 5>
 */
type Test21 = Expect<Equal<Evaluate<"-(n:5)">, Subtract<0, 5>>>;

/**
 * 22. Unary plus literal
 * "+(n:5)" => 5
 */
type Test22 = Expect<Equal<Evaluate<"+(n:5)">, 5>>;

/**
 * 23. Unary minus decimal literal
 * "-(n:3.14)" => Subtract<0, 3.14>
 */
type Test23 = Expect<Equal<Evaluate<"-(n:3.14)">, Subtract<0, 3.14>>>;

/**
 * 24. Unary minus in expression
 * "+(n:5,-(n:3))" => Add<5, Subtract<0, 3>>
 */
type Test24 = Expect<Equal<Evaluate<"+(n:5,-(n:3))">, Add<5, Subtract<0, 3>>>>;

/**
 * 25. Unary minus with multiplication
 * "*( -(n:5),n:2)" => Multiply<Subtract<0, 5>, 2>
 */
type Test25 = Expect<
  Equal<Evaluate<"*( -(n:5),n:2)">, Multiply<Subtract<0, 5>, 2>>
>;

/**
 * 26. Unary minus with parentheses
 * "-(+(n:5,n:2))" => Subtract<0, Add<5, 2>>
 */
type Test26 = Expect<Equal<Evaluate<"-(+(n:5,n:2))">, Subtract<0, Add<5, 2>>>>;

/**
 * 27. Unary minus with space and parentheses
 * "-(+(n:5,n:2))" => Subtract<0, Add<5, 2>>
 */
type Test27 = Expect<Equal<Evaluate<"-(+(n:5,n:2))">, Subtract<0, Add<5, 2>>>>;

/**
 * 28. Double unary minus
 * "-( -(n:5))" => Subtract<0, Subtract<0, 5>>
 */
type Test28 = Expect<
  Equal<Evaluate<"-( -(n:5))">, Subtract<0, Subtract<0, 5>>>
>;

/**
 * 29. Double unary plus
 * "+(+(n:5))" => 5
 */
type Test29 = Expect<Equal<Evaluate<"+(+(n:5))">, 5>>;

/**
 * 30. Unary plus and minus combined
 * "+(-(n:5))" => Subtract<0, 5>
 */
type Test30 = Expect<Equal<Evaluate<"+(-(n:5))">, Subtract<0, 5>>>;

/**
 * 31. Unary minus and plus combined
 * "-(+(n:5))" => Subtract<0, 5>
 */
type Test31 = Expect<Equal<Evaluate<"-(+(n:5))">, Subtract<0, 5>>>;

/**
 * 32. Unary minus in complex expression
 * "+(*(n:2,-(n:3)),n:4)" => Add<Multiply<2, Subtract<0, 3>>, 4>
 */
type Test32 = Expect<
  Equal<Evaluate<"+(*(n:2,-(n:3)),n:4)">, Add<Multiply<2, Subtract<0, 3>>, 4>>
>;

/**
 * 33. Unary plus in complex expression
 * "+(*(n:2,+(n:3)),n:4)" => Add<Multiply<2, 3>, 4>
 */
type Test33 = Expect<
  Equal<Evaluate<"+(*(n:2,+(n:3)),n:4)">, Add<Multiply<2, 3>, 4>>
>;

/**
 * 34. Bitwise AND
 * "&(n:5,n:3)" => 1
 */
type Test34 = Expect<Equal<Evaluate<"&(n:5,n:3)">, 1>>;
