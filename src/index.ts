export * from "./core/index"
export * from "./memo/index"
export * from "./monads/index"
export * from "./list/index"

// interface Setoid {
//   equals(other: Setoid): boolean
// }

// interface Ord extends Setoid {
//   lte(other: Ord): boolean
// }

// interface Semigroupoid {
//   compose(other: Semigroupoid): Semigroupoid
// }

// interface Category extends Semigroupoid {
//   id(): Category
// }

// interface Semigroup {
//   concat(other: Semigroup): Semigroup
// }

// interface Monoid extends Semigroup {
//   empty(): Monoid
// }

// interface Group extends Monoid {
//   invert(): Group
// }

// interface Filterable<T> {
//   filter(fn: (a: T) => boolean): Filterable<T>
// }

// interface Functor<A> {
//   map<B>(fn: (a: A) => B): Functor<B>
// }

// interface Contravariant<A> {
//   contramap<B>(fn: (b: B) => A): Contravariant<B>
// }

// interface Apply<A> extends Functor<A> {
//   ap<B extends (...args: any[]) => any>(fn: (a: Apply<A>) => Apply<B>): Apply<B>
// }

// interface Applicative<A> extends Apply<A> {
//   of(a: A): Applicative<A>
// }

// interface Alt<A> extends Functor<A> {
//   alt(a: Alt<A>): Alt<A>
// }

// interface Plus<A> extends Alt<A> {
//   zero(): Plus<A>
// }

// interface Alternative<A> extends Applicative<A>, Plus<A> {}

// interface Foldable<A> {
//   reduce<T>(fn: (sum: T, item: A) => T, initial: T): T
// }

// interface Traversable<A> extends Functor<A>, Foldable<A> {
//   traverse<B>(a: Applicative<A>, fn: () => B): B
// }

// interface Chain<A> extends Apply<A> {
//   chain(fn: (v: A) => A): Chain<A>
// }

// interface ChainRec<A> extends Chain<A> {
//   chainRec<T, B>(
//     fn: (next: (a: T) => B, done: (a: T) => B, value: T) => B,
//     initial: T,
//   ): Chain<B>
// }

// interface Monad<A> extends Applicative<A>, Chain<A> {}

// interface Extend<A> extends Functor<A> {
//   extend(fn: (a: A) => A): Extend<A>
// }

// interface Comonad<A> extends Extend<A> {
//   extract(): A
// }

// interface Bifunctor<A> extends Functor<A> {
//   bimap<B, C>(f: (a: A) => B, g: (a: A) => C): Bifunctor<A>
// }

// interface Profunctor<A> extends Functor<A> {
//   promap<B, C>(f: (a: A) => B, g: (a: A) => C): Profunctor<A>
// }

// class Num
//   implements Ord, Chain<Num>, Semigroupoid, Category, Semigroup, Monoid, Group {
//   static of = (v: number) => new Num(v)

//   constructor(public value: number) {}

//   // Setoid
//   equals = (other: Num) => this.value === other.value

//   // Ord
//   lte = (other: Num) => this.value <= other.value

//   // Semigroupoid
//   compose = (other: Num) => Num.of(this.value + other.value)

//   // Category
//   id = () => Num.of(0)

//   // Semigroup
//   concat = (other: Num) => Num.of(this.value + other.value)

//   // Monoid
//   empty = () => Num.of(0)

//   // Group
//   invert = () => Num.of(-this.value)

//   chain = (fn: (v: number) => Num) => fn(this.value)
// }

// class List<T> implements Filterable<T>, Functor<T> {
//   static of = <T>(value: T[]) => new List(value)

//   constructor(public value: T[]) {}

//   // Filterable
//   filter = (pred: (a: T) => boolean): List<T> =>
//     List.of(this.value.filter(pred))

//   // Functor
//   map = <B>(fn: (a: T) => B): List<B> => List.of(this.value.map(fn))
// }

// class Fn<A, T> implements Contravariant<A> {
//   static of = <A, T>(value: (a: A) => T) => new Fn<A, T>(value)

//   constructor(public value: (a: A) => T) {}

//   // Contravariant
//   contramap = <B>(fn: (b: B) => A) => Fn.of<B, T>((b: B) => this.run(fn(b)))

