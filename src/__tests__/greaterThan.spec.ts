import { greaterThan } from "../index"

describe("greaterThan", () => {
  test("creates a function which tells you if it is > than to a value", () => {
    const isGreaterThanFive = greaterThan(5)

    expect(isGreaterThanFive(4)).toBe(false)
    expect(isGreaterThanFive(5)).toBe(false)
    expect(isGreaterThanFive(6)).toBe(true)
  })
})
