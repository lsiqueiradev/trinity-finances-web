import { api } from '@/libs/ky'
import { Account, GetAccountRequest } from '@/type/account'

export async function getAccounts({
  month,
  year,
  archived = false,
}: GetAccountRequest) {
  const result = await api
    .get('accounts', { searchParams: { month, year, archived } })
    .json<Account[]>()
  return result
}
