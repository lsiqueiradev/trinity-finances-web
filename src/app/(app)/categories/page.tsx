import { CategoriesList } from './categories-list'

export default function CategoriesPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold">Categorias</h1>
      </div>
      <CategoriesList />
    </div>
  )
}
