'use client'

import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '@clerk/nextjs'
import Link from 'next/link'
import { ArrowLeft, Save, CheckCircle } from 'lucide-react'

const SUBJECTS = [
  'Biology', 'Business Management', 'Chemistry', 'Computer Science',
  'Economics', 'English A', 'Environmental Systems & Societies',
  'Geography', 'Global Politics', 'History', 'Language B',
  'Mathematics', 'Music', 'Philosophy', 'Physics',
  'Psychology', 'Social & Cultural Anthropology', 'Visual Arts', 'Other',
]

export default function DashboardHome() {
  const { isSignedIn } = useAuth()
  const [form, setForm] = useState({
    research_question: '',
    subject: '',
    supervisor_name: '',
    submission_deadline: '',
  })
  const [saved, setSaved] = useState(false)
  const [loading, setLoading] = useState(true)

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
    setTimeout(() => setSaved(false), 2500)
  }, [form])

  const daysUntilDeadline = form.submission_deadline
    ? Math.ceil((new Date(form.submission_deadline) - new Date()) / 86400000)
    : null

  if (loading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="w-7 h-7 rounded-full border-[3px] border-navy/15 border-t-navy/50" style={{ animation: 'spin 0.8s linear infinite' }} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream">
      <div className="max-w-2xl mx-auto px-6 pt-10 pb-20">
        <Link href="/dashboard" className="flex items-center gap-1.5 text-xs text-navy/50 hover:text-navy mb-8 transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to EE HQ
        </Link>

        <h1 className="font-serif text-2xl font-bold text-navy mb-1">Home</h1>
        <p className="text-sm text-ink-soft mb-8">Your EE at a glance. Fill this in — everything else in EE HQ uses it.</p>

        {/* Deadline countdown */}
        {daysUntilDeadline !== null && (
          <div className={`rounded-xl px-5 py-4 mb-8 border ${daysUntilDeadline <= 30 ? 'bg-red-50 border-red-200' : 'bg-parchment border-navy/10'}`}>
            <p className={`text-sm font-bold ${daysUntilDeadline <= 30 ? 'text-red-700' : 'text-navy'}`}>
              {daysUntilDeadline > 0
                ? `${daysUntilDeadline} days until submission`
                : daysUntilDeadline === 0
                  ? 'Submission is today'
                  : `${Math.abs(daysUntilDeadline)} days past deadline`}
            </p>
            <p className="text-xs text-navy/50 mt-0.5">{new Date(form.submission_deadline).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
          </div>
        )}

        <div className="space-y-6">
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
              className="w-full rounded-xl border border-navy/15 bg-white px-4 py-3 text-sm text-navy placeholder:text-navy/30 focus:outline-none focus:border-navy/40 resize-none"
            />
          </div>

          {/* Subject */}
          <div>
            <label className="block text-xs font-semibold text-navy uppercase tracking-widest mb-2">
              Subject
            </label>
            <select
              value={form.subject}
              onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
              className="w-full rounded-xl border border-navy/15 bg-white px-4 py-3 text-sm text-navy focus:outline-none focus:border-navy/40"
            >
              <option value="">Select subject…</option>
              {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          {/* Supervisor */}
          <div>
            <label className="block text-xs font-semibold text-navy uppercase tracking-widest mb-2">
              Supervisor Name
            </label>
            <input
              type="text"
              value={form.supervisor_name}
              onChange={e => setForm(f => ({ ...f, supervisor_name: e.target.value }))}
              placeholder="Mr. Smith"
              className="w-full rounded-xl border border-navy/15 bg-white px-4 py-3 text-sm text-navy placeholder:text-navy/30 focus:outline-none focus:border-navy/40"
            />
          </div>

          {/* Deadline */}
          <div>
            <label className="block text-xs font-semibold text-navy uppercase tracking-widest mb-2">
              Submission Deadline
            </label>
            <input
              type="date"
              value={form.submission_deadline}
              onChange={e => setForm(f => ({ ...f, submission_deadline: e.target.value }))}
              className="w-full rounded-xl border border-navy/15 bg-white px-4 py-3 text-sm text-navy focus:outline-none focus:border-navy/40"
            />
          </div>

          <button
            onClick={save}
            className="flex items-center gap-2 bg-navy text-cream text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-navy/90 transition-colors"
          >
            {saved ? <CheckCircle className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            {saved ? 'Saved' : 'Save'}
          </button>
        </div>

        {/* Quick nav to other spaces */}
        <div className="mt-12 rounded-2xl border border-navy/10 bg-parchment/30 p-5">
          <p className="text-xs font-semibold text-navy/50 uppercase tracking-widest mb-3">Your spaces</p>
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: 'EE Dump', href: '/dump' },
              { label: 'Planner', href: '/planner' },
              { label: 'Templates', href: '/dashboard/templates' },
              { label: 'Modules', href: '/dashboard/modules' },
              { label: 'Share', href: '/dashboard/share' },
            ].map(s => (
              <Link key={s.href} href={s.href} className="text-sm font-medium text-navy hover:underline">
                {s.label} →
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
