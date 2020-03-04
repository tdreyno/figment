import { lessThanEquals } from "../index"

describe("lessThanEquals", () => {
  test("creates a function which tells you if it is <= than to a value", () => {
    const isLessThanOrEqualFive = lessThanEquals(5)

    expect(isLessThanOrEqualFive(-5)).toBe(true)
    expect(isLessThanOrEqualFive(4)).toBe(true)
    expect(isLessThanOrEqualFive(5)).toBe(true)
  })
})
