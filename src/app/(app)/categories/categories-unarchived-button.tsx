import { Icon } from '@/components/icon'
import { Button } from '@/components/ui/button'
import { queryClient } from '@/libs/react-query'
import { Category } from '@/type/category'
import { PropsWithChildren } from 'react'
import { toast } from 'sonner'
import { archiveCategoryAction } from './actions'

interface CategoriesUnarchiveButtonProps extends PropsWithChildren {
  category: Category
}

export function CategoriesUnarchiveButton({
  category,
}: CategoriesUnarchiveButtonProps) {
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await archiveCategoryAction(category.id, false)
      queryClient.invalidateQueries({
        queryKey: ['categories', category.type],
      })
      toast.success('Categoria desarquivada com sucesso!')
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
