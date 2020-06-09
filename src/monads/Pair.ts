/* eslint-disable @typescript-eslint/no-explicit-any */
import { let_ } from "../core"
// import { Monoid, Semigroup, Functor } from "../categories"
import { _, _0, _1 } from "hkts/src/index"
import { Bifunctor } from "hkts/src/static-land"

export type Pair<A, B> = [A, B]
export const Pair = <A, B>(a: A, b: B): Pair<A, B> => [a, b]

const PairFunctor = Bifunctor<Pair<_0, _1>>({
  bimap: (f, g, [a, b]) => Pair(f(a), g(b)),

  // first: ([a]) => a,
  // second: t => t._snd,
  // map: (fn, t) => Pair(t._fst, fn(t._snd)),
})
PairFunctor.bimap

const a = PairFunctor.first(Pair(1, 2)).map(a => a + 1)
type t = typeof a

// export interface Pair<A, B> extends Functor<Pair<A, _>> {
//   type: "pair"
//   _fst: A
//   _snd: B
// }

// export const Pair = <A, B>(_fst: A, _snd: B): Pair<A, B> => ({
//   type: "pair",
//   _fst,
//   _snd,

//   // map: <C>(fn: (a: B) => C) => Pair(_fst, fn(_snd)),

//   map: (fn, t) => Pair(t._fst, fn(t._snd)),
// })

export const MPair = <
  M extends Monoid<any>,
  A = M extends Monoid<infer A> ? A : never
>(
  a: M,
) => ({
  of: <B>(b: B): Pair<Semigroup<A>, B> => Pair(a.empty(), b),
})

// Chain
export const chain = <A, B>(fn: (a: B) => A) => ([a, b]: Pair<
  Semigroup<A>,
  B
>) => let_(b2 => Pair(a.concat(b2), b2))(fn(b))
