import { map } from "../index"

describe("map", () => {
  test("top level version of Array.prototype.map", () => {
    const data = [1, 2, 3]
    const fn = (a: number) => a * 2

    expect(map(fn)(data)).toEqual(data.map(fn))
  })
})
