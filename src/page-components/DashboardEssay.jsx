'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useAuth } from '@clerk/nextjs'
import { Save, CheckCircle, Clock, Share2 } from 'lucide-react'
import Link from 'next/link'

const WORD_LIMIT = 4000

function wordCount(text) {
  return text.trim() === '' ? 0 : text.trim().split(/\s+/).length
}

export default function DashboardEssay() {
  const { isSignedIn } = useAuth()
  const [text, setText] = useState('')
  const [savedText, setSavedText] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [lastSaved, setLastSaved] = useState(null)
  const autoSaveTimer = useRef(null)

  useEffect(() => {
    if (!isSignedIn) return
    fetch('/api/essay')
      .then(r => r.json())
      .then(({ essay_text, essay_updated_at }) => {
        setText(essay_text ?? '')
        setSavedText(essay_text ?? '')
        if (essay_updated_at) setLastSaved(new Date(essay_updated_at))
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [isSignedIn])

  const save = useCallback(async (content) => {
    setSaving(true)
    await fetch('/api/essay', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ essay_text: content }),
    }).catch(() => {})
    setSavedText(content)
    setLastSaved(new Date())
    setSaving(false)
  }, [])

  const handleChange = (e) => {
    const val = e.target.value
    setText(val)
    if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current)
    autoSaveTimer.current = setTimeout(() => save(val), 2000)
  }

  const words = wordCount(text)
  const isDirty = text !== savedText
  const pct = Math.min(100, Math.round((words / WORD_LIMIT) * 100))

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="w-6 h-6 rounded-full border-2 border-navy/20 border-t-navy/60 animate-spin" />
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col">

      {/* Top bar */}
      <div className="flex-shrink-0 flex items-center justify-between px-8 pt-6 pb-4 border-b border-navy/8">
        <div>
          <p className="text-[10px] font-bold text-ink-muted uppercase tracking-widest mb-0.5">My Essay</p>
          <h1 className="font-serif text-xl font-bold text-navy">Essay Draft</h1>
        </div>
        <div className="flex items-center gap-4">
          {/* Word count */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <div className="w-24 h-1.5 bg-parchment rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${words > WORD_LIMIT ? 'bg-red-400' : 'bg-navy/60'}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
              <span className={`text-xs font-semibold tabular-nums ${words > WORD_LIMIT ? 'text-red-500' : 'text-ink-soft'}`}>
                {words.toLocaleString()} / {WORD_LIMIT.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Save state */}
          <div className="flex items-center gap-1.5 text-xs text-ink-muted">
            {saving ? (
              <><Clock className="w-3.5 h-3.5 animate-pulse" strokeWidth={2} /> Saving…</>
            ) : isDirty ? (
              <span className="text-amber-600 font-medium">Unsaved changes</span>
            ) : lastSaved ? (
              <><CheckCircle className="w-3.5 h-3.5 text-green-500" strokeWidth={2} /> Saved {lastSaved.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}</>
            ) : null}
          </div>

          <button
            onClick={() => save(text)}
            disabled={saving || !isDirty}
            className="flex items-center gap-1.5 text-xs font-bold bg-navy text-cream px-4 py-2 rounded-xl hover:bg-navy-light transition-colors disabled:opacity-40"
          >
            <Save className="w-3.5 h-3.5" strokeWidth={2} />
            Save
          </button>

          <Link
            href="/dashboard/share"
            className="flex items-center gap-1.5 text-xs font-semibold text-ink-soft border border-navy/15 hover:border-navy hover:text-navy px-4 py-2 rounded-xl transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" strokeWidth={1.8} />
            Share
          </Link>
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 overflow-hidden px-8 py-6">
        <textarea
          value={text}
          onChange={handleChange}
          placeholder={`Start writing your Extended Essay here...\n\nThis is your space — write freely. It autosaves every 2 seconds. Your supervisor can see this through your share link.\n\nIB Extended Essays are typically 3,500–4,000 words.`}
          className="w-full h-full resize-none bg-white border border-navy/10 rounded-2xl px-8 py-6 text-sm text-navy leading-7 placeholder:text-ink-muted/50 focus:outline-none focus:border-navy/30 shadow-sm font-sans"
          spellCheck
        />
      </div>

      {/* Bottom hint */}
      <div className="flex-shrink-0 px-8 pb-4 flex items-center justify-between">
        <p className="text-[11px] text-ink-muted">Autosaves every 2 seconds. Visible to your supervisor via the Share link.</p>
        {words > WORD_LIMIT && (
          <p className="text-[11px] text-red-500 font-semibold">{words - WORD_LIMIT} words over limit</p>
        )}
      </div>
    </div>
  )
}
