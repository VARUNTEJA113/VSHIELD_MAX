import { NavLink } from 'react-router-dom'
import Shield3D from './Shield3D'
const LINKS = [
  ['/', 'Overview', '◈'], ['/scanner', 'File Scanner', '⌖'], ['/history', 'Scan History', '☰'],
  ['/threats', 'Threat Analysis', '⚠'], ['/system', 'System Status', '◉'], ['/settings', 'Settings', '⚙'],
]
export default function Sidebar() {
  return (
    <aside className="sidebar glass">
      <div className="brand"><Shield3D size={44} /><div><b>VSHIELD MAX</b><small>Threat Detection · File Analysis · Security Intelligence</small></div></div>
      <nav>{LINKS.map(([to, label, icon]) => (
        <NavLink key={to} to={to} end={to === '/'} className={({ isActive }) => `navlink ${isActive ? 'active' : ''}`}><span>{icon}</span><em>{label}</em></NavLink>
      ))}</nav>
      <div className="sim-note"> version 1.8</div>
    </aside>
  )
}
