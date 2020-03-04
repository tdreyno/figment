import { lessThan } from "../index"

describe("lessThan", () => {
  test("creates a function which tells you if it is < than to a value", () => {
    const isLessThanFive = lessThan(5)

    expect(isLessThanFive(-5)).toBe(true)
    expect(isLessThanFive(4)).toBe(true)
    expect(isLessThanFive(5)).toBe(false)
  })
})
