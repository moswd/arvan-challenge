import { useToast } from 'vue-toastification'
import { User } from '@models/user.model'
import { LoginFlowDTO, RegisterFlowDTO } from '@repositories/user.dto'
import { UserRepository } from '@repositories/user.repository'
import { useApi } from '@composables/api.composable'
import { useUserStore } from '@store/user'

const userRepository = new UserRepository()

export function useLogin() {
  return useApi<LoginFlowDTO, User>(userRepository.login, () => {
    const { username } = useUserStore()
    const toast = useToast() // TODO: should we provide this in app?

    toast.success(`Welcome ${username}`, { timeout: 2000 }) // TODO: keep all messages in the same place
  })
}

export function useRegister() {
  return useApi<RegisterFlowDTO, User>(userRepository.register, () => {
    const { username } = useUserStore()
    const toast = useToast() // TODO: should we provide this in app?

    toast.success(`Welcome ${username}`, { timeout: 2000 }) // TODO: keep all messages in the same place
  })
}
