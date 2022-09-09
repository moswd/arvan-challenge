import { useToast } from 'vue-toastification'
import { User } from '@models/user.model'
import { LoginFlowDTO, RegisterFlowDTO } from '@repositories/users.dto'
import { UsersRepository } from '@repositories/users.repository'
import { useApi } from '@composables/api.composable'

const usersRepository = new UsersRepository()

export function useLogin() {
  return useApi<LoginFlowDTO, User>(usersRepository.login, (user) => {
    useToast().success(`Welcome ${user!.username}`, { timeout: 2000 })
  })
}

export function useRegister() {
  return useApi<RegisterFlowDTO, User>(usersRepository.register, (user) => {
    useToast().success(`Welcome ${user!.username}`, { timeout: 2000 })
  })
}
