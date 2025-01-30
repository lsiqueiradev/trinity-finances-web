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
import { typeEnum } from '@/enums/types'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { Icon } from '@/components/icon'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { ScrollArea } from '@/components/ui/scroll-area'
import { colorsDefault } from '@/data/colors'
import { iconsDefault } from '@/data/icons'
import { queryClient } from '@/libs/react-query'
import { cn } from '@/libs/utils'
import { createCategorySchema } from '@/schemas/create-category-schema'
import { icons } from 'lucide-react'
import { Dispatch, PropsWithChildren, SetStateAction, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { createCategoryAction } from './actions'

interface CategoriesCreateDialogProps extends PropsWithChildren {
  type: 'expense' | 'income'
  isOpen: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

type CreateCategorySchema = z.infer<typeof createCategorySchema>

export function CategoriesCreateDialog({
  children,
  type,
  isOpen,
  setOpen,
}: CategoriesCreateDialogProps) {
  const form = useForm<CreateCategorySchema>({
    mode: 'onChange',
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      type,
      name: '',
      icon: '',
      color: '',
    },
  })

  const {
    reset,
    control,
    handleSubmit,
    formState: { isSubmitting },
    watch,
  } = form

  const onSubmit = async (data: CreateCategorySchema) => {
    try {
      await createCategoryAction(data)
      queryClient.invalidateQueries({
        queryKey: ['categories', type],
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

  const selectedColor = watch('color')
  const selectedIcon = watch('icon')

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
              <DialogTitle>Adicionar categoria de {typeEnum[type]}</DialogTitle>
              <DialogDescription />
            </DialogHeader>
            <div className="space-y-2">
              <div className="flex items-center gap-6">
                <div className="size-20 rounded-full bg-muted p-1">
                  <div
                    className="flex h-full w-full items-center justify-center rounded-full bg-accent"
                    style={{ backgroundColor: selectedColor }}
                  >
                    {selectedIcon && (
                      <Icon
                        name={selectedIcon as keyof typeof icons}
                        className="size-10 text-white"
                      />
                    )}
                  </div>
                </div>
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
                          placeholder="Nome da categoria"
                          autoComplete="name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={control}
                name="color"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel htmlFor="color">Cor</FormLabel>
                    <FormControl>
                      <RadioGroup
                        className="flex flex-1 flex-wrap items-center justify-center gap-1"
                        onValueChange={field.onChange}
                        {...field}
                      >
                        {colorsDefault.map((color) => (
                          <Label
                            key={color}
                            className={cn(
                              'size-10 cursor-pointer rounded-full p-1 hover:bg-accent',
                              selectedColor === color && 'bg-accent',
                            )}
                          >
                            <RadioGroupItem value={color} className="sr-only" />
                            <div
                              className="flex h-full w-full items-center justify-center rounded-full"
                              style={{ backgroundColor: color }}
                            >
                              {selectedColor === color && (
                                <Icon
                                  name="Check"
                                  className="size-5 text-white"
                                />
                              )}
                            </div>
                          </Label>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="icon"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel htmlFor="icon">Icone</FormLabel>
                    <FormControl>
                      <RadioGroup onValueChange={field.onChange} {...field}>
                        <ScrollArea>
                          <div className="flex h-36 flex-1 flex-wrap items-center justify-center gap-2">
                            {iconsDefault.map((icon) => (
                              <Label
                                key={icon}
                                className={cn(
                                  'flex size-10 cursor-pointer items-center justify-center rounded-full bg-muted p-0.5 text-primary',
                                  selectedIcon === icon &&
                                    'bg-muted-foreground text-primary-foreground',
                                )}
                              >
                                <RadioGroupItem
                                  value={icon}
                                  className="sr-only"
                                />
                                <Icon name={icon} className="size-5" />
                              </Label>
                            ))}
                          </div>
                        </ScrollArea>
                      </RadioGroup>
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
                Criar categoria
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
