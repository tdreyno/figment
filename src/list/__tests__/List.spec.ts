import {
  head,
  tail,
  empty,
  of,
  fromArray,
  toArray,
  map,
  filter,
  some,
  every,
  size,
  reverse,
  cons,
  conj,
  reduce,
  last,
  removeLast,
  Nil,
} from "../List"

describe("List", () => {
  test("empty", () => {
    expect(head(empty())).toBe(Nil)
    expect(tail(empty())).toBe(Nil)
  })

  test("of", () => {
    const hasFive = of(5)
    expect(head(hasFive)).toBe(5)
    expect(tail(hasFive)).toBe(Nil)
  })

  test("fromArray", () => {
    const list = fromArray([1, 2, 3])
    expect(toArray(list)).toEqual([1, 2, 3])
  })

  test("map", () => {
    const list = fromArray([1, 2, 3])
    const mappedList = map((a: number) => a + 1)(list)
    expect(toArray(mappedList)).toEqual([2, 3, 4])
  })

  test("filter", () => {
    const list = fromArray([1, 2, 3, 4])
    const mappedList = filter((a: number) => a % 2 === 0)(list)
    expect(toArray(mappedList)).toEqual([2, 4])
  })

  test("some", () => {
    const list = fromArray([1, 2, 3, 4])

    const someListA = some((a: number) => a > 3)(list)
    expect(someListA).toBe(true)

    const someListB = some((a: number) => a < 0)(list)
    expect(someListB).toBe(false)
  })

  test("every", () => {
    const list = fromArray([1, 2, 3, 4])

    const someListA = every((a: number) => a > 0)(list)
    expect(someListA).toBe(true)

    const someListB = every((a: number) => a > 3)(list)
    expect(someListB).toBe(false)
  })

  test("size", () => {
    const list = fromArray([1, 2, 3, 4])
    expect(size(list)).toBe(4)
  })

  test("reduce", () => {
    const list = fromArray([1, 2, 3])
    const sum = reduce((acc: number, a: number) => acc + a)(0)(list)
    expect(sum).toBe(6)
  })

  test("cons", () => {
    const list = fromArray([1, 2])
    expect(toArray(cons(0)(list))).toEqual([0, 1, 2])
  })

  test("conj", () => {
    const list = fromArray([1, 2])
    expect(toArray(conj(3)(list))).toEqual([1, 2, 3])
  })

  test("last", () => {
    const list = fromArray([1, 2, 3])
    expect(last(list)).toBe(3)
  })

  test("removeLast", () => {
    const list = fromArray([1, 2, 3])
    expect(toArray(removeLast(list))).toEqual([1, 2])
  })

  test("reverse", () => {
    const list = fromArray([1, 2, 3, 4])
    expect(toArray(reverse(list))).toEqual([4, 3, 2, 1])
  })
})
