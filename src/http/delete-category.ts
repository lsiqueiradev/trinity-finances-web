import { api } from '@/libs/ky'

export async function deleteCategory(categoryId: string) {
  const result = await api.delete(`categories/${categoryId}`)
  return result
}
