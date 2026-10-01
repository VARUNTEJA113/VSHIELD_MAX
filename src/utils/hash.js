// SHA-256 with the browser's Web Crypto API. The file never leaves the device.
// Note: crypto.subtle only works on https:// or localhost.
export async function sha256OfFile(file) {
  if (!window.crypto?.subtle) throw new Error('Web Crypto is unavailable (use https or localhost).')
  const buffer = await file.arrayBuffer()                       // read file bytes
  const digest = await crypto.subtle.digest('SHA-256', buffer)  // hash them
  return [...new Uint8Array(digest)].map(b => b.toString(16).padStart(2, '0')).join('')
}
export const formatBytes = (n) => {
  if (!n) return '0 B'
  const u = ['B', 'KB', 'MB', 'GB']; const i = Math.min(Math.floor(Math.log(n) / Math.log(1024)), 3)
  return `${(n / 1024 ** i).toFixed(i ? 1 : 0)} ${u[i]}`
}
