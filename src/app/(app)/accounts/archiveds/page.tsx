import { HeaderPage } from '@/components/header-page'
import { AccountsListArchived } from './accounts-list-archived'

export default function CategoriesArchivedPage() {
  return (
    <div className="space-y-4">
      <HeaderPage title="Contas arquivadas" isBack />
      <AccountsListArchived />
    </div>
  )
}
