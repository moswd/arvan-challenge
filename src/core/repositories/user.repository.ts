import { createAxiosInstance } from '@clients/httpClient'
import { ApiResponse } from '@models/api.model'
import { User } from '@models/user.model'
import {
  AuthUserDTO,
  LoginFlowDTO,
  RegisterFlowDTO,
  toDomainUser,
  UserDTO
} from '@repositories/user.dto'

const BASE_PATH = '/api/users'

const httpClient = createAxiosInstance(false)

export class UserRepository {
  async login(
    creds: LoginFlowDTO,
    abortSignal?: AbortSignal
  ): Promise<ApiResponse<User>> {
    const result = (await httpClient.post(`${BASE_PATH}/login`, creds, {
      signal: abortSignal
    })) as ApiResponse<AuthUserDTO>

    return {
      ...result,
      data: toDomainUser(result.data!.user as UserDTO)
    } as ApiResponse<User>
  }

  async register(
    creds: RegisterFlowDTO,
    abortSignal?: AbortSignal
  ): Promise<ApiResponse<User>> {
    const result = (await httpClient.post(BASE_PATH, creds, {
      signal: abortSignal
    })) as ApiResponse<AuthUserDTO>

    return {
      ...result,
      data: toDomainUser(result.data!.user as UserDTO)
    } as ApiResponse<User> // TODO: do we need as?
  }
}
