// LocalStorage helpers (wrapped in try/catch because storage can be blocked).
const H = 'vshield_history', S = 'vshield_settings'
const read = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d } catch { return d } }
const write = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)) } catch { /* ignore */ } }
export const getHistory = () => read(H, [])
export const addScan = (scan) => write(H, [scan, ...getHistory()].slice(0, 200))
export const clearHistory = () => write(H, [])
export const getSettings = () => ({ notifications: true, speed: 1, particles: true, ...read(S, {}) })
export const saveSettings = (s) => write(S, s)
