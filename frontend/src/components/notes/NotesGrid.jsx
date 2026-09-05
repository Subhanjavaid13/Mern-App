import { VIEW_MODES } from '../../utils/constants'
import NoteCard from './NoteCard'
import NoteListItem from './NoteListItem'

/** Renders notes as a responsive grid or a vertical list. */
export default function NotesGrid({ notes, view = VIEW_MODES.GRID, onDelete }) {
  if (view === VIEW_MODES.LIST) {
    return (
      <div className="flex flex-col gap-2.5">
        {notes.map((note, index) => (
          <NoteListItem key={note._id} note={note} index={index} onDelete={onDelete} />
        ))}
      </div>
    )
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {notes.map((note, index) => (
        <NoteCard key={note._id} note={note} index={index} onDelete={onDelete} />
      ))}
    </div>
  )
}
