import { Link } from 'react-router'
import { Coffee } from 'lucide-react'
import { cn } from '../../utils/cn'
import { APP_NAME } from '../../utils/constants'

/**
 * Brand mark + wordmark. Links home by default.
 *
 *   <Logo />            // mark + wordmark
 *   <Logo compact />    // mark only
 */
export default function Logo({ compact = false, size = 'md', to = '/', className }) {
  const mark = size === 'lg' ? 'size-12 rounded-2xl' : 'size-9 rounded-xl'
  const icon = size === 'lg' ? 'size-6' : 'size-[1.125rem]'

  const content = (
    <>
      <span
        className={cn(
          'relative grid shrink-0 place-items-center bg-gradient-to-br from-primary to-[#3F2618] text-primary-content shadow-soft transition-transform duration-300 group-hover:-rotate-6 dark:to-secondary',
          mark,
        )}
      >
        <Coffee className={icon} aria-hidden="true" />
        <span className="absolute -top-1 left-1/2 h-1.5 w-0.5 -translate-x-1/2 rounded-full bg-secondary/80 opacity-0 animate-steam group-hover:opacity-100" aria-hidden="true" />
      </span>
      {!compact && (
        <span className="flex flex-col leading-none">
          <span className={cn('font-display font-semibold tracking-tight', size === 'lg' ? 'text-2xl' : 'text-lg')}>
            Cocoa
          </span>
          <span className="text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-base-content/50">
            Notes
          </span>
        </span>
      )}
    </>
  )

  if (!to) return <span className={cn('group inline-flex items-center gap-2.5', className)}>{content}</span>
  return (
    <Link to={to} className={cn('group inline-flex items-center gap-2.5 rounded-lg', className)} aria-label={`${APP_NAME} — home`}>
      {content}
    </Link>
  )
}
