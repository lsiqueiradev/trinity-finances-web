import { api } from '@/libs/ky'
import { Category, GetCategoryRequest } from '@/type/category'

export async function getCategories({
  type,
  archived = false,
}: GetCategoryRequest) {
  const result = await api
    .get('categories', { searchParams: { type, archived } })
    .json<Category[]>()
  return result
}
