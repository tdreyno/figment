import { let_, pipe } from "../core/index"

export type Nil = undefined
export type Cons<T> = [T, Cons<T> | Nil]
export type List<T> = Nil | Cons<T>
export type NonEmptyList<T> = Cons<T>

export const Nil = <T = unknown>(): List<T> => undefined
export const cons = <T>(head: T) => (list: List<T>): List<T> => [head, list]
export const head = <T>(list: List<T>) =>
  list !== undefined ? list[0] : undefined
export const tail = <T>(list: List<T>) =>
  list !== undefined ? list[1] : undefined

export const fromArray = <T>(items: T[]) =>
  items.reverse().reduce((sum, item) => cons(item)(sum), Nil<T>())

export const of = <T>(...args: T[]) => fromArray(args)
export const empty = Nil

export const map = <A, B>(fn: (a: A) => B) => (list: List<A>): List<B> =>
  let_<[A | undefined, List<A>], List<B>>((h, t) =>
    h !== undefined ? [fn(h), map(fn)(t)] : Nil<B>(),
  )(head(list), tail(list))

export const filter = <A>(fn: (a: A) => unknown) => (list: List<A>): List<A> =>
  let_<[A | undefined, List<A>], List<A>>((h, t) =>
    h !== undefined ? (fn(h) ? [h, filter(fn)(t)] : filter(fn)(t)) : Nil<A>(),
  )(head(list), tail(list))

export const some = <A>(fn: (a: A) => unknown) => (list: List<A>): boolean =>
  let_<[A | undefined, List<A>], boolean>((h, t) =>
    h !== undefined ? (fn(h) ? true : some(fn)(t)) : false,
  )(head(list), tail(list))

export const every = <A>(fn: (a: A) => unknown) => (list: List<A>): boolean =>
  let_<[A | undefined, List<A>], boolean>((h, t) =>
    h !== undefined ? (!fn(h) ? false : every(fn)(t)) : true,
  )(head(list), tail(list))

export const reduce = <T, A>(fn: (acc: T, a: A) => T) => (acc: T) => (
  list: List<A>,
): T =>
  let_<[A | undefined, List<A>], T>((h, t) =>
    h !== undefined ? reduce(fn)(fn(acc, h))(t) : acc,
  )(head(list), tail(list))

export const toArray = <T>(list: List<T>): T[] =>
  reduce<T[], T>((acc, item) => {
    acc.push(item)
    return acc
  })([])(list)

export const size = reduce((acc: number) => acc + 1)(0)

export const conj = <A>(item: A) => (list: List<A>): List<A> =>
  let_<[A | undefined, List<A>], List<A>>((h, t) =>
    h !== undefined ? cons(h)(conj(item)(t)) : of(item),
  )(head(list), tail(list))

export const last = <A>(list: List<A>): A | undefined =>
  let_<[A | undefined, List<A>], A | undefined>((h, t) =>
    h !== undefined ? (t !== undefined ? last(t) : h) : undefined,
  )(head(list), tail(list))

export const reverse = <A>(list: List<A>) =>
  reduce<List<A>, A>((acc, item) => cons(item)(acc))(Nil<A>())(list)

export const removeLast = <A>(list: List<A>): List<A> =>
  pipe(reverse, tail, reverse)(list)
