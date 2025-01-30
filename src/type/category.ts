export interface Category {
  id: string
  parent_id: string | null
  name: string
  color: string
  icon: string
  type: 'expense' | 'income'
  code: string
  is_system: boolean
  is_archived: boolean
  created_at: string
  updated_at: string
  subcategories: Category[]
}

export interface GetCategoryRequest {
  type: 'income' | 'expense'
  archived?: boolean
}

export type CreateCategoryRequest =
  | {
      name: string
      parent_id: string
      type?: never
      icon?: never
      color?: never
    }
  | {
      name: string
      parent_id?: undefined
      type: 'income' | 'expense'
      icon: string
      color: string
    }
  | {
      name: string
      parent_id?: string
      type?: 'income' | 'expense'
      icon?: string
      color?: string
    }

export interface EditCategoryRequest {
  id?: string
  name?: string
  parent_id?: string | null
  icon?: string
  color?: string
}
