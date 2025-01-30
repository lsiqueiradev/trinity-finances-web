import { api } from '@/libs/ky'
import { GetTransactionRequest, Transaction } from '@/type/transaction'

export async function getTransactions({
  month,
  year,
  order = 'desc',
}: GetTransactionRequest) {
  const result = await api
    .get('transactions', { searchParams: { month, year, order } })
    .json<Transaction[]>()
  return result
}
