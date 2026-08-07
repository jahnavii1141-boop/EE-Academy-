'use client'

import { useState, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { useAuth } from '@clerk/nextjs'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Save, CheckCircle, Edit3, X, Calendar, User, BookOpen, Database, FileText, ChevronRight, ArrowRight, Lock } from 'lucide-react'
import { getTheme } from '@/lib/subjectThemes'
import { COURSE_CATALOG } from '@/data/courseCatalog'
import { useModuleProgress } from '@/hooks/useModuleProgress'

const SETUP_DISMISS_KEY = 'eeAcademy_setupDismissed'

const SUBJECTS = [
  'Biology', 'Business Management', 'Chemistry', 'Computer Science',
  'Economics', 'English A', 'Environmental Systems & Societies',
  'Geography', 'Global Politics', 'History', 'Language B',
  'Mathematics', 'Music', 'Philosophy', 'Physics',
  'Psychology', 'Social & Cultural Anthropology', 'Visual Arts', 'Other',
]

// ── Onboarding Tour ───────────────────────────────────────────────────────────
const TOUR_KEY = 'eeAcademy_tourDone'

const TOUR_STEPS = [
  { target: null, emoji: '👋', title: 'Welcome to your EE workspace', body: "Quick tour — 20 seconds. We'll show you what's here." },
  { target: 'tour-guide', emoji: '🗺️', title: 'Your progress map', body: 'Follow this path in order. Start with the included guides — then unlock the full writing system.', arrow: 'top' },
  { target: 'tour-share', emoji: '🔗', title: 'Share with your supervisor', body: 'Get a link and send it to your teacher — they can read your essay draft and leave you feedback directly.', arrow: 'top' },
  { target: 'tour-nav-modules', emoji: '📚', title: 'Guides', body: '14 guides from mindset to final draft. Start at 01 and work through in order.', arrow: 'left' },
  { target: 'tour-nav-dump', emoji: '🗂️', title: 'EE Dump', body: 'Paste a paragraph from any source — auto-extracts the citation for your bibliography.', arrow: 'left' },
  { target: 'tour-nav-essay', emoji: '✍️', title: 'My Essay', body: 'Write your draft and track your word count. Everything saves automatically.', arrow: 'left' },
]

