'use client'

import { useUser, useAuth } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  Home, Database, Calendar, FileText, BookOpen, Share2, PenLine,
  ScanLine, MessageSquare, ChevronDown, ChevronUp, X,
} from 'lucide-react'
import { getTheme } from '@/lib/subjectThemes'

const NAV_MAIN = [
  { id: 'home',    label: 'Home',       icon: Home,     href: '/dashboard/home' },
  { id: 'modules', label: 'Modules',    icon: BookOpen,  href: '/dashboard/modules' },
  { id: 'essay',   label: 'My Essay',   icon: PenLine,   href: '/dashboard/essay' },
  { id: 'dump',    label: 'EE Dump',     icon: Database,  href: '/dashboard/dump' },
  { id: 'planner', label: 'EE Planner', icon: Calendar,  href: '/dashboard/planner' },
  { id: 'scan',    label: 'EE Scan',    icon: ScanLine,  href: '/dashboard/scan', isNew: true },
]

const NAV_MORE = [
  { id: 'templates', label: 'Templates', icon: FileText, href: '/dashboard/templates' },
  { id: 'share',     label: 'Share',     icon: Share2,   href: '/dashboard/share' },
]

const ALL_NAV = [...NAV_MAIN, ...NAV_MORE]

export default function DashboardLayout({ children }) {
  const { user } = useUser()
  const { isSignedIn } = useAuth()
  const pathname = usePathname()
  const firstName = user?.firstName || ''
  const [subject, setSubject] = useState('')
  const [isPremium, setIsPremium] = useState(false)
  const [wordCount, setWordCount] = useState(null)
  const [daysLeft, setDaysLeft] = useState(null)
  const [supervisorRemarks, setSupervisorRemarks] = useState(null)
  const [remarksOpen, setRemarksOpen] = useState(false)

  const dismissRemarks = () => {
    setSupervisorRemarks(null)
    fetch('/api/workspace', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        supervisor_remarks: null,
        supervisor_name: null,
        supervisor_remarks_at: null,
      }),
    }).catch(() => {})
  }

  useEffect(() => {
    if (!isSignedIn) return
    fetch('/api/workspace')
      .then(r => r.json())
      .then(({ workspace }) => {
        setSubject(workspace?.subject || '')
        setIsPremium(!!workspace?.has_paid)
        if (workspace?.submission_deadline) {
          const d = Math.ceil((new Date(workspace.submission_deadline) - new Date()) / 86400000)
          setDaysLeft(d)
        }
        if (workspace?.supervisor_remarks) {
          setSupervisorRemarks({
            text: workspace.supervisor_remarks,
            name: workspace.supervisor_name || 'Supervisor',
            at: workspace.supervisor_remarks_at,
          })
          setRemarksOpen(true)
        }
      })
      .catch(() => {})
    fetch('/api/essay')
      .then(r => r.json())
      .then(({ essay_text }) => {
        if (essay_text) {
          const words = essay_text.trim().split(/\s+/).filter(Boolean).length
          setWordCount(words)
        }
      })
      .catch(() => {})
  }, [isSignedIn])

  const theme = getTheme(subject)

  const activeId = ALL_NAV.find(n => pathname === n.href || pathname.startsWith(n.href + '/'))?.id
    ?? (pathname === '/dashboard' ? 'home' : null)

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: '#fafafa', color: '#0a0a0a' }}>

      {/* Sidebar */}
      <aside style={{ width: 220, borderRight: '1px solid #e5e5e5', background: '#fff' }}
        className="flex-shrink-0 flex flex-col h-full">

        {/* Brand + subject badge */}
        <div className="px-5 pt-5 pb-4" style={{ borderBottom: '1px solid #f0f0f0' }}>
          <Link href="/dashboard" className="block">
            <p className="font-medium text-xs tracking-tight mb-0.5" style={{ color: '#999' }}>EE Academy</p>
            <p className="font-semibold text-sm leading-tight truncate" style={{ color: '#0a0a0a', letterSpacing: '-0.01em' }}>
              {firstName ? `${firstName}'s workspace` : 'My workspace'}
            </p>
          </Link>
          {subject && (
            <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium"
              style={{ background: theme.light, color: theme.color }}>
              <span>{theme.emoji}</span>
              <span>{subject}</span>
            </div>
          )}

          {/* Stats pills */}
          {(wordCount !== null || daysLeft !== null) && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {wordCount !== null && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-medium"
                  style={{ background: '#f5f5f5', color: '#555' }}>
                  {wordCount.toLocaleString()} words
                </span>
              )}
              {daysLeft !== null && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-medium"
                  style={{
                    background: daysLeft <= 30 ? '#fef2f2' : '#f5f5f5',
                    color: daysLeft <= 30 ? '#dc2626' : '#555',
                  }}>
                  {daysLeft > 0 ? `${daysLeft}d left` : daysLeft === 0 ? 'Due today' : `${Math.abs(daysLeft)}d late`}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-2 py-3">
          <p className="text-[10px] font-semibold uppercase tracking-widest px-3 mb-2" style={{ color: '#bbb' }}>My Work</p>
          {NAV_MAIN.map(item => {
            const Icon = item.icon
            const active = activeId === item.id
            return (
              <Link
                key={item.id}
                href={item.href}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all mb-0.5"
                style={{
                  background: active ? '#0a0a0a' : 'transparent',
                  color: active ? '#fff' : '#555',
                  fontWeight: active ? 500 : 400,
                }}
                onMouseEnter={e => { if (!active) { e.currentTarget.style.background = '#f5f5f5'; e.currentTarget.style.color = '#0a0a0a' } }}
                onMouseLeave={e => { if (!active) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#555' } }}
              >
                <Icon className="flex-shrink-0" size={14} strokeWidth={active ? 2 : 1.75} />
                <span>{item.label}</span>
                {item.isNew && (
                  <span className="ml-auto text-[9px] font-bold px-1.5 py-0.5 rounded-full"
                    style={{ background: active ? 'rgba(255,255,255,0.2)' : '#0a0a0a', color: active ? '#fff' : '#fff' }}>
                    New
                  </span>
                )}
              </Link>
            )
          })}

          <p className="text-[10px] font-semibold uppercase tracking-widest px-3 mt-4 mb-2" style={{ color: '#bbb' }}>More</p>
          {NAV_MORE.map(item => {
            const Icon = item.icon
            const active = activeId === item.id
            return (
              <Link
                key={item.id}
                href={item.href}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all mb-0.5"
                style={{
                  background: active ? '#0a0a0a' : 'transparent',
                  color: active ? '#fff' : '#555',
                  fontWeight: active ? 500 : 400,
                }}
                onMouseEnter={e => { if (!active) { e.currentTarget.style.background = '#f5f5f5'; e.currentTarget.style.color = '#0a0a0a' } }}
                onMouseLeave={e => { if (!active) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#555' } }}
              >
                <Icon className="flex-shrink-0" size={14} strokeWidth={active ? 2 : 1.75} />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* Supervisor remarks panel */}
        {supervisorRemarks && (
          <div className="mx-2 mb-2 rounded-xl overflow-hidden" style={{ border: '1px solid #fbbf24', background: '#fffbeb' }}>
            <div className="flex items-center">
              <button
                onClick={() => setRemarksOpen(o => !o)}
                className="flex-1 flex items-center gap-2 px-3 py-2.5 text-left"
                style={{ background: 'transparent' }}
              >
                <MessageSquare size={13} style={{ color: '#d97706', flexShrink: 0 }} />
                <span className="flex-1 text-[11px] font-semibold truncate" style={{ color: '#92400e' }}>
                  {supervisorRemarks.name} left feedback
                </span>
                {remarksOpen
                  ? <ChevronUp size={12} style={{ color: '#d97706', flexShrink: 0 }} />
                  : <ChevronDown size={12} style={{ color: '#d97706', flexShrink: 0 }} />
                }
              </button>
              <button
                onClick={dismissRemarks}
                title="Dismiss"
                className="pr-2.5 py-2.5 pl-1"
                style={{ color: '#d97706', opacity: 0.6 }}
                onMouseEnter={e => e.currentTarget.style.opacity = '1'}
                onMouseLeave={e => e.currentTarget.style.opacity = '0.6'}
              >
                <X size={12} />
              </button>
            </div>
            {remarksOpen && (
              <div className="px-3 pb-3">
                <p className="text-[11px] leading-relaxed" style={{ color: '#78350f', whiteSpace: 'pre-wrap' }}>
                  {supervisorRemarks.text}
                </p>
                {supervisorRemarks.at && (
                  <p className="text-[10px] mt-2" style={{ color: '#d97706' }}>
                    {new Date(supervisorRemarks.at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        {/* Bottom */}
        <div className="px-2 pb-4 pt-3" style={{ borderTop: '1px solid #f0f0f0' }}>
          {!isPremium && (
            <Link
              href="/pricing"
              className="flex items-center justify-center w-full text-xs font-semibold py-2 rounded-lg mb-2 transition-all"
              style={{ background: '#0a0a0a', color: '#fff', letterSpacing: '-0.01em' }}
            >
              Upgrade plan
            </Link>
          )}
          <Link
            href="/"
            className="flex items-center justify-center w-full text-xs py-1.5 rounded-lg transition-all"
            style={{ color: '#aaa' }}
          >
            ← Back to site
          </Link>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto" style={{ background: '#fafafa' }}>
        {children}
      </main>
    </div>
  )
}
