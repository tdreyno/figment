import { identity, pipe } from "../core/index"
import {
  Right,
  Left,
  cata as cata_,
  fold as fold_,
  chain as chain_,
  map as map_,
  isLeft,
  isRight,
} from "./Either"
import { Result, fold as resultFold } from "./Result"

export type Just<T> = Right<T>
export type Nothing<T = unknown> = Left<null>
export type Maybe<T> = Nothing<T> | Just<T>

export const Just = <T>(value: T): Maybe<T> => Right(value)
export const Nothing = <T>(): Maybe<T> => Left(null)

// Monoid
export const empty = Nothing

// Applicative
export const of = Just

export const fromNullable = <T>(valueOrNull: T | null | undefined) =>
  valueOrNull ? Just<T>(valueOrNull) : Nothing<T>()

export const cata = <T, U>(handlers: { Nothing: () => U; Just: (v: T) => U }) =>
  cata_({
    Left: handlers.Nothing,
    Right: handlers.Just,
  }) as (maybe: Maybe<T>) => U

export const fold = <T, U>(nothingFn: () => U, justFn: (v: T) => U) =>
  fold_<null, T, U>(nothingFn, justFn) as (maybe: Maybe<T>) => U

export const fromResult = <A, B>(result: Result<A, B>) =>
  resultFold(Nothing, Just)(result) as Maybe<B>

// Chain
export const chain = <T, U>(fn: (a: T) => Maybe<U>) =>
  chain_(fn) as (maybe: Maybe<T>) => Maybe<U>

// Functor
export const map = <T, U>(fn: (a: T) => U) =>
  map_(fn) as (maybe: Maybe<T>) => Maybe<U>

// Error handling
export const orElse = <T>(fn: () => T) => pipe(fold<T, T>(fn, identity), Just)

export const isJust = <T>(maybe: Maybe<T>): maybe is Just<T> => isRight(maybe)

export const isNothing = <T>(maybe: Maybe<T>): maybe is Nothing<T> =>
  isLeft(maybe)
