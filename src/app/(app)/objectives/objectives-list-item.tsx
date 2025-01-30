import { EntityStatus } from '@/components/entity-status'
import { Icon } from '@/components/icon'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn, formatCurrency, formatDate } from '@/libs/utils'
import { Objective } from '@/type/objective'
import { icons } from 'lucide-react'

interface ObjectivesListItemProps {
  objective: Objective
}

export function ObjectivesListItem({ objective }: ObjectivesListItemProps) {
  const getGradient = (percentage: number) => {
    if (percentage <= 33.33) return 'bg-red-500'
    if (percentage > 33.33 && percentage <= 66.66) return 'bg-yellow-500'
    if (percentage > 66.66) return 'bg-green-500'
  }

  return (
    <Card>
      <div className="flex items-center gap-3 p-6 pb-3">
        <EntityStatus
          name={objective.icon as keyof typeof icons}
          className="size-12 text-white [&_svg]:size-6"
          style={{ backgroundColor: objective.color }}
        />
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold">{objective.name}</h2>
            {objective.description && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex size-8 cursor-pointer items-center justify-center rounded-full bg-muted text-muted-foreground [&_svg]:size-4">
                    <Icon name="FileText" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{objective.description}</p>
                </TooltipContent>
              </Tooltip>
            )}
          </div>
          <p className="text-sm">
            Data final {formatDate(objective.date, "dd 'de' MMM 'de' yyyy")}
          </p>
        </div>
      </div>
      <div className="px-6 py-3">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <p className="font-bold">
                {formatCurrency(objective.current_amount)}
              </p>
              /<p>{formatCurrency(objective.target_amount)}</p>
            </div>
            <p className="text-lg font-bold">
              {objective.percentage_remaining_amount}%
            </p>
          </div>
          <Progress
            value={objective.percentage_remaining_amount}
            classesIndicador={cn(
              getGradient(objective.percentage_remaining_amount),
            )}
          />
        </div>
      </div>
      <div className="flex justify-end p-6 pt-0">
        {objective.status !== 'finished' && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                className="size-10 [&_svg]:size-5"
                variant="ghost"
                size="icon"
              >
                <Icon name="CircleCheckBig" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Concluir objetivo</p>
            </TooltipContent>
          </Tooltip>
        )}

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className="size-10 [&_svg]:size-5"
              variant="ghost"
              size="icon"
            >
              <Icon
                name={
                  objective.status !== 'active' ? 'CirclePlay' : 'CirclePause'
                }
              />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>
              {objective.status !== 'active' ? 'Reiniciar' : 'Pausar'} objetivo
            </p>
          </TooltipContent>
        </Tooltip>
        {objective.status !== 'finished' && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                className="size-10 [&_svg]:size-5"
                variant="ghost"
                size="icon"
              >
                <Icon name="Pencil" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Editar objetivo</p>
            </TooltipContent>
          </Tooltip>
        )}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className="size-10 [&_svg]:size-5"
              variant="ghost"
              size="icon"
            >
              <Icon name="Trash2" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Excluir objetivo</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className="size-10 [&_svg]:size-5"
              variant="ghost"
              size="icon"
            >
              <Icon name="List" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Detalhes objetivo</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </Card>
  )
}
