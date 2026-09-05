import { VIEW_MODES } from '../../utils/constants'
import Card from '../ui/Card'
import { Skeleton, SkeletonText } from '../ui/Skeleton'

function CardSkeleton() {
  return (
    <Card padding="none">
      <div className="p-4 sm:p-5">
        <Skeleton className="h-5 w-2/3" />
        <SkeletonText lines={3} className="mt-4" />
        <div className="mt-5 flex items-center justify-between border-t border-base-300/60 pt-3">
          <Skeleton className="h-3.5 w-24" />
          <Skeleton className="h-3.5 w-14" />
        </div>
      </div>
    </Card>
  )
}

function RowSkeleton() {
  return (
    <Card padding="none">
      <div className="flex items-center gap-5 p-4">
        <div className="flex-1">
          <Skeleton className="h-4.5 w-1/2" />
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
      <div className="flex flex-col gap-2.5" aria-busy="true" aria-label="Loading notes">
        {items.map((_, i) => (
          <RowSkeleton key={i} />
        ))}
      </div>
    )
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3" aria-busy="true" aria-label="Loading notes">
      {items.map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  )
}
