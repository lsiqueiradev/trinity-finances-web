import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  const redirectUrl = request.nextUrl.clone()
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value

  if (token) {
    NextResponse.next()
  }

  if (!token) {
    return redirectToLogout(redirectUrl)
  }

  const expiredToken = verifyToken(token)

  if (expiredToken) {
    return redirectToLogout(redirectUrl)
  }

  return NextResponse.next()
}

function verifyToken(token: string) {
  try {
    const base64Payload = token.split('.')[1]
    const parsed = JSON.parse(Buffer.from(base64Payload, 'base64').toString())
    return parsed.exp * 1000 < Date.now()
  } catch {
    return null
  }
}

function redirectToLogout(url: URL) {
  url.pathname = '/login'
  const response = NextResponse.redirect(url)

  response.cookies.set(
    'session-expired',
    'Sua sessão expirou. Por favor, faça login novamente.',
    {
      path: '/',
      maxAge: 60,
    },
  )

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - login, signup, forgot-password, or root path
     */
    '/((?!api|assets|_next|favicon\\.ico|login|signup|forgot-password).*)',
  ],
}
