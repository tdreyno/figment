import { not } from "../index"

describe("not", () => {
  test("takes a function and reverses the output boolean", () => {
    expect(not(() => true)()).toBe(false)
  })

  test("works on truthy values", () => {
    expect(not(() => null)()).toBe(true)
  })
})
