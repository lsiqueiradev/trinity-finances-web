import { cn } from '@/libs/utils'
import { NavLink } from './nav-link'

export function Nav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn('items-center space-x-4 lg:space-x-6', className)}
      {...props}
    >
      <NavLink href="/">Dashboard</NavLink>
      <NavLink href="/transactions">Transações</NavLink>
      <NavLink href="/accounts">Contas</NavLink>
      <NavLink href="/cards">Cartões</NavLink>
      <NavLink href="/categories">Categorias</NavLink>
      <NavLink href="/objectives">Objetivos</NavLink>
    </nav>
  )
}
