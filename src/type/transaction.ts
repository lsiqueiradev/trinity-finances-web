import { Account } from './account'
import { Category } from './category'

export interface Transaction {
  id: string | null
  description: string
  observation: string | null
  amount: number
  type: 'expense' | 'income'
  date: string
  frequency: string | null
  total_installments: number | null
  current_installments: number | null
  is_installments: boolean
  is_recurring: boolean
  is_confirmed: boolean
  created_at: string
  updated_at: string
  category: Category
  account: Account
}

export interface GetTransactionRequest {
  month: number
  year: number
  order?: 'asc' | 'desc'
}
