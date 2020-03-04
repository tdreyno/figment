/* eslint-disable @typescript-eslint/no-explicit-any */
export const first = <T>(items: T[]): T => items[0]

export const constant = <T>(value: T) => () => value

export const identity = <T>(value: T) => value

export const not = <Args extends any[], T>(fn: (...args: Args) => T) => (
  ...args: Args
) => !fn(...args)

export const equals = <T>(value: T) => (data: T): boolean => value === data

export const greaterThan = (value: number) => (data: number): boolean =>
  data > value

export const greaterThanEquals = (value: number) => (data: number): boolean =>
  data >= value

export const lessThan = (value: number) => (data: number): boolean =>
  data < value

export const lessThanEquals = (value: number) => (data: number): boolean =>
  data <= value

export const or = <Args extends any[]>(
  ...options: Array<(...args: Args) => unknown>
) => (...args: Args): boolean => options.some(fn => fn(...args))

export const and = <Args extends any[]>(
  ...options: Array<(...args: Args) => unknown>
) => (...args: Args): boolean => options.every(fn => fn(...args))

export const isBetween = (a: number, b: number, inclusive = false) =>
  inclusive
    ? and(greaterThanEquals(a), lessThanEquals(b))
    : and(greaterThan(a), lessThan(b))

export const pluck = <U, T extends keyof U>(key: T) => (data: U): U[T] =>
  data[key]

export const omit = <U, T extends keyof U>(key: T) => (data: U): Omit<U, T> => {
  const cloned = { ...data }
  delete cloned[key]
  return cloned
}

export function pipe<A, B, C, D, E>(
  a: (data: A) => B,
  b: (data: B) => C,
  c: (data: C) => D,
  d: (data: D) => E
): (data: A) => E
export function pipe<A, B, C, D>(
  a: (data: A) => B,
  b: (data: B) => C,
  c: (data: C) => D
): (data: A) => D
export function pipe<A, B, C>(
  a: (data: A) => B,
  b: (data: B) => C
): (data: A) => C
export function pipe(...fns: ((data: any) => any)[]) {
  return (data: any) => fns.reduce((sum, fn) => fn(sum), data)
}

export function apply<T, A>(fn: (a: A) => T): (data: [A]) => T
export function apply<T, A, B>(fn: (a: A, b: B) => T): (data: [A, B]) => T
export function apply<T, A, B, C>(
  fn: (a: A, b: B, c: C) => T
): (data: [A, B, C]) => T
export function apply<T>(fn: (...args: any[]) => T): (args: any) => T {
  return (args: any) => fn(...args)
}

export const map = <T, U>(fn: (a: T) => U) => (data: T[]): U[] => data.map(fn)
export const chain = <T, U>(fn: (a: T) => U) => (data: T): U => fn(data)

type Predicate<T> = (data: T) => unknown
type Transform<T, U> = (data: T) => U
type Condition<T, U> = [Predicate<T>, Transform<T, U>]

export function cond<T, U>(
  conditions: Condition<T, U>[]
): (data: T) => U | undefined
export function cond<T, U>(
  conditions: Condition<T, U>[],
  orElse: Transform<T, U>
): (data: T) => U
export function cond<T, U>(
  conditions: Condition<T, U>[],
  orElse?: Transform<T, U>
): (data: T) => U | undefined {
  return (data: T) => {
    const found = conditions.find(([predicate]) => predicate(data))

    if (found) {
      return found[1](data)
    }

    return orElse ? orElse(data) : undefined
  }
}
