'use client'

import { Card } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { getAccounts } from '@/http/get-accounts'
import { DateChange } from '@/type/data-change'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { AccountsSkeleton } from '../accounts-skeleton'
import { AccountsListItemArchived } from './accounts-list-item-archived'
import { AccountsSidebarArchived } from './accounts-sidebar-archived'

export function AccountsListArchived() {
  const [{ month, year }] = useState<DateChange>({
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  })

  const { data, isLoading, error } = useQuery({
    queryKey: ['accounts', 'archived', month, year],
    queryFn: () => getAccounts({ month, year, archived: true }),
    placeholderData: (previousData) => previousData,
  })

  return (
    <>
      <div className="flex gap-4">
        <div className="flex-1">
          <Card>
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead>Ícone</TableHead>
                  <TableHead>Nome</TableHead>
                  <TableHead>Saldo atual</TableHead>
                  <TableHead className="pl-0 text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading && <AccountsSkeleton />}
                {!isLoading &&
                  !error &&
                  data?.map((account) => (
                    <AccountsListItemArchived key={account.id} item={account} />
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
        <AccountsSidebarArchived month={month} year={year} />
      </div>
    </>
  )
}
