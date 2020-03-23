import { pipe } from "../index"

describe("pipe", () => {
  test("creates a function that will run other functions in order and pipe the result through", () => {
    const maths = pipe(
      (a: number) => a + 5,
      (b: number) => b - 2,
      (c: number) => c / 4,
    )

    expect(maths(5)).toBe(2)
  })
})
