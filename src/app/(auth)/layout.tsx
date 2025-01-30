import { NavLogo } from '@/components/nav-logo'
import { isAuthenticated } from '@/services/auth'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import { PropsWithChildren } from 'react'

export default async function AuthLayout({
  children,
}: Readonly<PropsWithChildren>) {
  if (await isAuthenticated()) {
    redirect('/')
  }
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <NavLogo className="mr-0" />
        </div>
        <div className="flex flex-1 items-center justify-center">
          {children}
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <Image
          src="/assets/backgrounds/auth.jpg"
          alt="Backgrounds Auth"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          fill
          sizes="2x"
          priority
        />
      </div>
    </div>
  )
}
