import { last } from "../index"

describe("last", () => {
  test("gets the last item in an array", () => {
    expect(last([0, 1])).toBe(1)
  })

  test("gets the last item in an empty array", () => {
    expect(last([])).toBe(undefined)
  })
})
