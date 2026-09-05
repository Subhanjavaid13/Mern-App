import { AlignLeft, CalendarDays, Clock, PenLine } from 'lucide-react'
import { cn } from '../../utils/cn'
import { formatDate, isSameInstant, timeAgo } from '../../utils/date'
import { countWords, readingTime } from '../../utils/text'
import Badge from '../ui/Badge'

/** Row of metadata pills for a note: created, edited, word count, read time. */
export default function NoteMeta({ note, className }) {
  const words = countWords(note.content)
  const minutes = readingTime(note.content)
  const edited = note.updatedAt && !isSameInstant(note.createdAt, note.updatedAt)

  return (
    <div className={cn('flex flex-wrap items-center gap-2', className)}>
      <Badge icon={CalendarDays}>{formatDate(note.createdAt)}</Badge>
      {edited && (
        <Badge icon={PenLine} tone="secondary">
          Edited {timeAgo(note.updatedAt)}
        </Badge>
      )}
      <Badge icon={AlignLeft}>
        {words.toLocaleString()} {words === 1 ? 'word' : 'words'}
      </Badge>
      <Badge icon={Clock}>{minutes} min read</Badge>
    </div>
  )
}
