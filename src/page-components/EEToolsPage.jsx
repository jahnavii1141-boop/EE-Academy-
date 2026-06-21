'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Lock } from 'lucide-react'
import { useAccess } from '../hooks/useAccess'
import EEPathwayFinder from '../components/tools/EEPathwayFinder'
import DataCurveFitting from '../components/tools/DataCurveFitting'
import RPPFCoach from '../components/tools/RPPFCoach'

const FREE_TRIES = 2

// Wraps an interactive tool with a free-try limit. Non-paying users get
// FREE_TRIES sessions, then the tool locks behind an upgrade prompt.
// Paid users always see it unlocked. A "try" is counted once per browser
// session (so refreshing doesn't burn one).
function LimitedTool({ toolKey, children }) {
  const { hasPremium, loading } = useAccess()
  const [ready, setReady] = useState(false)
  const [locked, setLocked] = useState(false)
  const [used, setUsed] = useState(0)

  useEffect(() => {
    if (loading) return
    if (hasPremium) { setReady(true); return } // eslint-disable-line react-hooks/set-state-in-effect
    const storeKey = `eeTool_${toolKey}`
    const sessKey = `eeToolSeen_${toolKey}`
    let count = parseInt(localStorage.getItem(storeKey) || '0', 10)
    if (count >= FREE_TRIES) {
      setLocked(true)
    } else if (!sessionStorage.getItem(sessKey)) {
      count += 1
      localStorage.setItem(storeKey, String(count))
      sessionStorage.setItem(sessKey, '1')
    }
    setUsed(count)
    setReady(true)
  }, [hasPremium, loading, toolKey])

  if (!ready) {
    return <div className="h-24 flex items-center justify-center"><div className="w-5 h-5 rounded-full border-2 border-navy/15 border-t-navy/50 animate-spin" /></div>
  }

  if (locked) {
    return (
      <div className="rounded-xl border border-navy/10 bg-parchment/30 px-6 py-8 text-center">
        <div className="w-10 h-10 rounded-full bg-navy/6 flex items-center justify-center mx-auto mb-4">
          <Lock className="w-5 h-5 text-navy/40" />
        </div>
        <p className="text-sm font-bold text-navy mb-1">You&apos;ve used your {FREE_TRIES} free tries</p>
        <p className="text-xs text-ink-soft mb-5 max-w-xs mx-auto leading-relaxed">
          Unlock this tool (and the rest of the toolkit) with any paid plan.
        </p>
        <Link href="/pricing" className="inline-block bg-navy text-cream text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-navy/90 transition-colors no-underline">
          View plans →
        </Link>
      </div>
    )
  }

  return (
    <div>
      {!hasPremium && (
        <p className="text-[11px] font-semibold text-steel mb-3">
          Free preview · {Math.max(0, FREE_TRIES - used)} of {FREE_TRIES} tries left
        </p>
      )}
      {children}
    </div>
  )
}

export default function EEToolsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="font-serif text-2xl font-bold text-navy mb-1">IB EE tools</h1>
        <p className="text-sm text-ink-soft">Interactive utilities to plan, analyse, and reflect on your Extended Essay.</p>
      </div>

      {/* ── Free tool ───────────────────────────────────────────── */}
      <div className="bg-white border border-parchment rounded-2xl p-6 mb-8">
        <div className="mb-5 pb-4 border-b border-parchment">
          <span className="text-[11px] font-medium text-green-700 uppercase tracking-widest">Free</span>
          <h2 className="font-serif text-lg font-bold text-navy mt-0.5">
            EE Pathway Finder
          </h2>
          <p className="text-[13px] text-ink-soft mt-1">
            Answer a few questions to work out whether your topic suits a subject-focused or interdisciplinary EE, then turn it into a focused research question.
          </p>
        </div>
        <EEPathwayFinder />
      </div>

      {/* ── Limited tools ──────────────────────────────────────── */}
      <p className="text-[11px] font-bold uppercase tracking-widest text-steel mb-4">More tools · {FREE_TRIES} free tries each</p>

      <div className="bg-white border border-parchment rounded-2xl p-6 mb-6">
        <div className="mb-5 pb-4 border-b border-parchment">
          <h2 className="font-serif text-lg font-bold text-navy mt-0.5">
            Data &amp; curve fitting protocol
          </h2>
          <p className="text-[13px] text-ink-soft mt-1">
            Enter your raw measurements and fit a mathematical model to visualise the relationship between variables.
          </p>
        </div>
        <LimitedTool toolKey="curve"><DataCurveFitting /></LimitedTool>
      </div>

      <div className="bg-white border border-parchment rounded-2xl p-6">
        <div className="mb-5 pb-4 border-b border-parchment">
          <h2 className="font-serif text-lg font-bold text-navy mt-0.5">
            RPPF critical reflection coach &amp; word tracker
          </h2>
          <p className="text-[13px] text-ink-soft mt-1">
            Draft all three RPPF reflections with per-field word caps and a live 500-word aggregate total.
          </p>
        </div>
        <LimitedTool toolKey="rppf"><RPPFCoach /></LimitedTool>
      </div>
    </div>
  )
}
