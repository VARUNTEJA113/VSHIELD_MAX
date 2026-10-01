import { motion } from 'framer-motion'
import { levelFor } from '../utils/risk'
// Semicircle gauge. The arc length animates to the score.
export default function RiskGauge({ score = 0 }) {
  const lvl = levelFor(score), len = Math.PI * 80
  return (
    <div className="gauge" role="img" aria-label={`Risk score ${score} percent, ${lvl.label}`}>
      <svg viewBox="0 0 200 120">
        <path d="M20 100 A80 80 0 0 1 180 100" fill="none" stroke="rgba(255,255,255,.08)" strokeWidth="14" strokeLinecap="round" />
        <motion.path d="M20 100 A80 80 0 0 1 180 100" fill="none" stroke={lvl.color} strokeWidth="14" strokeLinecap="round"
          strokeDasharray={len} initial={{ strokeDashoffset: len }} animate={{ strokeDashoffset: len * (1 - score / 100) }} transition={{ duration: 1.2, ease: 'easeOut' }}
          style={{ filter: `drop-shadow(0 0 8px ${lvl.color})` }} />
        <text x="100" y="92" textAnchor="middle" className="g-num" fill={lvl.color}>{score}%</text>
        <text x="100" y="112" textAnchor="middle" className="g-lbl" fill={lvl.color}>{lvl.label}</text>
      </svg>
    </div>
  )
}
