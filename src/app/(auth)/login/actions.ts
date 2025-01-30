'use server'

import { signInWithPassword } from '@/http/sign-in-with-password'
import { SignInWithPasswordRequest } from '@/type/auth'
import { HTTPError } from 'ky'
import { cookies } from 'next/headers'

export async function signInWithEmailAndPasswordAction({
  email,
  password,
}: SignInWithPasswordRequest) {
  try {
    const { token } = await signInWithPassword({
      email,
      password,
    })

    const decoded = JSON.parse(
      Buffer.from(token.split('.')[1], 'base64').toString(),
    )
    const maxAge = decoded.exp - Math.floor(Date.now() / 1000)
    const cookieStore = await cookies()
    cookieStore
      .set('token', token, {
        path: '/',
        maxAge,
      })
      .delete('session-expired')
  } catch (err) {
    if (err instanceof HTTPError) {
      const { message } = await err.response.json()
      throw new Error(message)
    }

    throw new Error('Erro inesperado, tente novamente em alguns minutos.')
  }
}
