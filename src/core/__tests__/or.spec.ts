import { or, equals } from "../index"

describe("or", () => {
  test("creates a function which tells you either functions succeed", () => {
    const isFiveOrSize = or(equals(5), equals(6))

    expect(isFiveOrSize(5)).toBe(true)
    expect(isFiveOrSize(6)).toBe(true)
    expect(isFiveOrSize(7)).toBe(false)
  })
})
