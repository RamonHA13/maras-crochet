export type ReturnTuple<T> = [null, NonNullable<T>] | [Error, null]
