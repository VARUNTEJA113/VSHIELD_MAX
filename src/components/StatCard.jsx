import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
// Number counts up when the value changes.
export default function StatCard({ label, value, color = '#3ee0c5' }) {
  const [n, setN] = useState(0)
  useEffect(() => {
    let f = 0; const steps = 20
    const t = setInterval(() => { f++; setN(value * f / steps); if (f >= steps) clearInterval(t) }, 25)
    return () => clearInterval(t)
  }, [value])
  return (
    <motion.div className="card glass stat" whileHover={{ y: -4 }} style={{ '--c': color }}>
      <span className="stat-label">{label}</span>
      <strong>{Math.round(n)}</strong>
    </motion.div>
  )
}
