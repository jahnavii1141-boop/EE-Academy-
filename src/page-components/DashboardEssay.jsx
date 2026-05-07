'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useAuth } from '@clerk/nextjs'
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
  const [focused, setFocused] = useState(false)
  const autoSaveTimer = useRef(null)

  useEffect(() => {
    if (!isSignedIn) {
      setLoading(false) // eslint-disable-line react-hooks/set-state-in-effect
      return
    }
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
    autoSaveTimer.current = setTimeout(() => save(val), 1500)
  }

  const words = wordCount(text)
  const isDirty = text !== savedText
  const pct = Math.min(100, Math.round((words / WORD_LIMIT) * 100))
  const overLimit = words > WORD_LIMIT

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center" style={{ background: '#fafafa' }}>
        <div className="w-5 h-5 rounded-full border-2 border-t-transparent"
          style={{ borderColor: '#e8e8e8', borderTopColor: '#0a0a0a', animation: 'spin 0.8s linear infinite' }} />
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col" style={{ background: '#fff' }}>

      {/* Minimal top bar */}
      <div className="flex-shrink-0 flex items-center justify-between px-8 py-3"
        style={{ borderBottom: '1px solid #f5f5f5' }}>
        <div className="flex items-center gap-4">
          <p className="text-xs font-medium" style={{ color: '#aaa' }}>My Essay</p>
          <div className="flex items-center gap-1.5">
            {saving ? (
              <span className="text-[11px]" style={{ color: '#ccc' }}>Saving…</span>
            ) : isDirty ? (
              <span className="text-[11px]" style={{ color: '#f59e0b' }}>Unsaved</span>
            ) : lastSaved ? (
              <span className="text-[11px]" style={{ color: '#aaa' }}>
                Saved {lastSaved.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
              </span>
            ) : null}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="h-1 rounded-full overflow-hidden" style={{ width: 60, background: '#f0f0f0' }}>
              <div className="h-full rounded-full transition-all"
                style={{ width: `${pct}%`, background: overLimit ? '#ef4444' : '#0a0a0a' }} />
            </div>
            <span className="text-[11px] tabular-nums" style={{ color: overLimit ? '#ef4444' : '#aaa' }}>
              {words.toLocaleString()} / {WORD_LIMIT.toLocaleString()}
            </span>
          </div>
          <Link href="/dashboard/share"
            className="text-[11px] font-medium"
            style={{ color: '#ccc' }}
            onMouseEnter={e => e.currentTarget.style.color = '#0a0a0a'}
            onMouseLeave={e => e.currentTarget.style.color = '#ccc'}>
            Share →
          </Link>
        </div>
      </div>

      {/* Writing area — full Notion-style */}
      <div className="flex-1 overflow-y-auto">
        <div style={{ maxWidth: 680, width: '100%', margin: '0 auto', padding: '52px 40px 80px' }}>
          <textarea
            value={text}
            onChange={handleChange}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder={
              focused
                ? ''
                : 'Start typing your Extended Essay here…\n\nThis is your space — write freely.\nAutosaves every 1.5 seconds.\nShare with your supervisor via the link above.\n\nIB Extended Essays are typically 3,500–4,000 words.'
            }
            className="w-full resize-none focus:outline-none"
            style={{
              background: 'transparent',
              border: 'none',
              color: '#0a0a0a',
              fontSize: 16,
              lineHeight: 1.85,
              fontFamily: 'Georgia, "Times New Roman", serif',
              letterSpacing: '-0.005em',
              minHeight: 'calc(100vh - 200px)',
            }}
            spellCheck
          />
        </div>
      </div>

      {/* Bottom */}
      {overLimit && (
        <div className="flex-shrink-0 px-8 pb-3 flex justify-end"
          style={{ borderTop: '1px solid #f5f5f5' }}>
          <p className="text-[11px] font-medium" style={{ color: '#ef4444' }}>
            {words - WORD_LIMIT} words over the limit
          </p>
        </div>
      )}
    </div>
  )
}
