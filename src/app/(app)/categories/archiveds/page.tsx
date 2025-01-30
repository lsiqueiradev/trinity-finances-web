import { HeaderPage } from '@/components/header-page'
import { CategoriesList } from '../categories-list'

export default function CategoriesArchivedPage() {
  return (
    <div className="space-y-4">
      <HeaderPage title="Categorias arquivadas" isBack />
      <CategoriesList />
    </div>
  )
}
