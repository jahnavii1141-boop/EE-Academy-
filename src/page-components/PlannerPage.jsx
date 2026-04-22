'use client'

import EEPlanner from '../components/EEPlanner'

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
  { value: 'Custom', label: 'Extra deadlines' },
]

export default function PlannerPage() {
  return (
    <div className="min-h-screen bg-[#f8f7f4] text-[#1a1a2e]">
      <div className="max-w-5xl mx-auto px-6 py-10 md:py-14">
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#eff4ff] px-3.5 py-1.5 text-xs font-semibold text-[#2563eb] mb-5 border border-[#bfdbfe]">
            <span>Free Tool</span>
          </div>
          <h1
            className="text-4xl md:text-5xl leading-[1.1] tracking-tight mb-4 text-[#1a1a2e]"
            style={{ fontFamily: "'Fraunces', 'Cormorant Garamond', Georgia, serif", fontWeight: 700 }}
          >
            Plan your entire EE,
            <br />
            stress-free.
          </h1>
          <p className="text-base md:text-lg text-[#4a4a68] max-w-2xl leading-relaxed">
            Set your submission date and instantly get a cleaner, more usable EE plan inside the actual product.
            Same tool logic, but now it feels like part of your system instead of a separate prototype.
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

        <p className="mt-6 text-sm text-[#8e8ea0] max-w-2xl">
          This is the first tool being integrated directly into the product. Next up, I can bring this same sharper tool feel into the actual course experience too.
        </p>
      </div>
    </div>
  )
}
