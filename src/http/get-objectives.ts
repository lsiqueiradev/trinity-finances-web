import { api } from '@/libs/ky'
import { GetObjectiveRequest, Objective } from '@/type/objective'

export async function getObjectives({
  status = 'actived',
}: GetObjectiveRequest) {
  const result = await api
    .get('objectives', { searchParams: { status } })
    .json<Objective[]>()
  return result
}
