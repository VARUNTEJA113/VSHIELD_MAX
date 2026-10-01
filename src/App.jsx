import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Sidebar from './components/Sidebar'
import ParticleBackground from './components/ParticleBackground'
import { ToastProvider } from './components/Toast'
import { getSettings } from './services/storage'
import Overview from './pages/Overview'
import Scanner from './pages/Scanner'
import History from './pages/History'
import Threats from './pages/Threats'
import System from './pages/System'
import Settings from './pages/Settings'

// Wraps each page in a fade/slide transition.
const Page = ({ children }) => <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: .25 }}>{children}</motion.div>

export default function App() {
  const location = useLocation()
  return (
    <ToastProvider>
      {getSettings().particles && <ParticleBackground />}
      <div className="layout">
        <Sidebar />
        <main>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Page><Overview /></Page>} />
              <Route path="/scanner" element={<Page><Scanner /></Page>} />
              <Route path="/history" element={<Page><History /></Page>} />
              <Route path="/threats" element={<Page><Threats /></Page>} />
              <Route path="/system" element={<Page><System /></Page>} />
              <Route path="/settings" element={<Page><Settings /></Page>} />
              <Route path="*" element={<Page><h1>Page not found</h1></Page>} />
            </Routes>
          </AnimatePresence>
        </main>
      </div>
    </ToastProvider>
  )
}
