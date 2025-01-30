import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import { queryClient } from '@/libs/react-query'
import { Category } from '@/type/category'
import { Dispatch, PropsWithChildren, SetStateAction, useState } from 'react'
import { toast } from 'sonner'
import { archiveCategoryAction } from './actions'

interface CategoriesArchiveDialogProps extends PropsWithChildren {
  isOpen: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  category: Category
}

export function CategoriesArchiveDialog({
  children,
  isOpen,
  setOpen,
  category,
}: CategoriesArchiveDialogProps) {
  const [isLoading, setLoading] = useState(false)
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    try {
      await archiveCategoryAction(category.id, true)
      queryClient.invalidateQueries({
        queryKey: ['categories', category.type],
      })
      setOpen(false)
      toast.success('Categoria arquivada com sucesso!')
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message)
      }
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <form onSubmit={onSubmit} className="space-y-6">
          <DialogHeader>
            <DialogTitle>Arquivar categoria</DialogTitle>
            <DialogDescription>
              Você tem certeza que deseja arquivar a categoria {category.name}?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancelar
            </Button>
            <Button type="submit" loading={isLoading}>
              Arquivar categoria
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
