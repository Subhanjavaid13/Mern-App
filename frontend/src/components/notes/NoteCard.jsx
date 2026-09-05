import { Link } from 'react-router'
import { AlignLeft, CalendarDays, PenLine, Trash2 } from 'lucide-react'
import { cn } from '../../utils/cn'
import { formatDate } from '../../utils/date'
import { countWords, excerpt } from '../../utils/text'
import Card from '../ui/Card'
import IconButton from '../ui/IconButton'

/**
 * Grid tile for a single note. The whole card is clickable via a stretched
 * link; the edit/delete actions sit above it.
 */
export default function NoteCard({ note, onDelete, index = 0, className }) {
  const words = countWords(note.content)

  return (
    <Card
      as="article"
      hover
      padding="none"
      className={cn(
        'group flex h-full flex-col animate-fade-up focus-within:ring-2 focus-within:ring-primary/30',
        className,
      )}
      style={{ animationDelay: `${Math.min(index, 8) * 40}ms` }}
    >
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <h3 className="font-display text-lg font-bold leading-snug tracking-tight sm:text-xl">
          <Link
            to={`/note/${note._id}`}
            className="line-clamp-2 transition-colors after:absolute after:inset-0 after:content-[''] hover:text-primary focus:outline-none"
          >
            {note.title}
          </Link>
        </h3>

        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-base-content/65">
          {excerpt(note.content, 180)}
        </p>

        <footer className="mt-4 flex items-center justify-between gap-3 border-t border-base-300/60 pt-3">
          <div className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1 text-xs text-base-content/55">
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="size-3.5" aria-hidden="true" />
              {formatDate(note.createdAt)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <AlignLeft className="size-3.5" aria-hidden="true" />
              {words} {words === 1 ? 'word' : 'words'}
            </span>
          </div>

          <div className="relative z-10 flex items-center gap-0.5 rounded-full border border-base-300/70 bg-base-100 p-0.5 transition-opacity duration-150 sm:opacity-0 sm:group-focus-within:opacity-100 sm:group-hover:opacity-100">
            <IconButton
              icon={PenLine}
              label="Edit note"
              size="sm"
              tooltip={false}
              to={`/note/${note._id}?edit=1`}
              className="hover:bg-primary/10 hover:text-primary"
            />
            <IconButton
              icon={Trash2}
              label="Delete note"
              size="sm"
              tooltip={false}
              onClick={() => onDelete?.(note)}
              className="hover:bg-error/10 hover:text-error"
            />
          </div>
        </footer>
      </div>
    </Card>
  )
}
