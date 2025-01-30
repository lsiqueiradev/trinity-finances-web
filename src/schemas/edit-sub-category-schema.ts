import { z } from 'zod'

export const editSubCategorySchema = z.object({
  id: z.string().min(1, { message: 'Please, provide a valid id' }),
  name: z.string().min(1, { message: 'Please, provide a valid name.' }),
  parent_id: z
    .string()
    .min(1, { message: 'Please, provide a valid parent id' })
    .uuid(),
})
