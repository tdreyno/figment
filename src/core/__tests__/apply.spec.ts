import { apply } from "../index"

describe("apply", () => {
  test("Creates a function that will apply a tuples as args to a function", () => {
    const adder = apply((a: number, b: string) => a + b)
    expect(adder([5, "5"])).toBe("55")
  })
})
