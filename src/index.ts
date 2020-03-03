/* eslint-disable @typescript-eslint/no-explicit-any */
export const first = <T>(items: T[]): T => items[0]
export const constant = <T>(value: T) => () => value
export const identity = <T>(value: T) => value

export const not = <Args extends any[]>(
  fn: (...args: Args) => boolean
): ((...args: Args) => boolean) => (...args: Args) => !!fn(...args)

export const equals = <T>(value: T) => (data: T): boolean => value === data

export const or = <Args extends any[]>(
  ...options: Array<(...args: Args) => unknown>
) => (...args: Args): boolean => options.some(fn => fn(...args))

export const and = <Args extends any[]>(
  ...options: Array<(...args: Args) => unknown>
) => (...args: Args): boolean => options.every(fn => fn(...args))

type Condition<T, U> = (data: T) => null | "" | 0 | undefined | false | U

export function cond<T, U1, U2, U3, U4>(
  a: Condition<T, U1>,
  b: Condition<T, U2>,
  c: Condition<T, U3>,
  d: Condition<T, U4>
): (data: T) => U1 | U2 | U3 | U4
export function cond<T, U1, U2, U3>(
  a: Condition<T, U1>,
  b: Condition<T, U2>,
  c: Condition<T, U3>
): (data: T) => U1 | U2 | U3
export function cond<T, U1, U2>(
  a: Condition<T, U1>,
  b: Condition<T, U2>
): (data: T) => U1 | U2
export function cond<T, U1>(
  ...conditions: Array<Condition<T, U1>>
): (data: T) => U1 {
  return (data: T): U1 => {
    for (const fn of conditions) {
      const result = fn(data)

      if (result) {
        return result
      }
    }

    // Needs to be impossible
    throw new Error("cond did not find a match")
  }
}

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
