/** Completeness zones for AI Score meter (demo / marketing). */
export function aiScoreTone(score: number): 'low' | 'mid' | 'high' {
  if (score >= 75) return 'high';
  if (score >= 40) return 'mid';
  return 'low';
}
