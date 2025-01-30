import { api } from '@/libs/ky'

export async function deleteAccount(accountId: string) {
  const result = await api.delete(`accounts/${accountId}`)
  return result
}
