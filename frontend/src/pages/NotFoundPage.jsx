import { Compass, Home, Plus } from 'lucide-react'
import Button from '../components/ui/Button'
import Container from '../components/ui/Container'
import EmptyState from '../components/ui/EmptyState'

export default function NotFoundPage() {
  return (
    <Container className="py-12 sm:py-20">
      <p
        className="text-center font-display text-[7rem] font-bold leading-none tracking-tight text-base-content/[0.06] sm:text-[10rem]"
        aria-hidden="true"
      >
        404
      </p>
      <EmptyState
        className="-mt-10 sm:-mt-16"
        icon={Compass}
        title="This page wandered off"
        description="The link may be broken, or the page may have moved. Let's get you back to your notes."
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
