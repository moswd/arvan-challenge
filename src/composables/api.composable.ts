import { onUnmounted, UnwrapRef } from 'vue'
import { RefValue } from 'vue/macros'
import { useToast } from 'vue-toastification'
import { ApiResponse } from '@models/api.model'
import { parseErrors } from '@utils/parseErrors'

export type ApiActionFn<T, U> = (
  input: T,
  signal: AbortSignal
) => Promise<ApiResponse<U>>

export type ApiActionCallback<T> = (data: T) => any

export function useApi<T, U>(
  action: ApiActionFn<T, U>,
  callback?: ApiActionCallback<U>,
  notify = true
) {
  let cancelController = $ref<AbortController | undefined>()

  let data = $ref<U | undefined>()
  let loading = $ref(false)

  async function attempt(input: T, abortController?: AbortController) {
    // TODO: probably should not be done here
    // if (cancelController) cancelController.abort()

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
    } catch (err: any) {
      const toast = useToast()

      // TODO: fix
      if (notify) {
        // TODO: should show a notification of cleaned up error
        // TODO: what else?
        if (err?.errors)
          parseErrors(err.errors).forEach((err) => toast.error(err))
      }

      return Promise.reject(err) // TODO: do we need this?
    } finally {
      loading = false
    }
  }

  onUnmounted(() => {
    cancelController?.abort()
  })

  return $$({
    attempt,
    loading,
    data,
    abortController: cancelController
  })
}
