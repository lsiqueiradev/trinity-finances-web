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
import { Account } from '@/type/account'

import { queryClient } from '@/libs/react-query'
import { Dispatch, PropsWithChildren, SetStateAction, useState } from 'react'
import { toast } from 'sonner'
import { archiveAccountAction } from './actions'

interface AccountsArchiveDialogProps extends PropsWithChildren {
  isOpen: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  account: Account
}

export function AccountsArchiveDialog({
  children,
  isOpen,
  setOpen,
  account,
}: AccountsArchiveDialogProps) {
  const [isLoading, setLoading] = useState(false)
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    try {
      await archiveAccountAction(account.id, true)
      queryClient.invalidateQueries({
        queryKey: ['accounts'],
      })
      setOpen(false)
      toast.success('Conta arquivada com sucesso!')
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message)
      }
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <form onSubmit={onSubmit} className="space-y-6">
          <DialogHeader>
            <DialogTitle>Arquivar conta</DialogTitle>
            <DialogDescription className="space-y-2 whitespace-pre-line">
              Arquivar é uma opção muito útil quando temos aquela conta que não
              movimentamos mais e desejamos apenas tirá-la da relação de contas,
              mantendo os lançamentos vinculados a ela. {'\n\n'}
              <span className="text-sm font-semibold text-primary">
                Você tem certeza que deseja arquivar a conta{' '}
                {account.description}?
              </span>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancelar
            </Button>
            <Button type="submit" loading={isLoading}>
              Arquivar conta
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
