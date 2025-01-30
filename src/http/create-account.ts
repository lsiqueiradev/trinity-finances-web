import { api } from '@/libs/ky'
import { Account, CreateAccountRequest } from '@/type/account'

export async function createAccount({
  initial_balance,
  description,
  institution_id,
  color,
  is_initial_screen,
}: CreateAccountRequest) {
  const result = await api
    .post('accounts', {
      json: {
        initial_balance,
        description,
        institution_id,
        color,
        is_initial_screen,
      },
    })
    .json<Account[]>()
  return result
}
