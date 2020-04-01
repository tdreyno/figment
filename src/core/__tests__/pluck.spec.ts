import { pluck } from "../index"

describe("pluck", () => {
  test("creates a function which pulls a single key from an object", () => {
    const getName = pluck<{ name: string; age: number }, "name">("name")

    expect(getName({ name: "Test", age: 5 })).toBe("Test")
  })
})
