'use client'

import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '@clerk/nextjs'
import { Copy, Trash2, Plus, ExternalLink, BookOpen } from 'lucide-react'

const SOURCE_TYPES = ['Website', 'Book', 'Journal', 'Documentary', 'Interview', 'Other']

function formatMLA({ source_name, author, year, url, publisher, source_type }) {
  const parts = []

  if (author) parts.push(`${author}.`)
  if (source_name) parts.push(`"${source_name}."`)
  if (publisher) parts.push(`${publisher},`)
  if (year) parts.push(`${year}.`)
  if (url) parts.push(url)

  return parts.join(' ')
}

function CitationForm({ onAdd }) {
  const [form, setForm] = useState({
    source_name: '',
    author: '',
    year: '',
    publisher: '',
    url: '',
    source_type: 'Website',
    key_info: '',
    subtopic: '',
  })

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleAdd = () => {
    if (!form.source_name.trim()) return
    onAdd({
      ...form,
      link: form.url,
    })
    setForm({
      source_name: '',
      author: '',
      year: '',
      publisher: '',
      url: '',
      source_type: 'Website',
      key_info: '',
      subtopic: '',
    })
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Source type */}
      <div className="flex gap-1.5 flex-wrap">
        {SOURCE_TYPES.map(t => (
          <button
            key={t}
            onClick={() => set('source_type', t)}
            className="text-[11px] px-2.5 py-1 rounded-full transition-all"
            style={{
              background: form.source_type === t ? '#0a0a0a' : '#f5f5f5',
              color: form.source_type === t ? '#fff' : '#555',
              fontWeight: form.source_type === t ? 500 : 400,
              border: '1px solid transparent',
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Title / source name */}
      <input
        value={form.source_name}
        onChange={e => set('source_name', e.target.value)}
        placeholder="Title or source name *"
        className="w-full text-sm px-3 py-2 rounded-lg focus:outline-none"
        style={{ background: '#f5f5f5', color: '#0a0a0a', border: '1px solid #eee' }}
      />

      <div className="grid grid-cols-2 gap-2">
        <input
          value={form.author}
          onChange={e => set('author', e.target.value)}
          placeholder="Author (Last, First)"
          className="w-full text-sm px-3 py-2 rounded-lg focus:outline-none"
          style={{ background: '#f5f5f5', color: '#0a0a0a', border: '1px solid #eee' }}
        />
        <input
          value={form.year}
          onChange={e => set('year', e.target.value)}
          placeholder="Year"
          className="w-full text-sm px-3 py-2 rounded-lg focus:outline-none"
          style={{ background: '#f5f5f5', color: '#0a0a0a', border: '1px solid #eee' }}
        />
      </div>

      <input
        value={form.publisher}
        onChange={e => set('publisher', e.target.value)}
        placeholder={form.source_type === 'Website' ? 'Website / organisation name' : 'Publisher'}
        className="w-full text-sm px-3 py-2 rounded-lg focus:outline-none"
        style={{ background: '#f5f5f5', color: '#0a0a0a', border: '1px solid #eee' }}
      />

      <input
        value={form.url}
        onChange={e => set('url', e.target.value)}
        placeholder="URL or DOI (optional)"
        className="w-full text-sm px-3 py-2 rounded-lg focus:outline-none"
        style={{ background: '#f5f5f5', color: '#0a0a0a', border: '1px solid #eee' }}
      />

      <div className="grid grid-cols-2 gap-2">
        <input
          value={form.subtopic}
          onChange={e => set('subtopic', e.target.value)}
          placeholder="Subtopic / section tag"
          className="w-full text-sm px-3 py-2 rounded-lg focus:outline-none"
          style={{ background: '#f5f5f5', color: '#0a0a0a', border: '1px solid #eee' }}
        />
        <input
          value={form.key_info}
          onChange={e => set('key_info', e.target.value)}
          placeholder="Key info / note"
          className="w-full text-sm px-3 py-2 rounded-lg focus:outline-none"
          style={{ background: '#f5f5f5', color: '#0a0a0a', border: '1px solid #eee' }}
        />
      </div>

      {/* Preview */}
      {form.source_name && (
        <div className="px-3 py-2 rounded-lg" style={{ background: '#fafafa', border: '1px solid #eee' }}>
          <p className="text-[10px] font-semibold uppercase tracking-widest mb-1" style={{ color: '#bbb' }}>MLA Preview</p>
          <p className="text-xs leading-relaxed" style={{ color: '#555', fontFamily: 'Georgia, serif' }}>
            {formatMLA(form)}
          </p>
        </div>
      )}

      <button
        onClick={handleAdd}
        disabled={!form.source_name.trim()}
        className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-sm font-medium transition-all"
        style={{
          background: form.source_name.trim() ? '#0a0a0a' : '#f0f0f0',
          color: form.source_name.trim() ? '#fff' : '#bbb',
          cursor: form.source_name.trim() ? 'pointer' : 'not-allowed',
        }}
      >
        <Plus size={14} />
        Add to Bibliography
      </button>
    </div>
  )
}

export default function DumpWorkspacePage() {
  const { isSignedIn } = useAuth()
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
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

  const removeEntry = (idx) => {
    const next = entries.filter((_, i) => i !== idx)
    setEntries(next)
    persist(next)
  }

  const bibliographyText = entries
    .map(e => formatMLA({
      source_name: e.source_name,
      author:      e.author      || '',
      year:        e.year        || '',
      url:         e.link        || '',
      publisher:   e.publisher   || '',
      source_type: e.source_type,
    }) || e.source_name)
    .join('\n\n')

  const copyBibliography = async () => {
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
        <div className="flex items-center gap-3">
          <p className="text-xs font-semibold" style={{ color: '#0a0a0a', letterSpacing: '-0.01em' }}>
            EE Dump
          </p>
          <span className="text-[11px] px-2 py-0.5 rounded-full" style={{ background: '#f5f5f5', color: '#888' }}>
            MLA format
          </span>
        </div>
        <div className="flex items-center gap-3">
          {saving && <span className="text-[11px]" style={{ color: '#ccc' }}>Saving…</span>}
          <span className="text-[11px] tabular-nums" style={{ color: '#aaa' }}>
            {entries.length} {entries.length === 1 ? 'source' : 'sources'}
          </span>
        </div>
      </div>

      {/* Two-column body */}
      <div className="flex-1 flex overflow-hidden">

        {/* Left — Citation input */}
        <div className="flex-shrink-0 overflow-y-auto p-6"
          style={{ width: 380, borderRight: '1px solid #f0f0f0', background: '#fff' }}>
          <p className="text-[10px] font-semibold uppercase tracking-widest mb-4" style={{ color: '#bbb' }}>
            Add a source
          </p>
          <CitationForm onAdd={addEntry} />
        </div>

        {/* Right — Bibliography */}
        <div className="flex-1 flex flex-col overflow-hidden" style={{ background: '#fafafa' }}>
          {/* Bibliography header */}
          <div className="flex-shrink-0 flex items-center justify-between px-6 py-3"
            style={{ borderBottom: '1px solid #f0f0f0', background: '#fff' }}>
            <div className="flex items-center gap-2">
              <BookOpen size={13} style={{ color: '#aaa' }} />
              <p className="text-xs font-semibold" style={{ color: '#0a0a0a' }}>Bibliography</p>
            </div>
            {entries.length > 0 && (
              <button
                onClick={copyBibliography}
                className="flex items-center gap-1.5 text-[11px] font-medium px-3 py-1.5 rounded-lg transition-all"
                style={{
                  background: copied ? '#0a0a0a' : '#f5f5f5',
                  color: copied ? '#fff' : '#555',
                }}
              >
                <Copy size={11} />
                {copied ? 'Copied!' : 'Copy all'}
              </button>
            )}
          </div>

          {/* Bibliography entries */}
          <div className="flex-1 overflow-y-auto p-6">
            {entries.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full gap-3" style={{ color: '#ccc' }}>
                <BookOpen size={32} strokeWidth={1} />
                <p className="text-sm text-center" style={{ maxWidth: 240 }}>
                  Add sources on the left and they'll appear here automatically.
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {entries.map((entry, i) => {
                  const citation = formatMLA({
                    source_name: entry.source_name,
                    author: entry.author || '',
                    year: entry.year || '',
                    url: entry.link || '',
                    publisher: entry.publisher || '',
                    source_type: entry.source_type,
                  }) || entry.source_name

                  return (
                    <div
                      key={i}
                      className="group flex gap-3 p-4 rounded-xl"
                      style={{ background: '#fff', border: '1px solid #f0f0f0' }}
                    >
                      <div className="flex-1 min-w-0">
                        {/* Type badge */}
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded"
                            style={{ background: '#f5f5f5', color: '#888' }}>
                            {entry.source_type || 'Source'}
                          </span>
                          {entry.subtopic && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded"
                              style={{ background: '#0a0a0a12', color: '#555' }}>
                              {entry.subtopic}
                            </span>
                          )}
                        </div>

                        {/* MLA citation */}
                        <p className="text-[13px] leading-relaxed mb-1.5"
                          style={{ color: '#0a0a0a', fontFamily: 'Georgia, serif' }}>
                          {citation}
                        </p>

                        {/* Key info */}
                        {entry.key_info && (
                          <p className="text-[11px] leading-relaxed" style={{ color: '#888' }}>
                            {entry.key_info}
                          </p>
                        )}

                        {/* URL link */}
                        {entry.link && (
                          <a
                            href={entry.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 mt-1 text-[11px]"
                            style={{ color: '#aaa' }}
                          >
                            <ExternalLink size={10} />
                            {entry.link.length > 50 ? entry.link.slice(0, 50) + '…' : entry.link}
                          </a>
                        )}
                      </div>

                      {/* Delete */}
                      <button
                        onClick={() => removeEntry(i)}
                        className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded"
                        style={{ color: '#ccc' }}
                        onMouseEnter={e => e.currentTarget.style.color = '#ef4444'}
                        onMouseLeave={e => e.currentTarget.style.color = '#ccc'}
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
