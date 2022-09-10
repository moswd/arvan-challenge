export interface ApiErrorMap {
  [key: string]: string[]
}

export interface ApiResponse<T> {
  successful: boolean
  timestamp: Date
  data?: T
  errors?: ApiErrorMap
}

export type Paginated<T, Collection extends string> = {
  [P in Collection]: T
} & {
  [P in Collection as `${P}Count`]: number
}
