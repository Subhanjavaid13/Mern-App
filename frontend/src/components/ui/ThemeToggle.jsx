import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../../hooks/useTheme'
import { cn } from '../../utils/cn'
import Tooltip from './Tooltip'

/** Sun/moon switch between the Latte and Espresso themes. */
export default function ThemeToggle({ className }) {
  const { isDark, toggleTheme } = useTheme()
  const label = isDark ? 'Switch to Latte (light)' : 'Switch to Espresso (dark)'

  return (
    <Tooltip label={label} position="bottom">
      <label
        className={cn(
          'swap swap-rotate btn btn-circle btn-ghost size-11 min-h-0 border border-transparent text-base-content/80 transition-colors hover:border-base-300 hover:bg-base-100',
          className,
        )}
      >
        <input
          type="checkbox"
          checked={isDark}
          onChange={toggleTheme}
          aria-label={label}
          className="sr-only"
        />
        <Sun className="swap-on size-5" aria-hidden="true" />
        <Moon className="swap-off size-5" aria-hidden="true" />
      </label>
    </Tooltip>
  )
}
