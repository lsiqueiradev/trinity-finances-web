import { z } from 'zod'

export const adjustBalanceAccountSchema = z.object({
  id: z.string().min(1, { message: 'Please, provide a valid id' }),
  current_balance: z.string({
    message: 'Please, provide a valid initial balance.',
  }),
  description: z.string().optional(),
  type: z.enum(['transaction', 'initial']),
})
