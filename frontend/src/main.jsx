import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
// Self-hosted Inter (variable weight) — bundled with the app, no external font requests
import '@fontsource-variable/inter'
import './index.css'
import App from './App.jsx'
import AppToaster from './components/ui/AppToaster'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
      <AppToaster />
    </BrowserRouter>
  </StrictMode>,
)
