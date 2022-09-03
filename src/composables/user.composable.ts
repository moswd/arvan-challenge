import { User } from '../core/models/user.model'
import { LoginFlowDTO, RegisterFlowDTO } from '../core/repositories/user.dto'
import { UserRepository } from '../core/repositories/user.repository'
import { useApiAction } from './api.composable'

const userRepository = new UserRepository()

export function useLogin() {
  return useApiAction<LoginFlowDTO, User>(userRepository.login)
}

export function useRegister() {
  return useApiAction<RegisterFlowDTO, User>(userRepository.register)
}

// export function useLogin() {
//   let cancelController: AbortController | undefined

//   let data = $ref<User | undefined>()
//   let loading = $ref(false)

//   async function attempt(
//     creds: LoginCredentials,
//     abortController?: AbortController
//   ) {
//     cancelController =
//       abortController && !abortController.signal.aborted
//         ? abortController
//         : new AbortController()

//     loading = true

//     try {
//       const result = await userRepository.login(
//         { user: creds },
//         cancelController.signal
//       )

//       data = Object.assign({}, result.data)

//       return result.data
//     } catch (err) {
//       console.log('---------------------- from composable --- error')
//       console.log(err)
//     } finally {
//       loading = false
//     }
//   }

//   onUnmounted(() => {
//     cancelController?.abort()
//   })

//   return {
//     login: attempt,
//     loading: $$(loading),
//     data: $$(data),
//     abortController: cancelController
//   }
// }
