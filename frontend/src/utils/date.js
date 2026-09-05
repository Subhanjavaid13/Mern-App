const toDate = (value) => (value instanceof Date ? value : new Date(value))

/** "Sep 5, 2026" */
export function formatDate(value, options = {}) {
  const date = toDate(value)
  if (Number.isNaN(date.getTime())) return ''
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    ...options,
  }).format(date)
}

/** "Sep 5, 2026, 4:32 PM" */
export function formatDateTime(value) {
  return formatDate(value, { hour: 'numeric', minute: '2-digit' })
}

/** "Friday, September 5" */
export function formatLongDate(value) {
  const date = toDate(value)
  if (Number.isNaN(date.getTime())) return ''
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  }).format(date)
}

/** "just now", "5 minutes ago", "2 days ago", "3 months ago" */
export function timeAgo(value, now = new Date()) {
  const date = toDate(value)
  if (Number.isNaN(date.getTime())) return ''

  const diffSeconds = Math.round((date.getTime() - toDate(now).getTime()) / 1000)
  const abs = Math.abs(diffSeconds)

  if (abs < 45) return 'just now'

  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })
  const units = [
    ['year', 60 * 60 * 24 * 365],
    ['month', 60 * 60 * 24 * 30],
    ['week', 60 * 60 * 24 * 7],
    ['day', 60 * 60 * 24],
    ['hour', 60 * 60],
    ['minute', 60],
  ]

  for (const [unit, seconds] of units) {
    if (abs >= seconds) {
      return rtf.format(Math.round(diffSeconds / seconds), unit)
    }
  }
  return rtf.format(diffSeconds, 'second')
}

export function isSameInstant(a, b) {
  return toDate(a).getTime() === toDate(b).getTime()
}

/** Greeting for the hero: "Good morning" / "Good afternoon" / "Good evening" */
export function greetingFor(date = new Date()) {
  const hour = toDate(date).getHours()
  if (hour < 5) return 'Still up'
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
}
