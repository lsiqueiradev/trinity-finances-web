import { Skeleton } from '@/components/ui/skeleton'
import { TableCell, TableRow } from '@/components/ui/table'

export function CategoriesSkeleton({ count = 5 }: { count?: number }) {
  return Array.from({ length: count }).map((_, i) => (
    <TableRow key={i}>
      <TableCell className="flex gap-2">
        <Skeleton className="h-4 w-2/5" />
      </TableCell>
      <TableCell>
        <Skeleton className="size-7 rounded-full" />
      </TableCell>
      <TableCell>
        <Skeleton className="size-7 rounded-full" />
      </TableCell>
      <TableCell className="pl-0 text-right">
        <Skeleton className="ml-auto h-4 w-2/5" />
      </TableCell>
    </TableRow>
  ))
}
