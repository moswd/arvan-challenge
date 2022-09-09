export interface ApiErrorMap {
  [key: string]: string[]
}

export interface ApiResponse<T> {
  successful: boolean
  timestamp: Date
  data?: T
  errors?: ApiErrorMap
}

// TODO: collection? why interface doesn't work?
// https://stackoverflow.com/questions/47044401/generics-type-as-property-name
// https://stackoverflow.com/questions/55454125/typescript-remapping-object-properties-in-typesafe
export type Paginated<T, Collection extends string> = {
  [P in Collection]: T
} & {
  [P in Collection as `${P}Count`]: number
}

// export type Paginated<T> = {
//   [P in keyof T as `${Capitalize<string & P>}Count`]: number
// }

// type A<T, PropertyName extends string> = {[P in PropertyName]: T}
