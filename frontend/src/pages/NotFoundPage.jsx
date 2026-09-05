import { Compass, Home, Plus } from 'lucide-react'
import Button from '../components/ui/Button'
import Container from '../components/ui/Container'
import EmptyState from '../components/ui/EmptyState'

export default function NotFoundPage() {
  return (
    <Container className="py-10 sm:py-16">
      <EmptyState
        icon={Compass}
        title="Page not found"
        description="The link may be broken, or the page may have moved."
        action={
          <Button to="/" leftIcon={Home}>
            Back home
          </Button>
        }
        secondaryAction={
          <Button variant="outline" to="/create" leftIcon={Plus}>
            New note
          </Button>
        }
      />
    </Container>
  )
}
