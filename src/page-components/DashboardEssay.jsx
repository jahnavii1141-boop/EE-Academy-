'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useAuth } from '@clerk/nextjs'
import Link from 'next/link'

const WORD_LIMIT = 4000

function wordCount(text) {
  return text.trim() === '' ? 0 : text.trim().split(/\s+/).length
}

// ── Toolbar button ──────────────────────────────────────────────────────────
function ToolBtn({ title, active, onClick, children }) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className="flex items-center justify-center rounded transition-all"
      style={{
        width: 28, height: 28,
        background: active ? '#0a0a0a' : 'transparent',
        color: active ? '#fff' : '#555',
        border: 'none',
        cursor: 'pointer',
        fontSize: 13,
        fontWeight: 600,
      }}
      onMouseEnter={e => { if (!active) { e.currentTarget.style.background = '#f0f0f0'; e.currentTarget.style.color = '#0a0a0a' } }}
      onMouseLeave={e => { if (!active) { e.currentTarget.style.background = active ? '#0a0a0a' : 'transparent'; e.currentTarget.style.color = active ? '#fff' : '#555' } }}
    >
      {children}
    </button>
  )
}

function Divider() {
  return <div style={{ width: 1, height: 18, background: '#e8e8e8', margin: '0 4px' }} />
}

// ── Insert text around selection ───────────────────────────────────────────
function wrapSelection(textarea, before, after = '') {
  const start = textarea.selectionStart
  const end = textarea.selectionEnd
  const sel = textarea.value.slice(start, end)
  const newVal = textarea.value.slice(0, start) + before + sel + after + textarea.value.slice(end)
  // Use native input setter so React picks up the change
  const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, 'value').set
  nativeInputValueSetter.call(textarea, newVal)
  textarea.dispatchEvent(new Event('input', { bubbles: true }))
  // Restore cursor
  setTimeout(() => {
    textarea.focus()
    textarea.selectionStart = start + before.length
    textarea.selectionEnd = start + before.length + sel.length
  }, 0)
}

function insertAtLineStart(textarea, prefix) {
  const start = textarea.selectionStart
  const lineStart = textarea.value.lastIndexOf('\n', start - 1) + 1
  const lineEnd = textarea.value.indexOf('\n', start)
  const end = lineEnd === -1 ? textarea.value.length : lineEnd
  const line = textarea.value.slice(lineStart, end)

  // Toggle: if already prefixed, remove; otherwise add
  let newLine, newCursor
  if (line.startsWith(prefix)) {
    newLine = line.slice(prefix.length)
    newCursor = start - prefix.length
  } else {
    newLine = prefix + line
    newCursor = start + prefix.length
  }

  const newVal = textarea.value.slice(0, lineStart) + newLine + textarea.value.slice(end)
  const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, 'value').set
  nativeInputValueSetter.call(textarea, newVal)
  textarea.dispatchEvent(new Event('input', { bubbles: true }))
  setTimeout(() => {
    textarea.focus()
    textarea.selectionStart = textarea.selectionEnd = Math.max(lineStart, newCursor)
  }, 0)
}

