import { cn } from '@/libs/utils'
import { icons } from 'lucide-react'
import { CSSProperties } from 'react'
import { Icon } from './icon'

interface EntityStatusProps {
  name: keyof typeof icons
  className?: string
  style?: CSSProperties
}

export function EntityStatus({ name, className, style }: EntityStatusProps) {
  return (
    <div
      className={cn(
        'flex size-7 items-center justify-center rounded-full border-[1px] bg-accent text-accent-foreground [&_svg]:size-4',
        className,
      )}
      style={style}
    >
      <Icon name={name} />
    </div>
  )
}
