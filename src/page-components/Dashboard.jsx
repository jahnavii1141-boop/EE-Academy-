'use client'

import { useUser, useAuth } from '@clerk/nextjs'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, BookOpen, Database, Calendar, FileText, Share2, PenLine, Clock, X, Check } from 'lucide-react'
import { getTheme } from '@/lib/subjectThemes'

// ── Email capture banner ───────────────────────────────────────────────────
function EmailCaptureBanner({ onDismiss }) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | loading | done

  const handleSubmit = async (e) => {
    e.preventDefault()
    const trimmed = email.trim()
    if (!trimmed || !trimmed.includes('@')) return
    setStatus('loading')
    try {
      await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmed, source: 'dashboard-banner' }),
      })
      localStorage.setItem('eeAcademy_emailCaptured', '1')
      setStatus('done')
      setTimeout(onDismiss, 2500)
    } catch {
      setStatus('idle')
    }
  }

  if (status === 'done') {
    return (
      <div className="flex items-center gap-2.5 px-5 py-3 rounded-xl mb-6"
        style={{ background: '#f0fdf4', border: '1px solid #bbf7d0' }}>
        <Check size={14} style={{ color: '#16a34a', flexShrink: 0 }} />
        <p className="text-sm" style={{ color: '#15803d' }}>You're in — check your inbox for a welcome email from Gia.</p>
      </div>
    )
  }

  return (
    <div className="flex items-start gap-4 px-5 py-4 rounded-xl mb-6"
      style={{ background: '#fff', border: '1px solid #e5e5e5' }}>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold mb-0.5" style={{ color: '#0a0a0a' }}>
          Get EE tips straight to your inbox
        </p>
        <p className="text-[11px] mb-3" style={{ color: '#aaa' }}>
          Free advice from a 32/34 student — research, structure, common mistakes. No spam.
        </p>
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="your@email.com"
            style={{
              flex: 1, maxWidth: 220, padding: '7px 12px', borderRadius: 8,
              border: '1px solid #e0e0e0', background: '#fafafa',
              fontSize: 12, color: '#0a0a0a', outline: 'none',
            }}
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            style={{
              padding: '7px 14px', background: '#0a0a0a', color: '#fff',
              borderRadius: 8, fontSize: 12, fontWeight: 600, border: 'none',
              cursor: status === 'loading' ? 'wait' : 'pointer', whiteSpace: 'nowrap',
            }}
          >
            {status === 'loading' ? '…' : 'Get free tips →'}
          </button>
        </form>
      </div>
      <button
        onClick={onDismiss}
        style={{ color: '#ccc', flexShrink: 0, marginTop: 2, background: 'none', border: 'none', cursor: 'pointer' }}
        onMouseEnter={e => e.currentTarget.style.color = '#888'}
        onMouseLeave={e => e.currentTarget.style.color = '#ccc'}
      >
        <X size={14} />
      </button>
    </div>
  )
}

const TOOLS = [
  { id: 'modules',   icon: BookOpen,  label: 'Modules',     sub: '14-module EE system',          href: '/dashboard/modules' },
  { id: 'essay',     icon: PenLine,   label: 'My Essay',    sub: 'Draft & save your essay',       href: '/dashboard/essay' },
  { id: 'dump',      icon: Database,  label: 'EE Dump',     sub: 'Sources, citations & notes',     href: '/dashboard/dump' },
  { id: 'planner',   icon: Calendar,  label: 'Planner',     sub: 'Deadlines & milestones',         href: '/dashboard/planner' },
  { id: 'templates', icon: FileText,  label: 'Templates',   sub: 'RPPF, outline, argument map',    href: '/dashboard/templates' },
  { id: 'share',     icon: Share2,    label: 'Share',       sub: 'View-only link for supervisor',  href: '/dashboard/share' },
]

function Stat({ label, value, sub, urgent }) {
  return (
    <div className="flex flex-col">
      <p className="text-[10px] font-semibold uppercase tracking-widest mb-1.5" style={{ color: '#bbb' }}>{label}</p>
      <p className="text-2xl font-semibold tabular-nums leading-none mb-1"
        style={{ color: urgent ? '#dc2626' : '#0a0a0a', letterSpacing: '-0.03em' }}>{value}</p>
      <p className="text-xs" style={{ color: '#aaa' }}>{sub}</p>
    </div>
  )
}

