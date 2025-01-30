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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { queryClient } from '@/libs/react-query'
import { createSubCategorySchema } from '@/schemas/create-sub-category-schema'
import { Category } from '@/type/category'
import { Dispatch, PropsWithChildren, SetStateAction, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { createCategoryAction } from './actions'

interface CategoriesCreateSubDialogProps extends PropsWithChildren {
  isOpen: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  category_parent: Category
}

type CreateSubCategorySchema = z.infer<typeof createSubCategorySchema>

export function CategoriesCreateSubDialog({
  children,
  isOpen,
  setOpen,
  category_parent,
}: CategoriesCreateSubDialogProps) {
  const form = useForm<CreateSubCategorySchema>({
    mode: 'onChange',
    resolver: zodResolver(createSubCategorySchema),
    defaultValues: {
      parent_id: category_parent.id,
      name: '',
    },
  })

  const {
    reset,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = form

  const onSubmit = async (data: CreateSubCategorySchema) => {
    try {
      await createCategoryAction(data)
      queryClient.invalidateQueries({
        queryKey: ['categories', category_parent.type],
      })
      setOpen(false)
      toast.success('Categoria criada com sucesso!')
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
                Adicionar sub-categoria de{' '}
                <span className="underline underline-offset-4">
                  {category_parent.name}
                </span>
                .
              </DialogTitle>
              <DialogDescription />
            </DialogHeader>
            <div>
              <FormField
                control={control}
                name="name"
                render={({ field }) => (
                  <FormItem className="flex-1 space-y-2">
                    <FormLabel htmlFor="name">Nome</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        id="name"
                        placeholder="Nome da sub-categoria"
                        autoComplete="name"
                        {...field}
                      />
                    </FormControl>
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
              <Button type="submit" loading={isSubmitting}>
                Criar sub categoria
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