// ── Main component ─────────────────────────────────────────────────────────
export default function DashboardEssay() {
  const { isSignedIn } = useAuth()
  const [text, setText] = useState('')
  const [savedText, setSavedText] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [lastSaved, setLastSaved] = useState(null)
  const [focused, setFocused] = useState(false)
  const [fontFamily, setFontFamily] = useState('serif') // 'serif' | 'sans'
  const [fontSize, setFontSize] = useState(16)
  const autoSaveTimer = useRef(null)
  const textareaRef = useRef(null)

  useEffect(() => {
    if (!isSignedIn) { setLoading(false); return }
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

  const ta = () => textareaRef.current

  const words = wordCount(text)
  const isDirty = text !== savedText
  const pct = Math.min(100, Math.round((words / WORD_LIMIT) * 100))
  const overLimit = words > WORD_LIMIT

  // IB word count zones
  let barColor = '#22c55e'   // green  < 3000
  if (words >= 3000) barColor = '#f59e0b'  // amber 3000-3800
  if (words >= 3800) barColor = '#0a0a0a'  // black 3800-4000 (ideal)
  if (overLimit)     barColor = '#ef4444'  // red   > 4000

  const fontStyle = {
    serif: { fontFamily: 'Georgia, "Times New Roman", serif', letterSpacing: '-0.005em' },
    sans:  { fontFamily: '"Inter", "Helvetica Neue", sans-serif', letterSpacing: '-0.01em' },
  }[fontFamily]

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center" style={{ background: '#fafafa' }}>
        <div className="w-5 h-5 rounded-full border-2"
          style={{ borderColor: '#e8e8e8', borderTopColor: '#0a0a0a', animation: 'spin 0.8s linear infinite' }} />
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col" style={{ background: '#fff' }}>

      {/* ── Top bar ─────────────────────────────────────────────────────── */}
      <div className="flex-shrink-0 flex items-center justify-between px-6 py-2"
        style={{ borderBottom: '1px solid #f0f0f0' }}>
        <div className="flex items-center gap-3">
          <p className="text-xs font-semibold" style={{ color: '#999', letterSpacing: '0.04em', textTransform: 'uppercase', fontSize: 10 }}>My Essay</p>
          <div style={{ width: 1, height: 14, background: '#e8e8e8' }} />
          {saving ? (
            <span className="text-[11px]" style={{ color: '#ccc' }}>Saving…</span>
          ) : isDirty ? (
            <span className="text-[11px]" style={{ color: '#f59e0b' }}>Unsaved</span>
          ) : lastSaved ? (
            <span className="text-[11px]" style={{ color: '#bbb' }}>
              Saved {lastSaved.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
            </span>
          ) : null}
        </div>
        <Link href="/dashboard/share"
          className="text-[11px] font-medium transition-colors"
          style={{ color: '#ccc' }}
          onMouseEnter={e => e.currentTarget.style.color = '#0a0a0a'}
          onMouseLeave={e => e.currentTarget.style.color = '#ccc'}>
          Share with supervisor →
        </Link>
      </div>

      {/* ── Formatting toolbar ──────────────────────────────────────────── */}
      <div className="flex-shrink-0 flex items-center gap-1 px-6 py-1.5"
        style={{ borderBottom: '1px solid #f0f0f0', background: '#fafafa' }}>

        {/* Bold / Italic / Underline (markdown-style wrapping) */}
        <ToolBtn title="Bold (Ctrl+B)" onClick={() => wrapSelection(ta(), '**', '**')}><b>B</b></ToolBtn>
        <ToolBtn title="Italic (Ctrl+I)" onClick={() => wrapSelection(ta(), '_', '_')}><i>I</i></ToolBtn>
        <ToolBtn title="Underline" onClick={() => wrapSelection(ta(), '<u>', '</u>')}><u style={{ textDecorationThickness: 2 }}>U</u></ToolBtn>

        <Divider />

        {/* Headings */}
        <ToolBtn title="Heading 1" onClick={() => insertAtLineStart(ta(), '# ')}>H1</ToolBtn>
        <ToolBtn title="Heading 2" onClick={() => insertAtLineStart(ta(), '## ')}>H2</ToolBtn>
        <ToolBtn title="Heading 3" onClick={() => insertAtLineStart(ta(), '### ')}>H3</ToolBtn>

        <Divider />

        {/* Lists */}
        <ToolBtn title="Bullet list" onClick={() => insertAtLineStart(ta(), '• ')}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.75">
            <circle cx="2" cy="4" r="1" fill="currentColor" stroke="none"/>
            <line x1="5" y1="4" x2="13" y2="4"/>
            <circle cx="2" cy="8" r="1" fill="currentColor" stroke="none"/>
            <line x1="5" y1="8" x2="13" y2="8"/>
            <circle cx="2" cy="12" r="1" fill="currentColor" stroke="none"/>
            <line x1="5" y1="12" x2="13" y2="12"/>
          </svg>
        </ToolBtn>
        <ToolBtn title="Numbered list" onClick={() => insertAtLineStart(ta(), '1. ')}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.75">
            <text x="0" y="6" fontSize="6" fill="currentColor" stroke="none" fontFamily="sans-serif">1.</text>
            <line x1="5" y1="4" x2="13" y2="4"/>
            <text x="0" y="10.5" fontSize="6" fill="currentColor" stroke="none" fontFamily="sans-serif">2.</text>
            <line x1="5" y1="8" x2="13" y2="8"/>
            <text x="0" y="15" fontSize="6" fill="currentColor" stroke="none" fontFamily="sans-serif">3.</text>
            <line x1="5" y1="12" x2="13" y2="12"/>
          </svg>
        </ToolBtn>

        <Divider />

        {/* Quote */}
        <ToolBtn title="Block quote" onClick={() => insertAtLineStart(ta(), '> ')}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" stroke="none">
            <path d="M1 3h2v3H1zm4 0h2v3H5zM1 4.5c0 2.5 1.5 4 3 4v-1c-1 0-2-1-2-3H1zm4 0c0 2.5 1.5 4 3 4v-1c-1 0-2-1-2-3H5z"/>
          </svg>
        </ToolBtn>

        {/* Divider line */}
        <ToolBtn title="Horizontal rule" onClick={() => {
          const t = ta(); const pos = t.selectionStart
          const ins = '\n---\n'
          wrapSelection(t, ins, '')
        }}>—</ToolBtn>

        <Divider />

        {/* Font family toggle */}
        <button
          type="button"
          title="Toggle font"
          onClick={() => setFontFamily(f => f === 'serif' ? 'sans' : 'serif')}
          className="rounded transition-all text-[11px] font-medium px-2"
          style={{
            height: 28, background: 'transparent', border: '1px solid #e8e8e8',
            color: '#555', cursor: 'pointer',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = '#0a0a0a'; e.currentTarget.style.color = '#0a0a0a' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = '#e8e8e8'; e.currentTarget.style.color = '#555' }}
        >
          {fontFamily === 'serif' ? 'Serif' : 'Sans'}
        </button>

        {/* Font size */}
        <select
          value={fontSize}
          onChange={e => setFontSize(Number(e.target.value))}
          className="rounded text-[11px]"
          style={{
            height: 28, border: '1px solid #e8e8e8', background: 'transparent',
            color: '#555', cursor: 'pointer', paddingLeft: 6, paddingRight: 4,
          }}
        >
          {[13, 14, 15, 16, 17, 18].map(s => (
            <option key={s} value={s}>{s}px</option>
          ))}
        </select>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Word count with IB zone label */}
        <div className="flex items-center gap-2">
          <div style={{ textAlign: 'right' }}>
            <span className="text-[11px] tabular-nums font-medium"
              style={{ color: overLimit ? '#ef4444' : '#555' }}>
              {words.toLocaleString()}
            </span>
            <span className="text-[11px]" style={{ color: '#bbb' }}> / {WORD_LIMIT.toLocaleString()} words</span>
          </div>
          <div className="h-1.5 rounded-full overflow-hidden" style={{ width: 64, background: '#f0f0f0' }}>
            <div className="h-full rounded-full transition-all duration-300"
              style={{ width: `${pct}%`, background: barColor }} />
          </div>
        </div>
      </div>

      {/* ── Writing area ────────────────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto">
        <div style={{ maxWidth: 700, width: '100%', margin: '0 auto', padding: '48px 40px 100px' }}>
          <textarea
            ref={textareaRef}
            value={text}
            onChange={handleChange}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder={focused ? '' :
              'Start typing your Extended Essay here…\n\nAutosaves every 1.5 seconds.\nShare with your supervisor via the link above.\n\nIB Extended Essays are 3,500–4,000 words.'}
            className="w-full resize-none focus:outline-none"
            style={{
              background: 'transparent',
              border: 'none',
              color: '#0a0a0a',
              fontSize,
              lineHeight: 1.9,
              ...fontStyle,
              minHeight: 'calc(100vh - 220px)',
            }}
            spellCheck
          />
        </div>
      </div>

      {/* ── Over-limit warning ──────────────────────────────────────────── */}
      {overLimit && (
        <div className="flex-shrink-0 px-8 pb-2 flex justify-end"
          style={{ borderTop: '1px solid #f5f5f5' }}>
          <p className="text-[11px] font-medium" style={{ color: '#ef4444' }}>
            {(words - WORD_LIMIT).toLocaleString()} words over the IB limit
          </p>
        </div>
      )}
    </div>
  )
}
