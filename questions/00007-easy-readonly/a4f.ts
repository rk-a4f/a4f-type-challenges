import type { Equal, Expect } from '@type-challenges/utils'

type MyReadonly<T> = {
  readonly [P in keyof T]: T[P]
}

type ReadonlyTodo = Readonly<Todo1>
//    ^?

type Temp = { readonly ['title']: Todo1['title'] }
//    ^?

type cases = [
  Expect<Equal<MyReadonly<Todo1>, Readonly<Todo1>>>,
]

interface Todo1 {
  title: string
  description: string
  completed: boolean
  meta: {
    author: string
  }
}
