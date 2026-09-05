import { WORDS_PER_MINUTE } from './constants'

export function countWords(text = '') {
  const trimmed = String(text).trim()
  return trimmed ? trimmed.split(/\s+/).length : 0
}

export function countCharacters(text = '') {
  return String(text).length
}

export function countSentences(text = '') {
  const matches = String(text).match(/[^.!?]+[.!?]+/g)
  return matches ? matches.length : countWords(text) > 0 ? 1 : 0
}

/** Minutes to read, never less than 1 for non-empty text */
export function readingTime(text = '') {
  const words = countWords(text)
  if (!words) return 0
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE))
}

/** Shorten text to `max` characters on a word boundary and add an ellipsis */
export function excerpt(text = '', max = 140) {
  const clean = String(text).replace(/\s+/g, ' ').trim()
  if (clean.length <= max) return clean
  const cut = clean.slice(0, max)
  const lastSpace = cut.lastIndexOf(' ')
  return `${(lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).trimEnd()}…`
}

/** Split note content into paragraphs on blank lines */
export function toParagraphs(text = '') {
  return String(text)
    .replace(/\r\n/g, '\n')
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean)
}
