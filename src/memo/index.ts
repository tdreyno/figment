/* eslint-disable @typescript-eslint/no-explicit-any */
import { identity, isPlainObject, isUndefined, not } from "../core/index"

interface TreeNode<T> {
  children: Map<any, TreeNode<T>> | null
  value: T | undefined
}

function makeNode<T>(): TreeNode<T> {
  const o = Object.create(null)

  o.children = new Map<any, TreeNode<T>>()
  o.value = undefined

  return o
}

const mutableObjectCache = new Map<object | any[], string>()

function stringifyIfNecessary<T>(
  o: T,
  useEqualityForMutableObjects: boolean,
): T | string {
  if (
    Array.isArray(o) ||
    isPlainObject(o) ||
    o instanceof Map ||
    o instanceof Set
  ) {
    if (useEqualityForMutableObjects) {
      const stringKey = mutableObjectCache.get(o as any)

      if (stringKey) {
        return stringKey
      }

      const nextStringKey = mutableObjectCache.size.toString()
      mutableObjectCache.set(o as any, nextStringKey)

      return nextStringKey
    }

    if (o instanceof Map || o instanceof Set) {
      return JSON.stringify(Array.from(o))
    }

    return JSON.stringify(o)
  }

  return o
}

class Cache<T> {
  root = makeNode<T>()
  useEqualityForMutableObjects = false

  constructor(useEqualityForMutableObjects: boolean) {
    this.useEqualityForMutableObjects = useEqualityForMutableObjects
  }

  has(args: any[]): boolean {
    return not(isUndefined)(this.get(args))
  }

  get(args: any[]): T | undefined {
    let previousNode = this.root

    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < args.length; i++) {
      const arg = args[i]
      const key = stringifyIfNecessary(arg, this.useEqualityForMutableObjects)

      // Found in tree, continue
      if (previousNode.children && previousNode.children.has(key)) {
        const node = previousNode.children.get(key)

        if (node) {
          previousNode = node
        }
      } else {
        return undefined
      }
    }

    return previousNode.value
  }

  set(args: any[], value: T): void {
    let previousNode = this.root

    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < args.length; i++) {
      const arg = args[i]
      const key = stringifyIfNecessary(arg, this.useEqualityForMutableObjects)

      let node

      if (previousNode.children) {
        // Found in tree, continue
        if (previousNode.children.has(key)) {
          node = previousNode.children.get(key)
        } else {
          node = makeNode<T>()
          previousNode.children = previousNode.children.set(key, node)
        }

        if (node) {
          previousNode = node
        }
      }
    }

    previousNode.value = value
  }

  toJS(): object {
    function serialize(data: any): any {
      if (Array.isArray(data)) {
        return data.map(serialize)
      }

      if (isPlainObject(data)) {
        return Object.keys(data).reduce(
          (sum, k: string) => {
            sum[k] = serialize(data[k])

            return sum
          },
          {} as {
            [key: string]: any
          },
        )
      }

      if (data && data.toJS) {
        return data.toJS()
      }

      return data
    }

    return serialize(this.root)
  }

  toString() {
    return JSON.stringify(this.toJS(), undefined, 2)
  }
}

export function memoize<T extends (...args: any[]) => any>(
  fn: T,
  useEqualityForMutableObjects = false,
): T {
  const cache = new Cache<T>(useEqualityForMutableObjects)

  function memoized(...args: any[]) {
    if (cache.has(args)) {
      return cache.get(args)
    }

    const result = fn(...args)

    cache.set(args, result)

    return result
  }

  return memoized as any
}

export function maybeCallback<T>(fn?: T | null) {
  return fn || identity
}

export function basicAlways<T>(value: T): () => T {
  return () => value
}

export const always = memoize(basicAlways)
