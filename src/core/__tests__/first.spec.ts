import { first } from "../index"

describe("first", () => {
  test("gets the first item in an array", () => {
    expect(first([0, 1])).toBe(0)
  })

  test("gets the first item in an empty array", () => {
    expect(first([])).toBe(undefined)
  })
})
