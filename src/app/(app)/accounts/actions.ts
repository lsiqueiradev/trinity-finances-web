'use server'

import { adjustBalanceAccount } from '@/http/adjust-balance-account'
import { archiveAccount } from '@/http/archive-account'
import { createAccount } from '@/http/create-account'
import { deleteAccount } from '@/http/delete-account'
import { updateAccount } from '@/http/update-account'
import {
  AdjustBalanceAccountRequest,
  CreateAccountRequest,
  EditAccountRequest,
} from '@/type/account'
import { HTTPError } from 'ky'

export async function createAccountAction(data: CreateAccountRequest) {
  try {
    await createAccount(data)
  } catch (err) {
    if (err instanceof HTTPError) {
      const { message } = await err.response.json()
      throw new Error(message)
    }
    throw new Error('Erro inesperado, tente novamente em alguns minutos.')
  }
}

export async function editAccountAction(data: EditAccountRequest) {
  try {
    await updateAccount(data)
  } catch (err) {
    if (err instanceof HTTPError) {
      const { message } = await err.response.json()
      throw new Error(message)
    }

    throw new Error('Erro inesperado, tente novamente em alguns minutos.')
  }
}

export async function deleteAccountAction(accountId: string) {
  try {
    await deleteAccount(accountId)
  } catch (err) {
    if (err instanceof HTTPError) {
      const { message } = await err.response.json()
      throw new Error(message)
    }

    throw new Error('Erro inesperado, tente novamente em alguns minutos.')
  }
}

export async function adjustBalanceAccountAction(
  data: AdjustBalanceAccountRequest,
) {
  try {
    await adjustBalanceAccount(data)
  } catch (err) {
    if (err instanceof HTTPError) {
      const { message } = await err.response.json()
      throw new Error(message)
    }

    throw new Error('Erro inesperado, tente novamente em alguns minutos.')
  }
}

export async function archiveAccountAction(
  accountId: string,
  isArchived: boolean,
) {
  try {
    await archiveAccount(accountId, isArchived)
  } catch (err) {
    if (err instanceof HTTPError) {
      const { message } = await err.response.json()
      throw new Error(message)
    }

    throw new Error('Erro inesperado, tente novamente em alguns minutos.')
  }
}
