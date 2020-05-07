/* eslint-disable @typescript-eslint/no-explicit-any */
import { let_, pipe } from "../core/index"

export type Nil = { type: "nil" }
export type Tail<T> = Cons<T> | Nil
export type Cons<T> = [T, Tail<T>]
export type List<T> = Nil | Cons<T>
export type NonEmptyList<T> = Cons<T>

export const isNil = (value: any): value is Nil =>
  value && (value as Nil).type === "nil"

export const Nil: Nil = {
  type: "nil",
}

export const isNonEmptyList = <T>(list: List<T>): list is NonEmptyList<T> =>
  !isNil(list)

export const cons = <T>(head: T) => (
  list: NonEmptyList<T> | List<T>,
): NonEmptyList<T> => [head, list]

export function head<T>(list: NonEmptyList<T>): T
export function head<T>(list: List<T>): Nil | T
export function head<T>(list: NonEmptyList<T> | List<T>): Nil | T {
  return isNil(list) ? Nil : list[0]
}

export const tail = <T>(list: List<T>): Nil | Cons<T> =>
  isNil(list) ? Nil : list[1]

export const fromArray = <T>(items: T[]) =>
  items.reverse().reduce<List<T>>((sum, item) => cons(item)(sum), Nil)

export const of = <T>(first: T, ...more: T[]): NonEmptyList<T> =>
  fromArray([first, ...more]) as NonEmptyList<T>

export const empty = () => Nil

// export function map<A, B>(
//   fn: (a: A) => B,
// ): (list: NonEmptyList<A>) => NonEmptyList<B>
export function map<A, B>(fn: (a: A) => B): (list: List<A>) => List<B> {
  return list =>
    let_<[A | Nil, List<A>], List<B>>((h, t) =>
      isNil(h) ? Nil : [fn(h), map(fn)(t)],
    )(head(list), tail(list))
}

export const filter = <A>(fn: (a: A) => unknown) => (list: List<A>): List<A> =>
  let_<[A | Nil, List<A>], List<A>>((h, t) =>
    isNil(h) ? Nil : fn(h) ? [h, filter(fn)(t)] : filter(fn)(t),
  )(head(list), tail(list))

export const some = <A>(fn: (a: A) => unknown) => (list: List<A>): boolean =>
  let_<[A | Nil, List<A>], boolean>((h, t) =>
    isNil(h) ? false : fn(h) ? true : some(fn)(t),
  )(head(list), tail(list))

export const every = <A>(fn: (a: A) => unknown) => (list: List<A>): boolean =>
  let_<[A | Nil, List<A>], boolean>((h, t) =>
    isNil(h) ? true : !fn(h) ? false : every(fn)(t),
  )(head(list), tail(list))

export const reduce = <T, A>(fn: (acc: T, a: A) => T) => (acc: T) => (
  list: List<A>,
): T =>
  let_<[A | Nil, List<A>], T>((h, t) =>
    isNil(h) ? acc : reduce(fn)(fn(acc, h))(t),
  )(head(list), tail(list))

export const toArray = <T>(list: List<T>): T[] =>
  reduce<T[], T>((acc, item) => {
    acc.push(item)
    return acc
  })([])(list)

export const size = reduce((acc: number) => acc + 1)(0)

export const conj = <A>(item: A) => (list: List<A>): NonEmptyList<A> =>
  let_<[A | Nil, List<A>], NonEmptyList<A>>((h, t) =>
    isNil(h) ? of(item) : cons(h)(conj(item)(t)),
  )(head(list), tail(list))

export const last = <A>(list: List<A>): A | Nil =>
  let_<[A | Nil, List<A>], A | Nil>((h, t) =>
    isNil(h) ? Nil : isNil(t) ? h : last(t),
  )(head(list), tail(list))

export const reverse = <A>(list: List<A>) =>
  reduce<List<A>, A>((acc, item) => cons(item)(acc))(Nil)(list)

export const removeLast = <A>(list: List<A>): List<A> =>
  pipe(reverse, tail, reverse)(list)
