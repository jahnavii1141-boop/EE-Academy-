'use client'

import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '@clerk/nextjs'
import { Copy, Trash2, Plus, ExternalLink, BookOpen, X, Check, Quote, Lock } from 'lucide-react'
import Link from 'next/link'

const FREE_DUMP_LIMIT = 7

const SUBTOPIC_COLORS = [
  '#6366f1', '#0ea5e9', '#10b981', '#f59e0b', '#ef4444',
  '#8b5cf6', '#ec4899', '#14b8a6', '#f97316', '#84cc16',
]

function formatMLA({ source_name, author, year, url, publisher }) {
  const parts = []
  if (author) parts.push(`${author}.`)
  if (source_name) parts.push(`"${source_name}."`)
  if (publisher) parts.push(`${publisher},`)
  if (year) parts.push(`${year}.`)
  if (url) parts.push(url)
  return parts.join(' ')
}

// ── Add entry panel ────────────────────────────────────────────────────────
function AddEntryPanel({ onAdd, onClose, existingSubtopics }) {
  const [form, setForm] = useState({
    key_info: '',        // the pasted paragraph / quote
    source_name: '',     // article / book title
    author: '',
    year: '',
    publisher: '',
    link: '',
    source_type: 'Website',
    subtopic: '',
    subtopic_color: SUBTOPIC_COLORS[0],
  })
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSubtopicChange = (val) => {
    set('subtopic', val)
    const existing = existingSubtopics.find(s => s.name === val)
    if (existing) set('subtopic_color', existing.color)
    else {
      const idx = existingSubtopics.length % SUBTOPIC_COLORS.length
      set('subtopic_color', SUBTOPIC_COLORS[idx])
    }
  }

  const handleAdd = () => {
    if (!form.key_info.trim()) return
    onAdd({ ...form })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.3)' }}>
      <div className="w-full max-w-lg rounded-2xl overflow-y-auto"
        style={{ background: '#fff', maxHeight: '90vh', boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: '1px solid #f0f0f0' }}>
          <div>
            <p className="text-sm font-semibold" style={{ color: '#0a0a0a' }}>Dump a paragraph</p>
            <p className="text-[11px] mt-0.5" style={{ color: '#aaa' }}>Paste a quote or passage, then note where it's from</p>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-gray-100">
            <X size={16} style={{ color: '#888' }} />
          </button>
        </div>

        <div className="px-6 py-5 flex flex-col gap-3">

          {/* Main: the paragraph */}
          <textarea
            value={form.key_info}
            onChange={e => set('key_info', e.target.value)}
            placeholder="Paste the paragraph, quote, or key passage here…"
            rows={6}
            autoFocus
            className="w-full text-sm px-3 py-2.5 rounded-xl focus:outline-none resize-none"
            style={{ background: '#fafafa', border: '1px solid #e0e0e0', color: '#0a0a0a', lineHeight: 1.7 }}
          />

          {/* Divider */}
          <p className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: '#ccc' }}>Source</p>

          <input value={form.source_name} onChange={e => set('source_name', e.target.value)}
            placeholder="Article / book title"
            className="w-full text-sm px-3 py-2.5 rounded-xl focus:outline-none"
            style={{ background: '#fafafa', border: '1px solid #eee', color: '#0a0a0a' }} />

          <div className="grid grid-cols-2 gap-2">
            <input value={form.author} onChange={e => set('author', e.target.value)}
              placeholder="Author"
              className="text-sm px-3 py-2.5 rounded-xl focus:outline-none"
              style={{ background: '#fafafa', border: '1px solid #eee', color: '#0a0a0a' }} />
            <input value={form.year} onChange={e => set('year', e.target.value)}
              placeholder="Year"
              className="text-sm px-3 py-2.5 rounded-xl focus:outline-none"
              style={{ background: '#fafafa', border: '1px solid #eee', color: '#0a0a0a' }} />
          </div>

          <input value={form.link} onChange={e => set('link', e.target.value)}
            placeholder="URL or DOI (optional)"
            className="w-full text-sm px-3 py-2.5 rounded-xl focus:outline-none"
            style={{ background: '#fafafa', border: '1px solid #eee', color: '#0a0a0a' }} />

          {/* Subtopic */}
          <p className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: '#ccc' }}>Tag</p>
          <div className="flex gap-2 items-center">
            <input value={form.subtopic} onChange={e => handleSubtopicChange(e.target.value)}
              list="subtopics-list"
              placeholder="Subtopic (e.g. Background, Analysis…)"
              className="flex-1 text-sm px-3 py-2.5 rounded-xl focus:outline-none"
              style={{ background: '#fafafa', border: '1px solid #eee', color: '#0a0a0a' }} />
            <datalist id="subtopics-list">
              {existingSubtopics.map(s => <option key={s.name} value={s.name} />)}
            </datalist>
            <div className="flex gap-1">
              {SUBTOPIC_COLORS.slice(0, 5).map(c => (
                <button key={c} onClick={() => set('subtopic_color', c)}
                  className="w-5 h-5 rounded-full transition-transform"
                  style={{
                    background: c,
                    transform: form.subtopic_color === c ? 'scale(1.25)' : 'scale(1)',
                    outline: form.subtopic_color === c ? `2px solid ${c}` : 'none',
                    outlineOffset: 2,
                  }} />
              ))}
            </div>
          </div>

          <button onClick={handleAdd} disabled={!form.key_info.trim()}
            className="w-full py-2.5 rounded-xl text-sm font-semibold transition-all mt-1"
            style={{
              background: form.key_info.trim() ? '#0a0a0a' : '#f0f0f0',
              color: form.key_info.trim() ? '#fff' : '#bbb',
              cursor: form.key_info.trim() ? 'pointer' : 'not-allowed',
            }}>
            Add to EE Dump
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Entry card ─────────────────────────────────────────────────────────────
function EntryCard({ entry, onRemove, onToggleUsed }) {
  const accentColor = entry.subtopic_color || '#aaa'
  return (
    <div className="group rounded-xl overflow-hidden transition-all"
      style={{ background: '#fff', border: '1px solid #f0f0f0' }}>

      {/* Coloured left bar */}
      <div className="flex">
        <div className="w-1 flex-shrink-0" style={{ background: accentColor }} />
        <div className="flex-1 p-4">

          {/* Quote text — hero */}
          <p className="text-[13px] leading-relaxed mb-3"
            style={{ color: '#1a1a1a', fontStyle: 'italic', whiteSpace: 'pre-wrap' }}>
            "{entry.key_info}"
          </p>

          {/* Source line */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 flex-wrap min-w-0">
              {entry.source_name && (
                <span className="text-[11px] font-medium truncate" style={{ color: '#555' }}>
                  {entry.source_name}
                </span>
              )}
              {entry.author && (
                <span className="text-[11px]" style={{ color: '#aaa' }}>— {entry.author}</span>
              )}
              {entry.year && (
                <span className="text-[11px]" style={{ color: '#aaa' }}>({entry.year})</span>
              )}
              {entry.link && (
                <a href={entry.link} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-0.5 text-[11px]"
                  style={{ color: '#aaa' }}
                  onClick={e => e.stopPropagation()}>
                  <ExternalLink size={9} />
                  link
                </a>
              )}
            </div>

            {/* Actions — show on hover */}
            <div className="flex items-center gap-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={() => onToggleUsed(entry)}
                title={entry.used ? 'Mark unused' : 'Mark as used in essay'}
                className="p-1.5 rounded-lg transition-all"
                style={{ background: entry.used ? '#f0fdf4' : '#f5f5f5', color: entry.used ? '#16a34a' : '#aaa' }}>
                <Check size={11} />
              </button>
              <button onClick={() => onRemove(entry)}
                className="p-1.5 rounded-lg transition-all"
                style={{ color: '#ddd' }}
                onMouseEnter={e => e.currentTarget.style.color = '#ef4444'}
                onMouseLeave={e => e.currentTarget.style.color = '#ddd'}>
                <Trash2 size={11} />
              </button>
            </div>
          </div>

          {entry.used && (
            <p className="text-[10px] font-semibold mt-2" style={{ color: '#16a34a' }}>✓ Used in essay</p>
          )}
        </div>
      </div>
    </div>
  )
}

// ── Dump limit paywall ─────────────────────────────────────────────────────
function DumpPaywall() {
  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 10,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'rgba(250,250,250,0.88)', backdropFilter: 'blur(6px)',
    }}>
      <div style={{
        background: '#fff', borderRadius: 20, padding: '40px 36px', maxWidth: 340,
        width: '100%', margin: '0 16px', textAlign: 'center',
        border: '1px solid #f0f0f0', boxShadow: '0 8px 40px rgba(0,0,0,0.08)',
      }}>
        <div style={{
          width: 48, height: 48, borderRadius: 14, background: '#f5f5f5',
          display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px',
        }}>
          <Lock size={20} style={{ color: '#0a0a0a' }} />
        </div>
        <p style={{ fontSize: 16, fontWeight: 700, color: '#0a0a0a', letterSpacing: '-0.01em', marginBottom: 8 }}>
          Free limit reached
        </p>
        <p style={{ fontSize: 13, color: '#888', lineHeight: 1.6, marginBottom: 24 }}>
          Free users can save up to {FREE_DUMP_LIMIT} research entries. Upgrade to dump unlimited paragraphs and build your full bibliography.
        </p>
        <Link
          href="/pricing"
          style={{
            display: 'block', width: '100%', padding: '11px 0',
            background: '#0a0a0a', color: '#fff', borderRadius: 12,
            fontSize: 13, fontWeight: 600, textDecoration: 'none',
            letterSpacing: '-0.01em',
          }}
        >
          Unlock unlimited →
        </Link>
        <p style={{ fontSize: 11, color: '#bbb', marginTop: 14 }}>
          Yearly subscription
        </p>
      </div>
    </div>
  )
}

