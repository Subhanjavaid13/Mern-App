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
        description="Try a different word, or clear the search to see all notes."
        action={
          <Button variant="outline" leftIcon={X} onClick={onClearSearch}>
            Clear search
          </Button>
        }
        secondaryAction={
          <Button to="/create" leftIcon={Plus}>
            New note
          </Button>
        }
      />
    )
  }

  return (
    <EmptyState
      icon={NotebookPen}
      title="No notes yet"
      description="Create your first note and it will show up here."
      action={
        <Button to="/create" leftIcon={Plus}>
          Create a note
        </Button>
      }
    />
  )
}
