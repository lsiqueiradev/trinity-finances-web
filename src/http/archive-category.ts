import { api } from '@/libs/ky'

export async function archiveCategory(categoryId: string, isArchive: boolean) {
  const result = await api.post(`categories/${categoryId}/archive`, {
    searchParams: {
      status: isArchive,
    },
  })
  return result
}
