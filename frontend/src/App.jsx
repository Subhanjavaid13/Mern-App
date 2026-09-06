import { Route, Routes } from 'react-router'
import ThemeProvider from './context/ThemeProvider'
import RateLimitProvider from './context/RateLimitProvider'
import AppLayout from './components/layout/AppLayout'
import HomePage from './pages/HomePage'
import CreatePage from './pages/CreatePage'
import NoteDetailPage from './pages/NoteDetailPage'
import NotFoundPage from './pages/NotFoundPage'

export default function App() {
  return (
    <ThemeProvider>
      <RateLimitProvider>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<HomePage />} />
            <Route path="create" element={<CreatePage />} />
            <Route path="note/:id" element={<NoteDetailPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </RateLimitProvider>
    </ThemeProvider>
  )
}
