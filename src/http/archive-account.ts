import { api } from '@/libs/ky'

export async function archiveAccount(accountId: string, isArchive: boolean) {
  console.log(accountId, isArchive)
  const result = await api
    .post(`accounts/${accountId}/archive`, {
      searchParams: { status: isArchive },
    })
    .json()
  return result
}
