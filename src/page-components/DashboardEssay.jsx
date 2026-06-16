'use client'

import { useEffect, useCallback, useRef, useState } from 'react'
import { useAuth } from '@clerk/nextjs'
import Link from 'next/link'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import Placeholder from '@tiptap/extension-placeholder'
import CharacterCount from '@tiptap/extension-character-count'
import { calculateIBWordCount } from '../lib/ibWordCount'

const WORD_LIMIT = 4000

// Badge colours for the official-count threshold states.
const FOOTER_BADGE = {
  ok:          { color: '#334155' },
  approaching: { background: '#FEF3C7', color: '#92400e' },
  exceeded:    { background: '#FEE2E2', color: '#b91c1c' },
}

// ── Toolbar button ─────────────────────────────────────────────────────────
function ToolBtn({ active, title, onClick, children, disabled }) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      disabled={disabled}
      className="flex items-center justify-center rounded transition-all select-none"
      style={{
        width: 28, height: 28, flexShrink: 0,
        background: active ? '#0a0a0a' : 'transparent',
        color: active ? '#fff' : '#555',
        border: 'none', cursor: disabled ? 'default' : 'pointer',
        fontSize: 12, fontWeight: 600,
        opacity: disabled ? 0.3 : 1,
      }}
      onMouseEnter={e => { if (!active && !disabled) { e.currentTarget.style.background = '#f0f0f0'; e.currentTarget.style.color = '#0a0a0a' } }}
      onMouseLeave={e => { if (!active && !disabled) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#555' } }}
    >
      {children}
    </button>
  )
}

function Sep() {
  return <div style={{ width: 1, height: 16, background: '#e8e8e8', flexShrink: 0, margin: '0 2px' }} />
}

