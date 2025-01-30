import { Icon } from '@/components/icon'
import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn } from '@/libs/utils'
import { Category } from '@/type/category'
import { CornerDownRight, icons } from 'lucide-react'
import { useState } from 'react'
import { CategoriesArchiveDialog } from './categories-archived-dialog'
import { CategoriesCreateSubDialog } from './categories-create-sub-dialog'
import { CategoriesDeleteDialog } from './categories-delete-dialog'
import { CategoriesEditDialog } from './categories-edit-dialog'
import { CategoriesListSubItem } from './categories-list-sub-item'
import { CategoriesUnarchiveButton } from './categories-unarchived-button'

interface CategoriesListItemProps {
  item: Category
  archived?: boolean
}

export function CategoriesListItem({
  item,
  archived,
}: CategoriesListItemProps) {
  const [isShowDialog, setShowDialog] = useState<number | null>(null)

  return (
    <>
      <CategoriesEditDialog
        isOpen={isShowDialog === 1}
        setOpen={() => setShowDialog(null)}
        category={item}
      />
      <CategoriesArchiveDialog
        isOpen={isShowDialog === 2}
        setOpen={() => setShowDialog(null)}
        category={item}
      />
      <CategoriesCreateSubDialog
        isOpen={isShowDialog === 3}
        setOpen={() => setShowDialog(null)}
        category_parent={item}
      />
      <CategoriesDeleteDialog
        isOpen={isShowDialog === 4}
        setOpen={() => setShowDialog(null)}
        category={item}
      />
      <>
        <TableRow>
          <TableCell
            className={cn(
              'flex items-center gap-2 text-base',
              item.parent_id && 'text-sm',
            )}
          >
            {item.parent_id && (
              <div className="flex items-center gap-1">
                <CornerDownRight className="ml-2 mr-3 size-4" />
                <div
                  className="size-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
              </div>
            )}
            {item.name}
          </TableCell>
          <TableCell>
            {!item.parent_id && (
              <Icon name={item.icon as keyof typeof icons} className="size-5" />
            )}
          </TableCell>
          <TableCell>
            {!item.parent_id && (
              <div
                className="size-5 rounded-full"
                style={{ backgroundColor: item.color }}
              ></div>
            )}
          </TableCell>
          <TableCell className="flex justify-end gap-1.5 pl-0 text-right">
            {item.is_archived === archived && (
              <>
                {!item.is_archived && (
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
                      <p>Editar</p>
                    </TooltipContent>
                  </Tooltip>
                )}
                {item.is_archived ? (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <CategoriesUnarchiveButton category={item} />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Desarquivar</p>
                    </TooltipContent>
                  </Tooltip>
                ) : (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        className="size-8"
                        variant="ghost"
                        size="icon"
                        onClick={() => setShowDialog(2)}
                      >
                        <Icon name="Archive" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Arquivar</p>
                    </TooltipContent>
                  </Tooltip>
                )}
                {!item.parent_id && !item.is_archived && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        className="size-8"
                        variant="ghost"
                        size="icon"
                        onClick={() => setShowDialog(3)}
                      >
                        <Icon name="ListPlus" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Adicionar subcategoria</p>
                    </TooltipContent>
                  </Tooltip>
                )}
                {item.is_archived && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        className="size-8"
                        variant="ghost"
                        size="icon"
                        onClick={() => setShowDialog(4)}
                      >
                        <Icon name="Trash2" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Excluir categoria</p>
                    </TooltipContent>
                  </Tooltip>
                )}
              </>
            )}
          </TableCell>
        </TableRow>
        {item.subcategories.length > 0 &&
          item.subcategories.map((subCategory) => (
            <CategoriesListSubItem key={subCategory.id} item={subCategory} />
          ))}
      </>
    </>
  )
}
