import { Skeleton } from '@/components/ui/skeleton'
import { TableCell, TableRow } from '@/components/ui/table'
import { Fragment } from 'react'

export function TransactionsSkeleton({ count = 5 }: { count?: number }) {
  return Array.from({ length: count }).map((_, i) => (
    <Fragment key={i}>
      <TableRow>
        <TableCell className="w-40">
          <Skeleton className="size-7 rounded-full" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-4 w-4/5" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-4 w-4/5" />
        </TableCell>
        <TableCell>
          <div className="flex items-center gap-2">
            <Skeleton className="size-7 rounded-full" />
            <Skeleton className="h-4 w-3/5" />
          </div>
        </TableCell>
        <TableCell>
          <div className="flex items-center gap-2">
            <Skeleton className="size-7 rounded-full" />
            <Skeleton className="h-4 w-3/5" />
          </div>
        </TableCell>
        <TableCell className="text-right">
          <Skeleton className="ml-auto h-4 w-4/5" />
        </TableCell>
        <TableCell className="pl-0 text-right">
          <Skeleton className="ml-auto h-4 w-4/5" />
        </TableCell>
      </TableRow>
      <TableRow className="hover:bg-transparent">
        <TableCell colSpan={6}>
          <Skeleton className="h-7 rounded-lg" />
        </TableCell>
        <TableCell colSpan={1} />
      </TableRow>
    </Fragment>
  ))
}
