# Cocoa Notes — frontend

A warm, responsive notes UI built with React 19, Vite, Tailwind CSS 3, daisyUI 4, lucide-react icons,
react-router and axios. Two themes ship out of the box: **Latte** (cream / beige with orange accents) and
**Espresso** (warm charcoal surfaces with the same orange accents). The choice is remembered in `localStorage`
and applied before first paint.

```bash
npm install
npm run dev      # http://localhost:5173  (proxies /api → http://localhost:5000)
npm run build    # production bundle in dist/
npm run lint
```

Start the backend first (`cd ../backend && npm start`); it listens on the `PORT` from its `.env` (5000).

## API layer

- [`src/lib/axios.js`](src/lib/axios.js) — a single axios instance (`api`). Base URL is `VITE_API_URL` when set,
  otherwise `/api`, which Vite proxies to the backend in development (see [`vite.config.js`](vite.config.js)).
  A response interceptor turns every failure into an `ApiError` with a `status` (0 when the server is unreachable)
  and the backend's `message`.
- [`src/lib/notesApi.js`](src/lib/notesApi.js) — one function per route, each calling `api.get` / `api.post` / `api.put` / `api.delete`:

| Function                             | Route                    |
| ------------------------------------ | ------------------------ |
| `getNotes(config?)`                  | `GET    /api/notes`      |
| `getNote(id, config?)`               | `GET    /api/notes/:id`  |
| `createNote({ title, content })`     | `POST   /api/notes`      |
| `updateNote(id, { title, content })` | `PUT    /api/notes/:id`  |
| `deleteNote(id)`                     | `DELETE /api/notes/:id`  |

Pages pass an `AbortController` signal so requests are cancelled on unmount, and map errors to UI states:
`404` → not-found screen, anything else → error state with a retry button.

**Rate limiting (429).** The backend answers with `Retry-After` and a `retryAfter` (seconds) field. The axios layer
broadcasts every 429, and `RateLimitProvider` turns it into a countdown used across the app: a slim notice under
the navbar, disabled Save / Delete buttons showing "Wait Ns", a toast with the wait time, and automatic retry of
the failed page load once the window resets.

For production, copy `.env.example` to `.env` and set `VITE_API_URL` to the deployed API. If the frontend
and API live on different origins, enable CORS on the backend.

## Project layout

```
src/
├─ components/
│  ├─ ui/        Generic building blocks (Button, IconButton, Input, Textarea, Badge, Card,
│  │             Modal, ConfirmDialog, Dropdown, Tooltip, Skeleton, EmptyState, SearchBar,
│  │             SegmentedControl, Alert, StatCard, PageHeader, BackLink, Logo, Kbd,
│  │             Spinner/PageLoader, ThemeToggle, Container, AppToaster)
│  ├─ layout/    AppLayout (navbar + footer + scroll restore), Navbar, Footer
│  └─ notes/     NoteCard, NoteListItem, NotesGrid, NotesToolbar, NotesSkeleton, NotesEmpty,
│                NoteForm (create/edit), NoteMeta, NoteContent, DeleteNoteDialog, RateLimitBanner
├─ pages/        HomePage, CreatePage, NoteDetailPage (read + edit via ?edit=1), NotFoundPage
├─ hooks/        useTheme, useLocalStorage, useDebounce, useHotkey
├─ context/      ThemeProvider + theme context
├─ lib/          axios.js (shared axios instance), notesApi.js (route functions)
└─ utils/        cn, constants, date, text, notes helpers
```

## Keyboard shortcuts

| Keys                            | Action                              |
| ------------------------------- | ----------------------------------- |
| `⌘/Ctrl + K`                    | Focus search (home)                 |
| `N`                             | New note (anywhere, outside inputs) |
| `E`                             | Edit the open note                  |
| `⌘/Ctrl + S` / `⌘/Ctrl + Enter` | Save the note in the editor         |
| `Esc`                           | Clear / leave the search box        |

## Theming

Both themes are defined in [`tailwind.config.js`](tailwind.config.js) as daisyUI custom themes (`latte`,
`espresso`). Colour tokens follow daisyUI naming (`primary`, `secondary`, `accent`, `base-100/200/300`, …), so
every component picks up a palette change automatically. Shadows are CSS variables tuned per theme in
[`src/index.css`](src/index.css). Tailwind's `dark:` variant is bound to the Espresso theme via
`darkMode: ['class', '[data-theme="espresso"]']`.

Font: **Inter** for everything, self-hosted through `@fontsource-variable/inter` (imported in `src/main.jsx`), so
there are no external font requests. The stack falls back to the platform UI font (Segoe UI, Roboto, Helvetica,
Arial) if the file has not loaded yet.
