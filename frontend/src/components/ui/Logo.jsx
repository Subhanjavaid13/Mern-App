import { Link } from 'react-router'
import { NotebookPen } from 'lucide-react'
import { cn } from '../../utils/cn'
import { APP_NAME } from '../../utils/constants'

/**
 * Brand mark + wordmark. Links home by default.
 *
 *   <Logo />            // mark + wordmark
 *   <Logo compact />    // mark only
 */
export default function Logo({ compact = false, size = 'md', to = '/', className }) {
  const mark = size === 'lg' ? 'size-10 rounded-xl' : 'size-8 rounded-lg'
  const icon = size === 'lg' ? 'size-5' : 'size-4'

  const content = (
    <>
      <span
        className={cn(
          'grid shrink-0 place-items-center bg-primary text-primary-content',
          mark,
        )}
      >
        <NotebookPen className={icon} aria-hidden="true" />
      </span>
      {!compact && (
        <span
          className={cn(
            'font-display font-bold tracking-tight',
            size === 'lg' ? 'text-lg' : 'text-[0.9375rem]',
          )}
        >
          {APP_NAME}
        </span>
      )}
    </>
  )

  if (!to) return <span className={cn('inline-flex items-center gap-2.5', className)}>{content}</span>
  return (
    <Link
      to={to}
      className={cn('inline-flex items-center gap-2.5 rounded-lg', className)}
      aria-label={`${APP_NAME} — home`}
    >
      {content}
    </Link>
  )
}
