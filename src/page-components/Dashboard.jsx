'use client'

import { useUser, useAuth } from '@clerk/nextjs'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  Home, Database, Calendar, FileText, BookOpen, Share2,
  ChevronRight, Clock, Lock, Zap,
} from 'lucide-react'

const SPACES = [
  {
    id: 'home',
    icon: Home,
    label: 'Home',
    description: 'Your RQ, subject, supervisor, and deadline — all in one view.',
    href: '/dashboard/home',
    tag: 'Start here',
  },
  {
    id: 'dump',
    icon: Database,
    label: 'EE Dump',
    description: 'Paste a URL or DOI — citation appears automatically. Research without chaos.',
    href: '/dump',
    tag: null,
  },
  {
    id: 'planner',
    icon: Calendar,
    label: 'Planner',
    description: 'Set phase deadlines, see your full timeline, track what\'s done.',
    href: '/planner',
    tag: null,
  },
  {
    id: 'templates',
    icon: FileText,
    label: 'Templates',
    description: 'RPPF reflections, essay outline, argument map — all fillable inline.',
    href: '/dashboard/templates',
    tag: null,
  },
  {
    id: 'modules',
    icon: BookOpen,
    label: 'Modules',
    description: '14 modules. The complete EE system — written to actually make sense.',
    href: '/dashboard/modules',
    tag: null,
  },
  {
    id: 'share',
    icon: Share2,
    label: 'Share',
    description: 'One link. Your supervisor sees your workspace — no account needed.',
    href: '/dashboard/share',
    tag: null,
  },
]

function TrialBanner({ daysLeft }) {
  const urgent = daysLeft <= 3
  return (
    <div className={`rounded-2xl px-5 py-4 flex items-center justify-between gap-4 mb-8 border backdrop-blur-sm ${
      urgent
        ? 'bg-red-500/10 border-red-500/20 text-red-300'
        : 'bg-amber-500/10 border-amber-500/20 text-amber-300'
    }`}>
      <div className="flex items-center gap-3">
        <Clock className="w-4 h-4 flex-shrink-0" />
        <p className="text-sm font-medium">
          {daysLeft > 0
            ? `${daysLeft} day${daysLeft === 1 ? '' : 's'} left in your free trial`
            : 'Your free trial has ended'}
        </p>
      </div>
      <Link
        href="/pricing"
        className="text-xs font-bold px-4 py-2 rounded-xl flex-shrink-0 transition-all bg-white/10 hover:bg-white/20 text-white border border-white/10"
      >
        {daysLeft > 0 ? 'Keep access →' : 'Unlock EE HQ →'}
      </Link>
    </div>
  )
}

function SpaceCard({ space, locked }) {
  const Icon = space.icon
  const inner = (
    <div
      className={`relative rounded-2xl p-5 flex flex-col min-h-[190px] border transition-all duration-200 ${
        locked
          ? 'opacity-30 cursor-not-allowed border-white/5 bg-white/[0.02]'
          : 'cursor-pointer border-white/[0.07] bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/[0.12] hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-black/30'
      }`}
    >
      <div className="flex items-start justify-between mb-5">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-white/[0.06] border border-white/[0.08]">
          <Icon className="w-4 h-4 text-white/60" strokeWidth={1.6} />
        </div>
        <div className="flex items-center gap-2">
          {space.tag && (
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white/[0.07] text-white/50 border border-white/[0.08]">
              {space.tag}
            </span>
          )}
          {locked && <Lock className="w-3.5 h-3.5 text-white/15" strokeWidth={1.6} />}
        </div>
      </div>

      <h3 className="text-sm font-semibold text-white/90 mb-1.5 tracking-[-0.01em]">{space.label}</h3>
      <p className="text-xs text-white/35 leading-relaxed flex-1">{space.description}</p>

      {!locked && (
        <div className="flex items-center gap-1 text-[11px] font-medium text-white/30 mt-4 group-hover:text-white/50 transition-colors">
          Open <ChevronRight className="w-3 h-3" />
        </div>
      )}
    </div>
  )

  if (locked) return <div>{inner}</div>
  return <Link href={space.href} className="group">{inner}</Link>
}

export default function Dashboard() {
  const { user } = useUser()
  const { isSignedIn } = useAuth()
  const firstName = user?.firstName || ''
  const [daysLeft, setDaysLeft] = useState(null)
  const [trialEnded, setTrialEnded] = useState(false)
  const [hasPaid, setHasPaid] = useState(false)

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
        if (remaining <= 0 && !has_paid) {
          setTrialEnded(true)
          setDaysLeft(0)
        } else {
          setDaysLeft(Math.max(0, remaining))
        }
      })
      .catch(() => {})
  }, [isSignedIn])

  const showBanner = !hasPaid && daysLeft !== null && daysLeft <= 5

  return (
    <div className="min-h-screen bg-[#0c0c0c]">
      <div className="max-w-5xl mx-auto px-6 pt-14 pb-20">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2.5 mb-5">
            <div className="w-6 h-6 rounded-lg bg-white/[0.08] border border-white/[0.08] flex items-center justify-center">
              <Zap className="w-3.5 h-3.5 text-white/60" strokeWidth={2} />
            </div>
            <span className="text-xs font-semibold text-white/30 uppercase tracking-widest">EE HQ</span>
          </div>
          <h1 className="font-serif text-3xl lg:text-4xl font-bold text-white mb-2">
            {firstName ? `Hey ${firstName}.` : 'Your workspace.'}
          </h1>
          <p className="text-sm text-white/40">
            Everything for your Extended Essay — in one place.
          </p>
        </div>

        {showBanner && <TrialBanner daysLeft={daysLeft} />}

        {/* Space grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {SPACES.map((space) => (
            <SpaceCard
              key={space.id}
              space={space}
              locked={trialEnded && !hasPaid}
            />
          ))}
        </div>

        {!trialEnded && !hasPaid && daysLeft !== null && daysLeft > 5 && (
          <p className="text-center text-xs text-white/20 mt-12">
            Free trial · {daysLeft} day{daysLeft === 1 ? '' : 's'} remaining
          </p>
        )}
      </div>
    </div>
  )
}
