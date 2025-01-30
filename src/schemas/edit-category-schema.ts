import { z } from 'zod'

export const editCategorySchema = z.object({
  id: z.string().min(1, { message: 'Please, provide a valid id' }),
  name: z.string().min(1, { message: 'Please, provide a valid name.' }),
  icon: z.string().min(1, { message: 'Please, provide a valid icon' }),
  color: z.string().min(1, { message: 'Please, provide a valid color' }),
})
