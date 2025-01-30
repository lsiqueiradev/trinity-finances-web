import { Skeleton } from '@/components/ui/skeleton'
import { TableCell, TableRow } from '@/components/ui/table'

export function AccountsSkeleton({ count = 5 }: { count?: number }) {
  return Array.from({ length: count }).map((_, i) => (
    <TableRow key={i}>
      <TableCell>
        <Skeleton className="size-7 rounded-full" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-3/5" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-3/5" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-3/5" />
      </TableCell>
      <TableCell className="pl-0 text-right">
        <Skeleton className="ml-auto h-4 w-3/5" />
      </TableCell>
    </TableRow>
  ))
}
