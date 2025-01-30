import { api } from '@/libs/ky'
import {
  BalanceResponse,
  BalanceType,
  GetBalanceRequest,
} from '@/type/balances'

export async function getBalances<T extends BalanceType>({
  type,
  month,
  year,
  archived = false,
}: GetBalanceRequest<T>) {
  const result = await api
    .get(`balances/${type}`, { searchParams: { month, year, archived } })
    .json<BalanceResponse<T>>()
  return result
}
