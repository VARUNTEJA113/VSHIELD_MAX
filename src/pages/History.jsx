import { useState } from 'react'
import EmptyState from '../components/EmptyState'
import { getHistory, clearHistory } from '../services/storage'
import { formatBytes } from '../utils/hash'
import { levelFor } from '../utils/risk'
import { useToast } from '../components/Toast'

export default function History() {
  const [rows, setRows] = useState(getHistory()), toast = useToast()
  if (!rows.length) return <><h1>Scan history</h1><EmptyState title="Nothing here yet" text="Completed scans are saved in this browser and listed here." /></>
  return (
    <>
      <div className="row"><h1>Scan history</h1><button className="btn ghost" onClick={() => { clearHistory(); setRows([]); toast('History cleared', 'ok') }}>Clear history</button></div>
      <div className="card glass table-wrap"><table>
        <thead><tr><th>File</th><th>Size</th><th>SHA-256</th><th>Risk</th><th>Date</th></tr></thead>
        <tbody>{rows.map(s => <tr key={s.id}><td>{s.name}</td><td>{formatBytes(s.size)}</td><td><code>{s.sha256.slice(0, 16)}…</code></td>
          <td><span className="pill" style={{ '--c': levelFor(s.risk).color }}>{s.risk}% {s.label}</span></td><td>{new Date(s.date).toLocaleString()}</td></tr>)}</tbody>
      </table></div>
    </>
  )
}