function DashboardTour({ onDone }) {
  const [step, setStep] = useState(0)
  const [rect, setRect] = useState(null)
  const current = TOUR_STEPS[step]
  const isLast = step === TOUR_STEPS.length - 1
  const PAD = 10

  useEffect(() => {
    if (!current.target) { setRect(null); return } // eslint-disable-line react-hooks/set-state-in-effect
    const measure = () => {
      const el = document.getElementById(current.target)
      if (el) setRect(el.getBoundingClientRect()) // eslint-disable-line react-hooks/set-state-in-effect
    }
    // Bring the highlighted element into view first so the spotlight + tooltip
    // always fit on screen (protected feature — see memory/protected-features)
    const el = document.getElementById(current.target)
    if (el) el.scrollIntoView({ block: 'center', behavior: 'instant' })
    // measure after the scroll has settled
    const t = setTimeout(measure, 50)
    measure()
    window.addEventListener('resize', measure)
    return () => { clearTimeout(t); window.removeEventListener('resize', measure) }
  }, [step, current.target])

  const next = () => { if (isLast) onDone(); else setStep(s => s + 1) }

  // Tooltip card position
  let cardStyle = {}
  let arrowEl = null

  const CARD_H = 220
  if (!rect) {
    cardStyle = { position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }
  } else if (current.arrow === 'top') {
    const leftX = Math.min(Math.max(rect.left + rect.width / 2, 148), window.innerWidth - 148)
    const spaceBelow = window.innerHeight - rect.bottom - PAD - 12
    if (spaceBelow >= CARD_H) {
      // enough room below — normal position
      cardStyle = { position: 'fixed', top: rect.bottom + PAD + 12, left: leftX, transform: 'translateX(-50%)' }
      arrowEl = (
        <div style={{
          position: 'absolute', top: -8, left: '50%', transform: 'translateX(-50%)',
          width: 0, height: 0,
          borderLeft: '8px solid transparent', borderRight: '8px solid transparent',
          borderBottom: '8px solid #fff',
          filter: 'drop-shadow(0 -1px 0 #e8e8e8)',
        }} />
      )
    } else {
      // flip above element
      cardStyle = { position: 'fixed', top: Math.max(8, rect.top - PAD - 12 - CARD_H), left: leftX, transform: 'translateX(-50%)' }
      arrowEl = (
        <div style={{
          position: 'absolute', bottom: -8, left: '50%', transform: 'translateX(-50%)',
          width: 0, height: 0,
          borderLeft: '8px solid transparent', borderRight: '8px solid transparent',
          borderTop: '8px solid #fff',
          filter: 'drop-shadow(0 1px 0 #e8e8e8)',
        }} />
      )
    }
  } else if (current.arrow === 'left') {
    // tooltip to the right of element — clamp vertically so it never leaves the screen
    const clampedTop = Math.min(
      Math.max(rect.top + rect.height / 2, CARD_H / 2 + 8),
      window.innerHeight - CARD_H / 2 - 8,
    )
    cardStyle = {
      position: 'fixed',
      top: clampedTop,
      left: rect.right + PAD + 12,
      transform: 'translateY(-50%)',
    }
    arrowEl = (
      <div style={{
        position: 'absolute', left: -8, top: '50%', transform: 'translateY(-50%)',
        width: 0, height: 0,
        borderTop: '8px solid transparent', borderBottom: '8px solid transparent',
        borderRight: '8px solid #fff',
        filter: 'drop-shadow(-1px 0 0 #e8e8e8)',
      }} />
    )
  }

  return createPortal(
    <div style={{ position: 'fixed', inset: 0, zIndex: 9990 }} onMouseDown={e => e.stopPropagation()}>
      {/* Overlay */}
      {!rect ? (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)', zIndex: 9991 }} />
      ) : (
        <div style={{
          position: 'fixed',
          top: rect.top - PAD, left: rect.left - PAD,
          width: rect.width + PAD * 2, height: rect.height + PAD * 2,
          borderRadius: 14,
          boxShadow: '0 0 0 9999px rgba(0,0,0,0.55)',
          zIndex: 9991,
          pointerEvents: 'none',
          border: '2px solid rgba(255,255,255,0.25)',
        }} />
      )}

      {/* Tooltip card */}
      <div style={{
        ...cardStyle,
        zIndex: 9992,
        background: '#fff',
        borderRadius: 18,
        padding: '22px 24px 18px',
        width: 264,
        boxShadow: '0 12px 40px rgba(0,0,0,0.18)',
        border: '1px solid #e8e8e8',
        position: cardStyle.position,
      }}>
        {arrowEl}
        <p style={{ fontSize: 22, marginBottom: 10 }}>{current.emoji}</p>
        <p style={{ fontWeight: 700, fontSize: 14, color: '#2E3250', marginBottom: 6, letterSpacing: '-0.02em' }}>
          {current.title}
        </p>
        <p style={{ fontSize: 12.5, color: '#888', lineHeight: 1.65, marginBottom: 18 }}>
          {current.body}
        </p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button onClick={onDone}
            style={{ fontSize: 11.5, color: '#ccc', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
            Skip tour
          </button>
          <button onClick={next} style={{
            display: 'flex', alignItems: 'center', gap: 4,
            fontSize: 12.5, fontWeight: 600, color: '#fff',
            background: '#2E3250', border: 'none', borderRadius: 10,
            padding: '8px 16px', cursor: 'pointer',
          }}>
            {isLast ? 'Done' : 'Next'} {!isLast && <ChevronRight size={13} />}
          </button>
        </div>
        {/* Step dots */}
        <div style={{ display: 'flex', gap: 5, justifyContent: 'center', marginTop: 14 }}>
          {TOUR_STEPS.map((_, i) => (
            <span key={i} style={{
              display: 'block', width: i === step ? 14 : 5, height: 5,
              borderRadius: 999, transition: 'width 0.2s',
              background: i === step ? '#2E3250' : '#e0e0e0',
            }} />
          ))}
        </div>
      </div>
    </div>,
    document.body
  )
}

export default function DashboardHome() {
  const { isSignedIn } = useAuth()
  const searchParams = useSearchParams()
  const router = useRouter()
  const [form, setForm] = useState({
    research_question: '',
    subject: '',
    supervisor_name: '',
    submission_deadline: '',
  })
  const [saved, setSaved] = useState(false)
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [paymentVerifying, setPaymentVerifying] = useState(false)
  const [paymentSuccess, setPaymentSuccess] = useState(false)
  const [essayText, setEssayText] = useState('')
  const [hasPaid, setHasPaid] = useState(false)
  const [isPremium, setIsPremium] = useState(false)
  const [showTour, setShowTour] = useState(false)
  const [setupDismissed, setSetupDismissed] = useState(true) // resolved from localStorage on mount
  const { isVisited } = useModuleProgress()

  useEffect(() => {
    setSetupDismissed(!!localStorage.getItem(SETUP_DISMISS_KEY)) // eslint-disable-line react-hooks/set-state-in-effect
  }, [])
  const [shareUrl, setShareUrl] = useState(null)
  const [shareLoading, setShareLoading] = useState(false)
  const [shareCopied, setShareCopied] = useState(false)

  // ── Verify Paddle payment on return from checkout ──────────────────────────
  // Paddle appends ?_ptxn=txn_xxx to the successUrl automatically.
  // We verify the transaction server-side and grant access without relying on webhook alone.
  useEffect(() => {
    const ptxn = searchParams.get('_ptxn')
    if (!ptxn || !isSignedIn) return

    setPaymentVerifying(true) // eslint-disable-line react-hooks/set-state-in-effect
    fetch(`/api/verify-payment?txn=${ptxn}`)
      .then(r => r.json())
      .then(({ verified }) => {
        if (verified) {
          setPaymentSuccess(true)
          // Strip the query param and reload workspace
          router.replace('/dashboard/home')
          setTimeout(() => setPaymentSuccess(false), 6000)
        }
      })
      .catch(() => {})
      .finally(() => setPaymentVerifying(false))
  }, [searchParams, isSignedIn, router])

  useEffect(() => {
    if (!isSignedIn) {
      // Onboarding is optional (2026-07): never redirect away from the
      // dashboard. A dismissible setup card below invites personalisation.
      const saved = localStorage.getItem('eeAcademy_workspace')
      if (saved) {
        try {
          setForm(f => ({ ...f, ...JSON.parse(saved) })) // eslint-disable-line react-hooks/set-state-in-effect
        } catch (e) { console.error('workspace parse error', e) }
      }
      setLoading(false) // eslint-disable-line react-hooks/set-state-in-effect
      if (!localStorage.getItem(TOUR_KEY)) setShowTour(true) // eslint-disable-line react-hooks/set-state-in-effect
      return
    }
    fetch('/api/workspace')
      .then(r => r.json())
      .then(({ workspace }) => {
        if (workspace) {
          setForm({
            research_question: workspace.research_question ?? '',
            subject: workspace.subject ?? '',
            supervisor_name: workspace.supervisor_name ?? '',
            submission_deadline: workspace.submission_deadline ?? '',
          })
          setHasPaid(!!workspace.has_paid)
          setIsPremium(workspace.tier === 'premium')
        }
        // No auto-editing gate: an empty profile shows a dismissible setup
        // card instead of replacing the dashboard (onboarding is optional).
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false) // eslint-disable-line react-hooks/set-state-in-effect
        if (!localStorage.getItem(TOUR_KEY)) setShowTour(true) // eslint-disable-line react-hooks/set-state-in-effect
      })
    fetch('/api/essay')
      .then(r => r.json())
      .then(({ essay_text }) => { if (essay_text) setEssayText(essay_text) })
      .catch(() => {})
  }, [isSignedIn])

  const save = useCallback(async () => {
    if (!isSignedIn) {
      localStorage.setItem('eeAcademy_workspace', JSON.stringify(form))
    } else {
      await fetch('/api/workspace', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
    }
    setSaved(true)
    setEditing(false)
    setTimeout(() => setSaved(false), 2500)
    // Show tour after first workspace save if not seen yet
    if (!localStorage.getItem(TOUR_KEY)) setShowTour(true)
  }, [form, isSignedIn])

  const generateShare = useCallback(async () => {
    setShareLoading(true)
    try {
      const res = await fetch('/api/share', { method: 'POST' })
      const { token } = await res.json()
      if (token) setShareUrl(`${window.location.origin}/share/${token}`)
    } catch (e) { console.error('share error', e) }
    setShareLoading(false)
  }, [])

  const copyShare = useCallback(() => {
    if (!shareUrl) return
    navigator.clipboard.writeText(shareUrl)
    setShareCopied(true)
    setTimeout(() => setShareCopied(false), 2000)
  }, [shareUrl])

  const daysUntilDeadline = form.submission_deadline
    ? Math.ceil((new Date(form.submission_deadline) - new Date()) / 86400000)
    : null

  const theme = getTheme(form.subject)

  if (loading || paymentVerifying) {
    return (
      <div className="h-full flex flex-col items-center justify-center gap-3">
        <div className="w-6 h-6 rounded-full border-2 border-black/10 border-t-black/40 animate-spin" />
        {paymentVerifying && (
          <p className="text-sm" style={{ color: '#aaa' }}>Confirming your payment…</p>
        )}
      </div>
    )
  }

  const doneTour = () => {
    localStorage.setItem(TOUR_KEY, '1')
    setShowTour(false)
  }

  const dismissSetup = () => {
    localStorage.setItem(SETUP_DISMISS_KEY, '1')
    setSetupDismissed(true)
  }

  // Course-first hierarchy: the primary card always points at the next
  // unvisited module (or the very first one for brand-new users).
  const visitedCount = COURSE_CATALOG.filter(m => isVisited(m.id)).length
  const nextModule = COURSE_CATALOG.find(m => !isVisited(m.id)) || COURSE_CATALOG[0]
  const hasStarted = visitedCount > 0
  const profileEmpty = !form.subject && !form.research_question
  const showSetupCard = profileEmpty && !setupDismissed && !editing

  // (Full-screen setup gate removed 2026-07 — onboarding is optional; an
  // empty profile shows the dismissible setup card inside the dashboard.)

  return (
    <div className="h-full overflow-y-auto">
      {showTour && <DashboardTour onDone={doneTour} />}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 pt-6 sm:pt-10 pb-32 lg:pb-20">

        {/* Payment success banner */}
        {paymentSuccess && (
          <div className="mb-6 rounded-xl px-5 py-4 flex items-center gap-3"
            style={{ background: '#f0fdf4', border: '1px solid #86efac' }}>
            <span className="text-xl">🎉</span>
            <div>
              <p className="text-sm font-bold" style={{ color: '#15803d' }}>Payment confirmed — welcome!</p>
              <p className="text-xs mt-0.5" style={{ color: '#16a34a' }}>
                Your access is now active. All modules and tools are unlocked.
              </p>
            </div>
          </div>
        )}

        {/* ── Optional setup nudge — dismissible, never blocks ── */}
        {showSetupCard && (
          <div className="mb-6 rounded-2xl px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-3"
            style={{ background: '#fff', border: '1px dashed rgba(46,50,80,0.25)' }}>
            <div className="flex-1">
              <p className="text-sm font-semibold" style={{ color: '#2E3250' }}>Personalise your workspace (2 min, optional)</p>
              <p className="text-xs mt-0.5" style={{ color: '#9BAAB8' }}>
                Tell us your subject and research question — your planner and tools adapt to your EE.
              </p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <Link href="/onboarding" className="text-xs font-semibold px-4 py-2 rounded-xl"
                style={{ background: '#2E3250', color: '#fff', textDecoration: 'none' }}>
                Set up →
              </Link>
              <button onClick={dismissSetup} className="text-xs px-3 py-2 rounded-xl" style={{ color: '#9BAAB8' }}>
                Dismiss
              </button>
            </div>
          </div>
        )}

        {/* ── THE COURSE — primary card, unmissable ── */}
        {!editing && (
          <Link href={`/course/${nextModule.id}`}
            className="block rounded-2xl px-6 sm:px-8 py-7 mb-10 transition-all hover:-translate-y-0.5"
            style={{ background: '#2E3250', color: '#F4F3E8', textDecoration: 'none', boxShadow: '0 8px 28px rgba(46,50,80,0.18)' }}>
            <div className="flex flex-col sm:flex-row sm:items-center gap-5">
              <div className="flex-1">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] mb-2" style={{ color: 'rgba(244,243,232,0.65)' }}>
                  The course · 5 guides free
                </p>
                <p className="font-serif text-[26px] leading-tight mb-1">
                  {hasStarted ? 'Continue where you left off' : 'Start the course'}
                </p>
                <p className="text-[14px]" style={{ color: 'rgba(244,243,232,0.75)' }}>
                  {hasStarted
                    ? `Next up: Guide ${nextModule.number} — ${nextModule.title}`
                    : `Guide ${nextModule.number} — ${nextModule.title}`}
                </p>
              </div>
              <div className="flex flex-col items-start sm:items-end gap-2 flex-shrink-0">
                <span className="inline-flex items-center gap-1.5 rounded-xl px-5 py-3 text-sm font-semibold"
                  style={{ background: '#F4F3E8', color: '#2E3250' }}>
                  {hasStarted ? 'Continue' : 'Start now'} <ArrowRight className="w-4 h-4" strokeWidth={2.25} />
                </span>
                <span className="text-[11px] underline underline-offset-2" style={{ color: 'rgba(244,243,232,0.6)' }}
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); router.push('/dashboard/modules') }}>
                  See the full curriculum
                </span>
              </div>
            </div>
          </Link>
        )}

        {/* ── The guides — a simple, calm list (replaces the big grid) ── */}
        {!editing && (
          <div id="tour-guide" className="mb-12">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] mb-3" style={{ color: '#9BAAB8' }}>The guides</p>
            <div className="rounded-2xl border overflow-hidden" style={{ borderColor: 'rgba(46,50,80,0.12)', background: '#fff' }}>
              {COURSE_CATALOG.map((g, i) => {
                const done = isVisited(g.id)
                const isAi = g.id === 'ai-module'
                const locked = !g.free && (isAi ? !isPremium : !hasPaid)
                return (
                  <Link key={g.id} href={locked ? '/pricing' : `/course/${g.id}`}
                    className="flex items-center gap-3 px-5 py-3 transition-colors"
                    style={{ borderTop: i === 0 ? 'none' : '1px solid rgba(46,50,80,0.07)', textDecoration: 'none', color: locked ? '#9BAAB8' : '#2E3250' }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#F4F3E8' }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}>
                    {done ? (
                      <span className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#2E3250' }}>
                        <svg width="9" height="9" viewBox="0 0 20 20" fill="#fff"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                      </span>
                    ) : (
                      <span className="w-4 h-4 rounded-full flex-shrink-0" style={{ border: '1.5px solid #d8d4c2' }} />
                    )}
                    <span className="text-xs tabular-nums flex-shrink-0" style={{ color: '#c9c5b4' }}>{g.number}</span>
                    <span className="text-sm flex-1 truncate">{g.title}</span>
                    {g.free ? (
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full flex-shrink-0" style={{ background: '#f0fdf4', color: '#15803d' }}>FREE</span>
                    ) : locked ? (
                      <Lock className="flex-shrink-0" size={12} style={{ opacity: 0.6 }} />
                    ) : null}
                  </Link>
                )
              })}
            </div>
          </div>
        )}

        <div className="max-w-2xl mx-auto">
        {/* Share with supervisor */}
        {!editing && (
          <div id="tour-share" className="mb-8 rounded-2xl px-5 py-5"
            style={{ background: '#fff', border: '1px solid #e8e8e8' }}>
            <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: '#bbb' }}>Share with supervisor</p>
            {isSignedIn ? (
              <>
                <p className="text-xs mb-4" style={{ color: '#aaa' }}>
                  Send your teacher this link — they can view your RQ, essay draft, and leave you feedback.
                </p>
                {shareUrl ? (
                  <div className="flex items-center gap-2">
                    <input readOnly value={shareUrl}
                      className="flex-1 min-w-0 text-xs rounded-lg px-3 py-2 focus:outline-none"
                      style={{ background: '#EAE8DC', color: '#555', border: '1px solid #f0f0f0' }} />
                    <button onClick={copyShare}
                      className="flex-shrink-0 text-xs font-semibold px-3 py-2 rounded-lg transition-all"
                      style={{ background: shareCopied ? '#f0fdf4' : '#2E3250', color: shareCopied ? '#15803d' : '#fff' }}>
                      {shareCopied ? '✓ Copied' : 'Copy'}
                    </button>
                  </div>
                ) : (
                  <button onClick={generateShare} disabled={shareLoading}
                    className="text-xs font-semibold px-4 py-2 rounded-xl transition-all disabled:opacity-50"
                    style={{ background: '#EAE8DC', color: '#555' }}>
                    {shareLoading ? 'Generating…' : 'Get share link →'}
                  </button>
                )}
              </>
            ) : (
              <>
                <p className="text-xs mb-3" style={{ color: '#aaa' }}>
                  Send your teacher a link to view your RQ and essay — and get their feedback back here. Free account, 20 seconds.
                </p>
                <Link href="/sign-up"
                  className="inline-flex text-xs font-semibold px-4 py-2 rounded-xl transition-all hover:opacity-90"
                  style={{ background: '#2E3250', color: '#fff', textDecoration: 'none' }}>
                  Create free account to share →
                </Link>
              </>
            )}
          </div>
        )}

        {/* Subject hero banner */}
        {form.subject && (
          <div className="rounded-2xl mb-8 overflow-hidden"
            style={{ background: theme.bg, border: `1px solid ${theme.light}` }}>
            <div className="px-6 py-5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="text-4xl">{theme.emoji}</div>
                <div>
                  <p className="font-bold text-base leading-tight" style={{ color: theme.color, letterSpacing: '-0.02em' }}>
                    {form.subject}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: theme.accent, opacity: 0.8 }}>
                    {theme.tagline}
                  </p>
                </div>
              </div>
              <div className="text-2xl font-mono opacity-20 select-none" style={{ color: theme.color }}>
                {theme.decoration}
              </div>
            </div>
          </div>
        )}

        {/* RQ display */}
        {!editing && form.research_question ? (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <p className="text-[10px] font-bold text-navy uppercase tracking-widest">Research Question</p>
              <button onClick={() => setEditing(true)}
                className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-all"
                style={{ color: '#888', border: '1px solid #e8e8e8' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#2E3250'; e.currentTarget.style.color = '#2E3250' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#e8e8e8'; e.currentTarget.style.color = '#888' }}>
                <Edit3 size={11} />
                Edit
              </button>
            </div>

            {/* RQ card */}
            <div className="rounded-2xl px-6 py-5 mb-4"
              style={{ background: '#fff', border: '1px solid #e8e8e8' }}>
              <div className="w-8 h-0.5 rounded mb-4" style={{ background: theme.accent || '#2E3250' }} />
              <p className="text-base leading-relaxed font-medium" style={{ color: '#2E3250', letterSpacing: '-0.01em' }}>
                {form.research_question}
              </p>
            </div>

            {/* Meta chips */}
            <div className="flex flex-wrap gap-2">
              {form.supervisor_name && (
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs"
                  style={{ background: '#EAE8DC', color: '#555' }}>
                  <User size={11} />
                  {form.supervisor_name}
                </div>
              )}
              {daysUntilDeadline !== null && (
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium"
                  style={{
                    background: daysUntilDeadline <= 30 ? '#fef2f2' : '#EAE8DC',
                    color: daysUntilDeadline <= 30 ? '#dc2626' : '#555',
                  }}>
                  <Calendar size={11} />
                  {daysUntilDeadline > 0
                    ? `${daysUntilDeadline} days left`
                    : daysUntilDeadline === 0
                      ? 'Due today'
                      : `${Math.abs(daysUntilDeadline)} days overdue`}
                </div>
              )}
            </div>
          </div>
        ) : !editing ? (
          <div className="mb-8 rounded-2xl px-6 py-5 flex items-center gap-4"
            style={{ background: '#fff', border: '1px dashed #e0e0e0' }}>
            <BookOpen size={18} style={{ color: '#ccc' }} />
            <div className="flex-1">
              <p className="text-sm font-medium mb-0.5" style={{ color: '#aaa' }}>No research question yet</p>
              <p className="text-xs" style={{ color: '#ccc' }}>Add your RQ to personalise your workspace</p>
            </div>
            <button onClick={() => setEditing(true)}
              className="text-xs font-semibold px-4 py-2 rounded-xl transition-all"
              style={{ background: '#2E3250', color: '#fff' }}>
              Add →
            </button>
          </div>
        ) : null}

        {/* Edit form */}
        {editing && (
          <div className="rounded-2xl overflow-hidden mb-8"
            style={{ background: '#fff', border: '1px solid #e8e8e8' }}>
            <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: '1px solid #f0f0f0' }}>
              <p className="text-sm font-semibold" style={{ color: '#2E3250', letterSpacing: '-0.01em' }}>
                {form.research_question ? 'Edit workspace' : 'Set up your workspace'}
              </p>
              {form.research_question && (
                <button onClick={() => setEditing(false)}>
                  <X size={16} style={{ color: '#aaa' }} />
                </button>
              )}
            </div>

            <div className="px-6 py-5 space-y-5">
              {/* Subject */}
              <div>
                <label className="block text-xs font-semibold text-navy uppercase tracking-widest mb-2">
                  Subject
                </label>
                <div className="grid grid-cols-2 gap-1.5 max-h-48 overflow-y-auto pr-1">
                  {SUBJECTS.map(s => {
                    const t = getTheme(s)
                    const selected = form.subject === s
                    return (
                      <button key={s} onClick={() => setForm(f => ({ ...f, subject: s }))}
                        className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-left transition-all"
                        style={{
                          background: selected ? t.light : '#f9f9f9',
                          color: selected ? t.color : '#555',
                          border: `1px solid ${selected ? t.accent : '#f0f0f0'}`,
                          fontWeight: selected ? 600 : 400,
                        }}>
                        <span className="text-base">{t.emoji}</span>
                        <span className="text-xs leading-tight">{s}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Research Question */}
              <div>
                <label className="block text-xs font-semibold text-navy uppercase tracking-widest mb-2">
                  Research Question
                </label>
                <textarea
                  value={form.research_question}
                  onChange={e => setForm(f => ({ ...f, research_question: e.target.value }))}
                  placeholder="To what extent does…"
                  rows={3}
                  className="w-full rounded-xl border border-navy/15 bg-white px-4 py-3 text-sm text-navy placeholder:text-navy/30 focus:outline-none resize-none transition-colors"
                  style={{ borderColor: '#e8e8e8' }}
                  onFocus={e => e.target.style.borderColor = '#2E3250'}
                  onBlur={e => e.target.style.borderColor = '#e8e8e8'}
                />
              </div>

              {/* Supervisor */}
              <div>
                <label className="block text-xs font-semibold text-navy uppercase tracking-widest mb-2">
                  Supervisor <span className="font-normal normal-case tracking-normal" style={{ color: '#ccc' }}>optional</span>
                </label>
                <input
                  type="text"
                  value={form.supervisor_name}
                  onChange={e => setForm(f => ({ ...f, supervisor_name: e.target.value }))}
                  placeholder="Mr. Smith"
                  className="w-full rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors"
                  style={{ border: '1px solid #e8e8e8', color: '#2E3250', background: '#fff' }}
                  onFocus={e => e.target.style.borderColor = '#2E3250'}
                  onBlur={e => e.target.style.borderColor = '#e8e8e8'}
                />
              </div>

              {/* Deadline */}
              <div>
                <label className="block text-xs font-semibold text-navy uppercase tracking-widest mb-2">
                  Submission Deadline <span className="font-normal normal-case tracking-normal" style={{ color: '#ccc' }}>optional</span>
                </label>
                <input
                  type="date"
                  value={form.submission_deadline}
                  onChange={e => setForm(f => ({ ...f, submission_deadline: e.target.value }))}
                  className="w-full rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors"
                  style={{ border: '1px solid #e8e8e8', color: '#2E3250', background: '#fff' }}
                  onFocus={e => e.target.style.borderColor = '#2E3250'}
                  onBlur={e => e.target.style.borderColor = '#e8e8e8'}
                />
              </div>

              <button
                onClick={save}
                className="flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-xl transition-all"
                style={{ background: '#2E3250', color: '#fff' }}>
                {saved ? <CheckCircle className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                {saved ? 'Saved!' : 'Save workspace'}
              </button>
            </div>
          </div>
        )}

        {/* Draft preview card */}
        {!editing && form.research_question && (
          <>
            <Link href="/dashboard/essay" className="block mb-4 rounded-xl px-5 py-4 transition-all group"
              style={{ background: '#fff', border: '1px solid #e8e8e8', textDecoration: 'none' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#2E3250' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#e8e8e8' }}>
              <div className="flex items-center justify-between mb-2">
                <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: '#bbb' }}>My Essay</p>
                {essayText && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: '#EAE8DC', color: '#888' }}>
                    {essayText.trim().split(/\s+/).filter(Boolean).length.toLocaleString()} words
                  </span>
                )}
              </div>
              {essayText ? (
                <>
                  <p className="text-sm leading-relaxed mb-2" style={{ color: '#2E3250' }}>
                    {essayText.trim().slice(0, 120)}{essayText.trim().length > 120 ? '…' : ''}
                  </p>
                  <p className="text-xs font-semibold" style={{ color: '#555' }}>Continue writing →</p>
                </>
              ) : (
                <p className="text-sm" style={{ color: '#aaa' }}>No draft yet — Start your essay →</p>
              )}
            </Link>

            {/* EE Planner — the one other essential tool */}
            <Link href="/dashboard/planner"
              className="block rounded-xl px-5 py-4 transition-all"
              style={{ background: '#fff', border: '1px solid #e8e8e8', textDecoration: 'none' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#2E3250' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#e8e8e8' }}>
              <div className="flex items-center gap-1.5 mb-1">
                <Calendar size={13} style={{ color: '#555' }} strokeWidth={1.75} />
                <span className="text-xs font-semibold" style={{ color: '#2E3250' }}>EE Planner</span>
              </div>
              <p className="text-[11px] leading-snug" style={{ color: '#aaa' }}>Plan your EE week by week, mapped to your deadline.</p>
            </Link>
          </>
        )}

        {/* Replay tour */}
        <div className="mt-10 text-center">
          <button
            onClick={() => { localStorage.removeItem(TOUR_KEY); setShowTour(true) }}
            className="text-[11px] text-navy/30 hover:text-navy/60 transition-colors underline underline-offset-2"
          >
            Replay tour
          </button>
        </div>
        </div>
      </div>
    </div>
  )
}
