'use client'

import Link from 'next/link'
import { Lock, Check, ArrowRight, Award, PenLine, Database, FileText, GitBranch, BookMarked, BookOpen } from 'lucide-react'
import { COURSE_CATALOG } from '@/data/courseCatalog'
import { useModuleProgress } from '@/hooks/useModuleProgress'

// ── Brand palette (dashboard was black/white; everything here is navy/cream) ──
const C = {
  navy: '#2E3250',
  navyDeep: '#252840',
  steel: '#9BAAB8',
  parchment: '#DDD9C4',
  cream: '#F4F3E8',
  cardCream: '#EAE8DC',
  line: 'rgba(46,50,80,0.12)',
}

const FREE_MISSIONS = COURSE_CATALOG.filter((m) => m.free) // module-1 … module-5

// The workspace unlocks *after* the five missions, one step at a time.
const AFTER_MISSIONS = [
  { key: 'reward-sample-ee', reward: true, icon: Award,    title: 'The 32/34 example essay', sub: 'Your reward: a real full-mark Extended Essay, broken down page by page.', href: '/dashboard/sample-ee', cta: 'Unlock the reward' },
  { key: 'step-essay',       reward: false, icon: PenLine,  title: 'My Essay',               sub: 'Your own writing workspace with a live IB word count and autosave.',    href: '/dashboard/essay',     cta: 'Open My Essay' },
  { key: 'step-dump',        reward: false, icon: Database,  title: 'The EE Dump',            sub: 'Collect sources and auto-build your bibliography as you research.',       href: '/dashboard/dump',      cta: 'Open the Dump' },
  { key: 'step-templates',   reward: false, icon: FileText,  title: 'Templates',              sub: '16 subject workbooks and every framework, ready to use.',                 href: '/dashboard/templates', cta: 'Open Templates' },
]

// Build the full ordered chain: 5 missions → reward → essay → dump → templates
function buildSteps() {
  const missionSteps = FREE_MISSIONS.map((m) => ({
    key: m.id,
    kind: 'mission',
    number: m.number,
    title: m.title,
    sub: m.tagline,
    href: `/course/${m.id}`,
    cta: 'Start mission',
    markOnClick: false, // the module page marks it visited on open
  }))
  const afterSteps = AFTER_MISSIONS.map((s, i) => ({
    ...s,
    kind: s.reward ? 'reward' : 'tool',
    number: String(FREE_MISSIONS.length + i + 1).padStart(2, '0'),
    markOnClick: true, // these destinations don't self-mark, so mark on click
  }))
  return [...missionSteps, ...afterSteps]
}

const STEPS = buildSteps()

// Missions 06–14 — the paid system, shown after the free journey.
const PREMIUM_MISSIONS = COURSE_CATALOG.filter((m) => !m.free)

// Extra free tools/references (not part of the gated chain).
const RESOURCES = [
  { icon: GitBranch,  label: 'EE Pathway Finder', sub: 'Find your pathway and shape your RQ, step by step.', href: '/dashboard/tools' },
  { icon: BookMarked, label: 'Official IB guide', sub: 'The complete IB Extended Essay guide, in full.',      href: '/dashboard/ib-guide' },
  { icon: BookOpen,   label: 'EE guides',         sub: 'Every stage of the essay, clearly explained.',         href: '/guides' },
]

function StatusPill({ state }) {
  if (state === 'done') {
    return (
      <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider" style={{ color: C.navy }}>
        <Check className="w-3 h-3" strokeWidth={3} /> Done
      </span>
    )
  }
  if (state === 'locked') {
    return (
      <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider" style={{ color: C.steel }}>
        <Lock className="w-2.5 h-2.5" strokeWidth={2.5} /> Locked
      </span>
    )
  }
  return (
    <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: C.navy }}>
      Available
    </span>
  )
}

