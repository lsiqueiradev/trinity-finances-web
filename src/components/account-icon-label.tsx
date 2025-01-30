import { cn } from '@/libs/utils'
import Image from 'next/image'

interface AccountIconLabelProps {
  label?: string
  url: string
  className?: string
  textClasses?: string
}

export function AccountIconLabel({
  url,
  label,
  className,
  textClasses,
}: AccountIconLabelProps) {
  return (
    <div className="flex items-center gap-2">
      <div
        className={cn('relative size-7 rounded-full border-[1px]', className)}
      >
        <Image
          src={url}
          alt={label || ''}
          className="aspect-square rounded-full"
          fill
        />
      </div>
      {label && <p className={textClasses}>{label}</p>}
    </div>
  )
}
