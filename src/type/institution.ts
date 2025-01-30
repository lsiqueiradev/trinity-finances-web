export interface Institution {
  id: string
  name: string
  type: 'bank' | 'card'
  logo_url: string
  created_at: string
  updated_at: string
}

export interface GetInstitutionRequest {
  type?: 'bank' | 'card'
  actived?: boolean
}
