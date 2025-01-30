import { SummaryBox } from '@/components/summary-box'
import { balanceEnum } from '@/enums/types'
import { getBalances } from '@/http/get-balances'
import { formatCurrency } from '@/libs/utils'
import { DateChange } from '@/type/data-change'
import { useQuery } from '@tanstack/react-query'

export function DashboardHeader({ year, month }: DateChange) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['balance', 'dashboard', month, year],
    queryFn: () => getBalances({ type: 'dashboard', month, year }),
    placeholderData: (previousData) => previousData,
  })

  if (error) {
    return (
      <div className="flex min-w-80 flex-col gap-4">
        <h4>Ocorreu um erro ao recuperar os dados</h4>
      </div>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <SummaryBox
        label={balanceEnum[data?.monthly_status || 'current']}
        value={formatCurrency(data?.balance || 0)}
        icon="Wallet"
        loading={isLoading}
      />
      <SummaryBox
        label="Receitas"
        value={formatCurrency(data?.total_incomes || 0)}
        icon="TrendingUp"
        iconClasses="bg-green-200 text-green-600"
        loading={isLoading}
      />
      <SummaryBox
        label="Despesas"
        value={formatCurrency(data?.total_expenses || 0)}
        icon="TrendingDown"
        iconClasses="bg-red-200 text-red-600"
        loading={isLoading}
      />
      <SummaryBox
        label="Balanço mensal"
        value={formatCurrency(data?.monthly_balance || 0)}
        icon="Scale"
        loading={isLoading}
      />
    </div>
  )
}
