import { z } from 'zod'

export const editAccountSchema = z.object({
  id: z.string().min(1, { message: 'Please, provide a valid id' }),
  description: z
    .string()
    .min(1, { message: 'Please, provide a valid description' }),
  color: z.string().min(1, { message: 'Please, provide a valid color' }),
  institution_id: z
    .string()
    .min(1, { message: 'Please, provide a valid institution' }),
  is_initial_screen: z.boolean(),
})
