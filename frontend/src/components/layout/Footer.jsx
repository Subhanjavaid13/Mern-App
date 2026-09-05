import { Link } from 'react-router'
import { APP_NAME } from '../../utils/constants'
import Container from '../ui/Container'
import Logo from '../ui/Logo'

const YEAR = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-base-300/60">
      <Container className="flex flex-col items-center justify-between gap-3 py-5 text-sm text-base-content/55 sm:flex-row">
        <div className="flex items-center gap-2.5">
          <Logo compact to={null} />
          <span>
            © {YEAR} {APP_NAME}
          </span>
        </div>
        <nav className="flex items-center gap-4" aria-label="Footer">
          <Link to="/" className="transition-colors hover:text-base-content">
            Notes
          </Link>
          <Link to="/create" className="transition-colors hover:text-base-content">
            New note
          </Link>
        </nav>
      </Container>
    </footer>
  )
}
