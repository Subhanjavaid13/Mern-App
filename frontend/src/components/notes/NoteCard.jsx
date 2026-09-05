import { Link } from 'react-router'
import { AlignLeft, CalendarDays, PenLine, Trash2 } from 'lucide-react'
import { cn } from '../../utils/cn'
import { formatDate } from '../../utils/date'
import { accentFor, countWords, excerpt, initialOf } from '../../utils/text'
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
        'group flex h-full flex-col overflow-hidden animate-fade-up focus-within:ring-2 focus-within:ring-secondary/50',
        className,
      )}
      style={{ animationDelay: `${Math.min(index, 8) * 50}ms` }}
    >
      <div className={cn('h-1.5 w-full', accentFor(note._id))} aria-hidden="true" />

      <span
        className="pointer-events-none absolute -right-2 -top-2 select-none font-display text-[7rem] font-bold leading-none text-base-content/[0.04] transition-colors duration-300 group-hover:text-primary/[0.08]"
        aria-hidden="true"
      >
        {initialOf(note.title)}
      </span>

      <div className="relative flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="font-display text-xl font-semibold leading-snug tracking-tight">
          <Link
            to={`/note/${note._id}`}
            className="line-clamp-2 transition-colors after:absolute after:inset-0 after:content-[''] hover:text-primary focus:outline-none"
          >
            {note.title}
          </Link>
        </h3>

        <p className="mt-3 line-clamp-4 flex-1 text-sm leading-relaxed text-base-content/65">
          {excerpt(note.content, 220)}
        </p>

        <footer className="mt-5 flex items-center justify-between gap-3 border-t border-dashed border-base-300/80 pt-4">
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

          <div className="relative z-10 flex items-center gap-1 transition-all duration-200 sm:translate-y-1 sm:opacity-0 sm:group-focus-within:translate-y-0 sm:group-focus-within:opacity-100 sm:group-hover:translate-y-0 sm:group-hover:opacity-100">
            <IconButton
              icon={PenLine}
              label="Edit note"
              size="sm"
              to={`/note/${note._id}?edit=1`}
              className="bg-base-100/90"
            />
            <IconButton
              icon={Trash2}
              label="Delete note"
              size="sm"
              onClick={() => onDelete?.(note)}
              className="bg-base-100/90 hover:bg-error/10 hover:text-error"
            />
          </div>
        </footer>
      </div>
    </Card>
  )
}
