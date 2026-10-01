import { useEffect, useState } from 'react'
// Simulated engine metrics that tick every 2s to feel "live".
const rnd = (a, b) => Math.round(a + Math.random() * (b - a))
export default function System() {
  const [m, setM] = useState({ cpu: 18, mem: 42, sigs: 1284, latency: 24 })
  useEffect(() => { const t = setInterval(() => setM(p => ({ cpu: rnd(10, 35), mem: rnd(38, 50), sigs: p.sigs, latency: rnd(15, 40) })), 2000); return () => clearInterval(t) }, [])
  const items = [['Scan engine', 'Online (simulated)', true], ['Hashing module (Web Crypto)', 'Ready', true], ['Pattern database', `${m.sigs} mock rules`, true], ['Backend API', 'Not connected (v2)', false]]
  return (
    <>
      <h1>System status</h1>
      <div className="grid2">
        <div className="card glass">{items.map(([n, s, ok]) => <div key={n} className="top"><span>{n}</span><b className={ok ? 'ok' : 'off'}><i className="dot" />{s}</b></div>)}</div>
        <div className="card glass">{[['CPU load (%)', m.cpu], ['Memory (%)', m.mem], ['Engine latency (ms)', m.latency]].map(([n, v]) => (
          <div key={n} className="metric"><div className="top"><span>{n}</span><b>{v}</b></div><div className="bar"><div className="bar-fill" style={{ width: `${Math.min(v, 100)}%` }} /></div></div>))}</div>
      </div>
    </>
  )
}
