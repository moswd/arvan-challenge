import { AxiosError, AxiosResponse } from 'axios'
import { ApiResponse } from '@models/api.model'

export function formatSuccessResponse(
  response: AxiosResponse
): ApiResponse<unknown> {
  return {
    successful: true,
    timestamp: new Date(),
    data: response.data
  }
}

export function formatErrorResponse(
  error: AxiosError
): Promise<ApiResponse<unknown>> {
  // TODO: fix type
  const apiErrors = (error.response?.data as any).errors
  const message = (error.response?.data as any).message

  return Promise.reject({
    successful: false,
    timestamp: new Date(),
    // TODO: need better error handling
    errors: apiErrors
      ? apiErrors
      : { message: [message ? message : 'Unknown error'] }
  })
}
