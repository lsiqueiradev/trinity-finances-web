import { api } from '@/libs/ky'
import { GetInstitutionRequest, Institution } from '@/type/institution'

export async function getInstitutions({
  type = 'bank',
  actived = true,
}: GetInstitutionRequest) {
  const result = await api
    .get('institutions', { searchParams: { type, actived } })
    .json<Institution[]>()
  return result
}
