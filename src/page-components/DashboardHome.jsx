'use client'

import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '@clerk/nextjs'
import { useSearchParams, useRouter } from 'next/navigation'
import { Save, CheckCircle, Edit3, X, Calendar, User, BookOpen } from 'lucide-react'
import { getTheme } from '@/lib/subjectThemes'

const SUBJECTS = [
  'Biology', 'Business Management', 'Chemistry', 'Computer Science',
  'Economics', 'English A', 'Environmental Systems & Societies',
  'Geography', 'Global Politics', 'History', 'Language B',
  'Mathematics', 'Music', 'Philosophy', 'Physics',
  'Psychology', 'Social & Cultural Anthropology', 'Visual Arts', 'Other',
]

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
    if (!isSignedIn) return
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
          // If no RQ yet, open edit mode automatically
          if (!workspace.research_question) setEditing(true)
        } else {
          setEditing(true)
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [isSignedIn])

  const save = useCallback(async () => {
    await fetch('/api/workspace', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    setSaved(true)
    setEditing(false)
    setTimeout(() => setSaved(false), 2500)
  }, [form])

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

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-2xl mx-auto px-8 pt-8 pb-20">

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

        {/* Tip when set up */}
        {!editing && form.research_question && (
          <div className="rounded-xl px-5 py-4"
            style={{ background: '#fff', border: '1px solid #f0f0f0' }}>
            <p className="text-xs font-semibold mb-1" style={{ color: '#0a0a0a' }}>Everything here powers your workspace</p>
            <p className="text-xs leading-relaxed" style={{ color: '#aaa' }}>
              Your subject, RQ, and deadline are used across Modules, the Planner, and your EE Mentor. Keep them up to date as your essay evolves.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
