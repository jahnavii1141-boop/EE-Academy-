'use client'

import { useUser, useAuth } from '@clerk/nextjs'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  Home, Database, Calendar, FileText, BookOpen, Share2,
  ChevronRight, Clock, Lock, ArrowUpRight,
} from 'lucide-react'

const SPACES = [
  {
    id: 'home',
    icon: Home,
    label: 'Home',
    description: 'RQ, subject, supervisor, deadline.',
    href: '/dashboard/home',
    tag: 'Start here',
  },
  {
    id: 'dump',
    icon: Database,
    label: 'EE Dump',
    description: 'Paste a URL or DOI — citation appears instantly.',
    href: '/dump',
    tag: null,
  },
  {
    id: 'planner',
    icon: Calendar,
    label: 'Planner',
    description: 'Deadlines, milestones, full timeline.',
    href: '/planner',
    tag: null,
  },
  {
    id: 'templates',
    icon: FileText,
    label: 'Templates',
    description: 'RPPF, essay outline, argument map.',
    href: '/dashboard/templates',
    tag: null,
  },
  {
    id: 'modules',
    icon: BookOpen,
    label: 'Modules',
    description: '14 modules. The complete EE system.',
    href: '/dashboard/modules',
    tag: null,
  },
  {
    id: 'share',
    icon: Share2,
    label: 'Share',
    description: 'View-only link for your supervisor.',
    href: '/dashboard/share',
    tag: null,
  },
]

function TrialBanner({ daysLeft }) {
  const urgent = daysLeft <= 3
  return (
    <div className={`flex items-center justify-between gap-4 px-4 py-3 rounded-xl border text-sm mb-6 ${
      urgent ? 'border-red-900/60 bg-red-950/30 text-red-300' : 'border-zinc-800 bg-zinc-900/50 text-zinc-400'
    }`}>
      <div className="flex items-center gap-2">
        <Clock className="w-3.5 h-3.5 flex-shrink-0" strokeWidth={1.8} />
        <span className="text-xs">
          {daysLeft > 0 ? `${daysLeft} day${daysLeft === 1 ? '' : 's'} left in free trial` : 'Free trial ended'}
        </span>
      </div>
      <Link href="/pricing" className="text-xs font-semibold text-white hover:text-zinc-300 transition-colors whitespace-nowrap">
        Unlock full access →
      </Link>
    </div>
  )
}

