import { z } from 'zod'

export const deleteSchema = z.object({
  action: z
    .string()
    .trim()
    .toLowerCase()
    .refine((value) => value === 'excluir', {
      message: 'Please, provide a valid action',
    }),
})
