import { pipe } from "../core/index"

export interface Left<A> {
  readonly type: "Left"
  readonly value: A
}

export interface Right<B> {
  readonly type: "Right"
  readonly value: B
}

export type Either<A, B> = Left<A> | Right<B>

export const Left = <A, B = unknown>(value: A): Either<A, B> => ({
  type: "Left",
  value,
})

export const Right = <B, A = unknown>(value: B): Either<A, B> => ({
  type: "Right",
  value,
})

export const cata = <A, B, R>(handlers: {
  Left: (v: A) => R
  Right: (v: B) => R
}) => (either: Either<A, B>): R => {
  switch (either.type) {
    case "Left":
      return handlers.Left(either.value)

    case "Right":
      return handlers.Right(either.value)
  }
}

export const fold = <A, B, U>(LeftFn: (v: A) => U, RightFn: (v: B) => U) =>
  cata({ Left: LeftFn, Right: RightFn })

// Bimap
export const bimap = <A, B, C, D>(LeftFn: (v: A) => B, RightFn: (v: C) => D) =>
  fold<A, C, Either<B, D>>(
    pipe<A, B, Either<B, D>>(LeftFn, Left),
    pipe<C, D, Either<B, D>>(RightFn, Right),
  )

// Chain
export const chain = <A, B, B2>(fn: (a: B) => Either<A, B2>) =>
  fold<A, B, Either<A, B2>>(Left, fn)

// Functor
export const map = <A, B, B2>(fn: (a: B) => B2) =>
  chain<A, B, B2>(pipe<B, B2, Either<A, B2>>(fn, Right))

export const isLeft = <A, B>(either: Either<A, B>): either is Left<A> =>
  either.type === "Left"

export const isRight = <A, B>(either: Either<A, B>): either is Right<B> =>
  either.type === "Right"
