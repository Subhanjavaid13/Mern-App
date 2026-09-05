import { forwardRef, useCallback, useRef } from 'react'
import { Search, X } from 'lucide-react'
import { MOD_KEY, useHotkey } from '../../hooks/useHotkey'
import Input from './Input'
import Kbd from './Kbd'

/**
 * Search field with clear button and a ⌘K / Ctrl+K focus shortcut.
 *
 *   <SearchBar value={query} onChange={setQuery} placeholder="Search notes…" />
 */
const SearchBar = forwardRef(function SearchBar(
  { value, onChange, placeholder = 'Search notes…', hotkey = 'mod+k', className, ...props },
  ref,
) {
  const innerRef = useRef(null)

  const setRefs = useCallback(
    (node) => {
      innerRef.current = node
      if (typeof ref === 'function') ref(node)
      else if (ref) ref.current = node
    },
    [ref],
  )

  useHotkey(hotkey, () => {
    innerRef.current?.focus()
    innerRef.current?.select()
  })

  useHotkey(
    'escape',
    () => {
      if (document.activeElement !== innerRef.current) return
      if (value) onChange('')
      else innerRef.current?.blur()
    },
    { allowInInputs: true },
  )

  return (
    <Input
      ref={setRefs}
      type="search"
      role="searchbox"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      leftIcon={Search}
      aria-label="Search notes"
      autoComplete="off"
      className={className}
      inputClassName="h-11 rounded-xl [&::-webkit-search-cancel-button]:hidden"
      rightSlot={
        value ? (
          <button
            type="button"
            onClick={() => {
              onChange('')
              innerRef.current?.focus()
            }}
            className="grid size-7 place-items-center rounded-full text-base-content/50 transition-colors hover:bg-base-200 hover:text-base-content"
            aria-label="Clear search"
          >
            <X className="size-4" aria-hidden="true" />
          </button>
        ) : (
          <span className="hidden items-center gap-1 sm:flex" aria-hidden="true">
            <Kbd>{MOD_KEY}</Kbd>
            <Kbd>K</Kbd>
          </span>
        )
      }
      {...props}
    />
  )
})

export default SearchBar
