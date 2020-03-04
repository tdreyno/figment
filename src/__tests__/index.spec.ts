import { index } from "../index"

describe("index", () => {
  test("gets the index item in an array", () => {
    expect(index(0)([0, 1])).toBe(0)
  })

  test("gets the index item in an empty array", () => {
    expect(index(0)([])).toBe(undefined)
  })
})
