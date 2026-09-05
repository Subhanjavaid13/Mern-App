import { NotebookPen, Plus, Search, X } from 'lucide-react'
import Button from '../ui/Button'
import EmptyState from '../ui/EmptyState'

/** Empty state for the home page: no notes at all, or no search matches. */
export default function NotesEmpty({ query, onClearSearch }) {
  if (query) {
    return (
      <EmptyState
        icon={Search}
        title={`No matches for “${query}”`}
        description="Try a different word, or clear the search to see everything again."
        action={
          <Button variant="outline" leftIcon={X} onClick={onClearSearch}>
            Clear search
          </Button>
        }
        secondaryAction={
          <Button to="/create" leftIcon={Plus}>
            Write a new note
          </Button>
        }
      />
    )
  }

  return (
    <EmptyState
      icon={NotebookPen}
      title="Your notebook is empty"
      description="Every great idea started as a scribble. Write your first note and it will show up right here."
      action={
        <Button to="/create" size="lg" leftIcon={Plus}>
          Write your first note
        </Button>
      }
    />
  )
}
