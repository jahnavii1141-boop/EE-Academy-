'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@clerk/nextjs'
import { ScanLine } from 'lucide-react'

const BAND_COLORS = {
  Excellent: '#16a34a',
  Good: '#2563eb',
  Satisfactory: '#d97706',
  Mediocre: '#ea580c',
  Elementary: '#dc2626',
}

const GRADE_COLORS = {
  A: '#16a34a',
  B: '#2563eb',
  C: '#d97706',
  D: '#ea580c',
  E: '#dc2626',
}

function ProgressBar({ value, max, color }) {
  const pct = Math.min(100, Math.round((value / max) * 100))
  return (
    <div className="w-full rounded-full overflow-hidden" style={{ height: 6, background: '#f0f0f0' }}>
      <div style={{ width: `${pct}%`, background: color, height: '100%', borderRadius: 9999, transition: 'width 0.5s ease' }} />
    </div>
  )
}

export default function DashboardScan() {
  const { isSignedIn } = useAuth()
  const [essayText, setEssayText] = useState('')
  const [subject, setSubject] = useState('')
  const [rq, setRq] = useState('')
  const [scanning, setScanning] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!isSignedIn) return
    fetch('/api/essay')
      .then(r => r.json())
      .then(({ essay_text }) => { if (essay_text) setEssayText(essay_text) })
      .catch(() => {})
    fetch('/api/workspace')
      .then(r => r.json())
      .then(({ workspace }) => {
        if (workspace) {
          setSubject(workspace.subject ?? '')
          setRq(workspace.research_question ?? '')
        }
      })
      .catch(() => {})
  }, [isSignedIn])

  const wordCount = essayText.trim() ? essayText.trim().split(/\s+/).filter(Boolean).length : 0

  const handleScan = async () => {
    setScanning(true)
    setError('')
    setResult(null)
    try {
      const res = await fetch('/api/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ essay_text: essayText, subject, research_question: rq }),
      })
      const data = await res.json()
      if (!res.ok || data.error) {
        setError(data.error || 'Something went wrong. Please try again.')
      } else {
        setResult(data)
      }
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setScanning(false)
    }
  }

  const handleRescan = () => {
    setResult(null)
    setError('')
  }

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-2xl mx-auto px-8 pt-8 pb-20">

        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <ScanLine size={18} style={{ color: '#0a0a0a' }} strokeWidth={2} />
            <h1 className="text-lg font-bold" style={{ color: '#0a0a0a', letterSpacing: '-0.02em' }}>EE Scan</h1>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full" style={{ background: '#0a0a0a', color: '#fff' }}>New</span>
          </div>
          <p className="text-sm" style={{ color: '#888' }}>
            Paste your essay and get instant examiner feedback against all 5 IB criteria.
          </p>
        </div>

        {/* Input area — hide when results shown */}
        {!result && (
          <div className="rounded-2xl overflow-hidden mb-4" style={{ background: '#fff', border: '1px solid #e8e8e8' }}>
            <div className="px-5 py-4" style={{ borderBottom: '1px solid #f0f0f0' }}>
              <p className="text-xs font-semibold" style={{ color: '#0a0a0a' }}>Your essay</p>
              {subject && (
                <p className="text-[11px] mt-0.5" style={{ color: '#aaa' }}>
                  {subject}{rq ? ` — ${rq.slice(0, 60)}${rq.length > 60 ? '…' : ''}` : ''}
                </p>
              )}
            </div>
            <div className="px-5 py-4">
              <textarea
                value={essayText}
                onChange={e => setEssayText(e.target.value)}
                placeholder="Paste your essay here…"
                className="w-full focus:outline-none text-sm resize-none"
                style={{
                  minHeight: 300,
                  color: '#0a0a0a',
                  background: 'transparent',
                  lineHeight: '1.7',
                }}
              />
              <div className="flex items-center justify-between mt-3 pt-3" style={{ borderTop: '1px solid #f5f5f5' }}>
                <span className="text-xs" style={{ color: '#bbb' }}>
                  {wordCount > 0 ? `${wordCount.toLocaleString()} words` : 'No text yet'}
                </span>
                <button
                  onClick={handleScan}
                  disabled={wordCount < 50 || scanning}
                  className="flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-xl transition-all"
                  style={{
                    background: wordCount < 50 || scanning ? '#f0f0f0' : '#0a0a0a',
                    color: wordCount < 50 || scanning ? '#aaa' : '#fff',
                    cursor: wordCount < 50 || scanning ? 'not-allowed' : 'pointer',
                  }}
                >
                  <ScanLine size={14} strokeWidth={2} />
                  {scanning ? 'Scanning…' : 'Scan Essay'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Loading state */}
        {scanning && (
          <div className="rounded-2xl px-6 py-10 flex flex-col items-center gap-3"
            style={{ background: '#fff', border: '1px solid #e8e8e8' }}>
            <div className="flex gap-1">
              {[0, 1, 2].map(i => (
                <div key={i} className="w-2 h-2 rounded-full animate-pulse"
                  style={{ background: '#0a0a0a', animationDelay: `${i * 0.15}s` }} />
              ))}
            </div>
            <p className="text-sm font-medium" style={{ color: '#555' }}>Scanning against IB criteria…</p>
            <p className="text-xs" style={{ color: '#aaa' }}>This takes about 10–20 seconds</p>
          </div>
        )}

        {/* Error state */}
        {error && !scanning && (
          <div className="rounded-xl px-5 py-4 mb-4" style={{ background: '#fef2f2', border: '1px solid #fecaca' }}>
            <p className="text-sm font-semibold mb-0.5" style={{ color: '#dc2626' }}>Scan failed</p>
            <p className="text-xs" style={{ color: '#dc2626' }}>{error}</p>
          </div>
        )}

        {/* Results */}
        {result && !scanning && (
          <>
            {/* Overall grade */}
            <div className="rounded-2xl px-6 py-5 mb-4 flex items-center gap-5"
              style={{ background: '#fff', border: '1px solid #e8e8e8' }}>
              <div className="flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center"
                style={{ background: GRADE_COLORS[result.overall_grade] + '15' }}>
                <span className="text-3xl font-black" style={{ color: GRADE_COLORS[result.overall_grade], letterSpacing: '-0.03em' }}>
                  {result.overall_grade}
                </span>
              </div>
              <div className="flex-1">
                <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: '#bbb' }}>Estimated Score</p>
                <p className="text-2xl font-bold" style={{ color: '#0a0a0a', letterSpacing: '-0.03em' }}>
                  ~{result.overall_marks}<span className="text-base font-normal" style={{ color: '#aaa' }}>/34</span>
                </p>
                {result.examiner_note && (
                  <p className="text-xs mt-2 leading-relaxed" style={{ color: '#666' }}>{result.examiner_note}</p>
                )}
              </div>
            </div>

            {/* Criterion cards */}
            <div className="grid grid-cols-1 gap-3 mb-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
              {result.criteria && Object.entries(result.criteria).map(([key, c]) => {
                const color = BAND_COLORS[c.band] ?? '#555'
                return (
                  <div key={key} className="rounded-xl px-5 py-4"
                    style={{ background: '#fff', border: '1px solid #e8e8e8' }}>
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: '#bbb' }}>Criterion {key}</span>
                        <p className="text-sm font-semibold" style={{ color: '#0a0a0a' }}>{c.name}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-lg font-bold" style={{ color }}>{c.estimated_marks}</span>
                        <span className="text-xs" style={{ color: '#bbb' }}>/{c.max}</span>
                      </div>
                    </div>
                    <ProgressBar value={c.estimated_marks} max={c.max} color={color} />
                    <div className="mt-2 mb-3">
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                        style={{ background: color + '15', color }}>
                        {c.band}
                      </span>
                    </div>
                    {c.strengths?.length > 0 && (
                      <div className="mb-2">
                        {c.strengths.map((s, i) => (
                          <p key={i} className="text-[11px] leading-snug mb-1" style={{ color: '#555' }}>
                            <span style={{ color: '#16a34a' }}>✓ </span>{s}
                          </p>
                        ))}
                      </div>
                    )}
                    {c.improvements?.length > 0 && (
                      <div>
                        {c.improvements.map((imp, i) => (
                          <p key={i} className="text-[11px] leading-snug mb-1" style={{ color: '#555' }}>
                            <span style={{ color: '#ea580c' }}>→ </span>{imp}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            {/* Top priorities */}
            {result.top_priorities?.length > 0 && (
              <div className="rounded-xl px-5 py-4 mb-4"
                style={{ background: '#fafafa', border: '1px solid #e8e8e8' }}>
                <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#0a0a0a' }}>
                  Your top 3 priorities
                </p>
                {result.top_priorities.map((p, i) => (
                  <div key={i} className="flex items-start gap-3 mb-2">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold"
                      style={{ background: '#0a0a0a', color: '#fff' }}>
                      {i + 1}
                    </span>
                    <p className="text-sm leading-snug" style={{ color: '#333' }}>{p}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Re-scan button */}
            <button
              onClick={handleRescan}
              className="flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-xl transition-all"
              style={{ background: '#f5f5f5', color: '#555' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#0a0a0a'; e.currentTarget.style.color = '#fff' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#f5f5f5'; e.currentTarget.style.color = '#555' }}
            >
              <ScanLine size={14} strokeWidth={2} />
              Re-scan
            </button>
          </>
        )}
      </div>
    </div>
  )
}
