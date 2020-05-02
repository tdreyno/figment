import { identity, pipe } from "../core/index"

export interface Just<T> {
  readonly type: "Just"
  readonly value: T
}

export interface Nothing<T = unknown> {
  readonly type: "Nothing"
}

export type Maybe<T> = Just<T> | Nothing<T>

export const Just = <T>(value: T): Maybe<T> => ({ type: "Just", value })
export const Nothing = <T>(): Maybe<T> => ({ type: "Nothing" })

// Monoid
export const empty = Nothing

// Applicative
export const of = Just

export const fromNullable = <T>(valueOrNull: T | null | undefined) =>
  valueOrNull ? Just<T>(valueOrNull) : Nothing()

export const cata = <T, U>(handlers: {
  Nothing: () => U
  Just: (v: T) => U
}) => (maybe: Maybe<T>): U => {
  switch (maybe.type) {
    case "Just":
      return handlers.Just(maybe.value)

    case "Nothing":
      return handlers.Nothing()
  }
}

export const fold = <T, U>(justFn: (v: T) => U, nothingFn: () => U) =>
  cata({ Just: justFn, Nothing: nothingFn })

// Bimap
export const bimap = <T, U>(justFn: (v: T) => U, nothingFn: () => U) =>
  pipe(fold(justFn, nothingFn), Just)

// Chain
export const chain = <T, U>(fn: (a: T) => Maybe<U>) =>
  fold<T, Maybe<U>>(fn, Nothing)

// Functor
export const map = <T, U>(fn: (a: T) => U) => chain<T, U>(pipe(fn, Just))

// Error handling
export const orElse = <T>(fn: () => T) => bimap<T, T>(identity, fn)

export const isJust = <T>(maybe: Maybe<T>): maybe is Just<T> =>
  maybe.type === "Just"

export const isNothing = <T>(maybe: Maybe<T>): maybe is Nothing<T> =>
  maybe.type === "Nothing"
