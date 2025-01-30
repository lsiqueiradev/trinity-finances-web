'use server'

import { archiveCategory } from '@/http/archive-category'
import { createCategory } from '@/http/create-category'
import { deleteCategory } from '@/http/delete-category'
import { updateCategory } from '@/http/update-category'
import { CreateCategoryRequest, EditCategoryRequest } from '@/type/category'
import { HTTPError } from 'ky'

export async function createCategoryAction(data: CreateCategoryRequest) {
  try {
    await createCategory(data)
  } catch (err) {
    if (err instanceof HTTPError) {
      const { message } = await err.response.json()
      throw new Error(message)
    }
    throw new Error('Erro inesperado, tente novamente em alguns minutos.')
  }
}

export async function editCategoryAction(data: EditCategoryRequest) {
  try {
    await updateCategory(data)
  } catch (err) {
    if (err instanceof HTTPError) {
      const { message } = await err.response.json()
      throw new Error(message)
    }

    throw new Error('Erro inesperado, tente novamente em alguns minutos.')
  }
}

export async function deleteCategoryAction(categoryId: string) {
  try {
    await deleteCategory(categoryId)
  } catch (err) {
    if (err instanceof HTTPError) {
      const { message } = await err.response.json()
      throw new Error(message)
    }

    throw new Error('Erro inesperado, tente novamente em alguns minutos.')
  }
}

export async function archiveCategoryAction(
  categoryId: string,
  isArchive: boolean,
) {
  try {
    await archiveCategory(categoryId, isArchive)
  } catch (err) {
    if (err instanceof HTTPError) {
      const { message } = await err.response.json()
      throw new Error(message)
    }

    throw new Error('Erro inesperado, tente novamente em alguns minutos.')
  }
}
