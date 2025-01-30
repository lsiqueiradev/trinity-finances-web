import { AccountIconLabel } from '@/components/account-icon-label'
import { Icon } from '@/components/icon'
import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { formatCurrency } from '@/libs/utils'
import { Account } from '@/type/account'
import { useState } from 'react'
import { AccountsAdjustBalanceDialog } from './accounts-adjust-balance-dialog'
import { AccountsArchiveDialog } from './accounts-archived-dialog'
import { AccountsEditDialog } from './accounts-edit-dialog'

interface AccountsListItemProps {
  item: Account
}

export function AccountsListItem({ item }: AccountsListItemProps) {
  const [isShowDialog, setShowDialog] = useState<number | null>(null)
  return (
    <>
      <AccountsEditDialog
        isOpen={isShowDialog === 1}
        setOpen={() => setShowDialog(null)}
        account={item}
      />
      <AccountsAdjustBalanceDialog
        isOpen={isShowDialog === 2}
        setOpen={() => setShowDialog(null)}
        account={item}
      />
      <AccountsArchiveDialog
        isOpen={isShowDialog === 3}
        setOpen={() => setShowDialog(null)}
        account={item}
      />
      <TableRow>
        <TableCell>
          <AccountIconLabel url={item.institution.logo_url} />
        </TableCell>
        <TableCell>{item.description}</TableCell>
        <TableCell className="font-bold">
          {formatCurrency(item.current_balance)}
        </TableCell>
        <TableCell className="font-bold">
          {formatCurrency(item.predicted_or_final_balance)}
        </TableCell>
        <TableCell className="flex justify-end gap-1.5 pl-0 text-right">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button className="size-8" variant="ghost" size="icon">
                <Icon name="ListPlus" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Adicionar despesa</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                className="size-8"
                variant="ghost"
                size="icon"
                onClick={() => setShowDialog(2)}
              >
                <Icon name="Banknote" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Reajusta saldo</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                className="size-8"
                variant="ghost"
                size="icon"
                onClick={() => setShowDialog(3)}
              >
                <Icon name="Archive" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Arquivar conta</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                className="size-8"
                variant="ghost"
                size="icon"
                onClick={() => setShowDialog(1)}
              >
                <Icon name="Pencil" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Editar conta</p>
            </TooltipContent>
          </Tooltip>
        </TableCell>
      </TableRow>
    </>
  )
}
