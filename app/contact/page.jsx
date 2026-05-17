'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CheckCircle, Mail, Clock, MessageSquare } from 'lucide-react'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const handle = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const submit = async e => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus('success')
        setForm({ name: '', email: '', subject: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Nav back */}
      <div className="max-w-2xl mx-auto px-6 pt-8">
        <Link href="/" className="text-sm text-gray-400 hover:text-gray-800 transition-colors">
          ← Back to home
        </Link>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-12">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight mb-3" style={{ color: '#0a0a0a', fontFamily: 'Georgia, serif' }}>
            Get in touch
          </h1>
          <p className="text-base leading-relaxed" style={{ color: '#666' }}>
            Got a question about your Extended Essay, a technical issue, or want to talk about the course? Send a message — I read everything.
          </p>
        </div>

        {/* SLA badges */}
        <div className="grid grid-cols-3 gap-3 mb-10">
          {[
            { icon: Clock, label: '24-hour reply', sub: 'guaranteed' },
            { icon: Mail, label: 'hello@theextendedessay.com', sub: 'direct inbox' },
            { icon: MessageSquare, label: 'Real replies', sub: 'not a bot' },
          ].map(({ icon: Icon, label, sub }) => (
            <div key={label} className="rounded-xl px-4 py-3 text-center" style={{ background: '#f9f9f9', border: '1px solid #f0f0f0' }}>
              <Icon size={16} style={{ color: '#0a0a0a', margin: '0 auto 6px' }} />
              <p className="text-xs font-semibold" style={{ color: '#0a0a0a' }}>{label}</p>
              <p className="text-[11px]" style={{ color: '#aaa' }}>{sub}</p>
            </div>
          ))}
        </div>

        {/* Success state */}
        {status === 'success' ? (
          <div className="rounded-2xl px-8 py-10 text-center" style={{ background: '#f0fdf4', border: '1px solid #86efac' }}>
            <CheckCircle size={32} style={{ color: '#16a34a', margin: '0 auto 16px' }} />
            <p className="text-lg font-semibold mb-2" style={{ color: '#15803d' }}>Message sent!</p>
            <p className="text-sm leading-relaxed" style={{ color: '#16a34a' }}>
              You should have a confirmation in your inbox. I'll reply within 24 hours.
            </p>
            <button
              onClick={() => setStatus('idle')}
              className="mt-6 text-sm font-medium underline"
              style={{ color: '#15803d' }}>
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-5">
            {/* Name + email row */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#0a0a0a' }}>
                  Your name
                </label>
                <input
                  name="name" value={form.name} onChange={handle} required
                  placeholder="Alex"
                  className="w-full rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors"
                  style={{ border: '1px solid #e8e8e8', color: '#0a0a0a', background: '#fff' }}
                  onFocus={e => e.target.style.borderColor = '#0a0a0a'}
                  onBlur={e => e.target.style.borderColor = '#e8e8e8'}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#0a0a0a' }}>
                  Email
                </label>
                <input
                  name="email" value={form.email} onChange={handle} required type="email"
                  placeholder="alex@school.com"
                  className="w-full rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors"
                  style={{ border: '1px solid #e8e8e8', color: '#0a0a0a', background: '#fff' }}
                  onFocus={e => e.target.style.borderColor = '#0a0a0a'}
                  onBlur={e => e.target.style.borderColor = '#e8e8e8'}
                />
              </div>
            </div>

            {/* Subject */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#0a0a0a' }}>
                Subject <span className="font-normal normal-case tracking-normal" style={{ color: '#ccc' }}>optional</span>
              </label>
              <input
                name="subject" value={form.subject} onChange={handle}
                placeholder="Question about my research question"
                className="w-full rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors"
                style={{ border: '1px solid #e8e8e8', color: '#0a0a0a', background: '#fff' }}
                onFocus={e => e.target.style.borderColor = '#0a0a0a'}
                onBlur={e => e.target.style.borderColor = '#e8e8e8'}
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#0a0a0a' }}>
                Message
              </label>
              <textarea
                name="message" value={form.message} onChange={handle} required
                placeholder="Tell me what you're working on and what you need help with…"
                rows={6}
                className="w-full rounded-xl px-4 py-3 text-sm focus:outline-none resize-none transition-colors"
                style={{ border: '1px solid #e8e8e8', color: '#0a0a0a', background: '#fff' }}
                onFocus={e => e.target.style.borderColor = '#0a0a0a'}
                onBlur={e => e.target.style.borderColor = '#e8e8e8'}
              />
            </div>

            {status === 'error' && (
              <p className="text-sm" style={{ color: '#dc2626' }}>
                Something went wrong. You can also email directly: <a href="mailto:hello@theextendedessay.com" style={{ fontWeight: 600 }}>hello@theextendedessay.com</a>
              </p>
            )}

            <button
              type="submit"
              disabled={status === 'sending'}
              className="flex items-center gap-2 text-sm font-semibold px-6 py-3 rounded-xl transition-all disabled:opacity-50"
              style={{ background: '#0a0a0a', color: '#fff' }}>
              {status === 'sending' ? (
                <>
                  <div className="w-4 h-4 rounded-full border-2 border-white/20 border-t-white animate-spin" />
                  Sending…
                </>
              ) : (
                'Send message →'
              )}
            </button>
          </form>
        )}

        {/* Direct email fallback */}
        <div className="mt-10 pt-8" style={{ borderTop: '1px solid #f0f0f0' }}>
          <p className="text-sm" style={{ color: '#aaa' }}>
            Prefer email? Reach me directly at{' '}
            <a href="mailto:hello@theextendedessay.com"
              className="font-medium"
              style={{ color: '#0a0a0a' }}>
              hello@theextendedessay.com
            </a>
            {' '}— I reply within 24 hours.
          </p>
        </div>
      </div>
    </div>
  )
}
