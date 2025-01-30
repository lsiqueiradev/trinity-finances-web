'use client'

import { Icon } from '@/components/icon'
import { MonthSwitcher } from '@/components/month-switcher'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { DateChange } from '@/type/data-change'
import { useState } from 'react'
import { DashboardHeader } from './dashboard-header'

export function DashboardList() {
  const [{ month, year }, setDate] = useState<DateChange>({
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  })

  const handleDateChange = (newDate: DateChange) => {
    setDate(newDate)
  }

  return (
    <>
      <div className="justify-content grid grid-cols-3 items-center">
        <div />
        <div className="flex items-center justify-center">
          <MonthSwitcher onDateChange={handleDateChange} />
        </div>
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
      <div className="flex flex-col gap-4">
        <DashboardHeader month={month} year={year} />
      </div>
    </>
  )
}
