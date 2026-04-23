'use client'

import { useUser, useAuth } from '@clerk/nextjs'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  Home, Database, Calendar, FileText, BookOpen, Share2,
  ChevronRight, Clock, Lock,
} from 'lucide-react'

const SPACES = [
  {
    id: 'home',
    icon: Home,
    label: 'Home',
    description: 'Your EE at a glance. RQ, subject, supervisor, deadline.',
    href: '/dashboard/home',
    color: 'bg-[#FFF4E6] border-orange-200',
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-600',
  },
  {
    id: 'dump',
    icon: Database,
    label: 'EE Dump',
    description: 'Research organiser. Paste a URL or DOI — citation generates automatically.',
    href: '/dump',
    color: 'bg-[#E6F0FF] border-blue-200',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
  },
  {
    id: 'planner',
    icon: Calendar,
    label: 'Planner',
    description: 'Block work sessions, set phase deadlines, see your full timeline.',
    href: '/planner',
    color: 'bg-[#F0E6FF] border-purple-200',
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
  },
  {
    id: 'templates',
    icon: FileText,
    label: 'Templates',
    description: 'Fillable SOPs — RPPF reflections, essay outline, argument map.',
    href: '/dashboard/templates',
    color: 'bg-[#F0F0FF] border-indigo-200',
    iconBg: 'bg-indigo-100',
    iconColor: 'text-indigo-600',
  },
  {
    id: 'modules',
    icon: BookOpen,
    label: 'Modules',
    description: '14 modules — the complete EE system, written in plain language.',
    href: '/dashboard/modules',
    color: 'bg-[#E6FFF0] border-green-200',
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600',
  },
  {
    id: 'share',
    icon: Share2,
    label: 'Share',
    description: 'Generate a view-only link for your supervisor. They see everything.',
    href: '/dashboard/share',
    color: 'bg-[#FFF9E6] border-yellow-200',
    iconBg: 'bg-yellow-100',
    iconColor: 'text-yellow-600',
  },
]

function TrialBanner({ daysLeft }) {
  const urgent = daysLeft <= 3
  return (
    <div className={`rounded-xl px-5 py-3 flex items-center justify-between gap-4 mb-6 border ${urgent ? 'bg-red-50 border-red-200' : 'bg-amber-50 border-amber-200'}`}>
      <div className="flex items-center gap-2.5">
        <Clock className={`w-4 h-4 flex-shrink-0 ${urgent ? 'text-red-500' : 'text-amber-500'}`} />
        <p className={`text-sm font-semibold ${urgent ? 'text-red-700' : 'text-amber-700'}`}>
          {daysLeft > 0
            ? `${daysLeft} day${daysLeft === 1 ? '' : 's'} left in your free trial`
            : 'Your free trial has ended'}
        </p>
      </div>
      <Link
        href="/pricing"
        className={`text-xs font-bold px-3 py-1.5 rounded-lg flex-shrink-0 transition-colors ${urgent ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-amber-600 text-white hover:bg-amber-700'}`}
      >
        {daysLeft > 0 ? 'Keep access →' : 'Unlock EE HQ →'}
      </Link>
    </div>
  )
}

function SpaceCard({ space, locked }) {
  const Icon = space.icon
  const inner = (
    <div className={`${space.color} border rounded-2xl p-6 flex flex-col min-h-[180px] transition-all duration-200 ${locked ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:shadow-md hover:-translate-y-0.5'}`}>
      <div className="flex items-start justify-between mb-4">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${space.iconBg}`}>
          <Icon className={`w-5 h-5 ${space.iconColor}`} strokeWidth={1.8} />
        </div>
        {locked && <Lock className="w-4 h-4 text-navy/30" strokeWidth={1.8} />}
      </div>
      <h3 className="font-serif text-base font-bold text-navy mb-1">{space.label}</h3>
      <p className="text-xs text-navy/60 leading-relaxed flex-1">{space.description}</p>
      {!locked && (
        <div className="flex items-center gap-1 text-xs font-medium text-navy/50 mt-4">
          Open <ChevronRight className="w-3.5 h-3.5" />
        </div>
      )}
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
    <div className="min-h-screen bg-cream">
      <div className="max-w-5xl mx-auto px-6 pt-12 pb-16">
        <div className="mb-6">
          <span className="inline-flex items-center bg-navy text-cream text-xs font-bold px-3 py-1.5 rounded-full mb-4 tracking-wide">
            EE HQ
          </span>
          <h1 className="font-serif text-3xl lg:text-4xl font-bold text-navy mb-2">
            {firstName ? `Hey ${firstName}.` : 'Your EE HQ.'}
          </h1>
          <p className="text-sm text-ink-soft">
            Everything you need for your Extended Essay — in one place.
          </p>
        </div>

        {showBanner && <TrialBanner daysLeft={daysLeft} />}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SPACES.map((space) => (
            <SpaceCard
              key={space.id}
              space={space}
              locked={trialEnded && !hasPaid}
            />
          ))}
        </div>

        {!trialEnded && !hasPaid && daysLeft !== null && daysLeft > 5 && (
          <p className="text-center text-xs text-navy/40 mt-10">
            Free trial · {daysLeft} day{daysLeft === 1 ? '' : 's'} remaining
          </p>
        )}
      </div>
    </div>
  )
}
