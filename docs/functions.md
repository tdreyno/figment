# Figment Functions

These are the available library functions.

## identity

A function that takes a single parameter and returns it. Essentially a no-op for mapping.

{% tabs %}
{% tab title="Usage" %}

```typescript
map(identity, [1, 2, 3])
```

{% endtab %}

{% tab title="Type Definition" %}

```typescript
type or = <Args extends any[]>(
  ...options: Array<(...args: Args) => unknown>
) => (...args: Args): boolean
```

{% endtab %}
{% endtabs %}

## or

Given several methods which can return a boolean, create a new predicate which logically "ors" them together.

{% tabs %}
{% tab title="Usage" %}

```typescript
const isNotATeen = or(lessThan(13), greaterThan(19))
isNotATeen(13)
```

{% endtab %}

{% tab title="Type Definition" %}

```typescript
type or = <Args extends any[]>(
  ...options: Array<(...args: Args) => unknown>
) => (...args: Args): boolean
```

{% endtab %}
{% endtabs %}

## and

Given several methods which can return a boolean, create a new predicate which logically "ands" them together.

{% tabs %}
{% tab title="Usage" %}

```typescript
const isBetweenFiveAndTen = and(greaterThan(5), lessThan(10))
isBetweenFiveAndTen(7)
```

{% endtab %}

{% tab title="Type Definition" %}

```typescript
type and = <Args extends any[]>(
  ...options: Array<(...args: Args) => unknown>
) => (...args: Args): boolean
```

{% endtab %}
{% endtabs %}

## apply

Given a function that takes multiple parameters, create a new function which takes those parameters as a single tuple instead.

{% tabs %}
{% tab title="Usage" %}

```typescript
const adder = (a: number, b: string) => a + b
const tupleAdder = apply(adder)
adder(5, 10)
tupleAdder([5, 10])
```

{% endtab %}

{% tab title="Type Definition" %}

```typescript
type apply = <T, Args extends any[]>(fn: (...args: Args[]) => T): (args: Args) => T
```

{% endtab %}
{% endtabs %}

## map

Exactly like `Array.prototype.map`, but functional instead of on the Array prototype.

{% tabs %}
{% tab title="Usage" %}

```typescript
const adder = map(a => a + 1)
adder([1, 2, 3])
```

{% endtab %}

{% tab title="Type Definition" %}

```typescript
type map = <T, U>(fn: (a: T) => U) => (data: T[]): U[]
```

{% endtab %}
{% endtabs %}

## chain

Given a value and a function, run the function on the value. This is like `map`, but for working on any data type. Useful in `pipe`d series of computations.

{% tabs %}
{% tab title="Usage" %}

```typescript
const adder = chain(a => a + 1)
adder(data)
```

{% endtab %}

{% tab title="Type Definition" %}

```typescript
type chain = <T, U>(fn: (a: T) => U) => (data: T): U
```

{% endtab %}
{% endtabs %}

## constant

Given a value, return a function that will return that value every time it is called.

{% tabs %}
{% tab title="Usage" %}

```typescript
const alwaysTrue = constant(true)
alwaysTrue()
```

{% endtab %}

{% tab title="Type Definition" %}

```typescript
type constant = <T>(value: T) => () => T
```

{% endtab %}
{% endtabs %}

## cond

Basically a functional switch statement. Run several predicates to find the correct code path, then transform the data as requested.

{% tabs %}
{% tab title="Usage" %}

```typescript
const detectRange = cond(
  [lessThan(0), () => "Negative"],
  [lessThan(100), () => "Less than 100"],
  () => "Greater than 100",
)

detectRange(101)
```

{% endtab %}

{% tab title="Type Definition" %}

```typescript
type cond = <T, U>(conditions: Condition<T, U>[]): (data: T) => U | undefined
```

{% endtab %}
{% endtabs %}

## equals

Given a value, create a new function which will take a second value and compare their equality. Uses Javascript's `===` operator.

{% tabs %}
{% tab title="Usage" %}

```typescript
const equalsFive = equals(5)
equalsFive(5)
equalsFive(10)
```

{% endtab %}

{% tab title="Type Definition" %}

```typescript
type equals = <T>(value: T) => (data: T): boolean
```

{% endtab %}
{% endtabs %}

## first

Given an array, return the first value or `undefined`.

{% tabs %}
{% tab title="Usage" %}

```typescript
first([1, 2, 3])
```

{% endtab %}

{% tab title="Type Definition" %}

```typescript
type first = <T>(items: T[]) => T | undefined
```

{% endtab %}
{% endtabs %}

## nth

Given an array, return the nth value or `undefined`. `nth` is 1-indexed.

{% tabs %}
{% tab title="Usage" %}

```typescript
nth([1, 2, 3])(1) // 1
```

{% endtab %}

{% tab title="Type Definition" %}

