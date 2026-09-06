import { Outlet } from 'react-router'
import Footer from './Footer'
import Navbar from './Navbar'
import RateLimitNotice from './RateLimitNotice'
import ScrollToTop from './ScrollToTop'

export default function AppLayout() {
  return (
    <div className="flex min-h-dvh flex-col">
      <ScrollToTop />
      <Navbar />
      <RateLimitNotice />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
