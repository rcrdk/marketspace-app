import type { AvatarFile } from '@components/AvatarSelector'
import { API } from '@services/api'

type CreateUserRequest = {
  name: string
  email: string
  phone: string
  password: string
  avatar: AvatarFile
}

type CreateUserResponse = void

export async function createUser({
  name,
  email,
  password,
  phone,
  avatar,
}: CreateUserRequest): Promise<CreateUserResponse> {
  const data = new FormData()

  data.append('name', name)
  data.append('email', email)
  data.append('password', password)
  data.append('tel', phone)
  data.append('avatar', avatar as any)

  await API.post('users', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}
