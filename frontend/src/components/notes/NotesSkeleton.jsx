import { VIEW_MODES } from '../../utils/constants'
import Card from '../ui/Card'
import { Skeleton, SkeletonText } from '../ui/Skeleton'

function CardSkeleton() {
  return (
    <Card padding="none" className="overflow-hidden">
      <Skeleton className="h-1.5 w-full rounded-none" />
      <div className="p-5 sm:p-6">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="mt-2 h-6 w-1/2" />
        <SkeletonText lines={4} className="mt-5" />
        <div className="mt-6 flex items-center justify-between border-t border-dashed border-base-300/80 pt-4">
          <Skeleton className="h-3.5 w-24" />
          <Skeleton className="h-3.5 w-16" />
        </div>
      </div>
    </Card>
  )
}

function RowSkeleton() {
  return (
    <Card padding="none" className="flex overflow-hidden">
      <Skeleton className="w-1.5 shrink-0 rounded-none" />
      <div className="flex flex-1 items-center gap-6 p-5">
        <div className="flex-1">
          <Skeleton className="h-5 w-1/2" />
          <Skeleton className="mt-2 h-3.5 w-4/5" />
        </div>
        <Skeleton className="hidden h-3.5 w-24 sm:block" />
      </div>
    </Card>
  )
}

/** Loading placeholder that mirrors the notes grid/list layout. */
export default function NotesSkeleton({ count = 6, view = VIEW_MODES.GRID }) {
  const items = Array.from({ length: count })

  if (view === VIEW_MODES.LIST) {
    return (
      <div className="flex flex-col gap-3" aria-busy="true" aria-label="Loading notes">
        {items.map((_, i) => (
          <RowSkeleton key={i} />
        ))}
      </div>
    )
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3" aria-busy="true" aria-label="Loading notes">
      {items.map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  )
}
