import { cn } from '@/libs/utils'
import { FileQuestion, icons } from 'lucide-react'

export function Icon({
  name,
  className,
}: {
  name: keyof typeof icons | null
  className?: string
}) {
  const LucideIcon = icons[name ?? 'FileQuestion'] || FileQuestion

  return <LucideIcon className={cn('size-6', className)} />
}