function MissionCard({ step, state, prevTitle, onOpen }) {
  const locked = state === 'locked'
  const done = state === 'done'

  const inner = (
    <>
      <div className="flex items-start justify-between mb-4">
        <span className="font-serif leading-none select-none" style={{ fontSize: 44, color: done ? C.parchment : locked ? 'rgba(155,170,184,0.35)' : 'rgba(46,50,80,0.14)' }}>
          {step.number}
        </span>
        <StatusPill state={state} />
      </div>

      {step.reward && (
        <p className="text-[10px] font-bold uppercase tracking-[0.14em] mb-1.5" style={{ color: locked ? C.steel : C.navy }}>
          Reward
        </p>
      )}
      <p className="font-serif text-[17px] leading-snug mb-1.5" style={{ color: locked ? C.steel : C.navy }}>
        {step.title}
      </p>
      <p className="text-[13px] leading-relaxed flex-1" style={{ color: locked ? 'rgba(155,170,184,0.9)' : 'rgba(46,50,80,0.62)' }}>
        {locked ? `Unlocks after ${prevTitle}.` : step.sub}
      </p>

      {/* CTA / lock row */}
      <div className="mt-5 flex items-center gap-1.5 text-[13px] font-semibold" style={{ color: locked ? C.steel : C.navy }}>
        {locked ? (
          <><Lock className="w-3.5 h-3.5" strokeWidth={2.25} /> Locked</>
        ) : done ? (
          <>Review <ArrowRight className="w-3.5 h-3.5" strokeWidth={2.25} /></>
        ) : (
          <>{step.cta} <ArrowRight className="w-3.5 h-3.5" strokeWidth={2.25} /></>
        )}
      </div>

      {/* Bottom progress accent (echoes the phase-card design) */}
      <div className="mt-4 h-1 rounded-full overflow-hidden" style={{ background: 'rgba(221,217,196,0.5)' }}>
        <div className="h-full rounded-full" style={{ width: done ? '100%' : locked ? '0%' : '38%', background: locked ? 'transparent' : C.navy }} />
      </div>
    </>
  )

  const base = 'group relative flex flex-col rounded-2xl p-5 min-h-[220px] transition-all'
  const style = {
    border: `1px solid ${done ? 'rgba(46,50,80,0.22)' : locked ? 'rgba(155,170,184,0.28)' : C.line}`,
    background: done ? C.cream : locked ? 'rgba(244,243,232,0.55)' : '#fff',
    boxShadow: locked ? 'none' : '0 1px 2px rgba(46,50,80,0.04)',
    opacity: locked ? 0.85 : 1,
  }

  if (locked) {
    return <div className={base} style={style} aria-disabled>{inner}</div>
  }
  return (
    <Link href={step.href} onClick={onOpen} className={`${base} hover:-translate-y-0.5`} style={{ ...style, textDecoration: 'none' }}
      onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 8px 24px rgba(46,50,80,0.10)' }}
      onMouseLeave={(e) => { e.currentTarget.style.boxShadow = style.boxShadow }}>
      {inner}
    </Link>
  )
}

function SectionHead({ label, title }) {
  return (
    <div className="mb-5">
      <p className="text-[11px] font-bold uppercase tracking-[0.14em]" style={{ color: C.steel }}>{label}</p>
      <h2 className="font-serif text-[24px] mt-1.5" style={{ color: C.navy }}>{title}</h2>
    </div>
  )
}

