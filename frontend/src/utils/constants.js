export const APP_NAME = 'Cocoa Notes'
export const APP_TAGLINE = 'Warm, quiet space for your thoughts.'

export const THEMES = {
  LIGHT: 'latte',
  DARK: 'espresso',
}

export const STORAGE_KEYS = {
  THEME: 'cocoa:theme',
  VIEW: 'cocoa:view',
  SORT: 'cocoa:sort',
  DRAFT: 'cocoa:draft',
}

export const LIMITS = {
  TITLE_MAX: 120,
  CONTENT_MAX: 10000,
}

export const VIEW_MODES = {
  GRID: 'grid',
  LIST: 'list',
}

export const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest first' },
  { value: 'oldest', label: 'Oldest first' },
  { value: 'updated', label: 'Recently edited' },
  { value: 'az', label: 'Title A → Z' },
  { value: 'longest', label: 'Longest first' },
]

/** Average adult reading speed used for the "min read" estimate */
export const WORDS_PER_MINUTE = 200