export default function Dashboard() {
  const { user } = useUser()
  const { isSignedIn } = useAuth()
  const firstName = user?.firstName || ''
  const [stats, setStats] = useState(null)
  const [rq, setRq] = useState('')
  const [subject, setSubject] = useState('')
  const [hasPaid, setHasPaid] = useState(false)
  const [daysLeft, setDaysLeft] = useState(null)
  const [trialEnded, setTrialEnded] = useState(false)
  const [modulesVisited, setModulesVisited] = useState(0)
  const [showEmailBanner, setShowEmailBanner] = useState(false)

  // Email banner: show for non-signed-in users who haven't submitted or dismissed
  useEffect(() => {
    if (isSignedIn) return
    const captured = localStorage.getItem('eeAcademy_emailCaptured')
    const dismissed = localStorage.getItem('eeAcademy_bannerDismissed')
    if (!captured && !dismissed) setShowEmailBanner(true) // eslint-disable-line react-hooks/set-state-in-effect
  }, [isSignedIn])

  const dismissBanner = () => {
    localStorage.setItem('eeAcademy_bannerDismissed', '1')
    setShowEmailBanner(false)
  }

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
      setSubject(ws.workspace?.subject || '')
      const sources = (dump.entries ?? []).length
      const milestones = planner.milestones ?? []
      const done = milestones.filter(m => m.completed).length
      const plannerPct = milestones.length > 0 ? Math.round((done / milestones.length) * 100) : null
      const visited = Object.keys(progress.progress ?? {}).length
      setModulesVisited(visited)
      setStats([
        { label: 'Days left', value: daysToDeadline !== null ? String(daysToDeadline) : '—', sub: deadline ? new Date(deadline).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Set deadline →', urgent: daysToDeadline !== null && daysToDeadline <= 30 },
        { label: 'Sources', value: sources > 0 ? String(sources) : '—', sub: sources > 0 ? 'logged in Citations' : 'Add in Citations →', urgent: false },
        { label: 'Planner', value: plannerPct !== null ? `${plannerPct}%` : '—', sub: plannerPct !== null ? `${done}/${milestones.length} done` : 'Set up Planner →', urgent: false },
        { label: 'Modules', value: visited > 0 ? `${visited}/14` : '—', sub: visited > 0 ? 'visited' : 'Start Module 1 →', urgent: false },
      ])
    }).catch(() => {})
  }, [isSignedIn])

  const theme = getTheme(subject)
  const showTrialBanner = !hasPaid && daysLeft !== null && daysLeft <= 5
  const locked = trialEnded && !hasPaid

  return (
    <div className="min-h-full px-10 pt-10 pb-16" style={{ maxWidth: 920 }}>

      {/* Header — subject-accented */}
      <div className="mb-10">
        <p className="text-xs font-medium mb-4" style={{ color: '#bbb', letterSpacing: '0.05em' }}>
          {new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' }).toUpperCase()}
        </p>

        <div className="flex items-start gap-4">
          {/* Subject accent bar */}
          {subject && (
            <div className="w-1 rounded-full flex-shrink-0 mt-2" style={{ height: 40, background: theme.accent }} />
          )}
          <div>
            <h1 className="font-semibold leading-none mb-2" style={{ fontSize: 32, color: '#0a0a0a', letterSpacing: '-0.03em' }}>
              {firstName ? `Good to see you, ${firstName}.` : 'Your workspace.'}
            </h1>
            {subject && (
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium mb-3"
                style={{ background: theme.light, color: theme.color }}>
                {theme.emoji} {subject}
              </div>
            )}
          </div>
        </div>

        {rq ? (
          <div className="mt-3 flex items-start gap-3" style={{ maxWidth: 580 }}>
            <div className="w-0.5 flex-shrink-0 rounded-full mt-1" style={{ height: 40, background: theme.accent || '#e5e5e5' }} />
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest mb-1" style={{ color: '#bbb' }}>
                Research Question
              </p>
              <p className="text-sm leading-relaxed" style={{ color: '#555' }}>{rq}</p>
            </div>
          </div>
        ) : (
          <Link href="/dashboard/home"
            className="inline-flex items-center gap-1.5 text-sm mt-2"
            style={{ color: '#aaa' }}>
            Set up your workspace — add your RQ
            <ArrowRight size={13} />
          </Link>
        )}
      </div>

      {/* Email capture banner — non-signed-in users only */}
      {showEmailBanner && (
        <EmailCaptureBanner onDismiss={dismissBanner} />
      )}

      {/* Trial banner */}
      {showTrialBanner && (
        <div className="flex items-center justify-between gap-4 px-5 py-3 rounded-xl mb-8 text-sm"
          style={{ background: daysLeft <= 3 ? '#fff5f5' : '#fafafa', border: `1px solid ${daysLeft <= 3 ? '#fecaca' : '#e5e5e5'}` }}>
          <div className="flex items-center gap-2">
            <Clock size={13} style={{ color: daysLeft <= 3 ? '#ef4444' : '#aaa' }} />
            <span className="text-xs" style={{ color: daysLeft <= 3 ? '#ef4444' : '#777' }}>
              {daysLeft > 0 ? `${daysLeft} day${daysLeft === 1 ? '' : 's'} left in your free trial` : 'Your free trial has ended'}
            </span>
          </div>
          <Link href="/pricing" className="text-xs font-semibold" style={{ color: '#0a0a0a' }}>Upgrade →</Link>
        </div>
      )}

      {/* Stats */}
      {stats && stats.some(s => s.value !== '—') && (
        <div className="flex items-start mb-10 pb-10" style={{ borderBottom: '1px solid #f0f0f0' }}>
          {stats.map((s, i) => (
            <div key={i} style={{ flex: 1, paddingLeft: i === 0 ? 0 : 28, paddingRight: 28, borderRight: i < stats.length - 1 ? '1px solid #f0f0f0' : 'none' }}>
              <Stat {...s} />
            </div>
          ))}
        </div>
      )}

      {/* Tools label */}
      <div className="flex items-center justify-between mb-5">
        <p className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: '#bbb' }}>Tools</p>
        {modulesVisited > 0 && (
          <p className="text-[10px]" style={{ color: '#ccc' }}>{modulesVisited}/14 modules visited</p>
        )}
      </div>

      {/* Tool grid */}
      <div className="grid grid-cols-2 gap-3" style={{ maxWidth: 680 }}>
        {/* Modules — full width, primary */}
        {TOOLS.filter(t => t.id === 'modules').map(tool => {
          const Icon = tool.icon
          return (
            <Link key={tool.id} href={locked ? '#' : tool.href}
              className="col-span-2 group flex items-center justify-between px-6 py-5 rounded-xl transition-all"
              style={{ background: '#0a0a0a', border: '1px solid #0a0a0a', cursor: locked ? 'not-allowed' : 'pointer' }}>
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(255,255,255,0.08)' }}>
                  <Icon size={15} color="#fff" strokeWidth={1.75} />
                </div>
                <div>
                  <p className="text-sm font-semibold leading-none mb-1" style={{ color: '#fff', letterSpacing: '-0.01em' }}>{tool.label}</p>
                  <p className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>{tool.sub}</p>
                </div>
              </div>
              <ArrowRight size={15} color="rgba(255,255,255,0.35)" className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          )
        })}

        {/* Other tools */}
        {TOOLS.filter(t => t.id !== 'modules').map(tool => {
          const Icon = tool.icon
          return (
            <Link key={tool.id} href={locked ? '#' : tool.href}
              className="group flex items-center justify-between px-5 py-4 rounded-xl transition-all"
              style={{ background: '#fff', border: '1px solid #e8e8e8', cursor: locked ? 'not-allowed' : 'pointer' }}
              onMouseEnter={e => { if (!locked) e.currentTarget.style.borderColor = '#0a0a0a' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#e8e8e8' }}>
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: '#f5f5f5' }}>
                  <Icon size={13} color="#555" strokeWidth={1.75} />
                </div>
                <div>
                  <p className="text-sm font-medium leading-none mb-0.5" style={{ color: '#0a0a0a', letterSpacing: '-0.01em' }}>{tool.label}</p>
                  <p className="text-[11px]" style={{ color: '#aaa' }}>{tool.sub}</p>
                </div>
              </div>
              <ArrowRight size={13} color="#ccc" className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          )
        })}

      </div>

      {/* Empty state */}
      {!rq && (
        <div className="mt-10 flex items-center gap-4 px-5 py-4 rounded-xl" style={{ background: '#fff', border: '1px solid #f0f0f0', maxWidth: 480 }}>
          <div className="w-1 self-stretch rounded-full flex-shrink-0" style={{ background: '#0a0a0a' }} />
          <div>
            <p className="text-sm font-medium mb-0.5" style={{ color: '#0a0a0a' }}>Start with Home</p>
            <p className="text-xs" style={{ color: '#aaa' }}>Add your subject, RQ, supervisor and deadline to unlock your full workspace.</p>
          </div>
          <Link href="/dashboard/home" className="flex-shrink-0">
            <ArrowRight size={15} color="#0a0a0a" />
          </Link>
        </div>
      )}
    </div>
  )
}
