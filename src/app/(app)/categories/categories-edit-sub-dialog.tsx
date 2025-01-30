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
import { typeEnum } from '@/enums/types'
import { queryClient } from '@/libs/react-query'
import { editSubCategorySchema } from '@/schemas/edit-sub-category-schema'
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
import { editCategoryAction } from './actions'

interface CategoriesEditSubDialogProps extends PropsWithChildren {
  isOpen: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  category: Category
}

type EditSubCategorySchema = z.infer<typeof editSubCategorySchema>

export function CategoriesEditSubDialog({
  children,
  isOpen,
  setOpen,
  category,
}: CategoriesEditSubDialogProps) {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const form = useForm<EditSubCategorySchema>({
    mode: 'onChange',
    resolver: zodResolver(editSubCategorySchema),
    defaultValues: {
      id: '',
      parent_id: '',
      name: '',
    },
  })

  const {
    reset,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = form

  const onSubmit = async (data: EditSubCategorySchema) => {
    try {
      await editCategoryAction(data)
      queryClient.invalidateQueries({
        queryKey: ['categories', category.type],
      })
      setOpen(false)
      toast.success('Categoria editada com sucesso!')
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message)
      }
      console.error(err)
    }
  }

  useEffect(() => {
    if (isOpen) {
      if (category) {
        reset({
          id: category.id,
          parent_id: category.parent_id || '',
          name: category.name,
        })
      }
      setTimeout(() => {
        if (inputRef.current && 'current' in inputRef && inputRef.current) {
          inputRef.current.focus()
          const length = inputRef.current.value.length
          inputRef.current.setSelectionRange(length, length)
        }
      }, 1)
    }
  }, [isOpen])

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <DialogHeader>
              <DialogTitle>
                Editar sub-categoria de {typeEnum[category.type]}.
              </DialogTitle>
              <DialogDescription />
            </DialogHeader>
            <div>
              <FormField
                control={control}
                name="name"
                render={({ field }) => (
                  <FormItem className="flex-1 space-y-2">
                    <FormLabel htmlFor="name">Nome da categoria</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        id="name"
                        placeholder="Nome da categoria"
                        autoComplete="name"
                        {...field}
                        ref={(e) => {
                          field.ref(e)
                          inputRef.current = e
                        }}
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
                Editar sub categoria
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
