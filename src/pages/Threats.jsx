import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import EmptyState from '../components/EmptyState'
import { getHistory } from '../services/storage'
import { levelFor } from '../utils/risk'

export default function Threats() {
  const h = getHistory(), counts = {}
  h.forEach(s => s.indicators.forEach(i => { counts[i.name] = (counts[i.name] || 0) + 1 }))
  const data = Object.entries(counts).map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count)
  const top = h.filter(s => s.risk > 20).sort((a, b) => b.risk - a.risk).slice(0, 5)
  if (!data.length) return <><h1>Threat analysis</h1><EmptyState title="No indicators found" text="Scan a file such as a .exe or .zip to see how detection indicators are reported." /></>
  return (
    <>
      <h1>Threat analysis</h1>
      <div className="grid2">
        <div className="card glass"><h3>Most common indicators</h3>
          <ResponsiveContainer width="100%" height={260}><BarChart data={data} layout="vertical" margin={{ left: 40 }}><XAxis type="number" allowDecimals={false} stroke="#6f8796" /><YAxis type="category" dataKey="name" width={170} stroke="#6f8796" tick={{ fontSize: 11 }} /><Tooltip /><Bar dataKey="count" fill="#3ee0c5" radius={[0, 6, 6, 0]} /></BarChart></ResponsiveContainer></div>
        <div className="card glass"><h3>Highest-risk files</h3>
          {top.map(s => <div key={s.id} className="top"><span>{s.name}</span><b style={{ color: levelFor(s.risk).color }}>{s.risk}%</b></div>)}</div>
      </div>
    </>
  )
}
