/* eslint-disable @typescript-eslint/no-explicit-any */
import { let_, pipe, let2_ } from "../core/index"
import { Maybe as M } from "../monads/index"
import { Semigroup, Bifunctor } from "../categories"

export interface List<T> extends Semigroup<List<T>>, Bifunctor<List<T>> {
  type: string
  head(): M.Maybe<T>
  tail(): M.Maybe<List<T>>
  isNil(): boolean
}

export interface Nil<T = unknown> extends List<T> {
  type: "nil"
}

export interface Cons<T> extends List<T> {
  type: "cons"
  _head: T
  _tail: List<T>
}

export const Nil = {
  type: "nil",
  concat: <T>(list: List<T>): List<T> => list,
  head: <T>() => M.Nothing<T>(),
  tail: <T>() => M.Nothing<T>(),
  isNil: () => true,
}

export const cons = <T>(_head: T) => (_tail: List<T>): Cons<T> => ({
  type: "cons",
  _head,
  _tail,
  head: () => M.Just(_head),
  tail: () => (_tail.isNil() ? M.Nothing() : M.Just(_tail)),
  isNil: () => false,
  concat: (list: List<T>): List<T> => _tail.concat(list),
})

export const empty = () => Nil

export const of = <T>(item: T): Cons<T> => cons<T>(item)(empty())

export const fromArray = <T>(items: T[]) =>
  items.reverse().reduce<List<T>>((sum, item) => sum.concat(of(item)), empty())

// export function map<A, B>(fn: (a: A) => B): (list: List<A>) => List<B> {
//   return list =>
//     let_<[A | Nil, List<A>], List<B>>((h, t) =>
//       isNil(h) ? Nil : [fn(h), map(fn)(t)],
//     )(head(list), tail(list))
// }

// export const filter = <A>(fn: (a: A) => unknown) => (list: List<A>): List<A> =>
//   let_<[A | Nil, List<A>], List<A>>((h, t) =>
//     isNil(h) ? Nil : fn(h) ? [h, filter(fn)(t)] : filter(fn)(t),
//   )(head(list), tail(list))

// export const filterMap = <A, B>(fn: (a: A) => M.Maybe<B>) => (
//   list: List<A>,
// ): List<B> =>
//   let2_(head(list), tail(list), (h, t) =>
//     isNil(h)
//       ? Nil
//       : fn(h).fold(
//           () => filterMap(fn)(t),
//           result => [result, filterMap(fn)(t)],
//         ),
//   )

// export const some = <A>(fn: (a: A) => unknown) => (list: List<A>): boolean =>
//   let_<[A | Nil, List<A>], boolean>((h, t) =>
//     isNil(h) ? false : fn(h) ? true : some(fn)(t),
//   )(head(list), tail(list))

// export const every = <A>(fn: (a: A) => unknown) => (list: List<A>): boolean =>
//   let_<[A | Nil, List<A>], boolean>((h, t) =>
//     isNil(h) ? true : !fn(h) ? false : every(fn)(t),
//   )(head(list), tail(list))

// export const reduce = <T, A>(fn: (acc: T, a: A) => T) => (acc: T) => (
//   list: List<A>,
// ): T =>
//   let_<[A | Nil, List<A>], T>((h, t) =>
//     isNil(h) ? acc : reduce(fn)(fn(acc, h))(t),
//   )(head(list), tail(list))

// export const toArray = <T>(list: List<T>): T[] =>
//   reduce<T[], T>((acc, item) => {
//     acc.push(item)
//     return acc
//   })([])(list)

// export const size = reduce((acc: number) => acc + 1)(0)

// export const conj = <A>(item: A) => (list: List<A>): List<A> =>
//   let_<[A | Nil, List<A>], List<A>>((h, t) =>
//     isNil(h) ? of(item) : cons(h)(conj(item)(t)),
//   )(head(list), tail(list))

// export const last = <A>(list: List<A>): A | Nil =>
//   let_<[A | Nil, List<A>], A | Nil>((h, t) =>
//     isNil(h) ? Nil : isNil(t) ? h : last(t),
//   )(head(list), tail(list))

// export const reverse = <A>(list: List<A>) =>
//   reduce<List<A>, A>((acc, item) => cons(item)(acc))(Nil)(list)

// export const removeLast = <A>(list: List<A>): List<A> =>
//   pipe(reverse, tail, reverse)(list)
