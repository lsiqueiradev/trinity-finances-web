'use client'

import { CategoriesSwitcherType } from '@/components/categories-switcher-type'
import { Icon } from '@/components/icon'
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
import { typeEnum } from '@/enums/types'
import { getCategories } from '@/http/get-categories'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { CategoriesCreateDialog } from './categories-create-dialog'
import { CategoriesListItem } from './categories-list-item'
import { CategoriesSkeleton } from './categories-skeleton'

export function CategoriesList() {
  const pathname = usePathname()
  const archived = pathname.split('/')[2] === 'archiveds'
  const [type, setType] = useState<'expense' | 'income'>('expense')
  const [isCreateCategoryDialogOpen, setCreateCategoryDialogOpen] =
    useState(false)

  const { data, isLoading, error } = useQuery({
    queryKey: ['categories', type],
    queryFn: () => getCategories({ type, archived }),
    placeholderData: (previousData) => previousData,
  })

  useEffect(() => {
    if (window.tempData?.type) {
      setType(window.tempData.type)
    }
  }, [])
  return (
    <>
      <CategoriesCreateDialog
        type={type}
        isOpen={isCreateCategoryDialogOpen}
        setOpen={setCreateCategoryDialogOpen}
      />
      <div className="flex items-center justify-between">
        <CategoriesSwitcherType onTypeChange={setType} />
        <div className="flex items-center justify-end gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                variant="secondary"
                onClick={() => setCreateCategoryDialogOpen(true)}
              >
                <Icon name="CirclePlus" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Adicionar categoria de {typeEnum[type]} </p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button size="icon" variant="secondary">
                <Icon name="Shuffle" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Mover transações (em breve)</p>
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
                  <Link href="/categories/archiveds">
                    <Icon name="Archive" className="mr-2 size-5" />
                    Categorias arquivadas
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <Card>
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Nome</TableHead>
              <TableHead>Ícone</TableHead>
              <TableHead>Cor</TableHead>
              <TableHead className="pl-0 text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading && <CategoriesSkeleton />}
            {!isLoading &&
              !error &&
              data?.map((category) => (
                <CategoriesListItem
                  key={category.id}
                  item={category}
                  archived={archived}
                />
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
                  <p>Nenhuma categoria encontrada.</p>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </>
  )
}
