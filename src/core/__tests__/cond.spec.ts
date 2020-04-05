import { cond, equals, lessThanEquals, constant } from "../index"

describe("cond", () => {
  test("creates a function which evaluates some conditions with a fallback", () => {
    const searchNumbers = cond(
      [lessThanEquals(5), constant("<=5")],
      [lessThanEquals(10), constant("6-10")],
      [equals(11), constant("11")],
      constant("unknown"),
    )

    expect(searchNumbers(0)).toBe("<=5")
    expect(searchNumbers(7)).toBe("6-10")
    expect(searchNumbers(11)).toBe("11")
    expect(searchNumbers(Infinity)).toBe("unknown")
  })
})
