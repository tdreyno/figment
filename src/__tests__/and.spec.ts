import { and, greaterThan, lessThan } from "../index"

describe("and", () => {
  test("creates a function which tells you either functions succeed", () => {
    const isBetween = and(greaterThan(5), lessThan(10))

    expect(isBetween(-5)).toBe(false)
    expect(isBetween(5)).toBe(false)
    expect(isBetween(6)).toBe(true)
    expect(isBetween(10)).toBe(false)
    expect(isBetween(11)).toBe(false)
  })
})
