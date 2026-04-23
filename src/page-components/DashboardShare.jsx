'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@clerk/nextjs'
import Link from 'next/link'
import { ArrowLeft, Copy, RefreshCw, Trash2, CheckCircle, ExternalLink } from 'lucide-react'

export default function DashboardShare() {
  const { isSignedIn } = useAuth()
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true)
  const [generating, setGenerating] = useState(false)
  const [copied, setCopied] = useState(false)

  const shareUrl = token
    ? `${typeof window !== 'undefined' ? window.location.origin : 'https://www.theextendedessay.com'}/share/${token}`
    : null

  useEffect(() => {
    if (!isSignedIn) return
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

        <h1 className="font-serif text-2xl font-bold text-navy mb-1">Share with Supervisor</h1>
        <p className="text-sm text-ink-soft mb-8">
          Generate a view-only link. Your supervisor sees your RQ, Planner, and EE Dump — no account needed. You can revoke it any time.
        </p>

        {!token ? (
          <div className="rounded-2xl border border-navy/10 bg-parchment/30 p-8 text-center">
            <div className="w-12 h-12 rounded-2xl bg-yellow-100 flex items-center justify-center mx-auto mb-4">
              <ExternalLink className="w-6 h-6 text-yellow-600" />
            </div>
            <h2 className="font-serif text-lg font-bold text-navy mb-2">No link generated yet</h2>
            <p className="text-sm text-ink-soft mb-6 max-w-xs mx-auto">
              Click below to create a private, view-only link for your supervisor.
            </p>
            <button
              onClick={generate}
              disabled={generating}
              className="bg-navy text-cream text-sm font-semibold px-6 py-2.5 rounded-xl hover:bg-navy/90 transition-colors disabled:opacity-60"
            >
              {generating ? 'Generating…' : 'Generate share link'}
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="rounded-2xl border border-green-200 bg-green-50 p-5">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <p className="text-sm font-semibold text-green-800">Share link is active</p>
              </div>
              <div className="flex items-center gap-2">
                <code className="flex-1 text-xs bg-white border border-green-200 rounded-lg px-3 py-2 text-navy/70 overflow-hidden text-ellipsis whitespace-nowrap">
                  {shareUrl}
                </code>
                <button
                  onClick={copy}
                  className="flex-shrink-0 flex items-center gap-1.5 text-xs font-semibold bg-green-700 text-white px-3 py-2 rounded-lg hover:bg-green-800 transition-colors"
                >
                  {copied ? <CheckCircle className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied' : 'Copy'}
                </button>
              </div>
            </div>

            <div className="rounded-xl border border-navy/10 bg-white/60 p-5">
              <p className="text-xs font-semibold text-navy uppercase tracking-widest mb-3">What your supervisor sees</p>
              <ul className="space-y-1.5 text-sm text-navy/70">
                <li>✓ Your research question, subject, deadline</li>
                <li>✓ Your EE Dump — all sources and notes</li>
                <li>✓ Your Planner — milestones and progress</li>
                <li>✗ They cannot edit anything</li>
                <li>✗ They don't need an account</li>
              </ul>
            </div>

            <div className="flex gap-3">
              <button
                onClick={revoke}
                className="flex items-center gap-1.5 text-xs font-semibold text-red-600 border border-red-200 bg-red-50 hover:bg-red-100 px-4 py-2 rounded-lg transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" /> Revoke link
              </button>
              <Link
                href={shareUrl}
                target="_blank"
                className="flex items-center gap-1.5 text-xs font-semibold text-navy border border-navy/15 bg-parchment/40 hover:bg-parchment/70 px-4 py-2 rounded-lg transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" /> Preview
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
