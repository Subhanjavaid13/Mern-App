import { AlignLeft, ArrowUpDown, CalendarDays, Clock, LayoutGrid, PenLine, Rows3, Type } from 'lucide-react'
import { cn } from '../../utils/cn'
import { SORT_OPTIONS, VIEW_MODES } from '../../utils/constants'
import Dropdown from '../ui/Dropdown'
import SegmentedControl from '../ui/SegmentedControl'

const SORT_ICONS = {
  newest: CalendarDays,
  oldest: Clock,
  updated: PenLine,
  az: Type,
  longest: AlignLeft,
}

const VIEW_OPTIONS = [
  { value: VIEW_MODES.GRID, label: 'Grid view', icon: LayoutGrid },
  { value: VIEW_MODES.LIST, label: 'List view', icon: Rows3 },
]

/** Result count + sort dropdown + grid/list switch. */
export default function NotesToolbar({
  total,
  shown,
  query,
  sort,
  onSortChange,
  view,
  onViewChange,
  className,
}) {
  const current = SORT_OPTIONS.find((o) => o.value === sort) ?? SORT_OPTIONS[0]
  const CurrentIcon = SORT_ICONS[current.value] ?? ArrowUpDown

  const sortItems = SORT_OPTIONS.map((option) => ({
    value: option.value,
    label: option.label,
    icon: SORT_ICONS[option.value],
    active: option.value === sort,
    onClick: () => onSortChange?.(option.value),
  }))

  return (
    <div className={cn('flex flex-wrap items-center justify-between gap-3', className)}>
      <p className="text-sm text-base-content/60" aria-live="polite">
        {query ? (
          <>
            <span className="font-semibold text-base-content">{shown}</span> of {total} match{' '}
            <span className="font-medium text-base-content/80">“{query}”</span>
          </>
        ) : (
          <>
            <span className="font-semibold text-base-content">{total}</span>{' '}
            {total === 1 ? 'note' : 'notes'}
          </>
        )}
      </p>

      <div className="flex items-center gap-2">
        <Dropdown
          label="Sort by"
          triggerLabel={`Sort: ${current.label}`}
          trigger={
            <>
              <CurrentIcon className="size-4 opacity-70" aria-hidden="true" />
              <span className="hidden sm:inline">{current.label}</span>
              <span className="sm:hidden">Sort</span>
            </>
          }
          items={sortItems}
        />
        <SegmentedControl
          size="sm"
          iconOnly
          label="View mode"
          value={view}
          onChange={onViewChange}
          options={VIEW_OPTIONS}
        />
      </div>
    </div>
  )
}
