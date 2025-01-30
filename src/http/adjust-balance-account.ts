import { api } from '@/libs/ky'
import { AdjustBalanceAccountRequest } from '@/type/account'

export async function adjustBalanceAccount({
  id,
  current_balance,
  type,
}: AdjustBalanceAccountRequest) {
  const result = await api
    .put(`accounts/${id}/balance`, {
      json: {
        id,
        current_balance,
        type,
      },
    })
    .json()
  return result
}
