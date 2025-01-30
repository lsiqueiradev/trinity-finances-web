type TransactionResponse = {
  balance: number
  total_incomes: number
  total_expenses: number
  monthly_balance: number
  monthly_status: 'past' | 'current' | 'future'
}

type AccountsResponse = {
  current_balance: number
  predicted_or_final_balance: number
}

type DashboardResponse = {
  balance: number
  total_incomes: number
  total_expenses: number
  monthly_balance: number
  monthly_status: 'past' | 'current' | 'future'
}

type CardsResponse = {
  cards: Array<{ id: string; cardNumber: string; balance: number }>
}

export type BalanceResponse<T> = T extends 'transactions'
  ? TransactionResponse
  : T extends 'accounts'
    ? AccountsResponse
    : T extends 'dashboard'
      ? DashboardResponse
      : T extends 'cards'
        ? CardsResponse
        : never

export type BalanceType = 'transactions' | 'accounts' | 'dashboard' | 'cards'

export interface GetBalanceRequest<T extends BalanceType> {
  type: T
  month: number
  year: number
  archived?: boolean
}
