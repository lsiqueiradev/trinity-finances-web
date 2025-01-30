import { cn } from '@/libs/utils'
import { icons } from 'lucide-react'
import { EntityStatus } from './entity-status'

interface CategoryIconLabelProps {
  label: string
  icon: keyof typeof icons
  className?: string
  iconClasses?: string
  iconBg?: string
  labelClasses?: string
}

export function CategoryIconLabel({
  label,
  className,
  icon,
  iconClasses,
  iconBg,
  labelClasses,
}: CategoryIconLabelProps) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <EntityStatus
        name={icon}
        className={iconClasses}
        style={{ backgroundColor: iconBg }}
      />
      <p className={labelClasses}>{label}</p>
    </div>
  )
}
