import axios, { AxiosInstance } from 'axios'
import { formatErrorResponse, formatSuccessResponse } from '@interceptors/formatResponse.interceptor'
import { injectToken } from '@interceptors/injectToken.interceptor'

const API_BASE_URL: string = import.meta.env.VITE_API_BASE_URL

export function createAxiosInstance(authenticated = true): AxiosInstance {
  const axiosInstance = axios.create({
    baseURL: API_BASE_URL
  })

  axiosInstance.interceptors.response.use(formatSuccessResponse, formatErrorResponse)

  if (authenticated) {
    axiosInstance.interceptors.request.use(injectToken)
  }

  return axiosInstance
}
