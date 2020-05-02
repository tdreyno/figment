import {
  Just,
  Nothing,
  cata,
  fold,
  empty,
  of,
  fromNullable,
  map,
  chain,
  orElse,
  isJust,
  isNothing,
} from "../Maybe"

describe("Maybe", () => {
  test("Just", () => {
    const J = jest.fn()
    const N = jest.fn()

    fold(N, J)(Just(5))

    expect(J).toBeCalledWith(5)
    expect(N).not.toHaveBeenCalled()
  })

  test("Nothing", () => {
    const J = jest.fn()
    const N = jest.fn()

    fold(N, J)(Nothing())

    expect(J).not.toHaveBeenCalled()
    expect(N).toHaveBeenCalled()
  })

  test("empty", () => expect(empty()).toEqual(Nothing()))
  test("of", () => expect(of(5)).toEqual(Just(5)))

  test("fromNullable(null)", () =>
    expect(fromNullable(null)).toEqual(Nothing()))
  test("fromNullable(5)", () => expect(fromNullable(5)).toEqual(Just(5)))

  test("cata(Just)", () => {
    const J = jest.fn()
    const N = jest.fn()

    cata({ Just: J, Nothing: N })(Just(5))

    expect(J).toBeCalledWith(5)
    expect(N).not.toHaveBeenCalled()
  })

  test("cata(Nothing)", () => {
    const J = jest.fn()
    const N = jest.fn()

    cata({ Just: J, Nothing: N })(Nothing())

    expect(J).not.toHaveBeenCalled()
    expect(N).toHaveBeenCalled()
  })

  test("map(Just)", () =>
    expect(map((v: number) => v * 2)(Just(5))).toEqual(Just(10)))
  test("map(Nothing)", () =>
    expect(map(jest.fn())(Nothing())).toEqual(Nothing()))

  test("chain(Just)", () =>
    expect(chain((v: number) => Just(v * 2))(Just(5))).toEqual(Just(10)))
  test("chain(Nothing)", () =>
    expect(chain(jest.fn())(Nothing())).toEqual(Nothing()))

  test("orElse", () => expect(orElse(() => 10)(Nothing())).toEqual(Just(10)))

  test("isJust(Just)", () => expect(isJust(Just(5))).toBe(true))
  test("isJust(Nothing)", () => expect(isJust(Nothing())).toBe(false))

  test("isNothing(Just)", () => expect(isNothing(Just(5))).toBe(false))
  test("isNothing(Nothing)", () => expect(isNothing(Nothing())).toBe(true))
})
