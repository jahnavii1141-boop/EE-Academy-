'use client'

import { useUser, useAuth } from '@clerk/nextjs'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  Home, Database, Calendar, FileText, BookOpen, Share2, PenLine,
  MessageSquare, ChevronDown, ChevronUp, X, Award, Lock,
} from 'lucide-react'
import { getTheme } from '@/lib/subjectThemes'
import { useModuleProgress } from '@/hooks/useModuleProgress'
import { COURSE_CATALOG } from '@/data/courseCatalog'

// One sidebar row. Sequential nav locks were removed (2026-07) — every tab is
// open; paid content is gated at the page, not hidden from the nav.
function NavItem({ item, active }) {
  const Icon = item.icon
  return (
    <Link
      id={`tour-nav-${item.id}`}
      href={item.href}
      className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all mb-0.5"
      style={{ background: active ? '#2E3250' : 'transparent', color: active ? '#fff' : '#555', fontWeight: active ? 500 : 400 }}
      onMouseEnter={e => { if (!active) { e.currentTarget.style.background = '#EAE8DC'; e.currentTarget.style.color = '#2E3250' } }}
      onMouseLeave={e => { if (!active) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#555' } }}
    >
      <Icon className="flex-shrink-0" size={14} strokeWidth={active ? 2 : 1.75} />
      <span>{item.label}</span>
      {item.isFree && (
        <span className="ml-auto text-[9px] font-bold px-1.5 py-0.5 rounded-full"
          style={{ background: active ? 'rgba(255,255,255,0.2)' : '#f0fdf4', color: active ? '#fff' : '#15803d' }}>
          Free
        </span>
      )}
    </Link>
  )
}

// Guides are the star of the sidebar — expanded, contents always visible.
// Tools are secondary, below them.
const NAV_MAIN = [
  { id: 'home',    label: 'Home',       icon: Home,     href: '/dashboard/home' },
  { id: 'modules', label: 'Guides',   icon: BookOpen,  href: '/dashboard/modules' },
  { id: 'sample-ee', label: 'Example EE', icon: Award,   href: '/dashboard/sample-ee' },
  { id: 'essay',   label: 'My Essay',   icon: PenLine,   href: '/dashboard/essay' },
  { id: 'dump',    label: 'EE Dump',     icon: Database,  href: '/dashboard/dump' },
  { id: 'planner', label: 'EE Planner', icon: Calendar,  href: '/dashboard/planner' },
]

// Tools shown in the sidebar's secondary block (guides render above them)
const NAV_TOOLS = [
  { id: 'sample-ee', label: 'Example EE', icon: Award,     href: '/dashboard/sample-ee' },
  { id: 'essay',     label: 'My Essay',   icon: PenLine,   href: '/dashboard/essay' },
  { id: 'dump',      label: 'EE Dump',    icon: Database,  href: '/dashboard/dump' },
  { id: 'planner',   label: 'EE Planner', icon: Calendar,  href: '/dashboard/planner', isFree: true },
  { id: 'templates', label: 'Templates',  icon: FileText,  href: '/dashboard/templates' },
]

const NAV_MORE = [
  { id: 'ib-guide',  label: 'IB Official EE Guide', icon: BookOpen, href: '/dashboard/ib-guide', isFree: true },
  { id: 'share',     label: 'Share',      icon: Share2,      href: '/dashboard/share' },
]

const ALL_NAV = [...NAV_MAIN, ...NAV_TOOLS, ...NAV_MORE]

// One compact guide row in the expanded sidebar list
function MissionRow({ m, active, visited, hasPaid }) {
  const isPaidLocked = !m.free && !hasPaid
  return (
    <Link
      href={`/course/${m.id}`}
      className="flex items-center gap-2 px-3 py-[7px] rounded-lg text-[12.5px] transition-all mb-px"
      style={{
        background: active ? '#2E3250' : 'transparent',
        color: active ? '#fff' : isPaidLocked ? '#9BAAB8' : '#555',
        textDecoration: 'none',
      }}
      onMouseEnter={e => { if (!active) { e.currentTarget.style.background = '#EAE8DC'; e.currentTarget.style.color = '#2E3250' } }}
      onMouseLeave={e => { if (!active) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = isPaidLocked ? '#9BAAB8' : '#555' } }}
    >
      {visited ? (
        <span className="w-3.5 h-3.5 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ background: active ? 'rgba(255,255,255,0.25)' : '#2E3250' }}>
          <svg width="8" height="8" viewBox="0 0 20 20" fill="#fff"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
        </span>
      ) : (
        <span className="w-3.5 h-3.5 rounded-full flex-shrink-0" style={{ border: `1.5px solid ${active ? 'rgba(255,255,255,0.4)' : '#d8d4c2'}` }} />
      )}
      <span className="truncate flex-1">{m.title}</span>
      {m.free ? (
        <span className="text-[8.5px] font-bold px-1.5 py-px rounded-full flex-shrink-0"
          style={{ background: active ? 'rgba(255,255,255,0.2)' : '#f0fdf4', color: active ? '#fff' : '#15803d' }}>
          FREE
        </span>
      ) : isPaidLocked ? (
        <Lock className="flex-shrink-0" size={10} style={{ opacity: 0.7 }} />
      ) : null}
    </Link>
  )
}

export default function DashboardLayout({ children }) {
  const { user } = useUser()
  const { isSignedIn, isLoaded } = useAuth()
  const pathname = usePathname()
  const router = useRouter()
  const { isVisited } = useModuleProgress()
  const [savedName, setSavedName] = useState('')
  // Clerk name wins; else the name captured during onboarding (protected feature:
  // "{Name}'s workspace" — see memory/protected-features)
  const firstName = user?.firstName || savedName || ''
  const [subject, setSubject] = useState('')
  const [isPremium, setIsPremium] = useState(false)
  const [wordCount, setWordCount] = useState(null)
  const [daysLeft, setDaysLeft] = useState(null)
  const [supervisorRemarks, setSupervisorRemarks] = useState(null)
  const [remarksOpen, setRemarksOpen] = useState(false)

  // Read the onboarding name once on mount (client-side only)
  useEffect(() => {
    setSavedName(localStorage.getItem('eeAcademy_name') || '') // eslint-disable-line react-hooks/set-state-in-effect
  }, [])

  // Clerk is the ONLY gate (2026-08). No separate email capture, no Resend, no
  // second sign-up: anyone without a session is sent to the one Clerk sign-up.
  // RedirectIfSignedIn on /sign-up bounces them back the instant they're in.
  useEffect(() => {
    if (isLoaded && !isSignedIn) router.replace('/sign-up')
  }, [isLoaded, isSignedIn, router])

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

  // Hold until Clerk resolves; signed-out users get a spinner while the effect
  // above redirects them to the single Clerk sign-up.
  if (!isLoaded || !isSignedIn) {
    return (
      <div style={{ minHeight: '100vh', background: '#F4F3E8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: 22, height: 22, borderRadius: '50%', border: '2px solid rgba(46,50,80,0.15)', borderTopColor: 'rgba(46,50,80,0.6)', animation: 'spin 0.8s linear infinite' }} />
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    )
  }

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: '#F4F3E8', color: '#2E3250' }}>

      {/* Sidebar — desktop only */}
      <aside style={{ width: 220, borderRight: '1px solid #e5e5e5', background: '#fff' }}
        className="hidden lg:flex flex-shrink-0 flex-col h-full">

        {/* Brand + subject badge */}
        <div className="px-5 pt-5 pb-4" style={{ borderBottom: '1px solid #f0f0f0' }}>
          <Link href="/dashboard" className="block">
            <p className="font-medium text-xs tracking-tight mb-0.5" style={{ color: '#999' }}>EE Academy</p>
            <p className="font-semibold text-sm leading-tight truncate" style={{ color: '#2E3250', letterSpacing: '-0.01em' }}>
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

        {/* Nav — guides expanded and primary; tools secondary */}
        <nav className="flex-1 overflow-y-auto px-2 py-3">
          <NavItem item={NAV_MAIN[0]} active={activeId === 'home'} />

          <div className="flex items-center justify-between px-3 mt-4 mb-1.5">
            <p id="tour-nav-modules" className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: '#bbb' }}>Guides</p>
            <Link href="/dashboard/modules" className="text-[10px] font-semibold" style={{ color: '#9BAAB8', textDecoration: 'none' }}>
              View all →
            </Link>
          </div>
          {COURSE_CATALOG.map(m => (
            <MissionRow
              key={m.id}
              m={m}
              active={pathname === `/course/${m.id}`}
              visited={isVisited(m.id)}
              hasPaid={isPremium}
            />
          ))}

          <p className="text-[10px] font-semibold uppercase tracking-widest px-3 mt-4 mb-2" style={{ color: '#bbb' }}>Tools</p>
          {NAV_TOOLS.map(item => (
            <NavItem key={item.id} item={item} active={activeId === item.id} />
          ))}

          <p className="text-[10px] font-semibold uppercase tracking-widest px-3 mt-4 mb-2" style={{ color: '#bbb' }}>More</p>
          {NAV_MORE.map(item => (
            <NavItem key={item.id} item={item} active={activeId === item.id} />
          ))}
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
              style={{ background: '#2E3250', color: '#fff', letterSpacing: '-0.01em' }}
            >
              {isSignedIn ? 'Upgrade plan' : 'Get full access'}
            </Link>
          )}
          {!isSignedIn && (
            <Link
              href="/sign-in"
              className="flex items-center justify-center w-full text-xs py-1.5 rounded-lg transition-all mb-1"
              style={{ color: '#aaa' }}
            >
              Sign in →
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
      <main className="flex-1 overflow-y-auto pb-16 lg:pb-0" style={{ background: '#F4F3E8' }}>
        {children}
      </main>

      {/* Mobile bottom nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around px-1 py-1 safe-area-bottom"
        style={{ background: '#fff', borderTop: '1px solid #e5e5e5', paddingBottom: 'max(8px, env(safe-area-inset-bottom))' }}>
        {NAV_MAIN.map(item => {
          const Icon = item.icon
          const active = activeId === item.id
          return (
            <Link key={item.id} href={item.href}
              className="flex flex-col items-center gap-0.5 flex-1 py-1.5 rounded-xl transition-all"
              style={{ color: active ? '#2E3250' : '#bbb', minWidth: 0 }}>
              <Icon size={18} strokeWidth={active ? 2 : 1.5} />
              <span className="text-[9px] font-medium truncate w-full text-center">{item.label}</span>
            </Link>
          )
        })}
        {!isPremium && (
          <Link href="/pricing"
            className="flex flex-col items-center gap-0.5 flex-1 py-1.5 rounded-xl"
            style={{ color: '#2E3250', minWidth: 0 }}>
            <span className="text-base leading-none">⭐</span>
            <span className="text-[9px] font-semibold">Upgrade</span>
          </Link>
        )}
      </nav>
    </div>
  )
}
