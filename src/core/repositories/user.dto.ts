import { User } from '@models/user.model'

export interface RegisterCredentials {
  username: string
  email: string
  password: string
}

export type LoginCredentials = Omit<RegisterCredentials, 'username'>

export interface LoginFlowDTO {
  user: Omit<RegisterCredentials, 'username'>
}

export interface RegisterFlowDTO {
  user: RegisterCredentials
}

export interface UserDTO {
  username: string
  email: string
  token: string | null
  image: string | null
  bio: string | null
}

export function toDomainUser(dto: UserDTO): User {
  return {
    username: dto.username,
    email: dto.email,
    token: dto.token ? dto.token : undefined,
    image: dto.image ? dto.image : undefined,
    bio: dto.bio ? dto.bio : undefined
  }
}

export interface AuthUserDTO {
  user: UserDTO
}

export function toDomainAuthUser(dto: AuthUserDTO): User {
  return toDomainUser(dto.user)
}
