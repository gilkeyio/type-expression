import { Evaluate } from "./evaluate";
import { ToAstString } from "./parse";

export type TypeExpr<T extends string> = Evaluate<ToAstString<T>>;

// Ex: the area of a 6 * 8 rectangle
type RectangleArea = TypeExpr<"6 * 8">;

