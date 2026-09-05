# Cocoa Notes — frontend

A warm, responsive notes UI built with React 19, Vite, Tailwind CSS 3, daisyUI 4, lucide-react icons and react-router.
Two themes ship out of the box: **Latte** (cream / beige / chocolate) and **Espresso** (dark roast). The choice is
remembered in `localStorage` and applied before first paint, so there is no flash.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production bundle in dist/
npm run lint
```

## Wiring up the API

All data access goes through one file: [`src/lib/notesApi.js`](src/lib/notesApi.js). It is currently a **mock**
backed by `localStorage` and seeded from [`src/data/mockNotes.js`](src/data/mockNotes.js). Replace the body of
each function with a real request and nothing else needs to change:

| Function                       | Backend route            |
| ------------------------------ | ------------------------ |
| `getNotes()`                   | `GET    /api/notes`      |
| `getNote(id)`                  | `GET    /api/notes/:id`  |
| `createNote({ title, content })` | `POST   /api/notes`    |
| `updateNote(id, { title, content })` | `PUT /api/notes/:id` |
| `deleteNote(id)`               | `DELETE /api/notes/:id`  |

Throw errors with a `status` property (`error.status = 429`, `404`, …). The pages already handle:

- `429` → the **rate-limit** screen on the home page and a friendly toast elsewhere
- `404` → the **"note wandered off"** state on the detail page
- anything else → an error state with a retry button

> The backend currently has no `GET /api/notes/:id` route. Either add one, or implement `getNote(id)` by
> fetching the list and finding the note.

## Project layout

```
src/
├─ components/
│  ├─ ui/        Generic building blocks (Button, IconButton, Input, Textarea, Badge, Card,
│  │             Modal, ConfirmDialog, Dropdown, Tooltip, Skeleton, EmptyState, SearchBar,
│  │             SegmentedControl, Alert, StatCard, PageHeader, BackLink, Logo, Kbd,
│  │             Spinner/PageLoader, ThemeToggle, Container, AppToaster)
│  ├─ layout/    AppLayout (background + navbar + footer + scroll restore), Navbar, Footer
│  └─ notes/     NoteCard, NoteListItem, NotesGrid, NotesToolbar, NotesSkeleton, NotesEmpty,
│                NoteForm (create/edit), NoteMeta, NoteContent, DeleteNoteDialog, RateLimitBanner
├─ pages/        HomePage, CreatePage, NoteDetailPage (read + edit via ?edit=1), NotFoundPage
├─ hooks/        useTheme, useLocalStorage, useDebounce, useHotkey
├─ context/      ThemeProvider + theme context
├─ lib/          notesApi.js  ← swap this for real requests
├─ data/         mockNotes.js (sample content, safe to delete)
└─ utils/        cn, constants, date, text, notes helpers
```

## Keyboard shortcuts

| Keys               | Action                              |
| ------------------ | ----------------------------------- |
| `⌘/Ctrl + K`       | Focus search (home)                 |
| `N`                | New note (anywhere, outside inputs) |
| `E`                | Edit the open note                  |
| `⌘/Ctrl + S` / `⌘/Ctrl + Enter` | Save the note in the editor |
| `Esc`              | Clear / leave the search box        |

## Theming

Both themes are defined in [`tailwind.config.js`](tailwind.config.js) as daisyUI custom themes (`latte`,
`espresso`). Colour tokens follow daisyUI naming (`primary`, `secondary`, `accent`, `base-100/200/300`, …), so
every component picks up a palette change automatically. Tailwind's `dark:` variant is bound to the Espresso
theme via `darkMode: ['class', '[data-theme="espresso"]']`.

Fonts: **Fraunces** (display) and **DM Sans** (body) are loaded from Google Fonts in `index.html`.
