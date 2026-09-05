import { cn } from '../../utils/cn'

/** Keyboard key hint. */
export default function Kbd({ className, children }) {
  return (
    <kbd
      className={cn(
        'kbd kbd-sm h-6 min-h-0 rounded-md border-base-300 bg-base-200 px-1.5 font-sans text-[0.6875rem] font-semibold text-base-content/60 shadow-none',
        className,
      )}
    >
      {children}
    </kbd>
  )
}
