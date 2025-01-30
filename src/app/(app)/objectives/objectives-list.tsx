'use client'

import { Icon } from '@/components/icon'
import { ObjectivesSwitcherStatus } from '@/components/objectives-switcher-status'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { getObjectives } from '@/http/get-objectives'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { ObjectivesListItem } from './objectives-list-item'
import { TransactionsSkeleton } from './objectives-skeleton'

export function ObjectivesList() {
  const [status, setStatus] = useState<'actived' | 'paused' | 'finished'>(
    'actived',
  )

  const { data, isLoading, error } = useQuery({
    queryKey: ['objections', status],
    queryFn: () => getObjectives({ status }),
    placeholderData: (previousData) => previousData,
  })

  return (
    <>
      <div className="justify-content grid grid-cols-3 items-center">
        <div>
          <ObjectivesSwitcherStatus onStatusChange={setStatus} />
        </div>
        <div></div>
        <div className="flex justify-end">
          <div className="flex items-center justify-end gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="icon" variant="secondary">
                  <Icon name="CirclePlus" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Adicionar conta </p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>
      <div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {isLoading && <TransactionsSkeleton />}
          {!isLoading &&
            !error &&
            data?.map((item) => (
              <ObjectivesListItem key={item.id} objective={item} />
            ))}
        </div>

        {error && (
          <Card className="flex items-center justify-center p-10">
            <p>Ocorreu um erro ao recuperar os dados.</p>
          </Card>
        )}
        {data?.length === 0 && (
          <Card className="flex items-center justify-center p-10">
            <p>Nenhum objetivo cadastrado.</p>
          </Card>
        )}
      </div>
    </>
  )
}
