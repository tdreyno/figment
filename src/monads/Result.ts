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
import { Maybe, fold as maybeFold } from "./Maybe"

export type Ok<B> = Right<B>
export type Err<A> = Left<A>
export type Result<A, B> = Err<A> | Ok<B>

export const Ok = <B, A = unknown>(value: B): Result<A, B> => Right(value)
export const Err = <A, B = unknown>(value: A): Result<A, B> => Left(value)

export const of = Ok

export const cata = <A, B, U>(handlers: {
  Err: (a: A) => U
  Ok: (v: B) => U
}) =>
  cata_({
    Left: handlers.Err,
    Right: handlers.Ok,
  }) as (result: Result<A, B>) => U

export const fold = <A, B, U>(errorFn: (a: A) => U, okFn: (b: B) => U) =>
  fold_(errorFn, okFn) as (result: Result<A, B>) => U

export const fromMaybe = <B>(maybe: Maybe<B>) =>
  maybeFold(() => Err(null), Ok)(maybe) as Result<null, B>

// Chain
export const chain = <A, B, U>(fn: (a: B) => Result<A, U>) =>
  chain_(fn) as (result: Result<A, B>) => Result<A, U>

// Functor
export const map = <A, B, U>(fn: (a: B) => U) =>
  map_(fn) as (result: Result<A, B>) => Result<A, U>

// Error handling
export const orElse = <A, B>(fn: (a: A) => B) =>
  pipe(fold<A, B, B>(fn, identity), (v: B) => Ok<B, A>(v))

export const isOk = <A, B>(result: Result<A, B>): result is Ok<B> =>
  isRight(result)

export const isError = <A, B>(result: Result<A, B>): result is Err<A> =>
  isLeft(result)
