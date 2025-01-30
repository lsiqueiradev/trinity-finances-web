import { api } from '@/libs/ky'
import { Account, EditAccountRequest } from '@/type/account'

export async function updateAccount({
  id,
  description,
  institution_id,
  color,
  is_initial_screen,
}: EditAccountRequest) {
  const result = await api
    .put(`accounts/${id}`, {
      json: {
        description,
        institution_id,
        color,
        is_initial_screen,
      },
    })
    .json<Account[]>()
  return result
}
