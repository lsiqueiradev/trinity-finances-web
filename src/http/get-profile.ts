import { api } from '@/libs/ky'
import { User } from '@/type/user'

export async function getProfile() {
  const result = await api.get('user').json<User>()
  return result
}
