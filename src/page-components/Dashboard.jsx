'use client'

import { useUser, useAuth } from '@clerk/nextjs'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  Home, Database, Calendar, FileText, BookOpen, Share2, PenLine,
  Clock, Lock, ArrowUpRight,
} from 'lucide-react'

const SPACES = [
  { id: 'home',      icon: Home,     label: 'Home',      description: 'RQ, subject, supervisor, deadline.',          href: '/dashboard/home',      tag: 'Start here', number: '01' },
  { id: 'essay',     icon: PenLine,  label: 'My Essay',  description: 'Write and save your full essay draft here.',  href: '/dashboard/essay',     tag: null,         number: '02' },
  { id: 'dump',      icon: Database, label: 'EE Dump',   description: 'Paste a URL or DOI — citation appears instantly.', href: '/dump',           tag: null,         number: '03' },
  { id: 'planner',   icon: Calendar, label: 'Planner',   description: 'Deadlines, milestones, full timeline.',       href: '/planner',             tag: null,         number: '04' },
  { id: 'templates', icon: FileText, label: 'Templates', description: 'RPPF, essay outline, argument map.',          href: '/dashboard/templates', tag: null,         number: '05' },
  { id: 'modules',   icon: BookOpen, label: 'Modules',   description: '14 modules. The complete EE system.',         href: '/dashboard/modules',   tag: null,         number: '06' },
  { id: 'share',     icon: Share2,   label: 'Share',     description: 'View-only link for your supervisor.',         href: '/dashboard/share',     tag: null,         number: '07' },
]

function TrialBanner({ daysLeft }) {
  const urgent = daysLeft <= 3
  return (
    <div className={`flex items-center justify-between gap-4 px-5 py-3 rounded-xl text-sm mb-8 border ${
      urgent ? 'bg-red-50 border-red-200 text-red-700' : 'bg-parchment/40 border-parchment text-navy/70'
    }`}>
      <div className="flex items-center gap-2">
        <Clock className="w-3.5 h-3.5 flex-shrink-0" strokeWidth={2} />
        <span className="text-xs font-medium">
          {daysLeft > 0 ? `${daysLeft} day${daysLeft === 1 ? '' : 's'} left in your free trial` : 'Your free trial has ended'}
        </span>
      </div>
      <Link href="/pricing" className="text-xs font-bold hover:underline whitespace-nowrap">Upgrade now →</Link>
    </div>
  )
}

function StatRow({ stats }) {
  const hasData = stats.some(s => s.value !== '—')
  if (!hasData) return null
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
      {stats.map((stat, i) => (
        <div key={i} className="bg-white border border-navy/10 rounded-2xl px-5 py-4 shadow-sm">
          <p className="text-[10px] font-bold text-ink-soft uppercase tracking-widest mb-2">{stat.label}</p>
          <p className={`font-serif text-3xl font-bold leading-none tracking-tight mb-1.5 ${stat.urgent ? 'text-red-500' : 'text-navy'}`}>{stat.value}</p>
          <p className="text-[11px] text-ink-muted font-medium">{stat.sub}</p>
        </div>
      ))}
    </div>
  )
}

function SpaceCard({ space, locked }) {
  const Icon = space.icon
  const inner = (
    <div className={`group relative flex flex-col justify-between p-5 rounded-2xl border transition-all duration-200 min-h-[140px] ${
      locked
        ? 'border-navy/5 bg-cream/40 opacity-50 cursor-not-allowed'
        : 'border-navy/10 bg-white hover:border-navy hover:shadow-md cursor-pointer shadow-sm'
    }`}>
      <div className="flex items-start justify-between mb-6">
        <span className="text-[11px] font-bold text-ink-muted tracking-widest tabular-nums">{space.number}</span>
        <div className="flex items-center gap-2">
          {space.tag && (
            <span className="text-[9px] font-bold text-navy bg-parchment border border-navy/10 px-2 py-0.5 rounded-full uppercase tracking-wide">{space.tag}</span>
          )}
          {locked
            ? <Lock className="w-3.5 h-3.5 text-ink-muted" strokeWidth={2} />
            : <ArrowUpRight className="w-3.5 h-3.5 text-ink-muted group-hover:text-navy transition-colors" strokeWidth={2} />
          }
        </div>
      </div>
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Icon className="w-4 h-4 text-steel group-hover:text-navy transition-colors" strokeWidth={1.8} />
          <h3 className="text-sm font-bold text-navy tracking-[-0.01em]">{space.label}</h3>
        </div>
        <p className="text-xs text-ink-soft leading-relaxed">{space.description}</p>
      </div>
    </div>
  )
  if (locked) return <div>{inner}</div>
  return <Link href={space.href}>{inner}</Link>
}

