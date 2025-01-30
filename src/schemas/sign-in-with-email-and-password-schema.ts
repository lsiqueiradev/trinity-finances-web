import { z } from 'zod'

export const signInWithEmailAndPasswordSchema = z.object({
  email: z
    .string()
    .email({ message: 'Please, provide a valid e-mail address.' }),
  password: z
    .string()
    .min(1, { message: 'Please, provide your password' })
    .min(8, { message: 'Password must be at least 8 characters long.' }),
})
