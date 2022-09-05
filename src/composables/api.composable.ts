import { onUnmounted, UnwrapRef } from 'vue'
import { RefValue } from 'vue/macros'
import { ApiResponse } from '@models/api.model'

export type ApiActionFn<T, U> = (
  input: T,
  signal: AbortSignal
) => Promise<ApiResponse<U>>

export type ApiActionCallback<T> = (data: T) => any

export function useApiAction<T, U>(
  action: ApiActionFn<T, U>,
  callback?: ApiActionCallback<U>,
  notify = true
) {
  let cancelController: AbortController | undefined

  let data = $ref<U | undefined>()
  let loading = $ref(false)

  async function attempt(input: T, abortController?: AbortController) {
    cancelController =
      abortController && !abortController.signal.aborted
        ? abortController
        : new AbortController()

    loading = true

    try {
      const result = await action(input, cancelController.signal)

      data = Object.assign({}, result.data) as RefValue<UnwrapRef<U>> // TODO: whyyy?

      if (callback) callback(result.data as U) // TODO: why???

      return result.data // TODO: promise resolve?
    } catch (err) {
      if (notify) {
        console.log('==================== NOTIFY ======================')
        console.log(err) // TODO: should show a notification of cleaned up error
      }

      return Promise.reject(err) // TODO: do we need this?
    } finally {
      loading = false
    }
  }

  onUnmounted(() => {
    cancelController?.abort()
  })

  return {
    attempt,
    loading: $$(loading),
    data: $$(data), // TODO: ha?
    abortController: cancelController
  }
}