function Sidebar({ spaces, locked }) {
  return (
    <aside className="hidden lg:flex flex-col w-56 flex-shrink-0 border-r border-zinc-800/60 pr-6 pt-1">
      <p className="text-[10px] font-semibold text-zinc-600 uppercase tracking-widest mb-4">Spaces</p>
      <nav className="flex flex-col gap-0.5">
        {spaces.map((space) => {
          const Icon = space.icon
          return (
            <Link
              key={space.id}
              href={locked ? '#' : space.href}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors group ${
                locked
                  ? 'text-zinc-700 cursor-not-allowed'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
              }`}
            >
              <Icon className="w-3.5 h-3.5 flex-shrink-0" strokeWidth={1.8} />
              <span className="font-medium">{space.label}</span>
              {space.tag && (
                <span className="ml-auto text-[9px] font-semibold text-zinc-600 bg-zinc-800 px-1.5 py-0.5 rounded-full">
                  {space.tag}
                </span>
              )}
              {locked && <Lock className="ml-auto w-3 h-3 text-zinc-700" strokeWidth={1.6} />}
            </Link>
          )
        })}
      </nav>

      <div className="mt-auto pt-8">
        <Link
          href="/pricing"
          className="block text-center text-xs font-semibold text-zinc-500 border border-zinc-700/50 hover:border-zinc-500 hover:text-white px-3 py-2 rounded-lg transition-colors"
        >
          Upgrade
        </Link>
      </div>
    </aside>
  )
}

function StatRow({ stats }) {
  const hasData = stats.some(s => s.value !== '—')
  if (!hasData) return null

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-zinc-800/80 border border-zinc-800/80 rounded-2xl overflow-hidden mb-8">
      {stats.map((stat, i) => (
        <div key={i} className="px-5 py-4 bg-zinc-900/30">
          <p className="text-[10px] font-medium text-zinc-600 uppercase tracking-widest mb-2">{stat.label}</p>
          <p className={`font-serif text-[26px] font-bold leading-none tracking-tight mb-1 ${stat.urgent ? 'text-red-400' : 'text-white'}`}>
            {stat.value}
          </p>
          <p className="text-[11px] text-zinc-600">{stat.sub}</p>
        </div>
      ))}
    </div>
  )
}

function SpaceCard({ space, locked }) {
  const Icon = space.icon
  const inner = (
    <div className={`group relative flex flex-col justify-between p-5 rounded-2xl border transition-all duration-150 min-h-[140px] ${
      locked
        ? 'border-zinc-800/40 bg-zinc-900/10 opacity-40 cursor-not-allowed'
        : 'border-zinc-800/70 bg-zinc-900/20 hover:bg-zinc-800/40 hover:border-zinc-700/80 cursor-pointer'
    }`}>
      <div className="flex items-start justify-between">
        <div className="w-8 h-8 rounded-lg bg-zinc-800/80 border border-zinc-700/50 flex items-center justify-center">
          <Icon className="w-4 h-4 text-zinc-400" strokeWidth={1.6} />
        </div>
        <div className="flex items-center gap-2">
          {space.tag && (
            <span className="text-[9px] font-bold text-zinc-500 bg-zinc-800 border border-zinc-700/50 px-2 py-0.5 rounded-full uppercase tracking-wide">
              {space.tag}
            </span>
          )}
          {locked
            ? <Lock className="w-3.5 h-3.5 text-zinc-700" strokeWidth={1.6} />
            : <ArrowUpRight className="w-3.5 h-3.5 text-zinc-700 group-hover:text-zinc-400 transition-colors" strokeWidth={1.6} />
          }
        </div>
      </div>
      <div>
        <h3 className="text-sm font-semibold text-white mb-0.5 tracking-[-0.01em]">{space.label}</h3>
        <p className="text-xs text-zinc-500 leading-relaxed">{space.description}</p>
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
      const daysToDeadline = deadline
        ? Math.ceil((new Date(deadline) - new Date()) / 86400000)
        : null
      setRq(ws.workspace?.research_question || '')

      const sources = (dump.entries ?? []).length
      const milestones = planner.milestones ?? []
      const done = milestones.filter(m => m.completed).length
      const plannerPct = milestones.length > 0 ? Math.round((done / milestones.length) * 100) : null
      const modulesVisited = Object.keys(progress.progress ?? {}).length

      setStats([
        {
          label: 'Days to deadline',
          value: daysToDeadline !== null ? String(daysToDeadline) : '—',
          sub: deadline ? new Date(deadline).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Set in Home →',
          urgent: daysToDeadline !== null && daysToDeadline <= 30,
        },
        {
          label: 'Sources logged',
          value: sources > 0 ? String(sources) : '—',
          sub: sources > 0 ? 'in EE Dump' : 'Add in EE Dump →',
          urgent: false,
        },
        {
          label: 'Planner',
          value: plannerPct !== null ? `${plannerPct}%` : '—',
          sub: plannerPct !== null ? `${done} / ${milestones.length} done` : 'Set up Planner →',
          urgent: false,
        },
        {
          label: 'Modules',
          value: modulesVisited > 0 ? `${modulesVisited}/14` : '—',
          sub: modulesVisited > 0 ? 'visited' : 'Start in Modules →',
          urgent: false,
        },
      ])
    }).catch(() => {})
  }, [isSignedIn])

  const showBanner = !hasPaid && daysLeft !== null && daysLeft <= 5
  const locked = trialEnded && !hasPaid

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="max-w-6xl mx-auto px-6 pt-12 pb-20">

        {/* Top header row */}
        <div className="flex items-start justify-between mb-10">
          <div>
            <p className="text-[11px] font-semibold text-zinc-600 uppercase tracking-widest mb-3">EE HQ</p>
            <h1 className="font-serif text-4xl lg:text-5xl font-bold text-white leading-none tracking-tight mb-3">
              {firstName ? `${firstName}'s workspace.` : 'Your workspace.'}
            </h1>
            {rq ? (
              <p className="text-sm text-zinc-500 max-w-lg leading-relaxed">
                <span className="text-zinc-600">RQ —</span> {rq}
              </p>
            ) : (
              <Link href="/dashboard/home" className="text-sm text-zinc-600 hover:text-zinc-400 transition-colors">
                Add your research question →
              </Link>
            )}
          </div>
        </div>

        {/* Trial banner */}
        {showBanner && <TrialBanner daysLeft={daysLeft} />}

        {/* Two-column layout: sidebar + main */}
        <div className="flex gap-10">
          <Sidebar spaces={SPACES} locked={locked} />

          <div className="flex-1 min-w-0">
            {/* Stats row */}
            {stats && <StatRow stats={stats} />}

            {/* Section label */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-[10px] font-semibold text-zinc-600 uppercase tracking-widest">Your spaces</p>
              <p className="text-[10px] text-zinc-700">{SPACES.length} tools</p>
            </div>

            {/* Space cards grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
              {SPACES.map((space) => (
                <SpaceCard key={space.id} space={space} locked={locked} />
              ))}
            </div>

            {/* Divider + bottom note */}
            <div className="mt-10 pt-6 border-t border-zinc-800/50 flex items-center justify-between">
              <p className="text-xs text-zinc-700">
                {!trialEnded && !hasPaid && daysLeft !== null && daysLeft > 5
                  ? `Free trial · ${daysLeft} day${daysLeft === 1 ? '' : 's'} remaining`
                  : 'EE HQ · Extended Essay Academy'}
              </p>
              <Link href="/pricing" className="text-xs text-zinc-600 hover:text-white transition-colors">
                View pricing →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
