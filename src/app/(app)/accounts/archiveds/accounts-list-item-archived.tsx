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
import { AccountsDeleteDialog } from '../accounts-delete-dialog'
import { AccountsUnarchiveButton } from '../accounts-unarchived-button'

interface AccountsListItemProps {
  item: Account
}

export function AccountsListItemArchived({ item }: AccountsListItemProps) {
  const [isShowDialog, setShowDialog] = useState<number | null>(null)
  return (
    <>
      <AccountsDeleteDialog
        isOpen={isShowDialog === 1}
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
        <TableCell className="flex justify-end gap-1.5 pl-0 text-right">
          <Tooltip>
            <TooltipTrigger asChild>
              <AccountsUnarchiveButton account={item} />
            </TooltipTrigger>
            <TooltipContent>
              <p>Desarquivar conta</p>
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
                <Icon name="Trash2" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Excluir conta</p>
            </TooltipContent>
          </Tooltip>
        </TableCell>
      </TableRow>
    </>
  )
}
