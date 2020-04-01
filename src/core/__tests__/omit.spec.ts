import { omit } from "../index"

describe("omit", () => {
  test("creates a function which removes a single key from an object", () => {
    const removeName = omit<{ name: string; age: number }, "name">("name")

    expect(removeName({ name: "Test", age: 5 })).toEqual({ age: 5 })
  })
})
