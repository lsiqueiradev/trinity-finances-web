'use client'

import { cn } from '@/libs/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { PropsWithChildren } from 'react'

interface NavLinkProps {
  href: string
  className?: string
}

export function NavLink({
  href,
  className,
  children,
}: PropsWithChildren & NavLinkProps) {
  const pathname = usePathname()
  return (
    <Link
      href={href}
      className={cn(
        'text-sm font-medium transition-colors hover:text-primary',
        pathname !== href && 'text-muted-foreground',
        className,
      )}
    >
      {children}
    </Link>
  )
}
