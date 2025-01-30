import { cn } from '@/libs/utils'
import { PropsWithChildren } from 'react'

export function InputError({
  message,
  children,
  className,
}: PropsWithChildren<{ className?: string; message?: string }>) {
  const body = message ? String(message) : children

  if (!body) return null

  return (
    <p className={cn('text-[0.8rem] font-medium text-destructive', className)}>
      {body}
    </p>
  )
}