```typescript
type nth = (n: number) => <T>(items: T[]) => T | undefined
```

{% endtab %}
{% endtabs %}

## index

Given an array, return the index value or `undefined`. `index` is 0-indexed.

{% tabs %}
{% tab title="Usage" %}

```typescript
index([1, 2, 3])(1) // 2
```

{% endtab %}

{% tab title="Type Definition" %}

```typescript
type index = (n: number) => <T>(items: T[]) => T | undefined
```

{% endtab %}
{% endtabs %}

## last

Given an array, return the last value or `undefined`.

{% tabs %}
{% tab title="Usage" %}

```typescript
last([1, 2, 3])
```

{% endtab %}

{% tab title="Type Definition" %}

```typescript
type last = <T>(items: T[]) => T | undefined
```

{% endtab %}
{% endtabs %}

## rest

Given an array, return every item except the first.

{% tabs %}
{% tab title="Usage" %}

```typescript
rest([1, 2, 3]) // [2, 3]
```

{% endtab %}

{% tab title="Type Definition" %}

```typescript
type rest = <T>(items: T[]) => T[]
```

{% endtab %}
{% endtabs %}

## greaterThan

Create a predicate which checks whether a value is greater than a number.

{% tabs %}
{% tab title="Usage" %}

```typescript
const greaterThanFive = greaterThan(5)
greaterThanFive(10)
greaterThanFive(1)
```

{% endtab %}

{% tab title="Type Definition" %}

```typescript
type greaterThan = (value: number) => (data: number): boolean
```

{% endtab %}
{% endtabs %}

## greaterThanEquals

Create a predicate which checks whether a value is greater than or equal a number.

{% tabs %}
{% tab title="Usage" %}

```typescript
const greaterThanEqualsFive = greaterThanEquals(5)
greaterThanEqualsFive(10)
greaterThanEqualsFive(1)
```

{% endtab %}

{% tab title="Type Definition" %}

```typescript
type greaterThanEquals = (value: number) => (data: number): boolean
```

{% endtab %}
{% endtabs %}

## lessThan

Create a predicate which checks whether a value is less than a number.

{% tabs %}
{% tab title="Usage" %}

```typescript
const lessThanFive = lessThan(5)
lessThanFive(10)
lessThanFive(1)
```

{% endtab %}

{% tab title="Type Definition" %}

```typescript
type lessThan = (value: number) => (data: number): boolean
```

{% endtab %}
{% endtabs %}

## lessThanEquals

Create a predicate which checks whether a value is less than or equal a number.

{% tabs %}
{% tab title="Usage" %}

```typescript
const lessThanEqualsFive = lessThanEquals(5)
lessThanEqualsFive(10)
lessThanEqualsFive(1)
```

{% endtab %}

{% tab title="Type Definition" %}

```typescript
type lessThanEquals = (value: number) => (data: number): boolean
```

{% endtab %}
{% endtabs %}

## isBetween

Create a predicate which checks whether a value is between two values.

{% tabs %}
{% tab title="Usage" %}

```typescript
const isBetween5And10Exclusive = isBetween(5, 10, false)
isBetween5And10Exclusive(10)

const isBetween5And10Inclusive = isBetween(5, 10, true)
isBetween5And10Inclusive(1)
```

{% endtab %}

{% tab title="Type Definition" %}

```typescript
type isBetween = (
  a: number,
  b: number,
  inclusive?: boolean,
) => (data: number) => boolean
```

{% endtab %}
{% endtabs %}

## pluck

Create a function which grabs a key from an object.

{% tabs %}
{% tab title="Usage" %}

```typescript
const getName = pluck("name")
getName({ name: "Me", age: Infinity })
```

{% endtab %}

{% tab title="Type Definition" %}

```typescript
type pluck = <U, T extends keyof U>(key: T) => (data: U): U[T]
```

{% endtab %}
{% endtabs %}

## omit

Create a function which removes a key from an object.

{% tabs %}
{% tab title="Usage" %}

```typescript
const removeName = omit("name")
removeName({ name: "Me", age: Infinity })
```

{% endtab %}

{% tab title="Type Definition" %}

```typescript
type omit = <U, T extends keyof U>(key: T) => (data: U): Omit<U, T>
```

{% endtab %}
{% endtabs %}

## pipe

Create a function runs a series of functions in order, passing the result of each step to the next in the series.

{% tabs %}
{% tab title="Usage" %}

```typescript
const incrementToStringAndRepeat = pipe(
  (a: number) => a + 1,
  (b: number) => b.toString(),
  (c: string) => c + c,
)

incrementToStringAndRepeat(100)
```

{% endtab %}

{% tab title="Type Definition" %}

```typescript
type pipe = <A, B, C, D>(a: (data: A) => B, b: (data: B) => C, c: (data: C) => D): (data: A) => D
```

{% endtab %}
{% endtabs %}
