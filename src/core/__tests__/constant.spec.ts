import { constant } from "../index"

describe("constant", () => {
  test("creates a function that always returns the same value", () => {
    const fiver = constant(5)

    expect(fiver()).toBe(5)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect((fiver as any)(-100)).toBe(5)
  })
})
