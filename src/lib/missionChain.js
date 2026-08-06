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

// Sequential nav gating REMOVED (2026-07): a session recording showed the
// locks made everything feel inaccessible and drove a visitor away without
// ever opening the course. The chain above is kept only to order the
// "next up" progress suggestions. Paid content stays gated inside pages.
export const GATED_NAV = {}

export function navUnlocked() {
  return true
}
