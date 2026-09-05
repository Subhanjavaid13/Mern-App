import { Link } from 'react-router'
import { ArrowLeft } from 'lucide-react'
import { cn } from '../../utils/cn'

/**
 * "← Back to …" control with a subtle slide animation on hover.
 * Renders a <Link> when `to` is given, otherwise a <button> using `onClick`.
 */
export default function BackLink({ to, onClick, children = 'Back', className }) {
  const classes = cn(
    'group inline-flex items-center gap-2 rounded-lg text-sm font-medium text-base-content/60 transition-colors hover:text-primary',
    className,
  )
  const inner = (
    <>
      <span className="grid size-7 place-items-center rounded-full border border-base-300/80 bg-base-100 transition-all group-hover:-translate-x-0.5 group-hover:border-primary/40 group-hover:bg-primary/10">
        <ArrowLeft className="size-3.5" aria-hidden="true" />
      </span>
      <span>{children}</span>
    </>
  )

  if (to) {
    return (
      <Link to={to} className={classes}>
        {inner}
      </Link>
    )
  }
  return (
    <button type="button" onClick={onClick} className={classes}>
      {inner}
    </button>
  )
}
