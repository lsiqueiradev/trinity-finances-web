import { cn } from '@/libs/utils'
import Link from 'next/link'

export function NavLogo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn('mr-8 text-lg font-bold', className)}>
      <p>Trinity Finances</p>
    </Link>
  )
}
