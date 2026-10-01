import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ScanSteps from '../components/ScanSteps'
import RiskGauge from '../components/RiskGauge'
import { analyzeFile } from '../services/analysisService'
import { addScan, getSettings } from '../services/storage'
import { formatBytes } from '../utils/hash'
import { levelFor } from '../utils/risk'
import { useToast } from '../components/Toast'

export default function Scanner() {
  const toast = useToast(), input = useRef(null)
  const [file, setFile] = useState(null), [state, setState] = useState('idle')  // idle | scanning | done | error
  const [step, setStep] = useState(0), [result, setResult] = useState(null), [error, setError] = useState('')
  const [drag, setDrag] = useState(false)

  const pick = (f) => { if (!f) return; setFile(f); setResult(null); setState('idle'); setError('') }
  const run = async () => {
    const s = getSettings(); setState('scanning'); setStep(0); setResult(null); setError('')
    try {
      const r = await analyzeFile(file, setStep, s.speed)
      addScan(r); setResult(r); setState('done')
      if (s.notifications) toast(`Scan complete: ${r.label} (${r.risk}%)`, r.level === 'high' ? 'danger' : r.level === 'medium' ? 'warn' : 'ok')
    } catch (e) { setError(e.message); setState('error'); toast(e.message, 'danger') }
  }
  const lvl = result && levelFor(result.risk)
  const info = file && [['File name', file.name], ['File type', file.type || 'unknown'], ['Size', formatBytes(file.size)], ['Extension', file.name.includes('.') ? '.' + file.name.split('.').pop() : 'none']]

  return (
    <>
      <h1>File scanner</h1>
      <div className={`drop glass ${drag ? 'drag' : ''}`} onClick={() => input.current.click()} role="button" tabIndex={0}
        onKeyDown={e => e.key === 'Enter' && input.current.click()}
        onDragOver={e => { e.preventDefault(); setDrag(true) }} onDragLeave={() => setDrag(false)}
        onDrop={e => { e.preventDefault(); setDrag(false); pick(e.dataTransfer.files[0]) }}>
        <input ref={input} type="file" hidden onChange={e => pick(e.target.files[0])} />
        <div className="empty-icon">⇪</div><b>Drop a file here or click to browse</b><small>Files are processed locally in your browser and never uploaded.</small>
      </div>

      <AnimatePresence>{file && (
        <motion.div className="card glass" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <div className="info">{info.map(([k, v]) => <div key={k}><small>{k}</small><span>{v}</span></div>)}</div>
          <div className="hash"><small>SHA-256</small><code>{result ? result.sha256 : state === 'scanning' ? 'Calculating…' : 'Generated during scan'}</code></div>
          <button className="btn" disabled={state === 'scanning'} onClick={run}>{state === 'scanning' ? 'Scanning…' : state === 'done' ? 'Scan again' : 'Start scan'}</button>
        </motion.div>)}</AnimatePresence>

      {state === 'scanning' && <div className="card glass"><h3>Scan in progress</h3><div className="radar" /><ScanSteps current={step} /></div>}
      {state === 'error' && <div className="card glass error-box"><h3>Scan failed</h3><p>{error}</p></div>}
      {state === 'done' && result && (
        <motion.div className={`card glass result ${result.level}`} initial={{ opacity: 0, scale: .97 }} animate={{ opacity: 1, scale: 1 }} style={{ '--c': lvl.color }}>
          <RiskGauge score={result.risk} />
          <div>
            <h2 style={{ color: lvl.color }}>Risk score: {result.risk}% · {result.label}</h2>
            <p>Classification: {lvl.text}. Scan time {result.scanTime}s. Detection result: {result.indicators.length ? `${result.indicators.length} indicator(s) found` : 'no indicators found'}.</p>
            <ul className="ind">{result.indicators.map(i => <li key={i.name}><span>{i.name}</span><b>+{i.weight}</b></li>)}</ul>
            <ScanSteps current={5} done />
          </div>
        </motion.div>)}
    </>
  )
}
