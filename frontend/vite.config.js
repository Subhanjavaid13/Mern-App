import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Frontend calls "/api/..." → forwarded to the Express backend (PORT in backend/.env), no CORS needed
      '/api': { target: 'http://localhost:5000', changeOrigin: true },
    },
  },
})
