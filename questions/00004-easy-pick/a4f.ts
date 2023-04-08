import type { Equal, Expect } from '@type-challenges/utils'

type MyPick<T, K extends keyof T> = {
  [Key in K]: T[Key];
}

type Temp1 = MyPick<Todo, 'title'>
//    ^?

type Temp2 = MyPick<Todo, 'title' | 'completed'>
//    ^?

// @ts-expect-error
type Temp3 = MyPick<Todo, 'title' | 'completed' | 'invalid'>
//    ^?

type PickTitle = Pick<Todo, 'title'>
//    ^?

type PickTitleAndCompleted = Pick<Todo, 'title' | 'completed'>
//    ^?

// @ts-expect-error
type PickError = Pick<Todo, 'title' | 'completed' | 'invalid'>
//    ^?

type cases = [
  Expect<Equal<Expected1, MyPick<Todo, 'title'>>>,
  Expect<Equal<Expected2, MyPick<Todo, 'title' | 'completed'>>>,
  // @ts-expect-error
  MyPick<Todo, 'title' | 'completed' | 'invalid'>,
]

interface Todo {
  title: string
  description: string
  completed: boolean
}

interface Expected1 {
  title: string
}

interface Expected2 {
  title: string
  completed: boolean
}
