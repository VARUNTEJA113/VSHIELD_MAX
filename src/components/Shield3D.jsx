// CSS 3D logo: stacked shield layers that rotate slowly (no extra 3D library needed).
export default function Shield3D({ size = 120 }) {
  const path = 'M32 4 56 14v18c0 14-10 24-24 28C18 56 8 46 8 32V14z'
  return (
    <div className="shield3d" style={{ width: size, height: size }} aria-hidden="true">
      <div className="shield3d-inner">
        {[0, 1, 2, 3].map(i => (
          <svg key={i} viewBox="0 0 64 64" style={{ transform: `translateZ(${i * 7 - 10}px)`, opacity: i === 3 ? 1 : 0.35 }}>
            <path d={path} fill={i === 3 ? 'rgba(62,224,197,.12)' : 'none'} stroke="#3ee0c5" strokeWidth="2.5" />
            {i === 3 && <path d="M20 30l8 8 16-18" fill="none" stroke="#3ee0c5" strokeWidth="4" strokeLinecap="round" />}
          </svg>
        ))}
      </div>
    </div>
  )
}
