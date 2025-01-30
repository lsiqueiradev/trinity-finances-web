'use client'

import { Icon } from '@/components/icon'
import { MonthSwitcher } from '@/components/month-switcher'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
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
import { getAccounts } from '@/http/get-accounts'
import { DateChange } from '@/type/data-change'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { useState } from 'react'
import { AccountsCreateDialog } from './accounts-create-dialog'
import { AccountsListItem } from './accounts-list-item'
import { AccountsSidebar } from './accounts-sidebar'
import { AccountsSkeleton } from './accounts-skeleton'

export function AccountsList() {
  const [isCreateAccountDialogOpen, setCreateAccountDialogOpen] =
    useState(false)
  const [{ month, year }, setDate] = useState<DateChange>({
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  })

  const { data, isLoading, error } = useQuery({
    queryKey: ['accounts', month, year],
    queryFn: () => getAccounts({ month, year }),
    placeholderData: (previousData) => previousData,
  })

  const handleDateChange = (newDate: DateChange) => {
    setDate(newDate)
  }

  return (
    <>
      <AccountsCreateDialog
        isOpen={isCreateAccountDialogOpen}
        setOpen={setCreateAccountDialogOpen}
      />
      <div className="grid grid-cols-3 items-center justify-between">
        <div />
        <div className="flex items-center justify-center">
          <MonthSwitcher onDateChange={handleDateChange} />
        </div>
        <div className="flex justify-end">
          <div className="flex items-center justify-end gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="secondary"
                  onClick={() => setCreateAccountDialogOpen(true)}
                >
                  <Icon name="CirclePlus" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Adicionar conta </p>
              </TooltipContent>
            </Tooltip>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="icon" variant="secondary">
                  <Icon name="EllipsisVertical" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuGroup>
                  <DropdownMenuItem asChild>
                    <Link href="/accounts/archiveds">
                      <Icon name="Archive" className="mr-2 size-5" />
                      Contas arquivadas
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      <div className="flex gap-4">
        <div className="flex-1">
          <Card>
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead>Ícone</TableHead>
                  <TableHead>Nome</TableHead>
                  <TableHead>Saldo atual</TableHead>
                  <TableHead>Saldo previsto</TableHead>
                  <TableHead className="pl-0 text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading && <AccountsSkeleton />}
                {!isLoading &&
                  !error &&
                  data?.map((account) => (
                    <AccountsListItem key={account.id} item={account} />
                  ))}
                {error && (
                  <TableRow>
                    <TableCell className="text-center" colSpan={4}>
                      <p>Ocorreu um erro ao recuperar os dados.</p>
                    </TableCell>
                  </TableRow>
                )}
                {data?.length === 0 && (
                  <TableRow>
                    <TableCell className="text-center" colSpan={4}>
                      <p>Nenhuma conta encontrada.</p>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Card>
        </div>
        <AccountsSidebar month={month} year={year} />
      </div>
    </>
  )
}