export default function Dashboard() {
  const { user } = useUser()
  const { isSignedIn } = useAuth()
  const firstName = user?.firstName || ''
  const [daysLeft, setDaysLeft] = useState(null)
  const [trialEnded, setTrialEnded] = useState(false)
  const [hasPaid, setHasPaid] = useState(false)
  const [stats, setStats] = useState(null)
  const [rq, setRq] = useState('')

  useEffect(() => {
    if (!isSignedIn) return

    fetch('/api/trial')
      .then(r => r.json())
      .then(({ trial_started_at, has_paid }) => {
        setHasPaid(!!has_paid)
        if (!trial_started_at) {
          fetch('/api/trial', { method: 'POST' }).catch(() => {})
          setDaysLeft(14)
          return
        }
        const elapsed = Math.floor((Date.now() - new Date(trial_started_at)) / 86400000)
        const remaining = 14 - elapsed
        if (remaining <= 0 && !has_paid) { setTrialEnded(true); setDaysLeft(0) }
        else setDaysLeft(Math.max(0, remaining))
      })
      .catch(() => {})

    Promise.all([
      fetch('/api/workspace').then(r => r.json()),
      fetch('/api/dump').then(r => r.json()),
      fetch('/api/planner').then(r => r.json()),
      fetch('/api/progress').then(r => r.json()),
    ]).then(([ws, dump, planner, progress]) => {
      const deadline = ws.workspace?.submission_deadline
      const daysToDeadline = deadline ? Math.ceil((new Date(deadline) - new Date()) / 86400000) : null
      setRq(ws.workspace?.research_question || '')
      const sources = (dump.entries ?? []).length
      const milestones = planner.milestones ?? []
      const done = milestones.filter(m => m.completed).length
      const plannerPct = milestones.length > 0 ? Math.round((done / milestones.length) * 100) : null
      const modulesVisited = Object.keys(progress.progress ?? {}).length
      setStats([
        { label: 'Days to deadline', value: daysToDeadline !== null ? String(daysToDeadline) : '—', sub: deadline ? new Date(deadline).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Set in Home →', urgent: daysToDeadline !== null && daysToDeadline <= 30 },
        { label: 'Sources logged', value: sources > 0 ? String(sources) : '—', sub: sources > 0 ? 'in EE Dump' : 'Add in EE Dump →', urgent: false },
        { label: 'Planner', value: plannerPct !== null ? `${plannerPct}%` : '—', sub: plannerPct !== null ? `${done} / ${milestones.length} done` : 'Set up Planner →', urgent: false },
        { label: 'Modules', value: modulesVisited > 0 ? `${modulesVisited}/14` : '—', sub: modulesVisited > 0 ? 'visited' : 'Start in Modules →', urgent: false },
      ])
    }).catch(() => {})
  }, [isSignedIn])

  const showBanner = !hasPaid && daysLeft !== null && daysLeft <= 5
  const locked = trialEnded && !hasPaid

  return (
    <div className="h-full px-8 pt-8 pb-10 overflow-y-auto">
      {/* Header */}
      <div className="mb-8">
        <p className="text-[10px] font-bold text-ink-muted uppercase tracking-widest mb-2">Overview</p>
        <h1 className="font-serif text-3xl lg:text-4xl font-bold text-navy leading-none tracking-tight mb-2">
          {firstName ? `Good to see you, ${firstName}.` : 'Your workspace.'}
        </h1>
        {rq ? (
          <p className="text-sm text-ink-soft max-w-xl leading-relaxed">
            <span className="font-semibold text-ink-muted">RQ — </span>{rq}
          </p>
        ) : (
          <Link href="/dashboard/home" className="text-sm text-ink-soft hover:text-navy transition-colors font-medium">
            Set up your workspace — add your RQ →
          </Link>
        )}
      </div>

      {/* Trial banner */}
      {showBanner && <TrialBanner daysLeft={daysLeft} />}

      {/* Stats */}
      {stats && <StatRow stats={stats} />}

      {/* Spaces label */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-[10px] font-bold text-ink-soft uppercase tracking-widest">Spaces</p>
        <p className="text-[10px] text-ink-muted font-medium">{SPACES.length} tools</p>
      </div>

      {/* Space cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3">
        {SPACES.map((space) => (
          <SpaceCard key={space.id} space={space} locked={locked} />
        ))}
      </div>
    </div>
  )
}
