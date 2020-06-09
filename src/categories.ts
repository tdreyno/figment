/* eslint-disable @typescript-eslint/no-explicit-any */
// import { $ } from "hkts/src/index"

// export interface Setoid {
//   equals(other: Setoid): boolean
// }

// export interface Ord extends Setoid {
//   lte(other: Ord): boolean
// }

// export interface Semigroupoid {
//   compose(other: Semigroupoid): Semigroupoid
// }

// export interface Category extends Semigroupoid {
//   id(): Category
// }

// export interface Semigroup<T> {
//   concat(other: T): T
// }

// export interface Monoid<T> extends Semigroup<T> {
//   empty(): Semigroup<T>
// }

// export interface Group<T> extends Monoid<T> {
//   invert(): Group<T>
// }

// export interface Filterable<T> {
//   filter(fn: (a: T) => boolean): Filterable<T>
// }

// // export interface Functor<A> {
// //   map<B>(fn: (a: A) => B): Functor<B>
// // }

// export interface Functor<T> {
//   map: <A, B>(fn: (a: A) => B, t: $<T, [A]>) => $<T, [B]>
// }

// export interface Contravariant<A> {
//   contramap<B>(fn: (b: B) => A): Contravariant<B>
// }

// export interface Apply<A> extends Functor<A> {
//   ap<B extends (...args: any[]) => any>(fn: (a: Apply<A>) => Apply<B>): Apply<B>
// }

// export interface Applicative<A> extends Apply<A> {
//   of(a: A): Applicative<A>
// }

// export interface Alt<A> extends Functor<A> {
//   alt(a: Alt<A>): Alt<A>
// }

// export interface Plus<A> extends Alt<A> {
//   zero(): Plus<A>
// }

// export interface Alternative<A> extends Applicative<A>, Plus<A> {}

// export interface Foldable<A> {
//   reduce<T>(fn: (sum: T, item: A) => T, initial: T): T
// }

// export interface Traversable<A> extends Functor<A>, Foldable<A> {
//   traverse<B>(a: Applicative<A>, fn: () => B): B
// }

// export interface Chain<A> extends Apply<A> {
//   chain(fn: (v: A) => A): Chain<A>
// }

// export interface ChainRec<A> extends Chain<A> {
//   chainRec<T, B>(
//     fn: (next: (a: T) => B, done: (a: T) => B, value: T) => B,
//     initial: T,
//   ): Chain<B>
// }

// export interface Monad<A> extends Applicative<A>, Chain<A> {}

// export interface Extend<A> extends Functor<A> {
//   extend(fn: (a: A) => A): Extend<A>
// }

// export interface Comonad<A> extends Extend<A> {
//   extract(): A
// }

// export interface Bifunctor<A> extends Functor<A> {
//   bimap<B, C>(f: (a: A) => B, g: (a: A) => C): Bifunctor<A>
// }

// export interface Profunctor<A> extends Functor<A> {
//   promap<B, C>(f: (a: A) => B, g: (a: A) => C): Profunctor<A>
// }
