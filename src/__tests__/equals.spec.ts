import { equals } from "../index"

describe("equals", () => {
  test("creates a function which tells you if it is equal to a value", () => {
    const isFive = equals(5)

    expect(isFive(5)).toBe(true)
    expect(isFive(null)).toBe(false)
    expect(isFive(-5)).toBe(false)
  })
})
