import { isBetween as isBetween_ } from "../index"

describe("isBetween", () => {
  test("creates a function which tells a number is between", () => {
    const isBetween = isBetween_(5, 10)

    expect(isBetween(-5)).toBe(false)
    expect(isBetween(5)).toBe(false)
    expect(isBetween(6)).toBe(true)
    expect(isBetween(10)).toBe(false)
    expect(isBetween(11)).toBe(false)
  })

  test("creates a function which tells a number is between inclusive", () => {
    const isBetween = isBetween_(5, 10, true)

    expect(isBetween(-5)).toBe(false)
    expect(isBetween(5)).toBe(true)
    expect(isBetween(6)).toBe(true)
    expect(isBetween(10)).toBe(true)
    expect(isBetween(11)).toBe(false)
  })
})
