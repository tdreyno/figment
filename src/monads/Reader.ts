import { pipe } from "../core/index"

export interface Reader<A, B> {
  (a: A): B
}

export const map = <A, B, C>(bToC: (b: B) => C) => (
  reader: Reader<A, B>,
): Reader<A, C> => pipe(reader, bToC)

export const contramap = <A, B, C>(cToA: (c: C) => A) => (
  reader: Reader<A, B>,
): Reader<C, B> => pipe(cToA, reader)

export const chain = <A, B, C>(bToReaderAC: (b: B) => Reader<A, C>) => (
  reader: Reader<A, B>,
): Reader<A, C> => (a: A) => bToReaderAC(reader(a))(a)
