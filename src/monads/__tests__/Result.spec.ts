import {
  Ok,
  Err,
  cata,
  fold,
  of,
  map,
  chain,
  orElse,
  isOk,
  isError,
} from "../Result"

describe("Result", () => {
  test("Ok", () => {
    const O = jest.fn()
    const E = jest.fn()

    fold(E, O)(Ok(5))

    expect(O).toBeCalledWith(5)
    expect(E).not.toHaveBeenCalled()
  })

  test("Err", () => {
    const O = jest.fn()
    const E = jest.fn()

    fold(E, O)(Err("whoops"))

    expect(O).not.toHaveBeenCalled()
    expect(E).toHaveBeenCalled()
  })

  test("of", () => expect(of(5)).toEqual(Ok(5)))

  test("cata(Ok)", () => {
    const O = jest.fn()
    const E = jest.fn()

    cata({ Ok: O, Err: E })(Ok(5))

    expect(O).toBeCalledWith(5)
    expect(E).not.toHaveBeenCalled()
  })

  test("cata(Err)", () => {
    const O = jest.fn()
    const E = jest.fn()

    cata({ Ok: O, Err: E })(Err("whoops"))

    expect(O).not.toHaveBeenCalled()
    expect(E).toHaveBeenCalled()
  })

  test("map(Ok)", () =>
    expect(map((v: number) => v * 2)(Ok(5))).toEqual(Ok(10)))
  test("map(Err)", () =>
    expect(map(jest.fn())(Err("whoops"))).toEqual(Err("whoops")))

  test("chain(Ok)", () =>
    expect(chain((v: number) => Ok(v * 2))(Ok(5))).toEqual(Ok(10)))
  test("chain(Err)", () =>
    expect(chain(jest.fn())(Err("whoops"))).toEqual(Err("whoops")))

  test("orElse", () => expect(orElse(() => 10)(Err("whoops"))).toEqual(Ok(10)))

  test("isOk(Ok)", () => expect(isOk(Ok(5))).toBe(true))
  test("isOk(Err)", () => expect(isOk(Err("whoops"))).toBe(false))

  test("isError(Ok)", () => expect(isError(Ok(5))).toBe(false))
  test("isError(Err)", () => expect(isError(Err("whoops"))).toBe(true))
})
