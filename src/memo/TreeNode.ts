/* eslint-disable @typescript-eslint/no-non-null-assertion */
export type UnbrandedTreeNode<K, V> = [
  V | undefined,
  Map<K, TreeNode<K, V>> | null,
]

export interface TreeNode<K, V> {
  __brand: "TreeNode"
  __keyType: K
  __valueType: V
}

function brand<K, V>(unbranded: UnbrandedTreeNode<K, V>): TreeNode<K, V> {
  return (unbranded as unknown) as TreeNode<K, V>
}

function unbrand<K, V>(branded: TreeNode<K, V>): UnbrandedTreeNode<K, V> {
  return (branded as unknown) as UnbrandedTreeNode<K, V>
}

export const make = <K, V>(): TreeNode<K, V> =>
  brand([undefined, new Map<unknown, TreeNode<K, V>>()] as UnbrandedTreeNode<
    K,
    V
  >)

export const value = <V>(node: TreeNode<unknown, V>) => unbrand(node)[0]

export const setValue = <V>(value: V, node: TreeNode<unknown, V>) =>
  (unbrand(node)[0] = value)

export const isEmpty = (node: TreeNode<unknown, unknown>) => !unbrand(node)[1]

export const has = <K>(key: K, node: TreeNode<K, unknown>) =>
  isEmpty(node) ? false : unbrand(node)[1]!.has(key)

export const get = <K, K2, V>(key: K2, node: TreeNode<K, V>) =>
  isEmpty(node) ? undefined : unbrand(node)[1]!.get((key as unknown) as K)

export const set = <K, V>(
  key: K,
  value: TreeNode<K, V>,
  node: TreeNode<K, V>,
) => (isEmpty(node) ? null : unbrand(node)[1]!.set(key, value))
