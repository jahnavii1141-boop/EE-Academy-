'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@clerk/nextjs'
import Link from 'next/link'
import { Copy, Trash2, Check, ExternalLink, Link2 } from 'lucide-react'

export default function DashboardShare() {
  const { isSignedIn } = useAuth()
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true)
  const [generating, setGenerating] = useState(false)
  const [copied, setCopied] = useState(false)

  const shareUrl = token
    ? `${typeof window !== 'undefined' ? window.location.origin : 'https://theextendedessay.com'}/share/${token}`
    : null

  useEffect(() => {
    if (!isSignedIn) {
      setLoading(false) // eslint-disable-line react-hooks/set-state-in-effect
      return
    }
    fetch('/api/share')
      .then(r => r.json())
      .then(({ token }) => setToken(token))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [isSignedIn])

  const generate = async () => {
    setGenerating(true)
    const res = await fetch('/api/share', { method: 'POST' })
    const { token } = await res.json()
    setToken(token)
    setGenerating(false)
  }

  const revoke = async () => {
    await fetch('/api/share', { method: 'DELETE' })
    setToken(null)
  }

  const copy = () => {
    if (!shareUrl) return
    navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center" style={{ background: '#fafafa' }}>
        <div className="w-5 h-5 rounded-full border-2"
          style={{ borderColor: '#e8e8e8', borderTopColor: '#0a0a0a', animation: 'spin 0.8s linear infinite' }} />
      </div>
    )
  }

  return (
    <div className="h-full overflow-y-auto" style={{ background: '#fafafa' }}>
      <div style={{ maxWidth: 560, margin: '0 auto', padding: '48px 32px 80px' }}>

        {/* Header */}
        <p className="text-[10px] font-semibold uppercase tracking-widest mb-2" style={{ color: '#bbb' }}>Share</p>
        <h1 className="text-xl font-semibold mb-1" style={{ color: '#0a0a0a', letterSpacing: '-0.02em' }}>
          Share with Supervisor
        </h1>
        <p className="text-sm mb-8" style={{ color: '#888', lineHeight: 1.6 }}>
          Generate a view-only link. Your supervisor sees your RQ, Planner, and EE notes — no account needed. Revoke any time.
        </p>

        {!token ? (
          /* No link yet */
          <div className="rounded-2xl p-8 text-center"
            style={{ background: '#fff', border: '1px solid #f0f0f0' }}>
            <div className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ background: '#f5f5f5' }}>
              <Link2 size={18} style={{ color: '#aaa' }} />
            </div>
            <p className="text-sm font-medium mb-1" style={{ color: '#0a0a0a' }}>No link generated yet</p>
            <p className="text-xs mb-6" style={{ color: '#aaa', maxWidth: 220, margin: '4px auto 24px' }}>
              Create a private, view-only link for your supervisor.
            </p>
            <button
              onClick={generate}
              disabled={generating}
              className="text-sm font-medium px-6 py-2.5 rounded-xl transition-all"
              style={{
                background: generating ? '#f0f0f0' : '#0a0a0a',
                color: generating ? '#bbb' : '#fff',
                cursor: generating ? 'not-allowed' : 'pointer',
              }}
            >
              {generating ? 'Generating…' : 'Generate share link'}
            </button>
          </div>
        ) : (
          /* Link is active */
          <div className="flex flex-col gap-3">

            {/* Active link card */}
            <div className="rounded-2xl p-5" style={{ background: '#fff', border: '1px solid #f0f0f0' }}>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#22c55e' }} />
                <p className="text-xs font-semibold" style={{ color: '#0a0a0a' }}>Share link is active</p>
              </div>
              <div className="flex items-center gap-2">
                <code className="flex-1 text-xs px-3 py-2 rounded-lg overflow-hidden text-ellipsis whitespace-nowrap"
                  style={{ background: '#f5f5f5', color: '#555', border: '1px solid #eee' }}>
                  {shareUrl}
                </code>
                <button
                  onClick={copy}
                  className="flex-shrink-0 flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-lg transition-all"
                  style={{
                    background: copied ? '#0a0a0a' : '#f5f5f5',
                    color: copied ? '#fff' : '#555',
                  }}
                >
                  {copied ? <Check size={12} /> : <Copy size={12} />}
                  {copied ? 'Copied' : 'Copy'}
                </button>
              </div>
            </div>

            {/* What they see */}
            <div className="rounded-xl p-5" style={{ background: '#fff', border: '1px solid #f0f0f0' }}>
              <p className="text-[10px] font-semibold uppercase tracking-widest mb-3" style={{ color: '#bbb' }}>
                What your supervisor sees
              </p>
              <div className="flex flex-col gap-1.5">
                {[
                  { can: true,  text: 'Your research question, subject, and deadline' },
                  { can: true,  text: 'Your EE notes and sources' },
                  { can: true,  text: 'Your Planner — milestones and progress' },
                  { can: false, text: 'They cannot edit anything' },
                  { can: false, text: 'They don\'t need an account' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="mt-0.5 text-xs" style={{ color: item.can ? '#22c55e' : '#aaa' }}>
                      {item.can ? '✓' : '✗'}
                    </span>
                    <p className="text-xs" style={{ color: '#555' }}>{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={revoke}
                className="flex items-center gap-1.5 text-xs font-medium px-4 py-2 rounded-lg transition-all"
                style={{ background: '#fff', color: '#ef4444', border: '1px solid #fecaca' }}
                onMouseEnter={e => e.currentTarget.style.background = '#fef2f2'}
                onMouseLeave={e => e.currentTarget.style.background = '#fff'}
              >
                <Trash2 size={12} /> Revoke link
              </button>
              <Link
                href={shareUrl}
                target="_blank"
                className="flex items-center gap-1.5 text-xs font-medium px-4 py-2 rounded-lg transition-all"
                style={{ background: '#fff', color: '#555', border: '1px solid #f0f0f0' }}
                onMouseEnter={e => e.currentTarget.style.background = '#f5f5f5'}
                onMouseLeave={e => e.currentTarget.style.background = '#fff'}
              >
                <ExternalLink size={12} /> Preview
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
