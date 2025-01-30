import { z } from 'zod'

export const createCategorySchema = z.object({
  name: z.string().min(1, { message: 'Please, provide a valid name.' }),
  icon: z.string().min(1, { message: 'Please, provide a valid icon' }),
  color: z.string().min(1, { message: 'Please, provide a valid color' }),
  parent_id: z.string().optional(),
  type: z.enum(['income', 'expense']),
})
