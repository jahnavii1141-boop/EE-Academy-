// ── The gated free-tier journey ──────────────────────────────────────────────
// Single source of truth for the unlock order, shared by the Mission Map
// (dashboard home) and the sidebar nav so they never disagree.
//
// Order: Mission 01→05  →  32/34 example essay (reward)  →  My Essay  →  Dump  →  Templates
import { COURSE_CATALOG } from '@/data/courseCatalog'

const FREE_MISSIONS = COURSE_CATALOG.filter((m) => m.free) // module-1 … module-5

// Ordered chain. `key` = progress key stored via useModuleProgress.
export const MISSION_CHAIN = [
  ...FREE_MISSIONS.map((m) => ({ key: m.id, navId: 'modules', kind: 'mission' })),
  { key: 'reward-sample-ee', navId: 'sample-ee', kind: 'reward' },
  { key: 'step-essay',       navId: 'essay',     kind: 'tool' },
  { key: 'step-dump',        navId: 'dump',      kind: 'tool' },
  { key: 'step-templates',   navId: 'templates', kind: 'tool' },
]

// Sidebar tabs that are gated behind an earlier step. (Missions/Home/Planner/
// Guides/IB guide/Share are always open.)
export const GATED_NAV = {
  'sample-ee': 'reward-sample-ee',
  'essay':     'step-essay',
  'dump':      'step-dump',
  'templates': 'step-templates',
}

// Is a sidebar tab unlocked? Its gating step's predecessor must be done.
// Paid users are never gated.
export function navUnlocked(navId, isVisited, hasPaid) {
  if (hasPaid) return true
  const stepKey = GATED_NAV[navId]
  if (!stepKey) return true // ungated tab
  const idx = MISSION_CHAIN.findIndex((s) => s.key === stepKey)
  if (idx <= 0) return true
  return isVisited(MISSION_CHAIN[idx - 1].key)
}
