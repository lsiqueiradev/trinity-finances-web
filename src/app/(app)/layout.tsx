import { Nav } from '@/components/nav'
import { NavLogo } from '@/components/nav-logo'
import { NavUser } from '@/components/nav-user'
import { isAuthenticated } from '@/services/auth'
import { redirect } from 'next/navigation'
import { PropsWithChildren } from 'react'

export default async function AppLayout({ children }: PropsWithChildren) {
  if (!(await isAuthenticated())) {
    redirect('/login')
  }
  return (
    <div className="flex-col">
      <div className="border-b">
        <div className="flex h-16 items-center gap-4 px-4">
          <NavLogo />
          <Nav className="hidden md:flex" />
          <div className="ml-auto flex items-center space-x-4">
            <NavUser />
          </div>
        </div>
      </div>
      <div className="flex h-14 items-center overflow-x-auto p-4 md:hidden">
        <Nav className="flex" />
      </div>
      <div className="flex-1 p-4">{children}</div>
    </div>
  )
}
