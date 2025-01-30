'use client'

import { addMonths, startOfMonth, subMonths } from 'date-fns'
import { useEffect, useState } from 'react'
import { Icon } from './icon'
import { Button } from './ui/button'

interface MonthSwitcher {
  onDateChange: ({ month, year }: { month: number; year: number }) => void
}

export function MonthSwitcher({ onDateChange }: MonthSwitcher) {
  const [date, setDate] = useState<Date>(new Date())

  const goToNextMonth = () => {
    setDate((prevDate) => addMonths(prevDate, 1))
  }

  const goToPreviousMonth = () => {
    setDate((prevDate) => subMonths(prevDate, 1))
  }

  const currentMonth = startOfMonth(date)

  const month = currentMonth.toLocaleString('pt-br', { month: 'long' })
  const year = currentMonth.getFullYear()

  useEffect(() => {
    onDateChange({ month: currentMonth.getMonth() + 1, year })
  }, [date])

  return (
    <div className="flex items-center gap-1">
      <Button size="icon" variant="secondary" onClick={goToPreviousMonth}>
        <Icon name="ArrowLeft" />
      </Button>
      <div className="flex w-32 justify-center gap-1">
        {month.charAt(0).toUpperCase() + month.slice(1)}
        <span className="font-bold">{year}</span>
      </div>
      <Button size="icon" variant="secondary" onClick={goToNextMonth}>
        <Icon name="ArrowRight" />
      </Button>
    </div>
  )
}
