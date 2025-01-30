import { api } from '@/libs/ky'
import {
  SignInWithPasswordRequest,
  SignInWithPasswordResponse,
} from '@/type/auth'

export async function signInWithPassword({
  email,
  password,
}: SignInWithPasswordRequest) {
  const result = await api
    .post('sessions/password', {
      json: {
        email,
        password,
      },
    })
    .json<SignInWithPasswordResponse>()

  return result
}
