/**
 * MOCK ANALYSIS ENGINE (simulation only; no real malware detection).
 * To go real later, replace `scoreFile` with a call to your backend, e.g.
 *   const res = await fetch('/api/scan', { method: 'POST', body: formData })
 * and return the same result shape.
 */
import { sha256OfFile } from '../utils/hash'
import { levelFor } from '../utils/risk'

export const SCAN_STEPS = ['Initializing', 'Analyzing File', 'Calculating Hash', 'Checking Patterns', 'Completing Scan', 'Generating Report']
const MAX_SIZE = 100 * 1024 * 1024
const HIGH_EXT = ['exe', 'dll', 'scr', 'bat', 'cmd', 'ps1', 'vbs', 'js', 'jar', 'msi', 'apk']
const MED_EXT = ['zip', 'rar', '7z', 'docm', 'xlsm', 'iso', 'html', 'htm', 'lnk']
const KEYWORDS = ['crack', 'keygen', 'patch', 'free', 'invoice', 'payload', 'hack']
const wait = (ms) => new Promise(r => setTimeout(r, ms))

// Deterministic mock scoring: same file always gives the same score.
function scoreFile(file, ext, sha256) {
  let score = 5; const indicators = []
  if (HIGH_EXT.includes(ext)) { score += 40; indicators.push({ name: 'Executable/script file type', weight: 40 }) }
  else if (MED_EXT.includes(ext)) { score += 20; indicators.push({ name: 'Archive or macro-capable type', weight: 20 }) }
  const lower = file.name.toLowerCase()
  if (/\.[a-z0-9]{2,4}\.[a-z0-9]{2,4}$/.test(lower)) { score += 18; indicators.push({ name: 'Double extension', weight: 18 }) }
  if (KEYWORDS.some(k => lower.includes(k))) { score += 14; indicators.push({ name: 'Suspicious file name keyword', weight: 14 }) }
  if (file.size < 2048 && HIGH_EXT.includes(ext)) { score += 8; indicators.push({ name: 'Tiny executable (possible dropper)', weight: 8 }) }
  if (file.size > 50 * 1024 * 1024) { score += 6; indicators.push({ name: 'Unusually large file', weight: 6 }) }
  score += parseInt(sha256.slice(0, 2), 16) % 14   // hash-based jitter
  return { risk: Math.min(100, score), indicators }
}

export async function analyzeFile(file, onStep, speed = 1) {
  if (!file) throw new Error('No file selected.')
  if (file.size > MAX_SIZE) throw new Error('File is larger than 100 MB. Choose a smaller file.')
  const start = performance.now(); let sha256 = ''
  for (let i = 0; i < SCAN_STEPS.length; i++) {
    onStep(i)
    if (i === 2) sha256 = await sha256OfFile(file)
    await wait((500 + Math.random() * 500) * speed)
  }
  const ext = file.name.includes('.') ? file.name.split('.').pop().toLowerCase() : 'none'
  const { risk, indicators } = scoreFile(file, ext, sha256)
  const level = levelFor(risk)
  return {
    id: crypto.randomUUID(), name: file.name, type: file.type || 'unknown', size: file.size, ext, sha256,
    risk, level: level.key, label: level.label, indicators,
    scanTime: +((performance.now() - start) / 1000).toFixed(1), date: new Date().toISOString(),
  }
}
