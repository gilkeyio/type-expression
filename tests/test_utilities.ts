https://github.com/microsoft/TypeScript/issues/27024#issuecomment-421529650

export type Equal<A, B> = (<T>() => T extends A ? 1 : 2) extends <
  T
>() => T extends B ? 1 : 2
  ? true
  : false;

export type Expect<T extends true> = T;
