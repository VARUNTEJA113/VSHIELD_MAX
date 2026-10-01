import { createContext, useContext, useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
const Ctx = createContext(() => {})
export const useToast = () => useContext(Ctx)
export function ToastProvider({ children }) {
  const [items, setItems] = useState([])
  const push = useCallback((msg, kind = 'info') => {
    const id = Math.random()
    setItems(t => [...t, { id, msg, kind }])
    setTimeout(() => setItems(t => t.filter(x => x.id !== id)), 3500)
  }, [])
  return (
    <Ctx.Provider value={push}>
      {children}
      <div className="toasts" role="status" aria-live="polite">
        <AnimatePresence>
          {items.map(t => (
            <motion.div key={t.id} className={`toast ${t.kind}`} initial={{ x: 60, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ opacity: 0 }}>{t.msg}</motion.div>
          ))}
        </AnimatePresence>
      </div>
    </Ctx.Provider>
  )
}
