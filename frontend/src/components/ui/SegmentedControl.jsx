import { cn } from '../../utils/cn'
import Tooltip from './Tooltip'

/**
 * Pill-style radio group for a handful of mutually exclusive options.
 *
 *   <SegmentedControl
 *     value={view}
 *     onChange={setView}
 *     options={[{ value: 'grid', label: 'Grid', icon: LayoutGrid }, …]}
 *     iconOnly
 *   />
 */
export default function SegmentedControl({
  options = [],
  value,
  onChange,
  iconOnly = false,
  size = 'md',
  label,
  className,
}) {
  const sizing = size === 'sm' ? 'h-8 px-2.5 text-xs' : 'h-9 px-3 text-sm'

  return (
    <div
      role="radiogroup"
      aria-label={label}
      className={cn(
        'inline-flex items-center gap-1 rounded-xl border border-base-300/80 bg-base-200/70 p-1',
        className,
      )}
    >
      {options.map((option) => {
        const selected = option.value === value
        const Icon = option.icon
        const button = (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={selected}
            aria-label={iconOnly ? option.label : undefined}
            onClick={() => onChange?.(option.value)}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-lg font-medium transition-all duration-200',
              sizing,
              iconOnly && 'aspect-square justify-center px-0',
              selected
                ? 'bg-base-100 text-primary shadow-soft'
                : 'text-base-content/55 hover:text-base-content',
            )}
          >
            {Icon && <Icon className="size-4" aria-hidden="true" />}
            {!iconOnly && <span>{option.label}</span>}
          </button>
        )
        return iconOnly ? (
          <Tooltip key={option.value} label={option.label} position="bottom">
            {button}
          </Tooltip>
        ) : (
          button
        )
      })}
    </div>
  )
}
