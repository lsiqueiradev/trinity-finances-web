import { Input } from '@/components/ui/input'
import { cn } from '@/libs/utils'
import {
  ChangeEvent,
  forwardRef,
  InputHTMLAttributes,
  useEffect,
  useRef,
} from 'react'
import { InputError } from './input-error'

interface InputAmountProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'style'> {
  onChange: (value: string) => void
  error?: string
  style?: 'account' | 'transaction' | 'balance'
  open?: boolean
}

export const InputAmount = forwardRef<HTMLInputElement, InputAmountProps>(
  (
    { onChange, className, error, style = 'account', open = false, ...props },
    ref,
  ) => {
    const inputRef = useRef<HTMLInputElement>(null)

    const combinedRef = ref || inputRef

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      let inputValue = event.target.value.replace(/[^0-9-]/g, '')

      if (style === 'account' && inputValue === '000-') {
        return onChange('-0.0')
      }

      if (inputValue === '' || inputValue === '-') {
        return onChange('0.0')
      }

      if (style === 'account') {
        const negativeSignIndex = inputValue.indexOf('-')

        if (negativeSignIndex > 0) {
          inputValue = `-${inputValue.replace('-', '')}`
        }
      }

      const formattedValue = (parseFloat(inputValue) / 100).toFixed(2)
      onChange(formattedValue)
    }

    useEffect(() => {
      if (open) {
        setTimeout(() => {
          if (combinedRef && 'current' in combinedRef && combinedRef.current) {
            combinedRef.current.focus()
          }
        }, 1)
      }
    }, [open])

    return (
      <div>
        <Input
          ref={inputRef}
          tabIndex={-1}
          onChange={handleChange}
          className={cn(
            'border-0 p-0 text-3xl font-bold shadow-none focus-visible:ring-0 md:text-3xl',
            className,
          )}
          autoFocus={style === 'account'}
          {...props}
        />
        <InputError message={error} />
        {style === 'account' && (
          <span className="text-sm text-muted-foreground">
            Digite - para saldo negativo
          </span>
        )}
      </div>
    )
  },
)

InputAmount.displayName = 'InputAmount'
