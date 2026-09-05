import { cn } from '../../utils/cn'
import { toParagraphs } from '../../utils/text'

/** Renders raw note text as readable paragraphs, preserving line breaks. */
export default function NoteContent({ content, className }) {
  const paragraphs = toParagraphs(content)

  if (!paragraphs.length) {
    return <p className={cn('text-sm italic text-base-content/50', className)}>This note is empty.</p>
  }

  return (
    <div className={cn('prose-note', className)}>
      {paragraphs.map((paragraph, index) => (
        <p key={index} className="whitespace-pre-wrap">
          {paragraph}
        </p>
      ))}
    </div>
  )
}
