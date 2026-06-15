'use client'
import DataCurveFitting from '../components/tools/DataCurveFitting'
import RPPFCoach from '../components/tools/RPPFCoach'

export default function EEToolsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="font-serif text-2xl font-bold text-navy mb-1">IB EE tools</h1>
        <p className="text-sm text-ink-soft">Interactive utilities for data analysis and RPPF reflection writing.</p>
      </div>

      <div className="bg-white border border-parchment rounded-2xl p-6 mb-6">
        <div className="mb-5 pb-4 border-b border-parchment">
          <span className="text-[11px] font-medium text-steel uppercase tracking-widest">Module 1</span>
          <h2 className="font-serif text-lg font-bold text-navy mt-0.5">
            DP mathematics — data & curve fitting protocol
          </h2>
          <p className="text-[13px] text-ink-soft mt-1">
            Enter your raw measurements and fit a mathematical model to visualise the relationship between variables.
          </p>
        </div>
        <DataCurveFitting />
      </div>

      <div className="bg-white border border-parchment rounded-2xl p-6">
        <div className="mb-5 pb-4 border-b border-parchment">
          <span className="text-[11px] font-medium text-steel uppercase tracking-widest">Module 2</span>
          <h2 className="font-serif text-lg font-bold text-navy mt-0.5">
            RPPF critical reflection coach & word tracker
          </h2>
          <p className="text-[13px] text-ink-soft mt-1">
            Draft all three RPPF reflections with per-field word caps and a live 500-word aggregate total.
          </p>
        </div>
        <RPPFCoach />
      </div>
    </div>
  )
}
