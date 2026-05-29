'use client'

import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '@clerk/nextjs'
import { Copy, Trash2, Plus, ExternalLink, BookOpen, X, Check } from 'lucide-react'

const SOURCE_TYPES = ['Website', 'Book', 'Journal', 'Article', 'Documentary', 'Interview', 'Other']

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

// ── Add source slide-in panel ──────────────────────────────────────────────
function AddSourcePanel({ onAdd, onClose, existingSubtopics }) {
  const [form, setForm] = useState({
    source_name: '', author: '', year: '', publisher: '',
    url: '', source_type: 'Website', key_info: '', subtopic: '',
    subtopic_color: SUBTOPIC_COLORS[0],
  })
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleAdd = () => {
    if (!form.source_name.trim()) return
    onAdd({ ...form, link: form.url })
    onClose()
  }

  // Auto-pick color when subtopic is typed
  const handleSubtopicChange = (val) => {
    set('subtopic', val)
    const existing = existingSubtopics.find(s => s.name === val)
    if (existing) set('subtopic_color', existing.color)
    else {
      const idx = existingSubtopics.length % SUBTOPIC_COLORS.length
      set('subtopic_color', SUBTOPIC_COLORS[idx])
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.3)' }}>
      <div className="w-full max-w-lg rounded-2xl overflow-y-auto" style={{ background: '#fff', maxHeight: '90vh', boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: '1px solid #f0f0f0' }}>
          <p className="text-sm font-semibold" style={{ color: '#0a0a0a' }}>Add source</p>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-gray-100">
            <X size={16} style={{ color: '#888' }} />
          </button>
        </div>

        <div className="px-6 py-4 flex flex-col gap-3">
          {/* Source type */}
          <div className="flex gap-1.5 flex-wrap">
            {SOURCE_TYPES.map(t => (
              <button key={t} onClick={() => set('source_type', t)}
                className="text-[11px] px-2.5 py-1 rounded-full transition-all"
                style={{
                  background: form.source_type === t ? '#0a0a0a' : '#f5f5f5',
                  color: form.source_type === t ? '#fff' : '#555',
                  fontWeight: form.source_type === t ? 500 : 400,
                }}>
                {t}
              </button>
            ))}
          </div>

          <input value={form.source_name} onChange={e => set('source_name', e.target.value)}
            placeholder="Title or source name *"
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

          <input value={form.publisher} onChange={e => set('publisher', e.target.value)}
            placeholder={form.source_type === 'Website' ? 'Website / organisation' : 'Publisher'}
            className="w-full text-sm px-3 py-2.5 rounded-xl focus:outline-none"
            style={{ background: '#fafafa', border: '1px solid #eee', color: '#0a0a0a' }} />

          <input value={form.url} onChange={e => set('url', e.target.value)}
            placeholder="URL or DOI (optional)"
            className="w-full text-sm px-3 py-2.5 rounded-xl focus:outline-none"
            style={{ background: '#fafafa', border: '1px solid #eee', color: '#0a0a0a' }} />

          <textarea value={form.key_info} onChange={e => set('key_info', e.target.value)}
            placeholder="Key info / notes — what does this source say that's useful?"
            rows={3}
            className="w-full text-sm px-3 py-2.5 rounded-xl focus:outline-none resize-none"
            style={{ background: '#fafafa', border: '1px solid #eee', color: '#0a0a0a', lineHeight: 1.6 }} />

          {/* Subtopic row */}
          <div className="flex gap-2 items-center">
            <input value={form.subtopic} onChange={e => handleSubtopicChange(e.target.value)}
              list="subtopics"
              placeholder="Subtopic / section tag"
              className="flex-1 text-sm px-3 py-2.5 rounded-xl focus:outline-none"
              style={{ background: '#fafafa', border: '1px solid #eee', color: '#0a0a0a' }} />
            <datalist id="subtopics">
              {existingSubtopics.map(s => <option key={s.name} value={s.name} />)}
            </datalist>
            {/* Color picker */}
            <div className="flex gap-1">
              {SUBTOPIC_COLORS.slice(0, 5).map(c => (
                <button key={c} onClick={() => set('subtopic_color', c)}
                  className="w-5 h-5 rounded-full transition-transform"
                  style={{ background: c, transform: form.subtopic_color === c ? 'scale(1.25)' : 'scale(1)', outline: form.subtopic_color === c ? `2px solid ${c}` : 'none', outlineOffset: 2 }} />
              ))}
            </div>
          </div>

          <button onClick={handleAdd} disabled={!form.source_name.trim()}
            className="w-full py-2.5 rounded-xl text-sm font-semibold transition-all mt-1"
            style={{
              background: form.source_name.trim() ? '#0a0a0a' : '#f0f0f0',
              color: form.source_name.trim() ? '#fff' : '#bbb',
              cursor: form.source_name.trim() ? 'pointer' : 'not-allowed',
            }}>
            Add to EE Dump
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Source card ────────────────────────────────────────────────────────────
function SourceCard({ entry, onRemove, onToggleUsed }) {
  return (
    <div className="group rounded-xl p-4 transition-all"
      style={{ background: '#fff', border: '1px solid #f0f0f0' }}>
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded"
            style={{ background: '#f5f5f5', color: '#888' }}>{entry.source_type || 'Source'}</span>
          {entry.year && <span className="text-[10px]" style={{ color: '#bbb' }}>{entry.year}</span>}
        </div>
        <div className="flex items-center gap-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={() => onToggleUsed(entry)}
            title={entry.used ? 'Mark unused' : 'Mark as used in essay'}
            className="p-1 rounded-lg transition-all"
            style={{ background: entry.used ? '#f0fdf4' : '#f5f5f5', color: entry.used ? '#16a34a' : '#aaa' }}>
            <Check size={12} />
          </button>
          <button onClick={() => onRemove(entry)}
            className="p-1 rounded-lg transition-all"
            style={{ color: '#ccc' }}
            onMouseEnter={e => e.currentTarget.style.color = '#ef4444'}
            onMouseLeave={e => e.currentTarget.style.color = '#ccc'}>
            <Trash2 size={12} />
          </button>
        </div>
      </div>

      <p className="text-[13px] font-medium mb-1 leading-snug" style={{ color: '#0a0a0a' }}>
        {entry.source_name}
      </p>
      {entry.author && <p className="text-[11px] mb-1.5" style={{ color: '#888' }}>{entry.author}</p>}

      {entry.key_info && (
        <p className="text-[12px] leading-relaxed mt-2 p-2.5 rounded-lg" style={{ color: '#555', background: '#fafafa', border: '1px solid #f0f0f0' }}>
          {entry.key_info}
        </p>
      )}

      {entry.link && (
        <a href={entry.link} target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-1 mt-2 text-[11px]" style={{ color: '#aaa' }}>
          <ExternalLink size={10} />
          {entry.link.length > 45 ? entry.link.slice(0, 45) + '…' : entry.link}
        </a>
      )}

      {entry.used && (
        <p className="text-[10px] font-semibold mt-2" style={{ color: '#16a34a' }}>✓ Used in essay</p>
      )}
    </div>
  )
}

// ── Main component ─────────────────────────────────────────────────────────
export default function DumpWorkspacePage() {
  const { isSignedIn } = useAuth()
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [showAdd, setShowAdd] = useState(false)
  const [activeTab, setActiveTab] = useState('dump') // 'dump' | 'bibliography'
  const [filterSubtopic, setFilterSubtopic] = useState('All')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!isSignedIn) return
    fetch('/api/dump')
      .then(r => r.json())
      .then(({ entries }) => setEntries(entries || []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [isSignedIn])

  const persist = useCallback(async (newEntries) => {
    setSaving(true)
    await fetch('/api/dump', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ entries: newEntries }),
    }).catch(() => {})
    setSaving(false)
  }, [])

  const addEntry = (entry) => {
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

  // Collect unique subtopics with their colors
  const subtopics = []
  const seen = new Set()
  for (const e of entries) {
    if (e.subtopic && !seen.has(e.subtopic)) {
      seen.add(e.subtopic)
      subtopics.push({ name: e.subtopic, color: e.subtopic_color || '#6366f1' })
    }
  }

  const allSubtopics = [{ name: 'All' }, ...subtopics]
  const filtered = filterSubtopic === 'All'
    ? entries
    : entries.filter(e => e.subtopic === filterSubtopic)

  // Group filtered entries by subtopic
  const grouped = {}
  for (const e of filtered) {
    const key = e.subtopic || 'Untagged'
    if (!grouped[key]) grouped[key] = { color: e.subtopic_color || '#aaa', entries: [] }
    grouped[key].entries.push(e)
  }

  const bibliographyText = entries
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
    <div className="h-full flex flex-col" style={{ background: '#fafafa' }}>

      {/* Top bar */}
      <div className="flex-shrink-0 flex items-center justify-between px-6 py-3"
        style={{ borderBottom: '1px solid #f0f0f0', background: '#fff' }}>
        <div className="flex items-center gap-4">
          <p className="text-xs font-semibold" style={{ color: '#0a0a0a', letterSpacing: '-0.01em' }}>EE Dump</p>
          <div className="flex gap-1">
            {['dump', 'bibliography'].map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className="text-[11px] font-medium px-3 py-1 rounded-lg transition-all capitalize"
                style={{
                  background: activeTab === tab ? '#0a0a0a' : 'transparent',
                  color: activeTab === tab ? '#fff' : '#888',
                }}>
                {tab === 'dump' ? 'Research Dump' : 'Bibliography'}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-3">
          {saving && <span className="text-[11px]" style={{ color: '#ccc' }}>Saving…</span>}
          <span className="text-[11px] tabular-nums" style={{ color: '#aaa' }}>
            {entries.length} {entries.length === 1 ? 'source' : 'sources'}
          </span>
          <button onClick={() => setShowAdd(true)}
            className="flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1.5 rounded-lg transition-all"
            style={{ background: '#0a0a0a', color: '#fff' }}>
            <Plus size={12} /> Add source
          </button>
        </div>
      </div>

      {/* ── Research Dump tab ── */}
      {activeTab === 'dump' && (
        <div className="flex-1 overflow-y-auto p-6">
          {entries.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4" style={{ color: '#ccc' }}>
              <BookOpen size={36} strokeWidth={1} />
              <div className="text-center">
                <p className="text-sm font-medium mb-1" style={{ color: '#888' }}>Your research dump is empty</p>
                <p className="text-xs max-w-xs" style={{ color: '#bbb' }}>
                  Add every source you find here — URL, key notes, subtopic tag. Build the dump first, write later.
                </p>
              </div>
              <button onClick={() => setShowAdd(true)}
                className="flex items-center gap-2 text-sm font-medium px-5 py-2.5 rounded-xl transition-all"
                style={{ background: '#0a0a0a', color: '#fff' }}>
                <Plus size={14} /> Add your first source
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
                    </button>
                  ))}
                </div>
              )}

              {/* Grouped source cards */}
              <div className="flex flex-col gap-6">
                {Object.entries(grouped).map(([subtopic, group]) => (
                  <div key={subtopic}>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: group.color }} />
                      <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: '#888' }}>{subtopic}</p>
                      <span className="text-[10px]" style={{ color: '#ccc' }}>({group.entries.length})</span>
                    </div>
                    <div className="grid grid-cols-1 gap-2" style={{ maxWidth: 680 }}>
                      {group.entries.map((entry, i) => (
                        <SourceCard key={i} entry={entry} onRemove={removeEntry} onToggleUsed={toggleUsed} />
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
              <p className="text-xs" style={{ color: '#aaa' }}>Auto-generated from all your sources</p>
            </div>
            {entries.length > 0 && (
              <button onClick={copyBib}
                className="flex items-center gap-1.5 text-[11px] font-medium px-3 py-1.5 rounded-lg transition-all"
                style={{ background: copied ? '#0a0a0a' : '#f5f5f5', color: copied ? '#fff' : '#555' }}>
                {copied ? <Check size={11} /> : <Copy size={11} />}
                {copied ? 'Copied!' : 'Copy all'}
              </button>
            )}
          </div>

          {entries.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3" style={{ color: '#ccc' }}>
              <BookOpen size={32} strokeWidth={1} />
              <p className="text-sm" style={{ color: '#aaa' }}>Add sources in the Research Dump tab first</p>
            </div>
          ) : (
            <div className="flex flex-col gap-3" style={{ maxWidth: 680 }}>
              {entries.map((entry, i) => {
                const citation = formatMLA({ source_name: entry.source_name, author: entry.author || '', year: entry.year || '', url: entry.link || '', publisher: entry.publisher || '' }) || entry.source_name
                return (
                  <div key={i} className="p-4 rounded-xl" style={{ background: '#fff', border: '1px solid #f0f0f0' }}>
                    {entry.subtopic && (
                      <div className="flex items-center gap-1.5 mb-2">
                        <div className="w-1.5 h-1.5 rounded-full" style={{ background: entry.subtopic_color || '#aaa' }} />
                        <span className="text-[10px] font-medium" style={{ color: '#aaa' }}>{entry.subtopic}</span>
                      </div>
                    )}
                    <p className="text-[13px] leading-relaxed" style={{ color: '#0a0a0a', fontFamily: 'Georgia, serif' }}>
                      {citation}
                    </p>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}

      {/* Add source modal */}
      {showAdd && (
        <AddSourcePanel
          onAdd={addEntry}
          onClose={() => setShowAdd(false)}
          existingSubtopics={subtopics}
        />
      )}
    </div>
  )
}
