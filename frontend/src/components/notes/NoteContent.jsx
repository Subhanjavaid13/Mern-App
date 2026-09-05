import { cn } from '../../utils/cn'
import { toParagraphs } from '../../utils/text'

/**
 * Renders raw note text as readable paragraphs, preserving line breaks.
 * Adds a decorative drop cap when the opening paragraph is long enough.
 */
export default function NoteContent({ content, dropcap = true, className }) {
  const paragraphs = toParagraphs(content)

  if (!paragraphs.length) {
    return <p className={cn('italic text-base-content/50', className)}>This note is empty.</p>
  }

  const useDropcap = dropcap && paragraphs[0].length >= 80 && /^[A-Za-z]/.test(paragraphs[0])

  return (
    <div className={cn('prose-note', useDropcap && 'with-dropcap', className)}>
      {paragraphs.map((paragraph, index) => (
        <p key={index} className="whitespace-pre-wrap">
          {paragraph}
        </p>
      ))}
    </div>
  )
}
