'use client'

import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '@clerk/nextjs'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Save, CheckCircle, Edit3, X, Calendar, User, BookOpen, Database, FileText, ChevronRight } from 'lucide-react'
import { getTheme } from '@/lib/subjectThemes'

const SUBJECTS = [
  'Biology', 'Business Management', 'Chemistry', 'Computer Science',
  'Economics', 'English A', 'Environmental Systems & Societies',
  'Geography', 'Global Politics', 'History', 'Language B',
  'Mathematics', 'Music', 'Philosophy', 'Physics',
  'Psychology', 'Social & Cultural Anthropology', 'Visual Arts', 'Other',
]

// ── Start Here progression guide ─────────────────────────────────────────────
const FREE_STEPS = [
  { num: '01', label: 'Mindset & Examiner Thinking', href: '/course/module-1' },
  { num: '02', label: 'IB Criteria & Grading', href: '/course/module-2' },
  { num: '03', label: 'Choose Subject & Topic', href: '/course/module-3' },
  { num: '05', label: 'EE Dump Research System', href: '/course/module-5' },
]
const PAID_STEPS = [
  { num: '04', label: 'Research Question', href: '/course/module-4' },
  { num: '06', label: 'Research Methods', href: '/course/module-6' },
  { num: '07', label: 'EE Structure', href: '/course/module-7' },
  { num: '08', label: 'Writing Each Section', href: '/course/module-8' },
  { num: '09', label: 'Format & Citations', href: '/course/module-9' },
  { num: '10', label: 'Intro & Conclusion', href: '/course/module-10' },
  { num: '11', label: 'RPPF Mastery', href: '/course/module-11' },
  { num: '13', label: '32/34 Analysis', href: '/course/module-13' },
  { num: '14', label: 'Templates & Checklists', href: '/course/module-14' },
]

function StepChip({ step, active, color }) {
  const style = active
    ? { background: color === 'green' ? '#fff' : color === 'gold' ? '#fef3c7' : '#fff',
        color: color === 'green' ? '#15803d' : color === 'gold' ? '#92400e' : '#0a0a0a',
        border: `1px solid ${color === 'green' ? '#86efac' : color === 'gold' ? '#fde68a' : '#e0e0e0'}` }
    : { background: '#fff', color: '#ccc', border: '1px solid #f0f0f0' }
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium"
      style={style}>
      <span className="font-mono text-[10px]" style={{ opacity: active ? 0.5 : 1 }}>{step.num}</span>
      {step.label}
      {!active && <span className="text-[10px]">🔒</span>}
    </span>
  )
}

