import { nth } from "../index"

describe("nth", () => {
  test("gets the nth item in an array", () => {
    expect(nth(1)([0, 1])).toBe(0)
  })

  test("gets the nth item in an empty array", () => {
    expect(nth(1)([])).toBe(undefined)
  })
})
