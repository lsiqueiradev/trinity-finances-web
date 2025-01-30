'use client'

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useState } from 'react'

type Status = 'actived' | 'paused' | 'finished'

interface ObjectivesSwitcherStatusProps {
  onStatusChange: (type: Status) => void
}

export function ObjectivesSwitcherStatus({
  onStatusChange,
}: ObjectivesSwitcherStatusProps) {
  const [status, setStatus] = useState<Status>('actived')

  const handleChangeStateType = (status: Status) => {
    setStatus(status)
    onStatusChange(status)
  }

  return (
    <Tabs
      defaultValue="actived"
      value={status}
      onValueChange={(e) => handleChangeStateType(e as Status)}
    >
      <TabsList>
        <TabsTrigger value="actived">Ativos</TabsTrigger>
        <TabsTrigger value="paused">Pausados</TabsTrigger>
        <TabsTrigger value="finished">Finalizados</TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
