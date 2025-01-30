'use client'

import { cn } from '@/libs/utils'
import { icons } from 'lucide-react'
import { Icon } from './icon'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Skeleton } from './ui/skeleton'

interface SummaryBoxProps {
  label: string
  value: string
  className?: string
  icon: keyof typeof icons
  iconClasses?: string
  loading?: boolean
}

export function SummaryBox({
  label,
  value,
  className,
  icon,
  iconClasses,
  loading,
}: SummaryBoxProps) {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-1 pt-4">
        <CardTitle className="flex-1 truncate font-normal">{label}</CardTitle>
        <div
          className={cn(
            'flex size-10 items-center justify-center rounded-full',
            iconClasses || 'bg-accent text-accent-foreground',
          )}
        >
          <Icon name={icon} className="size-5" />
        </div>
      </CardHeader>
      <CardContent>
        <Skeleton className={cn('hidden h-8 w-full', loading && 'flex')} />
        <div className={cn('text-2xl font-bold', loading && 'hidden')}>
          {value}
        </div>
      </CardContent>
    </Card>
  )
}
