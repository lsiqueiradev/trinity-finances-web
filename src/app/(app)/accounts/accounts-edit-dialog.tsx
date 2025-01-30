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
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Switch } from '@/components/ui/switch'
import { colorsDefault } from '@/data/colors'
import { queryClient } from '@/libs/react-query'
import { cn } from '@/libs/utils'
import { editAccountSchema } from '@/schemas/edit-account-schema'
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
import { editAccountAction } from './actions'

interface AccountsEditDialogProps extends PropsWithChildren {
  isOpen: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  account: Account
}

type EditAccountSchema = z.infer<typeof editAccountSchema>

export function AccountsEditDialog({
  children,
  isOpen,
  setOpen,
  account,
}: AccountsEditDialogProps) {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const form = useForm<EditAccountSchema>({
    mode: 'onChange',
    resolver: zodResolver(editAccountSchema),
    defaultValues: {
      id: '',
      description: '',
      color: '',
      institution_id: '',
    },
  })

  const {
    reset,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = form

  const onSubmit = async (data: EditAccountSchema) => {
    try {
      await editAccountAction(data)
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
          ...account,
          institution_id: account.institution.id,
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

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <DialogHeader>
              <DialogTitle>Editar conta</DialogTitle>
              <DialogDescription />
            </DialogHeader>
            <div className="space-y-2">
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
                        ref={(e) => {
                          field.ref(e)
                          inputRef.current = e
                        }}
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
                      <InstitutionSelect
                        {...field}
                        institution={account.institution}
                      />
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
                              field.value === color && 'bg-accent',
                            )}
                          >
                            <RadioGroupItem value={color} className="sr-only" />
                            <div
                              className="flex h-full w-full items-center justify-center rounded-full"
                              style={{ backgroundColor: color }}
                            >
                              {field.value === color && (
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
                Editar conta
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
