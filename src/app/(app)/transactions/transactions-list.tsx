'use client'

import { Icon } from '@/components/icon'
import { MonthSwitcher } from '@/components/month-switcher'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { getTransactions } from '@/http/get-transactions'
import { cn } from '@/libs/utils'
import { DateChange } from '@/type/data-change'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { TransactionsHeader } from './transactions-header'
import { TransactionsListItem } from './transactions-list-item'
import { TransactionsSkeleton } from './transactions-skeleton'

export function TransactionsList() {
  const [order, setOrder] = useState<'asc' | 'desc'>('desc')
  const [{ month, year }, setDate] = useState<DateChange>({
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  })

  const { data, isLoading, error } = useQuery({
    queryKey: ['transactions', month, year, order],
    queryFn: () => getTransactions({ month, year, order }),
    placeholderData: (previousData) => previousData,
  })

  const handleDateChange = (newDate: DateChange) => {
    setDate(newDate)
  }

  return (
    <>
      <div className="justify-content grid grid-cols-3 items-center">
        <div />
        <div className="flex items-center justify-center">
          <MonthSwitcher onDateChange={handleDateChange} />
        </div>
        <div className="flex justify-end">
          <div className="flex items-center justify-end gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="icon" variant="secondary">
                  <Icon name="CirclePlus" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Adicionar conta </p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <TransactionsHeader month={month} year={year} />
        <Card>
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>Situação</TableHead>
                <TableHead>
                  <div
                    className="flex cursor-pointer items-center justify-start gap-1"
                    onClick={() => setOrder(order === 'asc' ? 'desc' : 'asc')}
                  >
                    Data
                    <Icon
                      name="ArrowDown"
                      className={cn(
                        'size-4 transform transition-transform duration-300 ease-in-out',
                        order === 'desc' ? 'rotate-0' : '-rotate-180',
                      )}
                    />
                  </div>
                </TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Conta</TableHead>
                <TableHead className="pr-4 text-right">Valor</TableHead>
                <TableHead className="pl-0 text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading && <TransactionsSkeleton />}
              {!isLoading &&
                !error &&
                data?.map((item) => (
                  <TransactionsListItem key={item.id} transaction={item} />
                ))}

              {error && (
                <TableRow>
                  <TableCell className="text-center" colSpan={7}>
                    <p>Ocorreu um erro ao recuperar os dados.</p>
                  </TableCell>
                </TableRow>
              )}
              {data?.length === 0 && (
                <TableRow>
                  <TableCell className="text-center" colSpan={7}>
                    <p>Nenhuma transação no período encontrada.</p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Card>
      </div>
    </>
  )
}
