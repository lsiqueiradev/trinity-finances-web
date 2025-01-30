import { getCookie } from 'cookies-next'
import ky from 'ky'

export const api = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  hooks: {
    beforeRequest: [
      async (request) => {
        let token: string | undefined

        if (typeof window === 'undefined') {
          const { cookies } = await import('next/headers')
          const serverCookies = await cookies()
          token = serverCookies.get('token')?.value // Acessa o valor diretamente
        } else {
          token = getCookie('token') as string | undefined
        }
        if (token) {
          request.headers.set('Authorization', `Bearer ${token}`)
        }
      },
    ],
    afterResponse: [
      async (request, options, response) => {
        if (response.status === 401) {
          if (typeof window !== 'undefined') {
            window.location.href = '/api/auth/sign-out'
          } else {
            const { redirect } = await import('next/navigation')
            redirect('/api/auth/sign-out')
          }

          throw new Error('Unauthorized: User is not authenticated')
        }

        return response
      },
    ],
  },
})
