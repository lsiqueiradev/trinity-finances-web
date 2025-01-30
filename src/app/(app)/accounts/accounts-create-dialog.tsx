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
import { Input } from '@/components/ui/input'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { Icon } from '@/components/icon'
import { InstitutionSelect } from '@/components/institution-select'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { InputAmount } from '@/components/ui/input-amount'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Switch } from '@/components/ui/switch'
import { colorsDefault } from '@/data/colors'
import { queryClient } from '@/libs/react-query'
import { cn, formatCurrencyInCents } from '@/libs/utils'
import { createAccountSchema } from '@/schemas/create-account-schema'
import { Dispatch, PropsWithChildren, SetStateAction, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { createAccountAction } from './actions'

interface AccountsCreateDialogProps extends PropsWithChildren {
  isOpen: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

type CreateAccountSchema = z.infer<typeof createAccountSchema>

export function AccountsCreateDialog({
  children,
  isOpen,
  setOpen,
}: AccountsCreateDialogProps) {
  const form = useForm<CreateAccountSchema>({
    mode: 'onChange',
    resolver: zodResolver(createAccountSchema),
    defaultValues: {
      initial_balance: '0.0',
      description: '',
      color: '',
      institution_id: '',
      is_initial_screen: true,
    },
  })

  const {
    reset,
    control,
    handleSubmit,
    formState: { isSubmitting },
    watch,
  } = form

  const onSubmit = async (data: CreateAccountSchema) => {
    try {
      await createAccountAction(data)
      Promise.all([
        queryClient.invalidateQueries({
          queryKey: ['accounts'],
        }),
        queryClient.invalidateQueries({
          queryKey: ['balance', 'accounts'],
        }),
      ])
      setOpen(false)
      toast.success('Conta criada com sucesso!')
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message)
      }
      console.error(err)
    }
  }

  const selectedColor = watch('color')

  useEffect(() => {
    reset()
  }, [isOpen])

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <DialogHeader>
              <DialogTitle>Adicionar conta</DialogTitle>
              <DialogDescription />
            </DialogHeader>
            <div className="space-y-2">
              <FormField
                control={control}
                name="initial_balance"
                render={({ field }) => (
                  <FormItem className="flex-1 space-y-2">
                    <FormControl>
                      <InputAmount
                        type="text"
                        id="initial_balance"
                        open={isOpen}
                        {...field}
                        value={formatCurrencyInCents(field.value)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                        placeholder="Descrição da conta"
                        autoComplete="account"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="institution_id"
                render={({ field }) => (
                  <FormItem className="flex-1 space-y-2">
                    <FormLabel htmlFor="institution_id">
                      Instituição financeira
                    </FormLabel>
                    <FormControl>
                      <InstitutionSelect {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="color"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel htmlFor="color">Cor</FormLabel>
                    <FormControl>
                      <RadioGroup
                        className="flex flex-1 flex-wrap items-center justify-center gap-1"
                        onValueChange={field.onChange}
                        {...field}
                      >
                        {colorsDefault.map((color) => (
                          <Label
                            key={color}
                            className={cn(
                              'size-10 cursor-pointer rounded-full p-1 hover:bg-accent',
                              selectedColor === color && 'bg-accent',
                            )}
                          >
                            <RadioGroupItem value={color} className="sr-only" />
                            <div
                              className="flex h-full w-full items-center justify-center rounded-full"
                              style={{ backgroundColor: color }}
                            >
                              {selectedColor === color && (
                                <Icon
                                  name="Check"
                                  className="size-5 text-white"
                                />
                              )}
                            </div>
                          </Label>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="is_initial_screen"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex justify-between py-6">
                        <FormLabel
                          htmlFor="is_initial_screen"
                          className="text-md leading-tight"
                        >
                          Incluir na soma da tela inicial
                        </FormLabel>
                        <Switch
                          id="is_initial_screen"
                          checked={field.value}
                          onCheckedChange={(e) => field.onChange(e)}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancelar
              </Button>
              <Button type="submit" loading={isSubmitting}>
                Criar conta
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
