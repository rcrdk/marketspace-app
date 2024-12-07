import type { UserDTO } from '@dtos/UserDTO'
import { API } from '@services/api'

type AuthenticateUserRequest = {
  email: string
  password: string
}

type AuthenticateUserResponse = {
  token: string
  refresh_token: string
  user: UserDTO
}

export async function authenticateUser({
  email,
  password,
}: AuthenticateUserRequest) {
  const response = await API.post<AuthenticateUserResponse>('sessions', {
    email,
    password,
  })

  return {
    ...response.data,
  } as AuthenticateUserResponse
}
