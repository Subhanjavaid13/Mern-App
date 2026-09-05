import { NavLink, useNavigate } from 'react-router'
import { Notebook, PenLine, Plus } from 'lucide-react'
import { useHotkey } from '../../hooks/useHotkey'
import { cn } from '../../utils/cn'
import Button from '../ui/Button'
import Container from '../ui/Container'
import IconButton from '../ui/IconButton'
import Logo from '../ui/Logo'
import ThemeToggle from '../ui/ThemeToggle'

const NAV_ITEMS = [
  { to: '/', label: 'Notes', icon: Notebook, end: true },
  { to: '/create', label: 'New note', icon: PenLine, end: false },
]

export default function Navbar() {
  const navigate = useNavigate()

  // Press "N" anywhere (outside inputs) to start a new note
  useHotkey('n', () => navigate('/create'))

  return (
    <header className="sticky top-0 z-40 border-b border-base-300/70 bg-base-100/90 backdrop-blur-xl">
      <Container className="flex h-14 items-center gap-3">
        <Logo />

        <nav className="ml-3 hidden items-center gap-1 md:flex" aria-label="Primary">
          {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                cn(
                  'inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors duration-150',
                  isActive
                    ? 'bg-base-200 text-base-content'
                    : 'text-base-content/60 hover:bg-base-200/60 hover:text-base-content',
                )
              }
            >
              <Icon className="size-4" aria-hidden="true" />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1.5">
          <ThemeToggle />
          <Button to="/create" size="sm" leftIcon={Plus} className="hidden sm:inline-flex">
            New note
          </Button>
          <IconButton
            to="/create"
            icon={Plus}
            label="New note"
            variant="primary"
            size="sm"
            className="sm:hidden"
            tooltip={false}
          />
        </div>
      </Container>
    </header>
  )
}