//   run = (arg: A) => this.value(arg)
// }

// Fn.of((name: string) => name)
//   .contramap((obj: { name: string }) => obj.name)
//   .run({ name: "test" })

// // Setoid
// export const equals = (a: Setoid, b: Setoid) => a.equals(b)

// // Ord
// export const lte = (a: Ord, b: Ord) => a.lte(b)
// export const gt = (a: Ord, b: Ord) => !lte(a, b)
// export const gte = (a: Ord, b: Ord) => gt(a, b) || a.equals(b)
// export const lt = (a: Ord, b: Ord) => !gte(a, b)

// // Semigroupoid
// export const compose = <A extends Semigroupoid>(a: A, b: A): A =>
//   a.compose(b) as A

// // Category
// export const id = <A extends Category>(a: A): A => a.id() as A

// // Semigroup
// export const concat = <A extends Semigroup>(a: A, b: A): A => a.concat(b) as A

// // Monoid
// export const empty = <A extends Monoid>(a: A): A => a.empty() as A

// // Group
// export const invert = <A extends Group>(a: A): A => a.invert() as A

// // Filterable
// export const filter = <
//   A extends Filterable<T>,
//   T = A extends Filterable<infer T> ? T : never
// >(
//   pred: (a: T) => boolean,
//   a: A,
// ) => a.filter(pred) as A

// // Functor
// export const map = <
//   A extends Functor<T>,
//   B,
//   T = A extends Functor<infer T> ? T : never
// >(
//   fn: (a: T) => B,
//   a: A,
// ) => a.map(fn)

// // Contravariant
// export const contramap = <
//   A extends Contravariant<T>,
//   B,
//   T = A extends Contravariant<infer T> ? T : never
// >(
//   fn: (a: B) => T,
//   a: A,
// ) => a.contramap(fn)

// const eleven = concat(Num.of(5), Num.of(6))
// eleven.id()

// const nums = List.of([1, 2, 3])
// const result = filter(a => a < 2, nums)
// const result2 = map(a => a + 1, nums)

// const result = contramap(
//   (obj: { name: string }) => obj.name,
//   Fn.of((name: string) => name),
// )

// interface Setoid {
//   equals(other: Setoid): boolean
// }

// interface Ord extends Setoid {
//   lte(other: Ord): boolean
// }

// interface Semigroupoid {
//   compose(other: Semigroupoid): Semigroupoid
// }

// interface Category extends Semigroupoid {
//   id(): Category
// }

// interface Semigroup {
//   concat(other: Semigroup): Semigroup
// }

// interface Monoid extends Semigroup {
//   empty(): Monoid
// }

// interface Group extends Monoid {
//   invert(): Group
// }

// interface Filterable<T> {
//   filter(fn: (a: T) => boolean): Filterable<T>
// }

// interface Functor<A> {
//   map<B>(fn: (a: A) => B): Functor<B>
// }

// interface Contravariant<A> {
//   contramap<B>(fn: (b: B) => A): Contravariant<B>
// }

// interface Apply<A> extends Functor<A> {
//   ap<B extends (...args: any[]) => any>(fn: (a: Apply<A>) => Apply<B>): Apply<B>
// }

// interface Applicative<A> extends Apply<A> {
//   of(a: A): Applicative<A>
// }

// interface Alt<A> extends Functor<A> {
//   alt(a: Alt<A>): Alt<A>
// }

// interface Plus<A> extends Alt<A> {
//   zero(): Plus<A>
// }

// interface Alternative<A> extends Applicative<A>, Plus<A> {}

// interface Foldable<A> {
//   reduce<T>(fn: (sum: T, item: A) => T, initial: T): T
// }

// interface Traversable<A> extends Functor<A>, Foldable<A> {
//   traverse<B>(a: Applicative<A>, fn: () => B): B
// }

// interface Chain<A> extends Apply<A> {
//   chain(fn: (v: A) => A): Chain<A>
// }

// interface ChainRec<A> extends Chain<A> {
//   chainRec<T, B>(
//     fn: (next: (a: T) => B, done: (a: T) => B, value: T) => B,
//     initial: T,
//   ): Chain<B>
// }

// interface Monad<A> extends Applicative<A>, Chain<A> {}

