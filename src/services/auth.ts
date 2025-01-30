import { getProfile } from '@/http/get-profile'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function isAuthenticated() {
  const cookieStore = await cookies()
  return cookieStore.get('token')
}

export async function auth() {
  const token = (await cookies()).get('token')?.value

  if (!token) {
    redirect('/login')
  }

  try {
    const user = await getProfile()
    return user
  } catch {}
}
