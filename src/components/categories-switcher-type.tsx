'use client'

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useEffect, useState } from 'react'

type Type = 'expense' | 'income'

interface CategoriesSwitcherTypeProps {
  onTypeChange: (type: Type) => void
}

export function CategoriesSwitcherType({
  onTypeChange,
}: CategoriesSwitcherTypeProps) {
  const [type, setType] = useState<Type>('expense')

  useEffect(() => {
    if (window.tempData?.type) {
      setType(window.tempData.type)
    }
  }, [])

  const handleChangeStateType = (type: Type) => {
    setType(type)
    window.tempData = { type }
    onTypeChange(type)
  }

  return (
    <Tabs
      defaultValue="income"
      value={type}
      onValueChange={(e) => handleChangeStateType(e as Type)}
    >
      <TabsList>
        <TabsTrigger value="expense">Despesas</TabsTrigger>
        <TabsTrigger value="income">Receitas</TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
