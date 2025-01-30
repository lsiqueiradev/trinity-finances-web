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
import { Input } from '@/components/ui/input'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { typeEnum } from '@/enums/types'
import { queryClient } from '@/libs/react-query'
import { deleteSchema } from '@/schemas/delete-schema'
import { Category } from '@/type/category'
import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useEffect,
  useRef,
} from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { deleteCategoryAction } from './actions'

interface CategoriesDeleteDialogProps extends PropsWithChildren {
  isOpen: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  category: Category
}

type DeleteSchema = z.infer<typeof deleteSchema>

export function CategoriesDeleteDialog({
  children,
  isOpen,
  setOpen,
  category,
}: CategoriesDeleteDialogProps) {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const form = useForm<DeleteSchema>({
    mode: 'onChange',
    resolver: zodResolver(deleteSchema),
  })

  const {
    reset,
    control,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = form

  const onSubmit = async () => {
    try {
      await deleteCategoryAction(category.id)
      queryClient.invalidateQueries({
        queryKey: ['categories', category.type],
      })
      setOpen(false)
      toast.success('Categoria excluída com sucesso!')
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message)
      }
      console.error(err)
    }
  }

  useEffect(() => {
    reset()
  }, [isOpen])

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <DialogHeader>
              <DialogTitle>
                Excluir categoria de {typeEnum[category.type]}.
              </DialogTitle>
              <DialogDescription>
                Tudo certo para excluir a categoria{' '}
                <span className="font-bold">{category.name}</span>. Digite
                "Excluir" para finalizar o processo.
              </DialogDescription>
            </DialogHeader>
            <div>
              <FormField
                control={control}
                name="action"
                render={({ field }) => (
                  <FormItem className="flex-1 space-y-2">
                    <FormControl>
                      <Input
                        type="text"
                        id="action"
                        placeholder="Excluir"
                        autoComplete="off"
                        {...field}
                        ref={(e) => {
                          field.ref(e)
                          inputRef.current = e
                        }}
                      />
                    </FormControl>
                    <FormDescription>
                      Digite a palavra "Excluir" para prosseguir com a ação.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={!isValid} loading={isSubmitting}>
                Excluir categoria
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
