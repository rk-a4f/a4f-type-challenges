import type { Equal, Expect } from '@type-challenges/utils'

type TupleToObject<T extends readonly PropertyKey[]> = {
  [P in T[number]]: P
}

const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const
const tupleNumber = [1, 2, 3, 4] as const
const tupleMix = [1, '2', 3, '4'] as const

type Test1 = TupleToObject<typeof tuple>
//    ^?

const abc = {
  A: 'aa',
  B: 'bb',
}
type ValueOf<T> = keyof T
type ArrayValueOf<T extends readonly any[]> = T[number]

type Test11 = ValueOf<typeof abc>
//    ^?
type Test2 = ArrayValueOf<typeof tuple>
//    ^?

type cases = [
  Expect<Equal<TupleToObject<typeof tuple>, { tesla: 'tesla'; 'model 3': 'model 3'; 'model X': 'model X'; 'model Y': 'model Y' }>>,
  Expect<Equal<TupleToObject<typeof tupleNumber>, { 1: 1; 2: 2; 3: 3; 4: 4 }>>,
  Expect<Equal<TupleToObject<typeof tupleMix>, { 1: 1; '2': '2'; 3: 3; '4': '4' }>>,
]

// @ts-expect-error
type error = TupleToObject<[[1, 2], {}]>

tuple.reduce((acc, cur) => {
  acc[cur] = cur
  return acc
}, {} as Record<PropertyKey, any>)

// type Args<A extends Array<PropertyType>> = {
//  [K in keyof A]: K extends keyof Array<any> ?  never : PropertyValueTypeMap[A[K]]
// }