// interface Extend<A> extends Functor<A> {
//   extend(fn: (a: A) => A): Extend<A>
// }

// interface Comonad<A> extends Extend<A> {
//   extract(): A
// }

// interface Bifunctor<A> extends Functor<A> {
//   bimap<B, C>(f: (a: A) => B, g: (a: A) => C): Bifunctor<A>
// }

// interface Profunctor<A> extends Functor<A> {
//   promap<B, C>(f: (a: A) => B, g: (a: A) => C): Profunctor<A>
// }

// class Num
//   implements Ord, Chain<Num>, Semigroupoid, Category, Semigroup, Monoid, Group {
//   static of = (v: number) => new Num(v)

//   constructor(public value: number) {}

//   // Setoid
//   equals = (other: Num) => this.value === other.value

//   // Ord
//   lte = (other: Num) => this.value <= other.value

//   // Semigroupoid
//   compose = (other: Num) => Num.of(this.value + other.value)

//   // Category
//   id = () => Num.of(0)

//   // Semigroup
//   concat = (other: Num) => Num.of(this.value + other.value)

//   // Monoid
//   empty = () => Num.of(0)

//   // Group
//   invert = () => Num.of(-this.value)

//   chain = (fn: (v: number) => Num) => fn(this.value)
// }

// class List<T> implements Filterable<T>, Functor<T> {
//   static of = <T>(value: T[]) => new List(value)

//   constructor(public value: T[]) {}

//   // Filterable
//   filter = (pred: (a: T) => boolean): List<T> =>
//     List.of(this.value.filter(pred))

//   // Functor
//   map = <B>(fn: (a: T) => B): List<B> => List.of(this.value.map(fn))
// }

// class Fn<A, T> implements Contravariant<A> {
//   static of = <A, T>(value: (a: A) => T) => new Fn<A, T>(value)

//   constructor(public value: (a: A) => T) {}

//   // Contravariant
//   contramap = <B>(fn: (b: B) => A) => Fn.of<B, T>((b: B) => this.run(fn(b)))

//   run = (arg: A) => this.value(arg)
// }

// Fn.of((name: string) => name)
//   .contramap((obj: { name: string }) => obj.name)
//   .run({ name: "test" })

// // Setoid
// export const equals = (a: Setoid, b: Setoid) => a.equals(b)

// // Ord
// export const lte = (a: Ord, b: Ord) => a.lte(b)
// export const gt = (a: Ord, b: Ord) => !lte(a, b)
// export const gte = (a: Ord, b: Ord) => gt(a, b) || a.equals(b)
// export const lt = (a: Ord, b: Ord) => !gte(a, b)

// // Semigroupoid
// export const compose = <A extends Semigroupoid>(a: A, b: A): A =>
//   a.compose(b) as A

// // Category
// export const id = <A extends Category>(a: A): A => a.id() as A

// // Semigroup
// export const concat = <A extends Semigroup>(a: A, b: A): A => a.concat(b) as A

// // Monoid
// export const empty = <A extends Monoid>(a: A): A => a.empty() as A

// // Group
// export const invert = <A extends Group>(a: A): A => a.invert() as A

// // Filterable
// export const filter = <
//   A extends Filterable<T>,
//   T = A extends Filterable<infer T> ? T : never
// >(
//   pred: (a: T) => boolean,
//   a: A,
// ) => a.filter(pred) as A

// // Functor
// export const map = <
//   A extends Functor<T>,
//   B,
//   T = A extends Functor<infer T> ? T : never
// >(
//   fn: (a: T) => B,
//   a: A,
// ) => a.map(fn)

// // Contravariant
// export const contramap = <
//   A extends Contravariant<T>,
//   B,
//   T = A extends Contravariant<infer T> ? T : never
// >(
//   fn: (a: B) => T,
//   a: A,
// ) => a.contramap(fn)

// const eleven = concat(Num.of(5), Num.of(6))
// eleven.id()

// const nums = List.of([1, 2, 3])
// const result = filter(a => a < 2, nums)
// const result2 = map(a => a + 1, nums)

// const result = contramap(
//   (obj: { name: string }) => obj.name,
//   Fn.of((name: string) => name),
// )
