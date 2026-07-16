export function isApplicationOpen(setting: { timeline1_date: string | null; timeline2_date: string | null } | null): boolean {
  if (!setting?.timeline1_date || !setting?.timeline2_date) return false

  const start = new Date(setting.timeline1_date)
  const end = new Date(setting.timeline2_date)
  const now = new Date()

  const startDay = new Date(start.getFullYear(), start.getMonth(), start.getDate())
  const endDay = new Date(end.getFullYear(), end.getMonth(), end.getDate())
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())

  return today >= startDay && today <= endDay
}

// Admit card download opens on/after timeline3_date — no end date given, so it stays open once reached
export function isAdmitCardOpen(setting: { timeline3_date: string | null } | null): boolean {
  if (!setting?.timeline3_date) return false

  const start = new Date(setting.timeline3_date)
  const now = new Date()

  const startDay = new Date(start.getFullYear(), start.getMonth(), start.getDate())
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())

  return today >= startDay
}
