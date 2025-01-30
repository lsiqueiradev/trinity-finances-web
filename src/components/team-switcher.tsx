'use client'

import { cn } from '@/libs/utils'
import { useTheme } from 'next-themes'
import { MouseEvent } from 'react'
import { Icon } from './icon'

export function ThemeSwitcher() {
  const { setTheme, theme } = useTheme()

  const handleThemeChange = (
    e: MouseEvent<HTMLButtonElement>,
    theme: 'light' | 'dark' | 'system',
  ) => {
    e.preventDefault()
    setTheme(theme)
  }
  return (
    <div className="ml-auto grid h-6 w-[72px] cursor-pointer grid-cols-3 rounded-full border">
      <button
        className={cn(
          '-mt-px flex h-6 -translate-x-px items-center justify-center rounded-full',
          theme === 'system' && 'border',
        )}
        onClick={(e) => handleThemeChange(e, 'system')}
      >
        <Icon name="MonitorSmartphone" className="size-3.5" />
      </button>
      <button
        className={cn(
          '-mt-px flex h-6 items-center justify-center rounded-full',
          theme === 'light' && 'border',
        )}
        onClick={(e) => handleThemeChange(e, 'light')}
      >
        <Icon name="Sun" className="size-3.5" />
      </button>
      <button
        className={cn(
          '-mt-px flex h-6 translate-x-px items-center justify-center rounded-full',
          theme === 'dark' && 'border',
        )}
        onClick={(e) => handleThemeChange(e, 'dark')}
      >
        <Icon name="Moon" className="size-3.5" />
      </button>
    </div>
  )
}
