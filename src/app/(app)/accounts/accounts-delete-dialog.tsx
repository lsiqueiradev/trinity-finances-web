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

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { queryClient } from '@/libs/react-query'
import { deleteSchema } from '@/schemas/delete-schema'
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
import { deleteAccountAction } from './actions'

interface AccountsDeleteDialogProps extends PropsWithChildren {
  isOpen: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  account: Account
}

type DeleteSchema = z.infer<typeof deleteSchema>

export function AccountsDeleteDialog({
  children,
  isOpen,
  setOpen,
  account,
}: AccountsDeleteDialogProps) {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const form = useForm<DeleteSchema>({
    mode: 'onChange',
    resolver: zodResolver(deleteSchema),
  })

  const {
    reset,
    control,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = form

  const onSubmit = async () => {
    try {
      await deleteAccountAction(account.id)
      queryClient.invalidateQueries({
        queryKey: ['accounts'],
      })

      queryClient.invalidateQueries({
        queryKey: ['balance', 'accounts'],
      })
      setOpen(false)
      toast.success('Categoria excluída com sucesso!')
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message)
      }
      console.error(err)
    }
  }

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
              <DialogTitle>Excluir conta.</DialogTitle>
              <DialogDescription className="space-y-2 whitespace-pre-line">
                Tudo certo para excluir a conta{' '}
                <span className="font-bold">{account.description}</span>. Digite
                "Excluir" para finalizar o processo. {'\n\n'} Ao apagar uma
                conta, todos os dados vinculados a ela também serão apagados.
              </DialogDescription>
            </DialogHeader>
            <div>
              <FormField
                control={control}
                name="action"
                render={({ field }) => (
                  <FormItem className="flex-1 space-y-2">
                    <FormControl>
                      <Input
                        type="text"
                        id="action"
                        placeholder="Excluir"
                        autoComplete="off"
                        {...field}
                        ref={(e) => {
                          field.ref(e)
                          inputRef.current = e
                        }}
                      />
                    </FormControl>
                    <FormDescription>
                      Digite a palavra "Excluir" para prosseguir com a ação.
                    </FormDescription>
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
              <Button type="submit" disabled={!isValid} loading={isSubmitting}>
                Excluir conta
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
