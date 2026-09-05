import { Outlet } from 'react-router'
import Footer from './Footer'
import Navbar from './Navbar'
import ScrollToTop from './ScrollToTop'

/** Soft blurred colour washes + paper grain behind every page. */
function BackgroundDecor() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div className="absolute -left-32 -top-32 size-[30rem] rounded-full bg-secondary/25 blur-3xl dark:bg-secondary/15" />
      <div className="absolute -right-40 top-1/3 size-[34rem] rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute -bottom-40 left-1/3 size-[28rem] rounded-full bg-accent/15 blur-3xl dark:bg-accent/5" />
      <div className="grain absolute inset-0 opacity-[0.07] mix-blend-multiply dark:opacity-[0.12] dark:mix-blend-soft-light" />
    </div>
  )
}

export default function AppLayout() {
  return (
    <div className="relative flex min-h-dvh flex-col">
      <BackgroundDecor />
      <ScrollToTop />
      <Navbar />
      <main className="relative flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
