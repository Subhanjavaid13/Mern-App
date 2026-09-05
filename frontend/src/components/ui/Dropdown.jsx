import { Check, ChevronDown } from 'lucide-react'
import { cn } from '../../utils/cn'

/**
 * Focus-driven dropdown menu (daisyUI). Items close the menu on click.
 * The trigger is a focusable div (not a nested <button>) so it opens reliably
 * in Safari, which does not focus buttons on click.
 *
 *   <Dropdown
 *     label="Sort by"
 *     trigger={<><ArrowUpDown className="size-4" /> Newest</>}
 *     items={[{ label: 'Newest', icon: Clock, active: true, onClick }, { type: 'divider' }, …]}
 *   />
 */
export default function Dropdown({
  trigger,
  triggerClassName,
  triggerLabel,
  chevron = true,
  items = [],
  align = 'end',
  label,
  className,
  menuClassName,
}) {
  const closeMenu = () => {
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur()
  }

  return (
    <div className={cn('dropdown', align === 'end' && 'dropdown-end', className)}>
      <div
        tabIndex={0}
        role="button"
        aria-haspopup="menu"
        aria-label={triggerLabel}
        className={cn(
          'btn h-9 min-h-0 gap-2 rounded-btn border-base-300 bg-base-100 px-3 text-sm font-medium normal-case text-base-content shadow-none transition-colors hover:border-base-content/25 hover:bg-base-200/70 active:scale-[0.98]',
          triggerClassName,
        )}
      >
        {trigger}
        {chevron && <ChevronDown className="size-4 opacity-60" aria-hidden="true" />}
      </div>
      <ul
        tabIndex={0}
        role="menu"
        className={cn(
          'dropdown-content menu z-40 mt-1.5 w-52 rounded-box border border-base-300/70 bg-base-100 p-1 shadow-lift animate-scale-in',
          menuClassName,
        )}
      >
        {label && (
          <li className="menu-title px-2.5 pb-1 pt-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-base-content/45">
            {label}
          </li>
        )}
        {items.map((item, index) => {
          if (item.type === 'divider') {
            return <li key={`divider-${index}`} role="separator" className="my-1 h-px bg-base-300/70" />
          }
          const Icon = item.icon
          return (
            <li key={item.value ?? item.label ?? index} role="none">
              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  item.onClick?.()
                  closeMenu()
                }}
                className={cn(
                  'flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-sm transition-colors',
                  item.active
                    ? 'bg-primary/10 font-semibold text-primary'
                    : 'text-base-content/80 hover:bg-base-200 hover:text-base-content',
                  item.danger && 'text-error hover:bg-error/10 hover:text-error',
                )}
              >
                {Icon && <Icon className="size-4 shrink-0 opacity-80" aria-hidden="true" />}
                <span className="flex-1 text-left">{item.label}</span>
                {item.active && <Check className="size-4 shrink-0" aria-hidden="true" />}
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