// ── Main component ─────────────────────────────────────────────────────────
export default function DashboardEssay() {
  const { isSignedIn } = useAuth()
  const [savedHtml, setSavedHtml] = useState('')
  const [saving, setSaving] = useState(false)
  const [lastSaved, setLastSaved] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isDirty, setIsDirty] = useState(false)
  const [ibCount, setIbCount] = useState(() => calculateIBWordCount(null))
  const autoSaveTimer = useRef(null)

  // ── Save ──────────────────────────────────────────────────────────────
  const save = useCallback(async (html) => {
    setSaving(true)
    await fetch('/api/essay', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ essay_text: html }),
    }).catch(() => {})
    setSavedHtml(html)
    setLastSaved(new Date())
    setSaving(false)
    setIsDirty(false)
  }, [])

  // ── Editor ────────────────────────────────────────────────────────────
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
        bulletList: { keepMarks: true },
        orderedList: { keepMarks: true },
      }),
      Underline,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      CharacterCount.configure({ limit: null }),
      Placeholder.configure({
        placeholder: 'Start typing your Extended Essay here…\n\nThis is your space. Autosaves every 2 seconds.',
        emptyEditorClass: 'is-editor-empty',
      }),
    ],
    content: '',
    editorProps: {
      attributes: {
        class: 'tiptap-essay',
        spellcheck: 'true',
      },
    },
    onUpdate({ editor }) {
      setIsDirty(true)
      setIbCount(calculateIBWordCount(editor.getJSON()))
      const html = editor.getHTML()
      if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current)
      autoSaveTimer.current = setTimeout(() => save(html), 2000)
    },
  })

  // ── Load essay ────────────────────────────────────────────────────────
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!isSignedIn) { setLoading(false); return }
    fetch('/api/essay')
      .then(r => r.json())
      .then(({ essay_text, essay_updated_at }) => {
        if (essay_text && editor) {
          editor.commands.setContent(essay_text)
          setSavedHtml(essay_text)
          setIbCount(calculateIBWordCount(editor.getJSON()))
        }
        if (essay_updated_at) setLastSaved(new Date(essay_updated_at))
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [isSignedIn, editor])

  if (loading || !editor) {
    return (
      <div className="h-full flex items-center justify-center" style={{ background: '#fff' }}>
        <div className="w-5 h-5 rounded-full border-2"
          style={{ borderColor: '#e8e8e8', borderTopColor: '#0a0a0a', animation: 'spin 0.8s linear infinite' }} />
      </div>
    )
  }

  const { coreBodyCount, excludedCount, percentOfLimit, status } = ibCount
  const words = coreBodyCount
  const pct = Math.min(100, percentOfLimit)
  const overLimit = status === 'exceeded'

  let barColor = '#22c55e'
  if (words >= 3000) barColor = '#f59e0b'
  if (words >= 3800) barColor = '#0a0a0a'
  if (overLimit) barColor = '#ef4444'

  const isActive = (type, opts) => editor.isActive(type, opts)

  return (
    <>
      {/* Inject editor styles */}
      <style>{`
        .tiptap-essay {
          outline: none;
          min-height: calc(100vh - 200px);
          font-family: Georgia, "Times New Roman", serif;
          font-size: 16px;
          line-height: 1.9;
          color: #0a0a0a;
          letter-spacing: -0.005em;
        }
        .tiptap-essay p { margin: 0 0 1em; }
        .tiptap-essay h1 { font-family: Georgia, serif; font-size: 1.6em; font-weight: 700; margin: 1.4em 0 0.5em; line-height: 1.2; }
        .tiptap-essay h2 { font-family: Georgia, serif; font-size: 1.25em; font-weight: 700; margin: 1.2em 0 0.4em; line-height: 1.3; }
        .tiptap-essay h3 { font-family: Georgia, serif; font-size: 1.05em; font-weight: 700; margin: 1em 0 0.3em; line-height: 1.4; }
        .tiptap-essay ul { padding-left: 1.4em; margin: 0 0 1em; }
        .tiptap-essay ol { padding-left: 1.4em; margin: 0 0 1em; }
        .tiptap-essay li { margin-bottom: 0.25em; }
        .tiptap-essay blockquote {
          border-left: 3px solid #0a0a0a;
          margin: 1.2em 0;
          padding: 0.4em 0 0.4em 1.2em;
          color: #555;
          font-style: italic;
        }
        .tiptap-essay hr { border: none; border-top: 1px solid #e8e8e8; margin: 2em 0; }
        .tiptap-essay strong { font-weight: 700; }
        .tiptap-essay em { font-style: italic; }
        .tiptap-essay u { text-decoration: underline; }
        .tiptap-essay p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: #bbb;
          pointer-events: none;
          height: 0;
          white-space: pre-line;
        }
        .tiptap-essay .ProseMirror-focused { outline: none; }
      `}</style>

      <div className="h-full flex flex-col" style={{ background: '#fff' }}>

        {/* ── Top bar ─────────────────────────────────────────────── */}
        <div className="flex-shrink-0 flex items-center justify-between px-6 py-2"
          style={{ borderBottom: '1px solid #f0f0f0' }}>
          <div className="flex items-center gap-3">
            <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: '#bbb' }}>My Essay</p>
            <div style={{ width: 1, height: 12, background: '#e8e8e8' }} />
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
            style={{ color: '#bbb' }}
            onMouseEnter={e => e.currentTarget.style.color = '#0a0a0a'}
            onMouseLeave={e => e.currentTarget.style.color = '#bbb'}>
            Share with supervisor →
          </Link>
        </div>

        {/* ── Formatting toolbar ───────────────────────────────────── */}
        <div className="flex-shrink-0 flex flex-wrap items-center gap-0.5 px-4 py-1.5"
          style={{ borderBottom: '1px solid #f0f0f0', background: '#fafafa' }}>

          {/* Text style */}
          <ToolBtn active={isActive('bold')} title="Bold (Ctrl+B)" onClick={() => editor.chain().focus().toggleBold().run()}><b>B</b></ToolBtn>
          <ToolBtn active={isActive('italic')} title="Italic (Ctrl+I)" onClick={() => editor.chain().focus().toggleItalic().run()}><i style={{ fontFamily: 'Georgia, serif' }}>I</i></ToolBtn>
          <ToolBtn active={isActive('underline')} title="Underline (Ctrl+U)" onClick={() => editor.chain().focus().toggleUnderline().run()}><u style={{ textDecorationThickness: 2 }}>U</u></ToolBtn>

          <Sep />

          {/* Headings */}
          <ToolBtn active={isActive('heading', { level: 1 })} title="Heading 1" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>H1</ToolBtn>
          <ToolBtn active={isActive('heading', { level: 2 })} title="Heading 2" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>H2</ToolBtn>
          <ToolBtn active={isActive('heading', { level: 3 })} title="Heading 3" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>H3</ToolBtn>

          <Sep />

          {/* Lists */}
          <ToolBtn active={isActive('bulletList')} title="Bullet list" onClick={() => editor.chain().focus().toggleBulletList().run()}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.75">
              <circle cx="2" cy="4" r="1" fill="currentColor" stroke="none"/><line x1="5" y1="4" x2="13" y2="4"/>
              <circle cx="2" cy="8" r="1" fill="currentColor" stroke="none"/><line x1="5" y1="8" x2="13" y2="8"/>
              <circle cx="2" cy="12" r="1" fill="currentColor" stroke="none"/><line x1="5" y1="12" x2="13" y2="12"/>
            </svg>
          </ToolBtn>
          <ToolBtn active={isActive('orderedList')} title="Numbered list" onClick={() => editor.chain().focus().toggleOrderedList().run()}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <text x="0" y="5.5" fontSize="5.5" fill="currentColor" fontFamily="sans-serif">1.</text>
              <line x1="6" y1="4" x2="13" y2="4" stroke="currentColor" strokeWidth="1.5"/>
              <text x="0" y="9.5" fontSize="5.5" fill="currentColor" fontFamily="sans-serif">2.</text>
              <line x1="6" y1="8" x2="13" y2="8" stroke="currentColor" strokeWidth="1.5"/>
              <text x="0" y="13.5" fontSize="5.5" fill="currentColor" fontFamily="sans-serif">3.</text>
              <line x1="6" y1="12" x2="13" y2="12" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
          </ToolBtn>

          <Sep />

          {/* Block quote */}
          <ToolBtn active={isActive('blockquote')} title="Block quote" onClick={() => editor.chain().focus().toggleBlockquote().run()}>
            <svg width="13" height="12" viewBox="0 0 13 12" fill="currentColor">
              <path d="M0 0h4v5H2c0 1.1.9 2 2 2v2C1.8 9 0 7.2 0 5V0zm7 0h4v5H9c0 1.1.9 2 2 2v2C8.8 9 7 7.2 7 5V0z"/>
            </svg>
          </ToolBtn>

          {/* Horizontal rule */}
          <ToolBtn active={false} title="Divider" onClick={() => editor.chain().focus().setHorizontalRule().run()}>—</ToolBtn>

          <Sep />

          {/* Alignment */}
          <ToolBtn active={isActive({ textAlign: 'left' })} title="Align left" onClick={() => editor.chain().focus().setTextAlign('left').run()}>
            <svg width="13" height="11" viewBox="0 0 13 11" fill="currentColor">
              <rect x="0" y="0" width="13" height="1.5" rx="0.75"/>
              <rect x="0" y="3" width="9" height="1.5" rx="0.75"/>
              <rect x="0" y="6" width="13" height="1.5" rx="0.75"/>
              <rect x="0" y="9" width="7" height="1.5" rx="0.75"/>
            </svg>
          </ToolBtn>
          <ToolBtn active={isActive({ textAlign: 'center' })} title="Align center" onClick={() => editor.chain().focus().setTextAlign('center').run()}>
            <svg width="13" height="11" viewBox="0 0 13 11" fill="currentColor">
              <rect x="0" y="0" width="13" height="1.5" rx="0.75"/>
              <rect x="2" y="3" width="9" height="1.5" rx="0.75"/>
              <rect x="0" y="6" width="13" height="1.5" rx="0.75"/>
              <rect x="3" y="9" width="7" height="1.5" rx="0.75"/>
            </svg>
          </ToolBtn>

          <Sep />

          {/* Undo / Redo */}
          <ToolBtn active={false} title="Undo (Ctrl+Z)" onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()}>
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M2 6a4.5 4.5 0 108 0"/><path d="M2 3v3h3"/>
            </svg>
          </ToolBtn>
          <ToolBtn active={false} title="Redo (Ctrl+Shift+Z)" onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()}>
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M11 6a4.5 4.5 0 10-8 0"/><path d="M11 3v3H8"/>
            </svg>
          </ToolBtn>

          {/* Spacer + word count */}
          <div style={{ flex: 1 }} />
          <div className="flex items-center gap-2">
            <div className="h-1.5 rounded-full overflow-hidden" style={{ width: 56, background: '#f0f0f0' }}>
              <div className="h-full rounded-full transition-all duration-300" style={{ width: `${pct}%`, background: barColor }} />
            </div>
            <span className="text-[11px] tabular-nums" style={{ color: overLimit ? '#ef4444' : '#999' }}>
              {words.toLocaleString()}<span style={{ color: '#ddd' }}> / {WORD_LIMIT.toLocaleString()}</span>
            </span>
          </div>
        </div>

        {/* ── Writing area ─────────────────────────────────────────── */}
        <div className="flex-1 overflow-y-auto cursor-text" onClick={() => editor.commands.focus()}>
          <div style={{ maxWidth: 700, width: '100%', margin: '0 auto', padding: '48px 40px 100px' }}>
            <EditorContent editor={editor} />
          </div>
        </div>

        {/* ── IB-compliant sticky word-count footer ────────────────── */}
        <div role="status" aria-live="polite"
          className="flex-shrink-0 flex items-center justify-between gap-4 px-6 py-2.5"
          style={{ background: '#fff', borderTop: '1px solid #E2E8F0' }}>
          {/* Left — official body count + hard-limit tag */}
          <div className="flex items-center gap-2 min-w-0">
            <span className="inline-flex items-center rounded-md px-2.5 py-1 text-[13px] font-semibold tabular-nums"
              style={FOOTER_BADGE[status]}>
              Official EE Word Count: {coreBodyCount.toLocaleString()} / {WORD_LIMIT.toLocaleString()}
            </span>
            {status === 'exceeded' && (
              <span className="inline-flex items-center rounded-md px-2 py-1 text-[11px] font-semibold whitespace-nowrap"
                style={{ background: '#FEE2E2', color: '#b91c1c' }}>
                ⚠️ Hard Limit Exceeded for IB Submission
              </span>
            )}
          </div>
          {/* Middle — low-emphasis excluded materials */}
          <div className="hidden md:block text-[11px] tabular-nums whitespace-nowrap" style={{ color: '#94a3b8' }}>
            Excluded Materials (Tables/Captions): {excludedCount.toLocaleString()}
          </div>
          {/* Right — budget indicator */}
          <div className="text-[11px] font-medium tabular-nums whitespace-nowrap"
            style={{ color: status === 'exceeded' ? '#dc2626' : status === 'approaching' ? '#b45309' : '#64748b' }}>
            {percentOfLimit}% of maximum ceiling reached
          </div>
        </div>
      </div>
    </>
  )
}
