export interface ApiErrorMap {
  [key: string]: string[]
}

export interface ApiResponse<T> {
  successful: boolean
  timestamp: Date
  data?: T
  errors?: ApiErrorMap
}
