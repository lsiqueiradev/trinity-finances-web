import { api } from '@/libs/ky'
import { Category, EditCategoryRequest } from '@/type/category'

export async function updateCategory({
  id,
  name,
  icon,
  color,
  parent_id,
}: EditCategoryRequest) {
  const result = await api
    .put(`categories/${id}`, { json: { name, icon, color, parent_id } })
    .json<Category[]>()
  return result
}