export default function MissionMap({ hasPaid = false, isPremium = false }) {
  const { isVisited, markVisited } = useModuleProgress()

  // A step is "done" when visited; "unlocked" when the previous step is done.
  // Paid users skip the gate entirely.
  const stateFor = (i) => {
    if (isVisited(STEPS[i].key)) return 'done'
    const unlocked = hasPaid || i === 0 || isVisited(STEPS[i - 1].key)
    return unlocked ? 'available' : 'locked'
  }

  const doneCount = STEPS.filter((s) => isVisited(s.key)).length
  const nextIdx = STEPS.findIndex((s) => !isVisited(s.key) && (hasPaid || s === STEPS[0] || isVisited(STEPS[STEPS.indexOf(s) - 1]?.key)))
  const nextStep = nextIdx >= 0 ? STEPS[nextIdx] : null

  const open = (step) => { if (step.markOnClick) markVisited(step.key) }

  const renderGroup = (indices) =>
    indices.map((i) => (
      <MissionCard
        key={STEPS[i].key}
        step={STEPS[i]}
        state={stateFor(i)}
        prevTitle={i > 0 ? (STEPS[i - 1].kind === 'mission' ? `Mission ${STEPS[i - 1].number}` : STEPS[i - 1].title) : ''}
        onOpen={() => open(STEPS[i])}
      />
    ))

  return (
    <div id="tour-guide" className="mb-12">
      {/* ── Map hero: progress + next action ── */}
      <div className="rounded-2xl px-6 py-5 mb-10 flex flex-col sm:flex-row sm:items-center gap-5"
        style={{ background: C.navy, color: C.cream }}>
        <div className="flex-1">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] mb-1.5" style={{ color: 'rgba(244,243,232,0.6)' }}>
            Your mission map
          </p>
          <p className="font-serif text-[22px] leading-tight">
            {nextStep ? (nextStep.kind === 'mission' ? `Next up: Mission ${nextStep.number}` : `Next up: ${nextStep.title}`) : 'Every mission complete. Nice work.'}
          </p>
          <div className="mt-3 h-1.5 rounded-full overflow-hidden max-w-md" style={{ background: 'rgba(244,243,232,0.18)' }}>
            <div className="h-full rounded-full transition-all" style={{ width: `${(doneCount / STEPS.length) * 100}%`, background: C.parchment }} />
          </div>
          <p className="text-[12px] mt-2" style={{ color: 'rgba(244,243,232,0.6)' }}>{doneCount} of {STEPS.length} complete</p>
        </div>
        {nextStep && (
          <Link href={nextStep.href} onClick={() => open(nextStep)}
            className="inline-flex items-center gap-1.5 rounded-xl px-5 py-3 text-sm font-semibold flex-shrink-0 transition-opacity hover:opacity-90"
            style={{ background: C.cream, color: C.navy, textDecoration: 'none' }}>
            {nextStep === STEPS[0] ? 'Start Mission 01' : 'Continue'} <ArrowRight className="w-4 h-4" strokeWidth={2.25} />
          </Link>
        )}
      </div>

      {/* ── The 5 missions ── */}
      <SectionHead label="Start here — one unlocks the next" title="Your five free missions" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        {renderGroup([0, 1, 2, 3, 4])}
      </div>

      {/* ── The workspace unlocks after the missions ── */}
      <SectionHead label="Then your workspace opens up" title="Finish the missions to unlock these" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {renderGroup([5, 6, 7, 8])}
      </div>

      {/* ── The full system: missions 06–14 ── */}
      <div className="mt-14">
        <SectionHead
          label={hasPaid ? 'Your full system' : 'Go further — the full system'}
          title={hasPaid ? 'The complete method, unlocked' : 'Missions 06 to 14'}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PREMIUM_MISSIONS.map((m) => {
            const canOpen = m.premium ? isPremium : hasPaid
            return (
              <Link key={m.id} href={canOpen ? `/course/${m.id}` : '/pricing'}
                className="group flex flex-col rounded-2xl p-5 min-h-[150px] transition-all hover:-translate-y-0.5"
                style={{ border: `1px solid ${C.line}`, background: '#fff', textDecoration: 'none' }}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 8px 24px rgba(46,50,80,0.08)' }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none' }}>
                <div className="flex items-start justify-between mb-3">
                  <span className="font-serif leading-none select-none" style={{ fontSize: 30, color: 'rgba(46,50,80,0.14)' }}>{m.number}</span>
                  {canOpen ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider" style={{ color: C.navy }}>
                      <Check className="w-3 h-3" strokeWidth={3} /> Included
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider" style={{ color: C.steel }}>
                      <Lock className="w-2.5 h-2.5" strokeWidth={2.5} /> {m.premium ? 'Premium' : 'Locked'}
                    </span>
                  )}
                </div>
                <p className="font-serif text-[16px] leading-snug mb-1" style={{ color: C.navy }}>{m.title}</p>
                <p className="text-[13px] leading-relaxed flex-1" style={{ color: 'rgba(46,50,80,0.6)' }}>{m.tagline}</p>
                <div className="mt-4 flex items-center gap-1.5 text-[13px] font-semibold" style={{ color: canOpen ? C.navy : C.steel }}>
                  {canOpen ? <>Open <ArrowRight className="w-3.5 h-3.5" strokeWidth={2.25} /></> : <>Unlock <ArrowRight className="w-3.5 h-3.5" strokeWidth={2.25} /></>}
                </div>
              </Link>
            )
          })}
        </div>
      </div>

      {/* ── Also free, anytime ── */}
      <div className="mt-14">
        <SectionHead label="Also free, anytime" title="Tools and references" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {RESOURCES.map((r) => {
            const Icon = r.icon
            return (
              <Link key={r.href} href={r.href}
                className="group flex flex-col rounded-2xl p-5 transition-all hover:-translate-y-0.5"
                style={{ border: `1px solid ${C.line}`, background: C.cream, textDecoration: 'none' }}>
                <Icon className="w-5 h-5 mb-3" style={{ color: C.navy }} strokeWidth={1.75} />
                <p className="font-serif text-[15px] leading-snug mb-1" style={{ color: C.navy }}>{r.label}</p>
                <p className="text-[12.5px] leading-relaxed" style={{ color: 'rgba(46,50,80,0.6)' }}>{r.sub}</p>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
