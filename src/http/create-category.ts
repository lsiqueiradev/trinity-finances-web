import { api } from '@/libs/ky'
import { Category, CreateCategoryRequest } from '@/type/category'

export async function createCategory({
  type,
  name,
  icon,
  color,
  parent_id,
}: CreateCategoryRequest) {
  const result = await api
    .post('categories', { json: { type, name, icon, color, parent_id } })
    .json<Category[]>()
  return result
}
