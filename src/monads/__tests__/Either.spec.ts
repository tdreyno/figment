import {
  Right,
  Left,
  cata,
  fold,
  bimap,
  map,
  chain,
  isRight,
  isLeft,
} from "../Either"

describe("Either", () => {
  test("Right", () => {
    const L = jest.fn()
    const R = jest.fn()

    fold(L, R)(Right(5))

    expect(R).toBeCalledWith(5)
    expect(L).not.toHaveBeenCalled()
  })

  test("Left", () => {
    const L = jest.fn()
    const R = jest.fn()

    fold(L, R)(Left(5))

    expect(R).not.toHaveBeenCalled()
    expect(L).toHaveBeenCalledWith(5)
  })

  test("cata(Right)", () => {
    const L = jest.fn()
    const R = jest.fn()

    cata({ Left: L, Right: R })(Right(5))

    expect(R).toBeCalledWith(5)
    expect(L).not.toHaveBeenCalled()
  })

  test("cata(Left)", () => {
    const L = jest.fn()
    const R = jest.fn()

    cata({ Left: L, Right: R })(Left(5))

    expect(R).not.toHaveBeenCalled()
    expect(L).toHaveBeenCalledWith(5)
  })

  test("bimap(Right)", () => {
    const L = jest.fn()

    expect(bimap(L, (v: number) => v * 2)(Right(5))).toEqual(Right(10))

    expect(L).not.toHaveBeenCalled()
  })

  test("bimap(Left)", () => {
    const R = jest.fn()

    expect(bimap(() => 10, R)(Left(5))).toEqual(Left(10))

    expect(R).not.toHaveBeenCalled()
  })

  test("map(Right)", () =>
    expect(map((v: number) => v * 2)(Right(5))).toEqual(Right(10)))
  test("map(Left)", () => expect(map(jest.fn())(Left(5))).toEqual(Left(5)))

  test("chain(Right)", () =>
    expect(chain((v: number) => Right(v * 2))(Right(5))).toEqual(Right(10)))
  test("chain(Left)", () => expect(chain(jest.fn())(Left(5))).toEqual(Left(5)))

  test("isRight(Right)", () => expect(isRight(Right(5))).toBe(true))
  test("isRight(Left)", () => expect(isRight(Left(5))).toBe(false))

  test("isLeft(Right)", () => expect(isLeft(Right(5))).toBe(false))
  test("isLeft(Left)", () => expect(isLeft(Left(5))).toBe(true))
})
