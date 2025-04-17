import { AccountIconLabel } from '@/components/account-icon-label'
import { CategoryIconLabel } from '@/components/category-icon-label'
import { EntityStatus } from '@/components/entity-status'
import { Icon } from '@/components/icon'
import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn, formatCurrency, formatDate } from '@/libs/utils'
import { Transaction } from '@/type/transaction'
import { icons } from 'lucide-react'

interface TransactionsListItemProps {
  transaction: Transaction
}

export function TransactionsListItem({
  transaction,
}: TransactionsListItemProps) {
  if (!transaction.type && !transaction.description) {
    return null
  }
  if (!transaction.type) {
    return (
      <TableRow className="hover:bg-transparent">
        <TableCell colSpan={6}>
          <div className="flex w-full flex-row items-center justify-between rounded-lg bg-muted px-2 py-1">
            <p>{transaction.description}</p>
            <p className="font-semibold">
              {formatCurrency(transaction.amount)}
            </p>
          </div>
        </TableCell>
        <TableCell colSpan={1} />
      </TableRow>
    )
  }
  return (
    <TableRow
      key={transaction.id}
      className="border-b-0 border-t hover:bg-transparent"
    >
      <TableCell className="flex gap-2">
        {transaction.is_confirmed ? (
          <EntityStatus
            name="CircleCheck"
            className="bg-green-200 text-green-600"
          />
        ) : (
          <EntityStatus
            name="CircleAlert"
            className="bg-red-200 text-red-600"
          />
        )}

        {/* <EntityStatus name="CreditCard" /> */}
      </TableCell>
      <TableCell>{formatDate(transaction.date)}</TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <p>{transaction.description}</p>
          {transaction.observation && (
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex size-7 cursor-pointer items-center justify-center rounded-full bg-muted text-muted-foreground">
                  <Icon name="FileText" className="size-4" />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{transaction.observation}</p>
              </TooltipContent>
            </Tooltip>
          )}
        </div>
      </TableCell>
      <TableCell>
        <CategoryIconLabel
          label={transaction.category.name}
          icon={transaction.category.icon as keyof typeof icons}
          iconBg={transaction.category.color}
          iconClasses="text-white"
        />
      </TableCell>
      <TableCell>
        <AccountIconLabel
          label={transaction.account.description}
          url={transaction.account.institution.logo_url}
        />
      </TableCell>
      <TableCell
        className={cn(
          'pr-4 text-right font-bold',
          transaction.type === 'income' ? 'text-green-600' : 'text-red-600',
        )}
      >
        {formatCurrency(transaction.amount)}
      </TableCell>
      <TableCell className="flex justify-end gap-0.5 pl-0 text-right">
        {!transaction.is_confirmed && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button className="size-8" variant="ghost" size="icon">
                <Icon name="CircleCheckBig" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Efetivar transação</p>
            </TooltipContent>
          </Tooltip>
        )}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button className="size-8" variant="ghost" size="icon">
              <Icon name="Pencil" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Editar transação</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button className="size-8" variant="ghost" size="icon">
              <Icon name="Trash2" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Excluir transação</p>
          </TooltipContent>
        </Tooltip>
      </TableCell>
    </TableRow>
  )
}
