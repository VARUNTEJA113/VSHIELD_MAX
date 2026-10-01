import { useEffect, useRef } from 'react'
// Light canvas particle network.
export default function ParticleBackground() {
  const ref = useRef(null)
  useEffect(() => {
    const c = ref.current, ctx = c.getContext('2d'); let raf
    const resize = () => { c.width = innerWidth; c.height = innerHeight }
    resize(); addEventListener('resize', resize)
    const pts = Array.from({ length: 45 }, () => ({ x: Math.random() * c.width, y: Math.random() * c.height, vx: (Math.random() - .5) * .3, vy: (Math.random() - .5) * .3 }))
    const loop = () => {
      ctx.clearRect(0, 0, c.width, c.height)
      pts.forEach((p, i) => {
        p.x = (p.x + p.vx + c.width) % c.width; p.y = (p.y + p.vy + c.height) % c.height
        ctx.fillStyle = 'rgba(62,224,197,.5)'; ctx.fillRect(p.x, p.y, 2, 2)
        for (let j = i + 1; j < pts.length; j++) {
          const d = Math.hypot(p.x - pts[j].x, p.y - pts[j].y)
          if (d < 120) { ctx.strokeStyle = `rgba(62,224,197,${0.12 * (1 - d / 120)})`; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(pts[j].x, pts[j].y); ctx.stroke() }
        }
      })
      raf = requestAnimationFrame(loop)
    }
    loop()
    return () => { cancelAnimationFrame(raf); removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={ref} className="particles" aria-hidden="true" />
}
