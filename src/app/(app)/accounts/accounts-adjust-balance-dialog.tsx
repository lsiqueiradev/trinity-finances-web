import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { InputAmount } from '@/components/ui/input-amount'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { queryClient } from '@/libs/react-query'
import { formatCurrency, formatCurrencyInCents } from '@/libs/utils'
import { adjustBalanceAccountSchema } from '@/schemas/adjust-balance-account-schema'
import { Account } from '@/type/account'
import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useEffect,
  useRef,
} from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { adjustBalanceAccountAction } from './actions'

interface AccountsAdjustBalanceDialogProps extends PropsWithChildren {
  isOpen: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  account: Account
}

type AdjustBalanceAccountSchema = z.infer<typeof adjustBalanceAccountSchema>

export function AccountsAdjustBalanceDialog({
  children,
  isOpen,
  setOpen,
  account,
}: AccountsAdjustBalanceDialogProps) {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const form = useForm<AdjustBalanceAccountSchema>({
    mode: 'onChange',
    resolver: zodResolver(adjustBalanceAccountSchema),
    defaultValues: {
      id: '',
      current_balance: '',
      description: '',
      type: 'transaction',
    },
  })

  const {
    reset,
    control,
    handleSubmit,
    formState: { isSubmitting },
    watch,
  } = form

  const onSubmit = async (data: AdjustBalanceAccountSchema) => {
    try {
      await adjustBalanceAccountAction(data)
      Promise.all([
        queryClient.invalidateQueries({
          queryKey: ['accounts'],
        }),
        queryClient.invalidateQueries({
          queryKey: ['balance', 'accounts'],
        }),
      ])
      setOpen(false)
      toast.success('Conta editada com sucesso!')
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message)
      }
      console.error(err)
    }
  }

  useEffect(() => {
    if (isOpen) {
      if (account) {
        reset({
          id: account.id,
          current_balance: String(account.current_balance),
          type: 'transaction',
        })
      }
      setTimeout(() => {
        if (inputRef.current && 'current' in inputRef && inputRef.current) {
          inputRef.current.focus()
          const length = inputRef.current.value.length
          inputRef.current.setSelectionRange(length, length)
        }
      }, 1)
    }
  }, [isOpen])

  const type = watch('type')
  const current_balance = watch('current_balance')

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <DialogHeader>
              <DialogTitle>Reajusta saldo da conta</DialogTitle>
              <DialogDescription />
            </DialogHeader>
            <div className="space-y-2">
              <FormField
                control={control}
                name="current_balance"
                render={({ field }) => (
                  <FormItem className="flex-1 space-y-2">
                    <FormControl>
                      <InputAmount
                        type="text"
                        id="current_balance"
                        open={isOpen}
                        {...field}
                        value={formatCurrencyInCents(field.value)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center justify-between">
                <p className="font-regular text-base">Saldo inicial da conta</p>
                <p className="text-lg font-bold">
                  {formatCurrency(account.initial_balance)}
                </p>
              </div>
              <FormField
                control={control}
                name="type"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Você gostaria de...</FormLabel>
                    <FormControl>
                      <RadioGroup
                        className="grid gap-3"
                        onValueChange={field.onChange}
                        {...field}
                      >
                        <Label className="flex-1 hover:cursor-pointer [&:has([data-state=checked])>div>div>div]:bg-primary [&:has([data-state=checked])>div>div]:border-primary [&:has([data-state=checked])>div]:border-primary">
                          <RadioGroupItem
                            value="transaction"
                            className="sr-only"
                          />
                          <div className="flex items-center gap-4 rounded-md border-2 p-4">
                            <div className="h-6 w-6 rounded-full border-2 p-0.5">
                              <div className="h-4 w-4 rounded-full" />
                            </div>
                            <div className="">
                              <h6 className="text-lg font-semibold">
                                Criar transação de ajuste
                              </h6>
                              <p className="text-md font-light leading-tight text-muted-foreground">
                                Para ajustar seu saldo uma despesa de ajuste
                                será criada.
                              </p>
                            </div>
                          </div>
                        </Label>

                        <Label className="flex-1 hover:cursor-pointer [&:has([data-state=checked])>div>div>div]:bg-primary [&:has([data-state=checked])>div>div]:border-primary [&:has([data-state=checked])>div]:border-primary">
                          <RadioGroupItem value="initial" className="sr-only" />
                          <div className="flex items-center gap-4 rounded-md border-2 p-4">
                            <div className="h-6 w-6 rounded-full border-2 p-0.5">
                              <div className="h-4 w-4 rounded-full" />
                            </div>
                            <div className="">
                              <h6 className="text-lg font-semibold">
                                Modificar saldo inicial
                              </h6>
                              <p className="text-md font-light leading-tight text-muted-foreground">
                                Essa opção altera seu saldo inicial para
                                reajustar seu saldo atual. Ao fazer isso, alguns
                                dos seus saldos do final do mês serão
                                impactados.
                              </p>
                            </div>
                          </div>
                        </Label>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {type === 'transaction' && (
                <FormField
                  control={control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="flex-1 space-y-2">
                      <FormLabel htmlFor="description">Descrição</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          id="description"
                          autoComplete="name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                loading={isSubmitting}
                disabled={Number(current_balance) === account.current_balance}
              >
                Reajustar saldo
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
