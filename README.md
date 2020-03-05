# Figment

[![Test Coverage](https://api.codeclimate.com/v1/badges/bade509a61c126d7f488/test_coverage)](https://codeclimate.com/github/tdreyno/figment/test_coverage)
[![npm latest version](https://img.shields.io/npm/v/@tdreyno/figment/latest.svg)](https://www.npmjs.com/package/@tdreyno/figment)

Figment is a collection of functional programming helpers. This is my personal collection of utilities and is not intended to be comprehensive.

The library is built in TypeScript and is manually curried to make the final parameter to functions (the data parameter) a separate callback to aid in composibility. For example, here is the signature of `map` from lodash:

```typescript
type map = <T, U>(fn: (item: T) => U, items: T[]) => U[]
const increment = a => a + 1
const result = map(increment, [1, 2, 3])
```

And here is the signature this library uses:

```typescript
type map = <T, U>(fn: (item: T) => U) => (items: T[]) => U[]
const increment = a => a + 1
const incrementList = map(increment)
const result = incrementList([1, 2, 3])
```

## Installation

### Yarn

```sh
yarn add @tdreyno/figment
```

### NPM

```sh
npm install --save @tdreyno/figment
```

## Prior Art

[fp-ts](https://github.com/gcanti/fp-ts/blob/master/src/Task.ts) is a popular TypeScript library which implements functional concepts.

## License

Figment is licensed under the Hippocratic License. It is an [Ethical Source license](https://ethicalsource.dev) derived from the MIT License, amended to limit the impact of the unethical use of open source software.
