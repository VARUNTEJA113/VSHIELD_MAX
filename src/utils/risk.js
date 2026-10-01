// Maps a 0-100 score to a classification used across the whole UI.
export function levelFor(score) {
  if (score <= 20) return { key: 'low', label: 'LOW RISK', text: 'No significant risk', color: '#3ee0c5' }
  if (score <= 60) return { key: 'medium', label: 'SUSPICIOUS', text: 'Medium risk', color: '#ffc247' }
  return { key: 'high', label: 'HIGH RISK', text: 'High risk', color: '#ff4d6a' }
}
