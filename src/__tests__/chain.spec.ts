import { chain } from "../index"

describe("chain", () => {
  test("Given any object, run it through a function", () => {
    const data = 3
    const fn = (a: number) => a * 2

    expect(chain(fn)(data)).toBe(6)
  })
})
