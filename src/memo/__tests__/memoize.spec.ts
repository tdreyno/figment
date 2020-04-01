/* eslint-disable @typescript-eslint/no-explicit-any */
import { memoize } from "../index"

function makeMemoized(useEqualityForMutableObjects = false) {
  const callback = jest.fn()

  const fn = memoize((...args: any[]): string => {
    callback(...args)

    return `Value: Args Length = ${args.length}`
  }, useEqualityForMutableObjects)

  return {
    callback,
    fn,
  }
}

describe("memoize", () => {
  it("should memoize primitives", () => {
    const { callback, fn } = makeMemoized()

    // First run
    fn(1, "two", true)
    fn(1, "two", true)

    // Second run
    fn("two", 1, true)
    fn("two", 1, true)

    expect(callback).toHaveBeenCalledTimes(2)
  })

  it("should memoize objects", () => {
    const { callback, fn } = makeMemoized()

    const o1: any = { one: 1 }
    const o2: any = { two: 2 }
    const o3: any = { three: 3 }

    // First run
    fn(o1, o2, o3)
    fn(o1, o2, o3)

    o1.one = 11

    // Second run
    fn(o1, o2, o3)
    fn(o1, o2, o3)

    o2.twoMore = 22

    // Third run
    fn(o1, o2, o3)
    fn(o1, o2, o3)

    delete o3.three

    // Fourth run
    fn(o1, o2, o3)
    fn(o1, o2, o3)

    expect(callback).toHaveBeenCalledTimes(4)
  })

  it("should memoize objects by equality rather than contents", () => {
    const { callback, fn } = makeMemoized(true)

    const o1: any = { one: 1 }
    const o2: any = { two: 2 }
    const o3: any = { three: 3 }

    // First run
    fn(o1, o2, o3)
    fn(o1, o2, o3)

    o1.one = 11

    // Second run
    fn(o1, o2, o3)
    fn(o1, o2, o3)

    o2.twoMore = 22

    // Third run
    fn(o1, o2, o3)
    fn(o1, o2, o3)

    delete o3.three

    // Fourth run
    fn(o1, o2, o3)
    fn(o1, o2, o3)

    expect(callback).toHaveBeenCalledTimes(1)
  })

  it("should memoize arrays", () => {
    const { callback, fn } = makeMemoized()

    const a1 = [1]
    const a2 = [2]
    const a3 = [3]

    // First run
    fn(a1, a2, a3)
    fn(a1, a2, a3)

    a1.push(11)

    // Second run
    fn(a1, a2, a3)
    fn(a1, a2, a3)

    a2.push(22)

    // Third run
    fn(a1, a2, a3)
    fn(a1, a2, a3)

    a3.splice(0, 1)

    // Fourth run
    fn(a1, a2, a3)
    fn(a1, a2, a3)

    expect(callback).toHaveBeenCalledTimes(4)
  })

  it("should memoize arrays by equality rather than contents", () => {
    const { callback, fn } = makeMemoized(true)

    const a1 = [1]
    const a2 = [2]
    const a3 = [3]

    // First run
    fn(a1, a2, a3)
    fn(a1, a2, a3)

    a1.push(11)

    // Second run
    fn(a1, a2, a3)
    fn(a1, a2, a3)

    a2.push(22)

    // Third run
    fn(a1, a2, a3)
    fn(a1, a2, a3)

    a3.splice(0, 1)

    // Fourth run
    fn(a1, a2, a3)
    fn(a1, a2, a3)

    expect(callback).toHaveBeenCalledTimes(1)
  })

  it("should memoize zero arguments functions", () => {
    const { callback, fn } = makeMemoized()

    fn()
    fn()

    expect(callback).toHaveBeenCalledTimes(1)
  })

  it("should memoize variadic functions", () => {
    const { callback, fn } = makeMemoized()

    const o1: any = { one: 1 }
    const o2: any = { two: 2 }
    const o3: any = { three: 3 }

    expect(fn(o1, o2, o3)).toEqual("Value: Args Length = 3")
    expect(fn(o1, o2, o3)).toEqual("Value: Args Length = 3")

    expect(fn(o1, o2)).toEqual("Value: Args Length = 2")
    expect(fn(o1, o2)).toEqual("Value: Args Length = 2")

    expect(fn(o1)).toEqual("Value: Args Length = 1")
    expect(fn(o1)).toEqual("Value: Args Length = 1")

    expect(callback).toHaveBeenCalledTimes(3)
  })

  it("should memoize ES6 Maps", () => {
    const { callback, fn } = makeMemoized()

    const o1 = new Map([["one", 1]])
    const o2 = new Map([["two", 2]])
    const o3 = new Map([["three", 3]])

    // First run
    fn(o1, o2, o3)
    fn(o1, o2, o3)

    o1.set("one", 11)

    // Second run
    fn(o1, o2, o3)
    fn(o1, o2, o3)

    o2.set("twoMore", 22)

    // Third run
    fn(o1, o2, o3)
    fn(o1, o2, o3)

    o3.delete("three")

    // Fourth run
    fn(o1, o2, o3)
    fn(o1, o2, o3)

    expect(callback).toHaveBeenCalledTimes(4)
  })

  it("should memoize ES6 Sets", () => {
    const { callback, fn } = makeMemoized()

    const s1 = new Set([1])
    const s2 = new Set([2])
    const s3 = new Set([3])

    // First run
    fn(s1, s2, s3)
    fn(s1, s2, s3)

    s1.add(11)

    // Second run
    fn(s1, s2, s3)
    fn(s1, s2, s3)

    s2.add(22)

    // Third run
    fn(s1, s2, s3)
    fn(s1, s2, s3)

    s3.delete(3)

    // Fourth run
    fn(s1, s2, s3)
    fn(s1, s2, s3)

    expect(callback).toHaveBeenCalledTimes(4)
  })
})
