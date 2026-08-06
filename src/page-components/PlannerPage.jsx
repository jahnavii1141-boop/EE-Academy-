'use client'

import Link from 'next/link'
import EEPlanner from '../components/EEPlanner'
import { useAccess } from '../hooks/useAccess'

const PHASES = [
  { label: 'Research', color: '#2563eb' },
  { label: 'Structure', color: '#059669' },
  { label: 'Writing', color: '#7c3aed' },
  { label: 'Review', color: '#ea580c' },
  { label: 'Submit', color: '#e11d48' },
]

const STATS = [
  { value: '16', label: 'Milestones' },
  { value: '28', label: 'Weeks mapped' },
  { value: '5', label: 'Phases' },
]

export default function PlannerPage() {
  // The EE Planner is FREE (2026-07): the homepage Free tier promises it, and
  // a session recording showed the old premium gate driving new users away.
  // No completion requirements, no tier checks — every signed-in user gets it.
  const { hasPaid, loading } = useAccess()

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="w-6 h-6 rounded-full border-2 border-navy/20 border-t-navy/60 animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f8f7f4] text-[#1a1a2e]">
      <div className="max-w-5xl mx-auto px-6 py-10 md:py-14">

        {/* Non-blocking nudge to the full course (free users only) */}
        {!hasPaid && (
          <div className="mb-8 flex flex-col sm:flex-row sm:items-center gap-3 rounded-2xl px-5 py-4"
            style={{ background: '#fff', border: '1px solid rgba(46,50,80,0.12)' }}>
            <p className="flex-1 text-sm" style={{ color: '#4a4a68' }}>
              The planner maps your timeline — the full course shows you exactly what to write at each step.
            </p>
            <Link href="/pricing" className="text-xs font-semibold px-4 py-2 rounded-xl flex-shrink-0"
              style={{ background: '#2E3250', color: '#fff', textDecoration: 'none' }}>
              See the full system →
            </Link>
          </div>
        )}

        <div className="max-w-3xl mb-10">
          <h1
            className="text-4xl md:text-5xl leading-[1.1] tracking-tight mb-4 text-[#1a1a2e]"
            style={{ fontFamily: "'Fraunces', 'Cormorant Garamond', Georgia, serif", fontWeight: 700 }}
          >
            Plan your entire EE,
            <br />
            week by week.
          </h1>
          <p className="text-base md:text-lg text-[#4a4a68] max-w-2xl leading-relaxed">
            16 milestones across 5 phases mapped to your submission date. Check things off as you go.
          </p>
        </div>

        <div className="flex flex-wrap gap-6 mb-8">
          {STATS.map((stat) => (
            <div key={stat.label} className="flex items-baseline gap-2">
              <span
                className="text-3xl md:text-4xl text-[#1a1a2e]"
                style={{ fontFamily: "'Fraunces', 'Cormorant Garamond', Georgia, serif", fontWeight: 700 }}
              >
                {stat.value}
              </span>
              <span className="text-sm text-[#8e8ea0]">{stat.label}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2 mb-8">
          {PHASES.map((phase) => (
            <div
              key={phase.label}
              className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold border"
              style={{
                backgroundColor: `${phase.color}12`,
                color: phase.color,
                borderColor: `${phase.color}30`,
              }}
            >
              <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ backgroundColor: phase.color }} />
              {phase.label}
            </div>
          ))}
        </div>

        <div className="rounded-[20px] border border-[#e8e6e1] bg-white shadow-[0_4px_12px_rgba(0,0,0,0.06)] p-6 md:p-8">
          <EEPlanner theme="light" />
        </div>

      </div>
    </div>
  )
}
