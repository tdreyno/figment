import { rest } from "../index"

describe("rest", () => {
  test("gets the rest item in an array", () => {
    expect(rest([0, 1, 2, 3])).toEqual([1, 2, 3])
  })
})
