export interface Objective {
  id: string
  name: string
  description: string | null
  date: string
  initial_amount: number
  target_amount: number
  icon: string
  color: string
  status: string
  created_at: string
  updated_at: string
  current_amount: number
  remaining_amount: number
  frequency: {
    amount: number
    message: string
  }
  percentage_remaining_amount: number
  deposits: []
}

export interface CreateObjetiveRequest {
  date: string
  initial_amount: string
  target_amount: string
  name: string
  description?: string
  color: string
  icon: string
}

export interface GetObjectiveRequest {
  status?: 'actived' | 'paused' | 'finished'
}
