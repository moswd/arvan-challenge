import axios, { AxiosInstance } from 'axios'
import {
  formatErrorResponse,
  formatSuccessResponse
} from '@interceptors/formatResponse.interceptor'
import { injectToken } from '@interceptors/injectToken.interceptor'

const API_BASE_URL: string = import.meta.env.VITE_API_BASE_URL

export function createAxiosInstance(authenticated = true): AxiosInstance {
  const axiosInstance = axios.create({
    baseURL: API_BASE_URL
    // headers: {
    //   ...(authenticated && token
    //     ? {
    //         Authorization: `Bearer ${token}`
    //       }
    //     : {})
    // }
  })

  axiosInstance.interceptors.response.use(
    formatSuccessResponse,
    formatErrorResponse
  )

  if (authenticated) {
    axiosInstance.interceptors.request.use(injectToken)
  }

  return axiosInstance
}

// TODO: read on singleton & singleton enforcer pattern
// https://gist.github.com/dmnsgn/6abeb1ed9111edf2e0a30511f1f968b2
// https://gist.github.com/mariocesar/e96f6cf6cb2db213173a9c08b9a9867a

// TODO: when to inject token?

// TODO: why not class & singleton? is singleton bad?
