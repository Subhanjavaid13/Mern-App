import { Heart } from 'lucide-react'
import { APP_NAME } from '../../utils/constants'
import Container from '../ui/Container'
import Logo from '../ui/Logo'

const YEAR = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-base-300/60">
      <Container className="flex flex-col items-center justify-between gap-4 py-8 text-sm text-base-content/55 sm:flex-row">
        <div className="flex items-center gap-3">
          <Logo compact to={null} />
          <span>
            © {YEAR} {APP_NAME}
          </span>
        </div>
        <p className="inline-flex items-center gap-1.5">
          Brewed with
          <Heart className="size-3.5 fill-current text-error" aria-label="love" />
          and far too much coffee.
        </p>
      </Container>
    </footer>
  )
}
