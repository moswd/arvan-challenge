import { User } from '@models/user.model'
import { LoginFlowDTO, RegisterFlowDTO } from '@repositories/user.dto'
import { UserRepository } from '@repositories/user.repository'
import { useApi } from '@composables/api.composable'

const userRepository = new UserRepository()

export function useLogin() {
  return useApi<LoginFlowDTO, User>(userRepository.login, (data: User) => {
    console.log('--------- from composable')
    console.log(data)
  })
}

export function useRegister() {
  return useApi<RegisterFlowDTO, User>(
    userRepository.register,
    (data: User) => {
      console.log('--------- from composable')
      console.log(data)
    }
  )
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
