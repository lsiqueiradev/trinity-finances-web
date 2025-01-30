import { Institution } from './institution'

export interface Account {
  id: string
  description: string
  color: string
  initial_balance: number
  is_initial_screen: boolean
  created_at: string
  updated_at: string
  current_balance: number
  predicted_or_final_balance: number
  institution: Institution
}

export interface CreateAccountRequest {
  initial_balance: string
  description: string
  institution_id: string
  color: string
  is_initial_screen: boolean
}

export interface EditAccountRequest {
  id: string
  description: string
  institution_id: string
  color: string
  is_initial_screen: boolean
}

export interface AdjustBalanceAccountRequest {
  id: string
  current_balance: string
  type: 'transaction' | 'initial'
  description?: string
}

export interface GetAccountRequest {
  month: number
  year: number
  archived?: boolean
}
