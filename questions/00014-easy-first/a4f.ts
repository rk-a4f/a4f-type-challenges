import type { Equal, Expect } from '@type-challenges/utils'

// infer FirstType >> 첫번째 요소
// ...infer _Rest >> Expect<Equal<First<[]>, never>>,
type First<T extends any[]> = T extends [infer FirstType, ...infer _Rest]
  ? FirstType
  : never

// keyof T >> 배열의 index가 추론되고
// '0' extends keyof T >> 추론된 값에 0 이 있는지 판별
// - true: T['0']
// - false: never
// type First<T extends any[]> = '0' extends keyof T ? T['0'] : never

// T extends [] >> T 가 빈배열인지 판별
// - true: never
// - false: T[0]
// type First<T extends any[]> = T extends [] ? never : T[0]

type cases = [
  Expect<Equal<First<[3, 2, 1]>, 3>>,
  Expect<Equal<First<[() => 123, { a: string }]>, () => 123>>,
  Expect<Equal<First<[]>, never>>,
  Expect<Equal<First<[undefined]>, undefined>>,
]

type errors = [
  // @ts-expect-error
  First<'notArray'>,
  // @ts-expect-error
  First<{ 0: 'arrayLike' }>,
]
