import * as React from 'react'

import { cn } from '@/libs/utils'
import { InputError } from './input-error'

interface InputProps {
  error?: string
}

const Input = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<'input'> & InputProps
>(({ className, type, error, ...props }, ref) => {
  return (
    <>
      <input
        type={type}
        className={cn(
          'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          error && 'border-destructive focus-visible:ring-0',
          className,
        )}
        ref={ref}
        {...props}
      />
      <InputError message={error} />
    </>
  )
})
Input.displayName = 'Input'

export { Input }
