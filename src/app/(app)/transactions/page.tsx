import { TransactionsList } from './transactions-list'

export default function TransactionsPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Transações</h1>
      <TransactionsList />
    </div>
  )
}