function StartHereGuide({ hasPaid, isPremium }) {
  return (
    <div id="tour-guide" className="mb-8 rounded-2xl overflow-hidden" style={{ border: '1px solid #e8e8e8', background: '#fff' }}>
      <div className="px-5 py-3.5 flex items-center gap-2.5" style={{ borderBottom: '1px solid #f0f0f0', background: '#fafafa' }}>
        <span className="text-base" aria-hidden="true">🗺️</span>
        <div>
          <p className="text-xs font-bold" style={{ color: '#0a0a0a' }}>Start Here</p>
          <p className="text-[11px]" style={{ color: '#aaa' }}>Your EE progression — follow in order</p>
        </div>
      </div>

      <div className="p-5 space-y-4">
        {/* FREE tier */}
        <div className="rounded-xl p-4" style={{ background: '#f0fdf4', border: '1px solid #bbf7d0' }}>
          <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full mb-3"
            style={{ background: '#dcfce7', color: '#15803d' }}>FREE — start here</span>
          <div className="flex flex-wrap items-center gap-1.5">
            {FREE_STEPS.map((step, i) => (
              <span key={step.num} className="flex items-center gap-1.5">
                <Link href={step.href} style={{ textDecoration: 'none' }}>
                  <StepChip step={step} active color="green" />
                </Link>
                {i < FREE_STEPS.length - 1 && (
                  <span className="text-xs font-bold" style={{ color: '#86efac' }}>→</span>
                )}
              </span>
            ))}
          </div>
        </div>

        {/* Connector */}
        <div className="flex items-center gap-3 pl-2">
          <span className="text-sm" style={{ color: '#d1d5db' }}>↓</span>
          {hasPaid ? (
            <span className="text-xs font-semibold" style={{ color: '#22c55e' }}>✓ Method unlocked</span>
          ) : (
            <span className="text-xs" style={{ color: '#aaa' }}>
              then unlock all modules →{' '}
              <Link href={hasPaid ? '/dashboard/modules' : '/pricing'} className="font-semibold underline underline-offset-2" style={{ color: '#0a0a0a' }}>
                Method $89
              </Link>
            </span>
          )}
        </div>

        {/* PAID tier */}
        <div className="rounded-xl p-4" style={{
          background: hasPaid ? '#fafafa' : '#f9f9f9',
          border: `1px solid ${hasPaid ? '#e0e0e0' : '#f0f0f0'}`,
        }}>
          <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full mb-3"
            style={{ background: hasPaid ? '#0a0a0a' : '#efefef', color: hasPaid ? '#fff' : '#bbb' }}>
            METHOD · $89
          </span>
          {hasPaid ? (
            <div className="flex flex-wrap items-center gap-1.5">
              {PAID_STEPS.map((step, i) => (
                <span key={step.num} className="flex items-center gap-1.5">
                  <Link href={step.href} style={{ textDecoration: 'none' }}>
                    <StepChip step={step} active color="dark" />
                  </Link>
                  {i < PAID_STEPS.length - 1 && (
                    <span className="text-xs" style={{ color: '#d1d5db' }}>→</span>
                  )}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-sm" style={{ color: '#bbb' }}>
              Research question, writing structure, essay drafting, citations, RPPF — 9 modules + a real 32/34 breakdown.
            </p>
          )}
        </div>

        {/* Connector */}
        <div className="flex items-center gap-3 pl-2">
          <span className="text-sm" style={{ color: '#d1d5db' }}>↓</span>
          {isPremium ? (
            <span className="text-xs font-semibold" style={{ color: '#d97706' }}>✓ Method+System unlocked</span>
          ) : (
            <span className="text-xs" style={{ color: '#aaa' }}>
              + the full system →{' '}
              <Link href="/pricing" className="font-semibold underline underline-offset-2" style={{ color: '#92400e' }}>
                Method+System $149
              </Link>
            </span>
          )}
        </div>

        {/* PREMIUM tier */}
        <div className="rounded-xl p-4" style={{
          background: isPremium ? '#fffbeb' : '#f9f9f9',
          border: `1px solid ${isPremium ? '#fde68a' : '#f0f0f0'}`,
        }}>
          <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full mb-3"
            style={{ background: isPremium ? '#fef3c7' : '#efefef', color: isPremium ? '#92400e' : '#bbb' }}>
            METHOD+SYSTEM · $149
          </span>
          <p className="text-sm" style={{ color: isPremium ? '#92400e' : '#bbb' }}>
            {isPremium
              ? 'Everything unlocked — all modules + the complete writing system.'
              : 'Everything in Method + the complete writing system.'}
          </p>
        </div>
      </div>
    </div>
  )
}

// ── Onboarding Tour ───────────────────────────────────────────────────────────
const TOUR_KEY = 'eeAcademy_tourDone'

const TOUR_STEPS = [
  { target: null, emoji: '👋', title: 'Welcome to your EE workspace', body: "Quick tour — 20 seconds. We'll show you what's here." },
  { target: 'tour-guide', emoji: '🗺️', title: 'Your progress map', body: 'Follow this path in order. Free modules first — then unlock the full writing system.', arrow: 'top' },
  { target: 'tour-share', emoji: '🔗', title: 'Share with your supervisor', body: 'Get a link and send it to your teacher — they can read your essay draft and leave you feedback directly.', arrow: 'top' },
  { target: 'tour-nav-modules', emoji: '📚', title: 'Modules', body: '14 lessons from mindset to final draft. Start at 01 and work through in order.', arrow: 'left' },
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
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [step, current.target])

  const next = () => { if (isLast) onDone(); else setStep(s => s + 1) }

  // Tooltip card position
  let cardStyle = {}
  let arrowEl = null

  if (!rect) {
    cardStyle = { position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }
  } else if (current.arrow === 'top') {
    // tooltip below element
    cardStyle = {
      position: 'fixed',
      top: rect.bottom + PAD + 12,
      left: Math.min(rect.left + rect.width / 2, window.innerWidth - 290),
      transform: 'translateX(-50%)',
    }
    arrowEl = (
      <div style={{
        position: 'absolute', top: -8, left: '50%', transform: 'translateX(-50%)',
        width: 0, height: 0,
        borderLeft: '8px solid transparent', borderRight: '8px solid transparent',
        borderBottom: '8px solid #fff',
        filter: 'drop-shadow(0 -1px 0 #e8e8e8)',
      }} />
    )
  } else if (current.arrow === 'left') {
    // tooltip to the right of element
    cardStyle = {
      position: 'fixed',
      top: rect.top + rect.height / 2,
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

  return (
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
        <p style={{ fontWeight: 700, fontSize: 14, color: '#0a0a0a', marginBottom: 6, letterSpacing: '-0.02em' }}>
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
            background: '#0a0a0a', border: 'none', borderRadius: 10,
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
              background: i === step ? '#0a0a0a' : '#e0e0e0',
            }} />
          ))}
        </div>
      </div>
    </div>
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
      const saved = localStorage.getItem('eeAcademy_workspace')
      if (!saved) {
        // No setup done — send to onboarding
        router.push('/onboarding')
        return
      }
      try {
        setForm(f => ({ ...f, ...JSON.parse(saved) })) // eslint-disable-line react-hooks/set-state-in-effect
      } catch (e) { console.error('workspace parse error', e) }
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
          if (!workspace.research_question) setEditing(true)
        } else {
          setEditing(true)
        }
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

  // New user who hasn't set up yet — show focused setup screen
  if (editing && !form.research_question && !form.subject) {
    return (
      <div className="min-h-full flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-lg">
          <div className="text-center mb-8">
            <p className="text-[11px] font-bold uppercase tracking-widest mb-3" style={{ color: '#ccc' }}>Step 1 of 1</p>
            <h1 className="text-2xl font-bold mb-2" style={{ color: '#0a0a0a', letterSpacing: '-0.03em' }}>Set up your workspace</h1>
            <p className="text-sm" style={{ color: '#aaa' }}>Takes 30 seconds — helps us personalise everything for your EE.</p>
          </div>
          <div className="rounded-2xl overflow-hidden" style={{ background: '#fff', border: '1px solid #e8e8e8' }}>
            <div className="px-6 py-5 space-y-5">
              {/* Subject */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#aaa' }}>Your Subject</label>
                <div className="grid grid-cols-2 gap-1.5 max-h-52 overflow-y-auto pr-1">
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
                        <span>{t.emoji}</span>
                        <span className="text-xs leading-tight">{s}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
              {/* Research Question */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#aaa' }}>
                  Research Question <span className="font-normal normal-case tracking-normal" style={{ color: '#ccc' }}>optional</span>
                </label>
                <textarea
                  value={form.research_question}
                  onChange={e => setForm(f => ({ ...f, research_question: e.target.value }))}
                  placeholder="To what extent does…"
                  rows={3}
                  className="w-full rounded-xl px-4 py-3 text-sm focus:outline-none resize-none transition-colors"
                  style={{ border: '1px solid #e8e8e8', color: '#0a0a0a', background: '#fafafa' }}
                  onFocus={e => e.target.style.borderColor = '#0a0a0a'}
                  onBlur={e => e.target.style.borderColor = '#e8e8e8'}
                />
              </div>
            </div>
            <div className="px-6 pb-6">
              <button onClick={save}
                className="w-full py-3 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
                style={{ background: '#0a0a0a', color: '#fff' }}>
                {form.subject ? 'Set up my workspace →' : 'Skip for now →'}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full overflow-y-auto">
      {showTour && <DashboardTour onDone={doneTour} />}
      <div className="max-w-2xl mx-auto px-4 sm:px-8 pt-6 sm:pt-8 pb-32 lg:pb-20">

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

        {/* Start Here progression guide — only when not in edit mode */}
        {!editing && <StartHereGuide hasPaid={hasPaid} isPremium={isPremium} />}

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
                      style={{ background: '#f5f5f5', color: '#555', border: '1px solid #f0f0f0' }} />
                    <button onClick={copyShare}
                      className="flex-shrink-0 text-xs font-semibold px-3 py-2 rounded-lg transition-all"
                      style={{ background: shareCopied ? '#f0fdf4' : '#0a0a0a', color: shareCopied ? '#15803d' : '#fff' }}>
                      {shareCopied ? '✓ Copied' : 'Copy'}
                    </button>
                  </div>
                ) : (
                  <button onClick={generateShare} disabled={shareLoading}
                    className="text-xs font-semibold px-4 py-2 rounded-xl transition-all disabled:opacity-50"
                    style={{ background: '#f5f5f5', color: '#555' }}>
                    {shareLoading ? 'Generating…' : 'Get share link →'}
                  </button>
                )}
              </>
            ) : (
              <p className="text-xs" style={{ color: '#aaa' }}>
                <Link href="/sign-up" className="font-semibold" style={{ color: '#0a0a0a' }}>Create a free account</Link> to get a shareable link for your supervisor.
              </p>
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
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#0a0a0a'; e.currentTarget.style.color = '#0a0a0a' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#e8e8e8'; e.currentTarget.style.color = '#888' }}>
                <Edit3 size={11} />
                Edit
              </button>
            </div>

            {/* RQ card */}
            <div className="rounded-2xl px-6 py-5 mb-4"
              style={{ background: '#fff', border: '1px solid #e8e8e8' }}>
              <div className="w-8 h-0.5 rounded mb-4" style={{ background: theme.accent || '#0a0a0a' }} />
              <p className="text-base leading-relaxed font-medium" style={{ color: '#0a0a0a', letterSpacing: '-0.01em' }}>
                {form.research_question}
              </p>
            </div>

            {/* Meta chips */}
            <div className="flex flex-wrap gap-2">
              {form.supervisor_name && (
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs"
                  style={{ background: '#f5f5f5', color: '#555' }}>
                  <User size={11} />
                  {form.supervisor_name}
                </div>
              )}
              {daysUntilDeadline !== null && (
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium"
                  style={{
                    background: daysUntilDeadline <= 30 ? '#fef2f2' : '#f5f5f5',
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
              style={{ background: '#0a0a0a', color: '#fff' }}>
              Add →
            </button>
          </div>
        ) : null}

        {/* Edit form */}
        {editing && (
          <div className="rounded-2xl overflow-hidden mb-8"
            style={{ background: '#fff', border: '1px solid #e8e8e8' }}>
            <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: '1px solid #f0f0f0' }}>
              <p className="text-sm font-semibold" style={{ color: '#0a0a0a', letterSpacing: '-0.01em' }}>
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
                  onFocus={e => e.target.style.borderColor = '#0a0a0a'}
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
                  style={{ border: '1px solid #e8e8e8', color: '#0a0a0a', background: '#fff' }}
                  onFocus={e => e.target.style.borderColor = '#0a0a0a'}
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
                  style={{ border: '1px solid #e8e8e8', color: '#0a0a0a', background: '#fff' }}
                  onFocus={e => e.target.style.borderColor = '#0a0a0a'}
                  onBlur={e => e.target.style.borderColor = '#e8e8e8'}
                />
              </div>

              <button
                onClick={save}
                className="flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-xl transition-all"
                style={{ background: '#0a0a0a', color: '#fff' }}>
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
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#0a0a0a' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#e8e8e8' }}>
              <div className="flex items-center justify-between mb-2">
                <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: '#bbb' }}>My Essay</p>
                {essayText && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: '#f5f5f5', color: '#888' }}>
                    {essayText.trim().split(/\s+/).filter(Boolean).length.toLocaleString()} words
                  </span>
                )}
              </div>
              {essayText ? (
                <>
                  <p className="text-sm leading-relaxed mb-2" style={{ color: '#0a0a0a' }}>
                    {essayText.trim().slice(0, 120)}{essayText.trim().length > 120 ? '…' : ''}
                  </p>
                  <p className="text-xs font-semibold" style={{ color: '#555' }}>Continue writing →</p>
                </>
              ) : (
                <p className="text-sm" style={{ color: '#aaa' }}>No draft yet — Start your essay →</p>
              )}
            </Link>

            {/* Quick links grid */}
            <div className="grid grid-cols-2 gap-2">
              {[
                { href: '/dump', icon: Database, label: 'Citations', desc: 'Generate citations from URLs' },
                { href: '/planner', icon: Calendar, label: 'EE Planner', desc: 'Plan your timeline' },
                { href: '/dashboard/modules', icon: BookOpen, label: 'Modules', desc: 'Guided EE lessons' },
                { href: '/dashboard/templates', icon: FileText, label: 'Templates', desc: 'Essay frameworks' },
              ].map(({ href, icon: Icon, label, desc, isNew }) => (
                <Link key={href} href={href}
                  className="block rounded-xl px-4 py-3 transition-all"
                  style={{ background: '#fff', border: '1px solid #e8e8e8', textDecoration: 'none' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#0a0a0a' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = '#e8e8e8' }}>
                  <div className="flex items-center gap-1.5 mb-1">
                    <Icon size={13} style={{ color: '#555' }} strokeWidth={1.75} />
                    <span className="text-xs font-semibold" style={{ color: '#0a0a0a' }}>{label}</span>
                    {isNew && (
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full" style={{ background: '#0a0a0a', color: '#fff' }}>New</span>
                    )}
                  </div>
                  <p className="text-[11px] leading-snug" style={{ color: '#aaa' }}>{desc}</p>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
