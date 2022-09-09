import { useUserStore } from '@store/user'
import { AxiosRequestConfig } from 'axios'

export function injectToken(config: AxiosRequestConfig): AxiosRequestConfig {
  const { token } = useUserStore()

  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`
    }
  }

  return config
}
