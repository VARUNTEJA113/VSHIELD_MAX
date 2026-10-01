import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts'
import StatCard from '../components/StatCard'
import EmptyState from '../components/EmptyState'
import { getHistory } from '../services/storage'
import { levelFor } from '../utils/risk'

export default function Overview() {
  const h = getHistory()
  const count = (k) => h.filter(s => s.level === k).length
  const avg = h.length ? +(h.reduce((a, s) => a + s.scanTime, 0) / h.length).toFixed(1) : 0
  const pie = [['Safe', count('low'), '#3ee0c5'], ['Suspicious', count('medium'), '#ffc247'], ['High risk', count('high'), '#ff4d6a']].map(([name, value, color]) => ({ name, value, color }))
  const recent = h.slice(0, 8).reverse().map((s, i) => ({ n: i + 1, risk: s.risk, color: levelFor(s.risk).color }))
  return (
    <>
      <h1>Security overview</h1>
      <div className="grid4">
        <StatCard label="Files scanned" value={h.length} />
        <StatCard label="Threats detected" value={count('high')} color="#ff4d6a" />
        <StatCard label="Suspicious files" value={count('medium')} color="#ffc247" />
        <StatCard label="Safe files" value={count('low')} />
      </div>
      {!h.length ? <EmptyState title="No scans yet" text="Scan your first file to see detection statistics here." /> : (
        <div className="grid2">
          <div className="card glass"><h3>Detection breakdown</h3>
            <ResponsiveContainer width="100%" height={230}><PieChart><Pie data={pie} dataKey="value" innerRadius={55} outerRadius={85} paddingAngle={3}>{pie.map(p => <Cell key={p.name} fill={p.color} stroke="none" />)}</Pie><Tooltip /></PieChart></ResponsiveContainer>
            <div className="legend">{pie.map(p => <span key={p.name}><i style={{ background: p.color }} />{p.name}: {p.value}</span>)}</div></div>
          <div className="card glass"><h3>Recent risk scores · avg scan {avg}s</h3>
            <ResponsiveContainer width="100%" height={260}><BarChart data={recent}><XAxis dataKey="n" stroke="#6f8796" /><YAxis domain={[0, 100]} stroke="#6f8796" /><Tooltip /><Bar dataKey="risk" radius={[6, 6, 0, 0]}>{recent.map((r, i) => <Cell key={i} fill={r.color} />)}</Bar></BarChart></ResponsiveContainer></div>
        </div>)}
    </>
  )
}
