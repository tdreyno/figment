import { greaterThanEquals } from "../index"

describe("greaterThanEquals", () => {
  test("creates a function which tells you if it is >= than to a value", () => {
    const isGreaterThanEqualsFive = greaterThanEquals(5)

    expect(isGreaterThanEqualsFive(4)).toBe(false)
    expect(isGreaterThanEqualsFive(5)).toBe(true)
    expect(isGreaterThanEqualsFive(6)).toBe(true)
  })
})
