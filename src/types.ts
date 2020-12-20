export type FunctionKeys<T> = {
  [P in keyof T]:
    T[P] extends (...args: any) => unknown
      ? P
      : never
}[keyof T]
