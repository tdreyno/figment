/* eslint-disable @typescript-eslint/no-explicit-any */

export const isUndefined = (data: unknown): data is undefined =>
  data === undefined

export const isNull = (data: unknown): data is null => data === null

export const isFunction = (data: unknown): data is Function =>
  typeof data === "function"

export const index = (i: number) => <T>(items: T[]): T | undefined => items[i]

export const nth = (n: number) => index(n - 1)

export const first = index(0)

export const last = <T>(items: T[]): T => items[items.length - 1]

export const rest = <T>([, ...remaining]: T[]) => remaining

export const constant = <T>(value: T) => () => value

export const identity = <T>(value: T) => value
export const knownIdentity = <T>() => (value: unknown) => value as T
export const known = <T, U>(fn: (value: T) => U | undefined) => (value: T): U =>
  fn(value) as U

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

export const or = <T>(...options: Array<((value: T) => unknown) | unknown>) => (
  value: T,
): boolean =>
  options.some(fnOrBool => (isFunction(fnOrBool) ? fnOrBool(value) : fnOrBool))

export const and = <Args extends any[]>(
  ...options: Array<((...args: Args) => unknown) | unknown>
) => (...args: Args): boolean =>
  options.every(fnOrBool =>
    isFunction(fnOrBool)
      ? fnOrBool(...args)
      : options.every(fnOrBool =>
          isFunction(fnOrBool) ? fnOrBool(...args) : fnOrBool,
        ),
  )

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
  d: (data: D) => E,
): (data: A) => E
export function pipe<A, B, C, D>(
  a: (data: A) => B,
  b: (data: B) => C,
  c: (data: C) => D,
): (data: A) => D
export function pipe<A, B, C>(
  a: (data: A) => B,
  b: (data: B) => C,
): (data: A) => C
export function pipe<A, B>(a: (data: A) => B): (data: A) => B
export function pipe(...fns: ((data: any) => any)[]) {
  return (data: any) => fns.reduce((sum, fn) => fn(sum), data)
}

export function apply<T, A>(fn: (a: A) => T): (data: [A]) => T
export function apply<T, A, B>(fn: (a: A, b: B) => T): (data: [A, B]) => T
export function apply<T, A, B, C>(
  fn: (a: A, b: B, c: C) => T,
): (data: [A, B, C]) => T
export function apply<T>(fn: (...args: any[]) => T): (args: any) => T {
  return (args: any) => fn(...args)
}

export const map = <T, U>(fn: (a: T) => U) => (data: T[]): U[] => data.map(fn)
export const chain = <T, U>(fn: (a: T) => U) => (data: T): U => fn(data)

type Predicate<T> = unknown | ((data: T) => unknown)
type Transform<T, U> = (data: T) => U
type Condition<T, U> = [Predicate<T>, Transform<T, U>]

export function cond<T, U>(
  a: Condition<T, U>,
  b: Condition<T, U>,
  c: Condition<T, U>,
  d: Condition<T, U>,
  orElse: Transform<T, U>,
): (data: T) => U
export function cond<T, U>(
  a: Condition<T, U>,
  b: Condition<T, U>,
  c: Condition<T, U>,
  d: Condition<T, U>,
  e: Condition<T, U>,
  orElse: Transform<T, U>,
): (data: T) => U
export function cond<T, U>(
  a: Condition<T, U>,
  b: Condition<T, U>,
  c: Condition<T, U>,
  orElse: Transform<T, U>,
): (data: T) => U
export function cond<T, U>(
  a: Condition<T, U>,
  b: Condition<T, U>,
  orElse: Transform<T, U>,
): (data: T) => U
export function cond<T, U>(
  a: Condition<T, U>,
  orElse: Transform<T, U>,
): (data: T) => U
export function cond<T, U>(orElse: Transform<T, U>): (data: T) => U
export function cond<T, U>(
  ...conditions: (Condition<T, U> | Transform<T, U>)[]
): (data: T) => U {
  const orElse = conditions.pop() as Transform<T, U>

  return (data: T): U => {
    const found = (conditions as Condition<T, U>[]).find(([predicate]) =>
      isFunction(predicate) ? predicate(data) : data,
    )

    return found ? found[1](data) : orElse(data)
  }
}

export const if_ = <T, R>(truthy: (value: T) => R, falsey: (value: T) => R) => (
  value: T,
): R => (value ? truthy(value) : falsey(value))

export function isPlainObject(obj: unknown) {
  // Basic check for Type object that's not null
  if (typeof obj == "object" && obj !== null) {
    // If Object.getPrototypeOf supported, use it
    if (typeof Object.getPrototypeOf == "function") {
      const proto = Object.getPrototypeOf(obj)
      return proto === Object.prototype || proto === null
    }

    // Otherwise, use internal class
    // This should be reliable as if getPrototypeOf not supported, is pre-ES5
    return Object.prototype.toString.call(obj) == "[object Object]"
  }

  // Not an object
  return false
}

export const let_ = <Args extends any[], R>(
  expression: (...vars: Args) => R,
) => (...vars: Args): R => expression(...vars)

export const withDefault = <T>(fallback: () => T) => (
  value: T | undefined,
): T => (isUndefined(value) ? fallback() : value) as Exclude<T, undefined>

export const isA = <K extends Function>(klass: K) => (
  value: unknown,
): value is K => value instanceof klass

export const isArray_ = <T extends any[]>(value: unknown): value is T =>
  Array.isArray(value)

export type Recur<Args extends any[]> = {
  type: "recur"
  args: Args
}

const isRecur = <Args extends any[]>(
  data: Recur<Args> | any,
): data is Recur<Args> => data && data.type === "recur"

export const recur = <Args extends any[]>(...args: Args): Recur<Args> => ({
  type: "recur",
  args,
})

export const loop = <Args extends any[], R>(
  fn: (
    recur_: (...args: Args) => Recur<Args>,
    ...args: Args
  ) => R | Recur<Args>,
) => (...args: Args): R => {
  let lastArgs: Args = args
  while (true) {
    const result = fn(recur as (...args: Args) => Recur<Args>, ...lastArgs)

    if (isRecur(result)) {
      lastArgs = (result.args as unknown) as Args
      continue
    }

    return result
  }
}
