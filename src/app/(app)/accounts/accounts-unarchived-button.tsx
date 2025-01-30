import { Icon } from '@/components/icon'
import { Button } from '@/components/ui/button'
import { queryClient } from '@/libs/react-query'
import { Account } from '@/type/account'
import { PropsWithChildren } from 'react'
import { toast } from 'sonner'
import { archiveAccountAction } from './actions'

interface AccountsUnarchiveButtonProps extends PropsWithChildren {
  account: Account
}

export function AccountsUnarchiveButton({
  account,
}: AccountsUnarchiveButtonProps) {
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await archiveAccountAction(account.id, false)
      queryClient.invalidateQueries({
        queryKey: ['accounts'],
      })
      queryClient.invalidateQueries({
        queryKey: ['balance', 'accounts'],
      })
      toast.success('Conta desarquivada com sucesso!')
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message)
      }
      console.error(err)
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <Button className="size-8" variant="ghost" size="icon">
        <Icon name="ArchiveRestore" />
      </Button>
    </form>
  )
}
