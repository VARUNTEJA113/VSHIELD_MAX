import { useState } from 'react'
import { getSettings, saveSettings, clearHistory } from '../services/storage'
import { useToast } from '../components/Toast'
export default function Settings() {
  const [s, setS] = useState(getSettings()), toast = useToast()
  const update = (patch) => { const n = { ...s, ...patch }; setS(n); saveSettings(n); toast('Settings saved', 'ok') }
  return (
    <>
      <h1>Settings</h1>
      <div className="card glass">
        <label className="top"><span>Toast notifications</span><input type="checkbox" checked={s.notifications} onChange={e => update({ notifications: e.target.checked })} /></label>
        <label className="top"><span>Scan speed</span>
          <select value={s.speed} onChange={e => update({ speed: +e.target.value })}><option value={0.4}>Fast</option><option value={1}>Normal</option><option value={2}>Slow (demo)</option></select></label>
        <label className="top"><span>Background particles (reload to apply)</span><input type="checkbox" checked={s.particles} onChange={e => update({ particles: e.target.checked })} /></label>
        <br /><button className="btn ghost" onClick={() => { clearHistory(); toast('Scan history deleted', 'ok') }}>Delete all scan history</button>
      </div>
    </>
  )
}
