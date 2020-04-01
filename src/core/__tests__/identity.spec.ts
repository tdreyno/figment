import { identity } from "../index"

describe("identity", () => {
  test("A function which always returns its first param", () => {
    expect(identity(5)).toBe(5)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect((identity as any)(5, -100)).toBe(5)
  })
})
