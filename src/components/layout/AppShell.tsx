import { useLocation, Outlet } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import FloatingNav from './FloatingNav'
import Footer from './Footer'
import NoiseOverlay from '@/components/effects/NoiseOverlay'
import { useTheme } from '@/context/ThemeContext'

export default function AppShell() {
  const { pathname } = useLocation()
  const { theme } = useTheme()

  return (
    <div className="min-h-screen bg-canvas text-prose font-body antialiased">
      {theme.noise && <NoiseOverlay />}
      <AnimatePresence mode="wait" initial={false}>
        <div key={pathname} className="pb-6 md:pb-28">
          <Outlet />
          <Footer />
        </div>
      </AnimatePresence>
      <FloatingNav />
    </div>
  )
}
