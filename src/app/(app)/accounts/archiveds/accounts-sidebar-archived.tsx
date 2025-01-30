import { SummaryBox } from '@/components/summary-box'
import { getBalances } from '@/http/get-balances'
import { formatCurrency } from '@/libs/utils'
import { DateChange } from '@/type/data-change'
import { useQuery } from '@tanstack/react-query'

export function AccountsSidebarArchived({ year, month }: DateChange) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['balance', 'accounts', month, year],
    queryFn: () =>
      getBalances({ type: 'accounts', month, year, archived: true }),
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
    <div className="flex min-w-80 flex-col gap-4">
      <SummaryBox
        label="Saldo total arquivado"
        value={formatCurrency(data?.current_balance || 0)}
        icon="Wallet"
        loading={isLoading}
      />
    </div>
  )
}