// ── Main ────────────────────────────────────────────────────────────────────
export default function DumpWorkspacePage() {
  const { isSignedIn } = useAuth()
  const [entries, setEntries] = useState([])
  const [isPremium, setIsPremium] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [showAdd, setShowAdd] = useState(false)
  const [showPaywall, setShowPaywall] = useState(false)
  const [activeTab, setActiveTab] = useState('dump')
  const [filterSubtopic, setFilterSubtopic] = useState('All')
  const [copied, setCopied] = useState(false)

  const isAtLimit = !isPremium && entries.length >= FREE_DUMP_LIMIT

  useEffect(() => {
    if (isSignedIn) {
      // Clerk user — fetch from API
      Promise.all([
        fetch('/api/dump').then(r => r.json()),
        fetch('/api/workspace').then(r => r.json()),
      ]).then(([dumpData, wsData]) => {
        setEntries(dumpData.entries || [])
        setIsPremium(!!wsData.workspace?.has_paid)
      }).catch(() => {}).finally(() => setLoading(false))
    } else {
      // Free email user — localStorage mode
      try {
        const saved = localStorage.getItem('eeAcademy_dump')
        setEntries(saved ? JSON.parse(saved) : []) // eslint-disable-line react-hooks/set-state-in-effect
      } catch { /* ignore */ }
      setLoading(false)
    }
  }, [isSignedIn])

  const persist = useCallback(async (newEntries) => {
    if (isSignedIn) {
      setSaving(true)
      await fetch('/api/dump', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ entries: newEntries }),
      }).catch(() => {})
      setSaving(false)
    } else {
      // localStorage mode for free users
      try { localStorage.setItem('eeAcademy_dump', JSON.stringify(newEntries)) } catch { /* ignore */ }
    }
  }, [isSignedIn])

  const addEntry = (entry) => {
    if (isAtLimit) { setShowPaywall(true); return }
    const next = [...entries, entry]
    setEntries(next)
    persist(next)
  }

  const removeEntry = (entry) => {
    const next = entries.filter(e => e !== entry)
    setEntries(next)
    persist(next)
  }

  const toggleUsed = (entry) => {
    const next = entries.map(e => e === entry ? { ...e, used: !e.used } : e)
    setEntries(next)
    persist(next)
  }

  // Unique subtopics with colour
  const subtopics = []
  const seen = new Set()
  for (const e of entries) {
    if (e.subtopic && !seen.has(e.subtopic)) {
      seen.add(e.subtopic)
      subtopics.push({ name: e.subtopic, color: e.subtopic_color || '#6366f1' })
    }
  }

  const allSubtopics = [{ name: 'All' }, ...subtopics]
  const filtered = filterSubtopic === 'All' ? entries : entries.filter(e => e.subtopic === filterSubtopic)

  // Group by subtopic
  const grouped = {}
  for (const e of filtered) {
    const key = e.subtopic || 'Untagged'
    if (!grouped[key]) grouped[key] = { color: e.subtopic_color || '#e0e0e0', entries: [] }
    grouped[key].entries.push(e)
  }

  // Bibliography: unique sources (by source_name)
  const uniqueSources = []
  const seenSources = new Set()
  for (const e of entries) {
    if (e.source_name && !seenSources.has(e.source_name)) {
      seenSources.add(e.source_name)
      uniqueSources.push(e)
    }
  }

  const bibliographyText = uniqueSources
    .map(e => formatMLA({ source_name: e.source_name, author: e.author || '', year: e.year || '', url: e.link || '', publisher: e.publisher || '' }) || e.source_name)
    .join('\n\n')

  const copyBib = async () => {
    await navigator.clipboard.writeText(bibliographyText)
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
    <div className="h-full flex flex-col" style={{ background: '#fafafa', position: 'relative' }}>
      {/* Paywall overlay — shown when free limit is hit */}
      {(isAtLimit || showPaywall) && <DumpPaywall />}

      {/* Top bar */}
      <div className="flex-shrink-0 flex items-center justify-between px-6 py-3"
        style={{ borderBottom: '1px solid #f0f0f0', background: '#fff' }}>
        <div className="flex items-center gap-4">
          <p className="text-xs font-semibold" style={{ color: '#0a0a0a', letterSpacing: '-0.01em' }}>EE Dump</p>
          <div className="flex gap-1">
            {[
              { id: 'dump', label: 'Research Dump' },
              { id: 'bibliography', label: 'Bibliography' },
            ].map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className="text-[11px] font-medium px-3 py-1 rounded-lg transition-all"
                style={{
                  background: activeTab === tab.id ? '#0a0a0a' : 'transparent',
                  color: activeTab === tab.id ? '#fff' : '#888',
                }}>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-3">
          {saving && <span className="text-[11px]" style={{ color: '#ccc' }}>Saving…</span>}
          <span className="text-[11px] tabular-nums" style={{ color: '#aaa' }}>
            {entries.length} {entries.length === 1 ? 'entry' : 'entries'}
            {!isPremium && (
              <span style={{ color: entries.length >= FREE_DUMP_LIMIT ? '#ef4444' : '#bbb' }}>
                {' '}· {FREE_DUMP_LIMIT - entries.length > 0 ? `${FREE_DUMP_LIMIT - entries.length} free left` : 'limit reached'}
              </span>
            )}
          </span>
          <button
            onClick={() => isAtLimit ? setShowPaywall(true) : setShowAdd(true)}
            className="flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1.5 rounded-lg"
            style={{ background: '#0a0a0a', color: '#fff' }}>
            {isAtLimit ? <Lock size={12} /> : <Plus size={12} />}
            {isAtLimit ? 'Unlock more' : 'Dump a paragraph'}
          </button>
        </div>
      </div>

      {/* ── Research Dump tab ── */}
      {activeTab === 'dump' && (
        <div className="flex-1 overflow-y-auto p-6">
          {entries.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4">
              <Quote size={36} strokeWidth={1} style={{ color: '#ddd' }} />
              <div className="text-center">
                <p className="text-sm font-medium mb-1" style={{ color: '#888' }}>Nothing dumped yet</p>
                <p className="text-xs max-w-xs leading-relaxed" style={{ color: '#bbb' }}>
                  Found a useful paragraph in an article? Paste it here, tag the subtopic, note the source. Build the dump first — write later.
                </p>
              </div>
              <button onClick={() => isAtLimit ? setShowPaywall(true) : setShowAdd(true)}
                className="flex items-center gap-2 text-sm font-medium px-5 py-2.5 rounded-xl"
                style={{ background: '#0a0a0a', color: '#fff' }}>
                <Plus size={14} /> Dump your first paragraph
              </button>
            </div>
          ) : (
            <>
              {/* Subtopic filter pills */}
              {subtopics.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {allSubtopics.map(s => (
                    <button key={s.name} onClick={() => setFilterSubtopic(s.name)}
                      className="text-[11px] font-medium px-3 py-1 rounded-full transition-all"
                      style={{
                        background: filterSubtopic === s.name
                          ? (s.name === 'All' ? '#0a0a0a' : s.color)
                          : '#f0f0f0',
                        color: filterSubtopic === s.name ? '#fff' : '#555',
                      }}>
                      {s.name}
                      {s.name !== 'All' && (
                        <span className="ml-1 opacity-60">
                          {entries.filter(e => e.subtopic === s.name).length}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              )}

              {/* Grouped cards */}
              <div className="flex flex-col gap-6" style={{ maxWidth: 720 }}>
                {Object.entries(grouped).map(([subtopic, group]) => (
                  <div key={subtopic}>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: group.color }} />
                      <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: '#888' }}>
                        {subtopic}
                      </p>
                      <span className="text-[10px]" style={{ color: '#ccc' }}>({group.entries.length})</span>
                    </div>
                    <div className="flex flex-col gap-2">
                      {group.entries.map((entry, i) => (
                        <EntryCard key={i} entry={entry} onRemove={removeEntry} onToggleUsed={toggleUsed} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {/* ── Bibliography tab ── */}
      {activeTab === 'bibliography' && (
        <div className="flex-1 overflow-y-auto p-6">
          <div className="flex items-center justify-between mb-5" style={{ maxWidth: 680 }}>
            <div>
              <p className="text-sm font-semibold mb-0.5" style={{ color: '#0a0a0a' }}>MLA Bibliography</p>
              <p className="text-xs" style={{ color: '#aaa' }}>
                Auto-generated from {uniqueSources.length} unique {uniqueSources.length === 1 ? 'source' : 'sources'}
              </p>
            </div>
            {uniqueSources.length > 0 && (
              <button onClick={copyBib}
                className="flex items-center gap-1.5 text-[11px] font-medium px-3 py-1.5 rounded-lg transition-all"
                style={{ background: copied ? '#0a0a0a' : '#f5f5f5', color: copied ? '#fff' : '#555' }}>
                {copied ? <Check size={11} /> : <Copy size={11} />}
                {copied ? 'Copied!' : 'Copy all'}
              </button>
            )}
          </div>

          {uniqueSources.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3">
              <BookOpen size={32} strokeWidth={1} style={{ color: '#ddd' }} />
              <p className="text-sm" style={{ color: '#aaa' }}>Add sources in the Research Dump tab first</p>
            </div>
          ) : (
            <div className="flex flex-col gap-3" style={{ maxWidth: 680 }}>
              {uniqueSources.map((entry, i) => {
                const citation = formatMLA({
                  source_name: entry.source_name,
                  author: entry.author || '',
                  year: entry.year || '',
                  url: entry.link || '',
                  publisher: entry.publisher || '',
                }) || entry.source_name
                return (
                  <div key={i} className="px-4 py-3 rounded-xl" style={{ background: '#fff', border: '1px solid #f0f0f0' }}>
                    <p className="text-[13px] leading-relaxed" style={{ color: '#0a0a0a', fontFamily: 'Georgia, serif' }}>
                      {citation}
                    </p>
                    {entry.link && (
                      <a href={entry.link} target="_blank" rel="noopener noreferrer"
                        className="text-[11px] mt-1 block truncate"
                        style={{ color: '#aaa' }}>
                        {entry.link}
                      </a>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}

      {/* Modal */}
      {showAdd && (
        <AddEntryPanel
          onAdd={addEntry}
          onClose={() => setShowAdd(false)}
          existingSubtopics={subtopics}
        />
      )}
    </div>
  )
}
