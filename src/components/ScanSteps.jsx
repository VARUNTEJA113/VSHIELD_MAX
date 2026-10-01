import { motion } from 'framer-motion'
import { SCAN_STEPS } from '../services/analysisService'
export default function ScanSteps({ current, done }) {
  const pct = done ? 100 : Math.round(((current + 1) / SCAN_STEPS.length) * 100)
  return (
    <div>
      <div className="bar"><motion.div className="bar-fill" animate={{ width: `${pct}%` }} /></div>
      <ul className="steps">{SCAN_STEPS.map((s, i) => {
        const state = done || i < current ? 'done' : i === current ? 'active' : ''
        return <li key={s} className={state}><i>{state === 'done' ? '✓' : ''}</i>{s}</li>
      })}</ul>
    </div>
  )
}
