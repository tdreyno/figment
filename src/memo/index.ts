/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as TreeNode from "./TreeNode"
import {
  identity,
  isPlainObject,
  isUndefined,
  not,
  cond,
  isA,
  or,
  isArray_,
  pipe,
  and,
  knownIdentity,
  known,
  loop,
  greaterThanEquals,
  constant,
  Recur,
} from "../core/index"

const mutableObjectCache = new Map<Record<string, unknown> | any[], string>()
const cacheGet = (key: any) => mutableObjectCache.get(key)
const cacheSet = <V extends string>(value: V) => (key: any): V =>
  mutableObjectCache.set(key, value) && value
const nextKey = () => mutableObjectCache.size.toString()

const stringifyIfNecessary = <T>(useEqualityForMutableObjects: boolean) =>
  cond<T, T | string>(
    // Non-serializable type
    [not(or(isArray_, isPlainObject, isA(Map), isA(Set))), identity],

    // If we are using equality for cache key and the value is in cache
    [and(useEqualityForMutableObjects, cacheGet), known(cacheGet)],

    // If we are using equality for cache key and the value is not in cache
    [and(useEqualityForMutableObjects, not(cacheGet)), cacheSet(nextKey())],

    // If not using equality AND its a Map/Set
    [
      or(isA(Map), isA(Set)),
      pipe(knownIdentity<any>(), Array.from, JSON.stringify),
    ],

    // Unknown, attempt to stringify
    JSON.stringify,
  )

interface CacheObj<T> {
  root: TreeNode.TreeNode<string, T>
  useEqualityForMutableObjects: boolean
}

const get = <T>(args: any[]) => (cache: CacheObj<T>) =>
  loop<[TreeNode.TreeNode<string, T>, number], T | undefined>(
    (recur, previousNode, i) =>
      cond<
        number,
        T | undefined | Recur<[TreeNode.TreeNode<string, T>, number]>
      >(
        // If the loop is done, return the current node value
        [
          greaterThanEquals(args.length),
          constant(TreeNode.value(previousNode)),
        ],

        // Otherwise,
        pipe(
          // Get the data by index
          constant(args[i]),

          // Convert to string key if necessary
          stringifyIfNecessary(cache.useEqualityForMutableObjects),

          // Check if the key is in the tree.
          cond(
            // If not, return undefined
            [
              (key: string | T) => !TreeNode.has(key, previousNode),
              constant(undefined),
            ],

            // If yes,
            pipe(
              // Get the next node
              (key: string | T) => TreeNode.get(key, previousNode),

              // See if the next node exists
              cond(
                // If not, return undefined
                [isUndefined, constant(undefined)],

                // If so, continue recursing
                node => recur(node!, i + 1),
              ),
            ),
          ),
        ),
      )(i),
  )(cache.root, 0)

const has = <T>(args: any[]) => pipe(get<T>(args), not(isUndefined))

const set = <T>(args: any[], value: T) => (cache: CacheObj<T>): void => {
  let previousNode = cache.root

  // tslint:disable-next-line: prefer-for-of
  for (let i = 0; i < args.length; i++) {
    const arg = args[i]
    const key = stringifyIfNecessary(cache.useEqualityForMutableObjects)(arg)

    let node

    if (!TreeNode.isEmpty(previousNode)) {
      // Found in tree, continue
      if (TreeNode.has(key, previousNode)) {
        node = TreeNode.get(key, previousNode)
      } else {
        node = TreeNode.make<string, T>()

        // Mutates node
        TreeNode.set(key, node, previousNode)
      }

      if (node) {
        previousNode = node
      }
    }
  }

  TreeNode.setValue(value, previousNode)
}

export const memoize = <T extends (...args: any[]) => any>(
  fn: T,
  useEqualityForMutableObjects = false,
): T => {
  const cache: CacheObj<T> = {
    root: TreeNode.make<string, T>(),
    useEqualityForMutableObjects,
  }

  function memoized(...args: any[]) {
    if (has(args)(cache)) {
      return get(args)(cache)
    }

    const result = fn(...args)

    set(args, result)(cache)

    return result
  }

  return memoized as any
}
