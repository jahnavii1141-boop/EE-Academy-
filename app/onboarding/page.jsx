'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useUser, useAuth } from '@clerk/nextjs'

const SUBJECTS = [
  'Biology', 'Business Management', 'Chemistry', 'Computer Science',
  'Economics', 'English A', 'Environmental Systems & Societies',
  'Geography', 'Global Politics', 'History', 'Language B',
  'Mathematics', 'Music', 'Philosophy', 'Physics',
  'Psychology', 'Social & Cultural Anthropology', 'Visual Arts', 'Other',
]

const STEPS = ['welcome', 'subject', 'rq', 'deadline', 'generating', 'done']

function OnboardingPageInner() {
  const { user } = useUser()
  const { isSignedIn } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const firstName = user?.firstName || ''

  // Where to land after onboarding. Honour a ?next= deep link (e.g. when a
  // visitor arrived via a shared /dashboard/* link), but only allow internal
  // dashboard paths to avoid open-redirects. Defaults to the dashboard home.
  const nextParam = searchParams.get('next')
  const dest = nextParam && nextParam.startsWith('/dashboard') ? nextParam : '/dashboard/home'

  const [step, setStep] = useState('welcome')
  const [form, setForm] = useState({
    name: '',
    subject: '',
    research_question: '',
    supervisor_name: '',
    submission_deadline: '',
  })
  const [generatingDots, setGeneratingDots] = useState(0)
  const [paymentError, setPaymentError] = useState(false)
  const [hasPaid, setHasPaid] = useState(false)

  // Restore in-progress onboarding from sessionStorage (survives page reloads / auth redirects)
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem('eeOnboarding')
      if (saved) {
        const { step: s, form: f } = JSON.parse(saved)
        // eslint-disable-next-line react-hooks/set-state-in-effect
        if (s && !['generating', 'done'].includes(s)) { setStep(s); setForm(f) }
      }
    } catch { /* ignore corrupt session data */ }
  }, [])

  // Persist progress whenever step or form changes
  useEffect(() => {
    if (['generating', 'done'].includes(step)) {
      sessionStorage.removeItem('eeOnboarding')
    } else {
      try { sessionStorage.setItem('eeOnboarding', JSON.stringify({ step, form })) } catch { /* storage unavailable */ }
    }
  }, [step, form])

  // Skip onboarding if workspace already set up (unless returning from checkout)
  useEffect(() => {
    if (!isSignedIn) return
    if (searchParams.get('_ptxn')) return // coming from payment — let them see onboarding
    fetch('/api/workspace')
      .then(r => r.json())
      .then(({ workspace }) => {
        setHasPaid(!!workspace?.has_paid)
        if (workspace?.research_question && workspace?.subject) {
          router.replace(dest)
        }
      })
      .catch(() => {})
  }, [isSignedIn, router, searchParams])

  // Skip is for free users only — paid users go through the full setup so
  // their (purchased) workspace is actually personalised.
  const canSkip = !hasPaid
  const skipAll = () => {
    if (form.name.trim()) localStorage.setItem('eeAcademy_name', form.name.trim())
    if (!isSignedIn && !localStorage.getItem('eeAcademy_workspace')) {
      // Mark setup as "seen" so the dashboard doesn't bounce back here
      localStorage.setItem('eeAcademy_workspace', JSON.stringify({}))
    }
    sessionStorage.removeItem('eeOnboarding')
    router.push(dest)
  }

  // Animate dots during generating step
  useEffect(() => {
    if (step !== 'generating') return
    const interval = setInterval(() => setGeneratingDots(d => (d + 1) % 4), 400)
    return () => clearInterval(interval)
  }, [step])

  // Auto-advance from generating → done → redirect
  useEffect(() => {
    if (step !== 'generating') return
    let cancelled = false
    const save = async () => {
      // Personalises "{Name}'s workspace" in the dashboard sidebar (Clerk name wins when present)
      if (form.name.trim()) localStorage.setItem('eeAcademy_name', form.name.trim())
      // Free user (not signed in) — save to localStorage only
      if (!isSignedIn) {
        localStorage.setItem('eeAcademy_workspace', JSON.stringify({
          subject: form.subject,
          research_question: form.research_question,
          supervisor_name: form.supervisor_name,
          submission_deadline: form.submission_deadline || null,
        }))
        return true
      }

      // Signed-in user — verify payment if returning from checkout
      const ptxn = searchParams.get('_ptxn')
      if (ptxn) {
        try {
          const res = await fetch(`/api/verify-payment?txn=${ptxn}`)
          const data = await res.json()
          if (!res.ok || !data.verified) {
            console.error('verify-payment failed:', data)
            setPaymentError(true)
            return false
          }
        } catch (err) {
          console.error('verify-payment error:', err)
          setPaymentError(true)
          return false
        }
      }
      try {
        await fetch('/api/workspace', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            research_question: form.research_question,
            subject: form.subject,
            supervisor_name: form.supervisor_name,
            submission_deadline: form.submission_deadline || null,
          }),
        })
        await fetch('/api/trial', { method: 'POST' }).catch(() => {})
      } catch {
        // workspace save failed — still advance, access is already granted
      }
      return true
    }
    // Minimum 1.5s on the "generating" screen for UX, then move once save resolves
    const minDelay = new Promise(r => setTimeout(r, 1500))
    Promise.all([save(), minDelay]).then(([ok]) => {
      if (ok !== false && !cancelled) setStep('done')
    })
    return () => { cancelled = true }
  }, [step])

  useEffect(() => {
    if (step !== 'done') return
    const timer = setTimeout(() => router.push(dest), 1000)
    return () => clearTimeout(timer)
  }, [step])

  const next = () => {
    const idx = STEPS.indexOf(step)
    setStep(STEPS[idx + 1])
  }

  const canNext = () => {
    if (step === 'welcome') return true
    if (step === 'subject') return !!form.subject
    if (step === 'rq') return form.research_question.trim().length > 0
    if (step === 'deadline') return true // optional
    return false
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6"
      style={{ background: '#F4F3E8' }}>

      {/* Progress bar */}
      {!['generating', 'done'].includes(step) && (
        <div className="fixed top-0 left-0 right-0 h-0.5" style={{ background: '#f0f0f0' }}>
          <div className="h-full transition-all duration-500"
            style={{
              background: '#2E3250',
              width: `${(STEPS.indexOf(step) / (STEPS.length - 2)) * 100}%`,
            }} />
        </div>
      )}

      <div style={{ width: '100%', maxWidth: 480 }}>

        {/* WELCOME */}
        {step === 'welcome' && (
          <div className="text-center">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-8"
              style={{ background: '#2E3250' }}>
              <span style={{ color: '#fff', fontSize: 20 }}>✦</span>
            </div>
            <h1 className="font-semibold mb-3" style={{ fontSize: 28, color: '#2E3250', letterSpacing: '-0.03em' }}>
              {firstName ? `Hey, ${firstName}.` : 'Welcome.'}
            </h1>
            <p className="text-base mb-2 leading-relaxed" style={{ color: '#888' }}>
              Let&apos;s set up your workspace.
            </p>
            <p className="text-sm mb-8 leading-relaxed" style={{ color: '#aaa' }}>
              Takes 30 seconds. Personalises everything — your missions, planner, and essay tools — to your EE.
            </p>
            {!firstName && (
              <input
                type="text"
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                placeholder="What should we call you?"
                autoFocus
                className="w-full rounded-xl px-4 py-3.5 text-sm focus:outline-none mb-4 text-center"
                style={{ background: '#fff', border: '1px solid #e8e8e8', color: '#2E3250' }}
                onFocus={e => e.target.style.borderColor = '#2E3250'}
                onBlur={e => e.target.style.borderColor = '#e8e8e8'}
              />
            )}
            <button onClick={next}
              className="w-full py-3.5 rounded-xl font-semibold text-sm transition-all"
              style={{ background: '#2E3250', color: '#fff', letterSpacing: '-0.01em' }}>
              Let&apos;s go →
            </button>
            {canSkip && (
              <button onClick={skipAll}
                className="w-full py-2 mt-2 text-xs transition-all"
                style={{ color: '#bbb' }}>
                Skip setup for now →
              </button>
            )}
          </div>
        )}

        {/* SUBJECT */}
        {step === 'subject' && (
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-6" style={{ color: '#ccc' }}>Step 1 of 3</p>
            <h2 className="font-semibold mb-2" style={{ fontSize: 24, color: '#2E3250', letterSpacing: '-0.02em' }}>
              What subject is your EE in?
            </h2>
            <p className="text-sm mb-8" style={{ color: '#aaa' }}>
              This helps personalise your module recommendations.
            </p>
            <div className="grid grid-cols-2 gap-2 mb-8">
              {SUBJECTS.map(s => (
                <button key={s} onClick={() => setForm(f => ({ ...f, subject: s }))}
                  className="px-4 py-3 rounded-xl text-sm text-left transition-all"
                  style={{
                    background: form.subject === s ? '#2E3250' : '#fff',
                    color: form.subject === s ? '#fff' : '#555',
                    border: `1px solid ${form.subject === s ? '#2E3250' : '#e8e8e8'}`,
                    fontWeight: form.subject === s ? 500 : 400,
                  }}>
                  {s}
                </button>
              ))}
            </div>
            <button onClick={next} disabled={!canNext()}
              className="w-full py-3.5 rounded-xl font-semibold text-sm transition-all disabled:opacity-30"
              style={{ background: '#2E3250', color: '#fff' }}>
              Continue →
            </button>
          </div>
        )}

        {/* RESEARCH QUESTION */}
        {step === 'rq' && (
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-6" style={{ color: '#ccc' }}>Step 2 of 3</p>
            <h2 className="font-semibold mb-2" style={{ fontSize: 24, color: '#2E3250', letterSpacing: '-0.02em' }}>
              What&apos;s your research question?
            </h2>
            <p className="text-sm mb-6" style={{ color: '#aaa' }}>
              Don&apos;t worry if it&apos;s not finalised — you can change this anytime.
            </p>
            <textarea
              value={form.research_question}
              onChange={e => setForm(f => ({ ...f, research_question: e.target.value }))}
              placeholder="To what extent does…"
              rows={3}
              autoFocus
              className="w-full rounded-xl px-4 py-3.5 text-sm resize-none focus:outline-none mb-4"
              style={{
                background: '#fff',
                border: '1px solid #e8e8e8',
                color: '#2E3250',
                lineHeight: 1.6,
              }}
              onFocus={e => e.target.style.borderColor = '#2E3250'}
              onBlur={e => e.target.style.borderColor = '#e8e8e8'}
            />
            <div className="mb-6">
              <label className="block text-xs font-medium mb-2" style={{ color: '#aaa' }}>
                Supervisor name <span style={{ color: '#ccc' }}>(optional)</span>
              </label>
              <input
                type="text"
                value={form.supervisor_name}
                onChange={e => setForm(f => ({ ...f, supervisor_name: e.target.value }))}
                placeholder="Mr. Smith"
                className="w-full rounded-xl px-4 py-3 text-sm focus:outline-none"
                style={{ background: '#fff', border: '1px solid #e8e8e8', color: '#2E3250' }}
                onFocus={e => e.target.style.borderColor = '#2E3250'}
                onBlur={e => e.target.style.borderColor = '#e8e8e8'}
              />
            </div>
            <button onClick={next} disabled={!canNext()}
              className="w-full py-3.5 rounded-xl font-semibold text-sm transition-all disabled:opacity-30"
              style={{ background: '#2E3250', color: '#fff' }}>
              Continue →
            </button>
            <button onClick={next}
              className="w-full py-2 mt-2 text-xs transition-all"
              style={{ color: '#ccc' }}>
              Skip for now
            </button>
          </div>
        )}

        {/* DEADLINE */}
        {step === 'deadline' && (
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-6" style={{ color: '#ccc' }}>Step 3 of 3</p>
            <h2 className="font-semibold mb-2" style={{ fontSize: 24, color: '#2E3250', letterSpacing: '-0.02em' }}>
              When&apos;s your submission deadline?
            </h2>
            <p className="text-sm mb-8" style={{ color: '#aaa' }}>
              We&apos;ll use this to power your Planner and show your countdown.
            </p>
            <input
              type="date"
              value={form.submission_deadline}
              onChange={e => setForm(f => ({ ...f, submission_deadline: e.target.value }))}
              autoFocus
              className="w-full rounded-xl px-4 py-3.5 text-sm focus:outline-none mb-4"
              style={{ background: '#fff', border: '1px solid #e8e8e8', color: '#2E3250' }}
              onFocus={e => e.target.style.borderColor = '#2E3250'}
              onBlur={e => e.target.style.borderColor = '#e8e8e8'}
            />
            <button onClick={next}
              className="w-full py-3.5 rounded-xl font-semibold text-sm transition-all mb-2"
              style={{ background: '#2E3250', color: '#fff' }}>
              Generate my workspace →
            </button>
            <button onClick={next}
              className="w-full py-2 text-xs transition-all"
              style={{ color: '#ccc' }}>
              Skip for now
            </button>
          </div>
        )}

        {/* GENERATING */}
        {step === 'generating' && paymentError && (
          <div className="text-center">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-8"
              style={{ background: '#fef2f2', border: '1px solid #fecaca' }}>
              <span className="text-2xl">⚠️</span>
            </div>
            <h2 className="font-semibold mb-3" style={{ fontSize: 22, color: '#2E3250', letterSpacing: '-0.02em' }}>
              Payment received — access setup failed
            </h2>
            <p className="text-sm mb-6 leading-relaxed" style={{ color: '#888' }}>
              Your payment went through but we couldn&apos;t activate your account automatically.
              Email us and we&apos;ll fix it within the hour.
            </p>
            <a href="mailto:hello@theextendedessay.com?subject=Payment received but no access"
              className="inline-block px-6 py-3 rounded-xl text-sm font-semibold"
              style={{ background: '#2E3250', color: '#fff', textDecoration: 'none' }}>
              Contact us →
            </a>
          </div>
        )}

        {step === 'generating' && !paymentError && (
          <div className="text-center">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-8"
              style={{ background: '#2E3250' }}>
              <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent"
                style={{ animation: 'spin 0.7s linear infinite' }} />
            </div>
            <h2 className="font-semibold mb-3" style={{ fontSize: 24, color: '#2E3250', letterSpacing: '-0.02em' }}>
              Generating your workspace{'.'.repeat(generatingDots)}
            </h2>
            <p className="text-sm" style={{ color: '#aaa' }}>
              Setting up your modules, planner, and essay tools.
            </p>
          </div>
        )}

        {/* DONE */}
        {step === 'done' && (
          <div className="text-center">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-8"
              style={{ background: '#2E3250' }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="white">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <h2 className="font-semibold mb-2" style={{ fontSize: 24, color: '#2E3250', letterSpacing: '-0.02em' }}>
              You&apos;re all set.
            </h2>
            <p className="text-sm" style={{ color: '#aaa' }}>Taking you to your workspace…</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default function OnboardingPage() {
  return (
    <Suspense>
      <OnboardingPageInner />
    </Suspense>
  )
}
