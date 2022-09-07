import { useUserStore } from '@store/user'
import { AxiosRequestConfig } from 'axios'

export function injectToken(config: AxiosRequestConfig): AxiosRequestConfig {
  const { token } = useUserStore()

  // TODO: too complicated
  config.headers = {
    ...config.headers,
    ...(token
      ? {
          Authorization: `Bearer ${token}`
        }
      : {})
  }

  return config
}
