import { Link } from 'react-router'
import { AlignLeft, CalendarDays, PenLine, Trash2 } from 'lucide-react'
import { cn } from '../../utils/cn'
import { formatDate } from '../../utils/date'
import { countWords, excerpt } from '../../utils/text'
import Card from '../ui/Card'
import IconButton from '../ui/IconButton'

/** Compact row for the list view. */
export default function NoteListItem({ note, onDelete, index = 0, className }) {
  const words = countWords(note.content)

  return (
    <Card
      as="article"
      hover
      padding="none"
      className={cn(
        'group animate-fade-up focus-within:ring-2 focus-within:ring-primary/30',
        className,
      )}
      style={{ animationDelay: `${Math.min(index, 10) * 30}ms` }}
    >
      <div className="flex flex-col gap-3 p-3.5 sm:flex-row sm:items-center sm:gap-5 sm:p-4">
        <div className="min-w-0 flex-1">
          <h3 className="font-display text-base font-bold leading-snug tracking-tight sm:text-lg">
            <Link
              to={`/note/${note._id}`}
              className="line-clamp-1 transition-colors after:absolute after:inset-0 after:content-[''] hover:text-[#D9661A] focus:outline-none dark:hover:text-primary"
            >
              {note.title}
            </Link>
          </h3>
          <p className="mt-0.5 line-clamp-1 text-sm text-base-content/60">{excerpt(note.content, 160)}</p>
        </div>

        <div className="flex items-center justify-between gap-4 sm:justify-end">
          <div className="flex items-center gap-3 whitespace-nowrap text-xs text-base-content/55">
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="size-3.5" aria-hidden="true" />
              {formatDate(note.createdAt)}
            </span>
            <span className="hidden items-center gap-1.5 sm:inline-flex">
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
        </div>
      </div>
    </Card>
  )
}
