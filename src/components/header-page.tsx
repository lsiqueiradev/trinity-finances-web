'use client'

import { useRouter } from 'next/navigation'
import { Icon } from './icon'
import { Button } from './ui/button'

interface HeaderPageProps {
  title: string
  isBack?: boolean
}

export function HeaderPage({ title, isBack }: HeaderPageProps) {
  const router = useRouter()

  return (
    <div className="flex items-center gap-2">
      {isBack && (
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <Icon name="MoveLeft" />
        </Button>
      )}
      <h1 className="text-2xl font-bold">{title}</h1>
    </div>
  )
}
