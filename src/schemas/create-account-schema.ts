import { z } from 'zod'

export const createAccountSchema = z.object({
  initial_balance: z.string({
    message: 'Please, provide a valid initial balance.',
  }),
  description: z
    .string()
    .min(1, { message: 'Please, provide a valid description' }),
  color: z.string().min(1, { message: 'Please, provide a valid color' }),
  institution_id: z
    .string()
    .min(1, { message: 'Please, provide a valid institution' }),
  is_initial_screen: z.boolean(),
})
