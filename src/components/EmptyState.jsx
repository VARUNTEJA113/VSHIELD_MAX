import { Link } from 'react-router-dom'
export default function EmptyState({ title, text }) {
  return <div className="empty glass"><div className="empty-icon">⌖</div><h3>{title}</h3><p>{text}</p><Link className="btn" to="/scanner">Scan a file</Link></div>
}
