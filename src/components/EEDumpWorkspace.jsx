import { useState, useCallback, useMemo, useEffect, useRef } from 'react'

// --- Palette constants (remapped to site theme) ---
const C = {
  cream:       '#F4F3E8',
  steel:       '#9BAAB8',
  steelMuted:  'rgba(155,170,184,0.6)',
  surface:     'rgba(244,243,232,0.03)',
  surface2:    'rgba(244,243,232,0.05)',
  surface3:    'rgba(244,243,232,0.08)',
  border:      'rgba(244,243,232,0.08)',
  borderHover: 'rgba(244,243,232,0.14)',
  inputBg:     'rgba(244,243,232,0.06)',
  inputBorder: 'rgba(244,243,232,0.12)',
  accent:      '#6366f1',
  accentSoft:  'rgba(99,102,241,0.1)',
  accentBorder:'rgba(99,102,241,0.25)',
  green:       '#10b981',
  greenSoft:   'rgba(16,185,129,0.1)',
  greenBorder: 'rgba(16,185,129,0.25)',
  rose:        '#f43f5e',
  roseSoft:    'rgba(244,63,94,0.1)',
  amber:       '#f59e0b',
  amberSoft:   'rgba(245,158,11,0.1)',
  amberBorder: 'rgba(245,158,11,0.25)',
  cyan:        '#06b6d4',
  cyanSoft:    'rgba(6,182,212,0.1)',
  cyanBorder:  'rgba(6,182,212,0.25)',
}

const COLORS = ['#6366f1', '#ec4899', '#10b981', '#f59e0b', '#06b6d4', '#8b5cf6', '#f43f5e', '#14b8a6']
const STORAGE_KEY = 'ee-dump-workspace'
const TYPE_OPTIONS = ['', 'Book', 'Journal', 'Website', 'Report', 'Interview', 'Video', 'Other']

function generateId() {
  return Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 8)
}

function escText(s) {
  return s || ''
}

function truncUrl(url) {
  try {
    const u = new URL(url)
    let host = u.hostname.replace('www.', '')
    return host.length > 22 ? host.substring(0, 20) + '...' : host
  } catch {
    return url.length > 25 ? url.substring(0, 23) + '...' : url
  }
}

// ─── Shared inline style helpers ───
const labelStyle = {
  display: 'block', fontSize: 10, fontWeight: 600,
  letterSpacing: '1.5px', textTransform: 'uppercase',
  color: C.steelMuted, marginBottom: 6,
}

const inputStyle = {
  width: '100%', background: C.surface2,
  border: `1px solid ${C.border}`, borderRadius: 6,
  padding: '8px 12px', color: C.cream, fontSize: 13,
  fontFamily: 'inherit', outline: 'none',
  boxSizing: 'border-box',
}

const textareaStyle = {
  ...inputStyle, minHeight: 60, lineHeight: 1.5, resize: 'vertical',
}

// ════════════════════════════════════════════════════════════
export default function EEDumpWorkspace() {
  // ── State ──
  const [currentView, setCurrentView] = useState('dump')
  const [researchQuestion, setResearchQuestion] = useState('')
  const [subtopics, setSubtopics] = useState([])
  const [notes, setNotes] = useState({ connections: '', findings: '', questions: '' })
  const saveIndicatorRef = useRef(null)

  // ── Load from localStorage on mount ──
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (!raw) return
      const data = JSON.parse(raw)
      if (data.researchQuestion) setResearchQuestion(data.researchQuestion)
      if (data.subtopics) setSubtopics(data.subtopics)
      if (data.notes) setNotes(data.notes)
    } catch { /* ignore corrupt data */ }
  }, [])

  // ── Auto-save every 30s ──
  useEffect(() => {
    const interval = setInterval(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ researchQuestion, subtopics, notes }))
    }, 30000)
    return () => clearInterval(interval)
  }, [researchQuestion, subtopics, notes])

  // ── Manual save ──
  const saveDump = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ researchQuestion, subtopics, notes }))
    if (saveIndicatorRef.current) {
      saveIndicatorRef.current.textContent = '✓ Saved!'
      setTimeout(() => {
        if (saveIndicatorRef.current) saveIndicatorRef.current.textContent = '💾 Save Progress'
      }, 1500)
    }
  }, [researchQuestion, subtopics, notes])

  // ── Stats ──
  const stats = useMemo(() => {
    let entries = 0, sources = 0
    subtopics.forEach(s => {
      entries += s.entries.length
      s.entries.forEach(e => { if (e.link && e.link.trim()) sources++ })
    })
    return { subtopicCount: subtopics.length, entryCount: entries, sourcesWithLinks: sources }
  }, [subtopics])

  // ── Subtopic CRUD ──
  const addSubtopic = useCallback(() => {
    setSubtopics(prev => [...prev, {
      id: generateId(),
      title: '',
      color: COLORS[prev.length % COLORS.length],
      open: true,
      entries: [],
    }])
  }, [])

  const removeSubtopic = useCallback((id) => {
    if (!window.confirm('Delete this subtopic and all its entries?')) return
    setSubtopics(prev => prev.filter(s => s.id !== id))
  }, [])

  const toggleSubtopic = useCallback((id) => {
    setSubtopics(prev => prev.map(s => s.id === id ? { ...s, open: !s.open } : s))
  }, [])

  const updateSubtopicTitle = useCallback((id, title) => {
    setSubtopics(prev => prev.map(s => s.id === id ? { ...s, title } : s))
  }, [])

  // ── Entry CRUD ──
  const addEntry = useCallback((subtopicId) => {
    setSubtopics(prev => prev.map(s =>
      s.id === subtopicId
        ? { ...s, open: true, entries: [...s.entries, { id: generateId(), source: '', info: '', link: '', sourceType: '', used: false }] }
        : s
    ))
  }, [])

  const removeEntry = useCallback((subtopicId, entryId) => {
    setSubtopics(prev => prev.map(s =>
      s.id === subtopicId
        ? { ...s, entries: s.entries.filter(e => e.id !== entryId) }
        : s
    ))
  }, [])

  const updateEntry = useCallback((subtopicId, entryId, field, value) => {
    setSubtopics(prev => prev.map(s =>
      s.id === subtopicId
        ? { ...s, entries: s.entries.map(e => e.id === entryId ? { ...e, [field]: value } : e) }
        : s
    ))
  }, [])

  // ── Export ──
  const exportAsText = useCallback(() => {
    let text = `EE DUMP EXPORT\n${'='.repeat(50)}\n\n`
    text += `Research Question: ${researchQuestion || '(not set)'}\n\n`
    subtopics.forEach((s, i) => {
      text += `${'─'.repeat(50)}\nSUBTOPIC ${i + 1}: ${s.title || 'Untitled'}\n${'─'.repeat(50)}\n\n`
      s.entries.forEach((e, j) => {
        text += `  Entry ${j + 1}:\n`
        text += `  Source: ${e.source || '—'}\n`
        text += `  Key Info: ${e.info || '—'}\n`
        text += `  Link: ${e.link || '—'}\n\n`
      })
    })
    text += `${'─'.repeat(50)}\nNOTES\n${'─'.repeat(50)}\n\n`
    text += `Connections: ${notes.connections || '—'}\n\n`
    text += `Potential Findings: ${notes.findings || '—'}\n\n`
    text += `Open Questions: ${notes.questions || '—'}\n`
    const blob = new Blob([text], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = 'ee-dump-export.txt'; a.click()
    URL.revokeObjectURL(url)
  }, [researchQuestion, subtopics, notes])

  const exportAsCSV = useCallback(() => {
    let csv = 'Subtopic,Source,Type,Key Information,Link,Used in Essay\n'
    subtopics.forEach(s => {
      s.entries.forEach(e => {
        csv += `"${(s.title || '').replace(/"/g, '""')}","${(e.source || '').replace(/"/g, '""')}","${(e.sourceType || '').replace(/"/g, '""')}","${(e.info || '').replace(/"/g, '""')}","${(e.link || '').replace(/"/g, '""')}","${e.used ? 'Yes' : 'No'}"\n`
      })
    })
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = 'ee-sources.csv'; a.click()
    URL.revokeObjectURL(url)
  }, [subtopics])

  const clearAll = useCallback(() => {
    if (!window.confirm('Clear everything? This cannot be undone.')) return
    setResearchQuestion('')
    setSubtopics([])
    setNotes({ connections: '', findings: '', questions: '' })
    localStorage.removeItem(STORAGE_KEY)
  }, [])

  // ════════════════════════════════════════════════════════════
  // RENDER
  // ════════════════════════════════════════════════════════════
  return (
    <div style={{ color: C.cream, fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif" }}>

      {/* ── Research Question ── */}
      <div style={{
        background: C.surface, border: `1px solid ${C.border}`,
        borderRadius: 10, padding: '16px 20px', marginBottom: 20,
      }}>
        <div style={labelStyle}>Your Research Question</div>
        <input
          value={researchQuestion}
          onChange={e => setResearchQuestion(e.target.value)}
          placeholder="Type your research question here..."
          style={{
            width: '100%', background: 'none', border: 'none', outline: 'none',
            color: '#fff', fontSize: 15, fontWeight: 500, fontFamily: 'inherit',
          }}
        />
      </div>

      {/* ── Stats ── */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 20, flexWrap: 'wrap' }}>
        {[
          { value: stats.subtopicCount, label: 'Subtopics' },
          { value: stats.entryCount, label: 'Entries' },
          { value: stats.sourcesWithLinks, label: 'Sources with links' },
        ].map(st => (
          <div key={st.label} style={{
            background: C.surface, border: `1px solid ${C.border}`,
            borderRadius: 8, padding: '12px 18px', flex: 1, minWidth: 120, textAlign: 'center',
          }}>
            <div style={{ fontSize: 22, fontWeight: 700, color: '#fff', fontFamily: "'Cormorant Garamond', Georgia, serif" }}>{st.value}</div>
            <div style={{ fontSize: 11, color: C.steelMuted }}>{st.label}</div>
          </div>
        ))}
      </div>

      {/* ── Tabs ── */}
      <div style={{
        display: 'flex', marginBottom: 20,
        background: C.surface, border: `1px solid ${C.border}`,
        borderRadius: 10, overflow: 'hidden',
      }}>
        {[
          { key: 'dump', label: '📥 Dump' },
          { key: 'sources', label: '📚 Source List' },
          { key: 'notes', label: '💡 Notes & Connections' },
        ].map((tab, i, arr) => (
          <button
            key={tab.key}
            onClick={() => setCurrentView(tab.key)}
            style={{
              flex: 1, padding: '10px 16px', textAlign: 'center',
              fontSize: 12, fontWeight: 600, cursor: 'pointer',
              border: 'none', background: currentView === tab.key ? 'rgba(221,217,196,0.15)' : 'none',
              color: currentView === tab.key ? '#DDD9C4' : C.steelMuted,
              borderRight: i < arr.length - 1 ? `1px solid ${C.border}` : 'none',
              transition: 'all 0.15s', fontFamily: 'inherit',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── Hint ── */}
      {currentView === 'dump' && subtopics.length === 0 && (
        <div style={{
          background: C.amberSoft, border: `1px solid ${C.amberBorder}`,
          borderRadius: 10, padding: '16px 20px', marginBottom: 20,
          fontSize: 13, color: 'rgba(245,158,11,0.8)', lineHeight: 1.6,
        }}>
          <strong style={{ color: C.amber }}>How this works:</strong> Create subtopics based on your research areas. Under each subtopic, dump every piece of information you find — source name, key info, and the link. Don't filter yet. Just capture.
        </div>
      )}

      {/* ════════════════════════════════ DUMP VIEW ════════════════════════════════ */}
      {currentView === 'dump' && (
        <div>
          {subtopics.length === 0 && (
            <div style={{
              textAlign: 'center', padding: '60px 24px',
              border: `1px dashed ${C.border}`, borderRadius: 12, marginBottom: 14,
            }}>
              <div style={{ fontSize: 36, marginBottom: 12 }}>📥</div>
              <p style={{ color: C.steelMuted, fontSize: 14 }}>No subtopics yet. Click "Add Subtopic" to start dumping your research.</p>
            </div>
          )}

          {subtopics.map(s => (
            <div key={s.id} style={{
              background: C.surface, border: `1px solid ${C.border}`,
              borderRadius: 12, marginBottom: 14, overflow: 'hidden',
              transition: 'border-color 0.2s',
            }}>
              {/* Subtopic Header */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '16px 20px', cursor: 'pointer', userSelect: 'none',
              }}>
                <div style={{ width: 10, height: 10, borderRadius: 3, background: s.color, flexShrink: 0 }} />
                <input
                  value={s.title}
                  onChange={e => updateSubtopicTitle(s.id, e.target.value)}
                  onClick={e => e.stopPropagation()}
                  placeholder="Subtopic name..."
                  style={{
                    flex: 1, fontSize: 15, fontWeight: 600, color: '#fff',
                    background: 'none', border: 'none', outline: 'none',
                    fontFamily: 'inherit', cursor: 'text',
                  }}
                />
                <span style={{
                  fontSize: 11, color: C.steelMuted,
                  background: C.surface2, padding: '3px 10px', borderRadius: 5,
                }}>
                  {s.entries.length} {s.entries.length === 1 ? 'entry' : 'entries'}
                </span>
                <button
                  onClick={() => toggleSubtopic(s.id)}
                  style={{
                    color: C.steelMuted, fontSize: 14, cursor: 'pointer',
                    background: 'none', border: 'none', padding: '4px',
                    transition: 'transform 0.2s',
                    transform: s.open ? 'rotate(180deg)' : 'rotate(0deg)',
                  }}
                >
                  ▼
                </button>
                <button
                  onClick={e => { e.stopPropagation(); removeSubtopic(s.id) }}
                  style={{
                    background: 'none', border: 'none', color: C.steelMuted,
                    cursor: 'pointer', fontSize: 16, padding: '4px 6px', lineHeight: 1,
                    borderRadius: 4, transition: 'all 0.15s',
                  }}
                  title="Delete subtopic"
                >
                  ×
                </button>
              </div>

              {/* Subtopic Body */}
              {s.open && (
                <div style={{ borderTop: `1px solid ${C.border}` }}>
                  {s.entries.map(e => (
                    <div key={e.id} style={{
                      padding: '16px 20px',
                      borderBottom: `1px solid ${C.border}`,
                      transition: 'background 0.1s',
                    }}>
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 2fr auto',
                        gap: 10, alignItems: 'start',
                      }}>
                        <div>
                          <label style={labelStyle}>Source</label>
                          <input
                            value={e.source}
                            onChange={ev => updateEntry(s.id, e.id, 'source', ev.target.value)}
                            placeholder="Author or source name"
                            style={inputStyle}
                          />
                        </div>
                        <div>
                          <label style={labelStyle}>Key Information</label>
                          <textarea
                            value={e.info}
                            onChange={ev => updateEntry(s.id, e.id, 'info', ev.target.value)}
                            placeholder="What did you learn from this source?"
                            style={textareaStyle}
                          />
                        </div>
                        <button
                          onClick={() => removeEntry(s.id, e.id)}
                          style={{
                            background: 'none', border: 'none', color: C.steelMuted,
                            cursor: 'pointer', fontSize: 14, padding: 6,
                            borderRadius: 4, transition: 'all 0.15s',
                            alignSelf: 'start', marginTop: 18,
                          }}
                          title="Remove entry"
                        >
                          ×
                        </button>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8 }}>
                        <input
                          value={e.link}
                          onChange={ev => updateEntry(s.id, e.id, 'link', ev.target.value)}
                          placeholder="https://..."
                          style={{
                            ...inputStyle,
                            fontFamily: 'monospace', fontSize: 12,
                            color: C.cyan,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={() => addEntry(s.id)}
                    style={{
                      padding: '12px 20px', display: 'flex', alignItems: 'center',
                      gap: 8, color: C.accent, fontSize: 12, fontWeight: 600,
                      cursor: 'pointer', transition: 'background 0.1s',
                      background: 'none', border: 'none', width: '100%', textAlign: 'left',
                      fontFamily: 'inherit',
                    }}
                  >
                    + Add entry
                  </button>
                </div>
              )}
            </div>
          ))}

          <button
            onClick={addSubtopic}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              gap: 8, padding: 14, marginBottom: 14,
              borderRadius: 12, border: `1px dashed ${C.border}`,
              color: C.steelMuted, fontSize: 13, fontWeight: 600,
              cursor: 'pointer', transition: 'all 0.15s', background: 'none',
              width: '100%', fontFamily: 'inherit',
            }}
          >
            + Add Subtopic
          </button>
        </div>
      )}

      {/* ════════════════════════════════ SOURCE LIST VIEW ════════════════════════════════ */}
      {currentView === 'sources' && (
        <div>
          {/* Toolbar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, flexWrap: 'wrap', gap: 8 }}>
            <span style={{ fontSize: 12, color: C.steelMuted }}>
              {stats.entryCount} source{stats.entryCount !== 1 ? 's' : ''} across {stats.subtopicCount} subtopic{stats.subtopicCount !== 1 ? 's' : ''}
            </span>
            <div style={{ display: 'flex', gap: 8 }}>
              <button
                onClick={() => {
                  if (subtopics.length === 0) {
                    setSubtopics([{ id: generateId(), title: 'General', color: COLORS[0], open: true, entries: [] }])
                  }
                  setSubtopics(prev => {
                    const last = prev[prev.length - 1]
                    return prev.map(s => s.id === last.id
                      ? { ...s, entries: [...s.entries, { id: generateId(), source: '', info: '', link: '', sourceType: '', used: false }] }
                      : s
                    )
                  })
                }}
                style={{
                  padding: '7px 14px', borderRadius: 6, fontSize: 12, fontWeight: 600,
                  cursor: 'pointer', border: `1px solid ${C.border}`,
                  background: C.surface, color: C.steel, fontFamily: 'inherit',
                }}
              >
                + Add Row
              </button>
              <button
                onClick={exportAsCSV}
                style={{
                  padding: '7px 14px', borderRadius: 6, fontSize: 12, fontWeight: 600,
                  cursor: 'pointer', border: `1px solid ${C.border}`,
                  background: C.surface, color: C.steel, fontFamily: 'inherit',
                }}
              >
                ⬇ Export CSV
              </button>
            </div>
          </div>

          {/* Table */}
          <div style={{ overflowX: 'auto', border: `1px solid ${C.border}`, borderRadius: 10, background: C.surface }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, minWidth: 700 }}>
              <thead>
                <tr>
                  {['#', 'Subtopic', 'Source', 'Type', 'Key Information', 'Link', 'Used?'].map((h, i) => (
                    <th key={h} style={{
                      textAlign: i === 0 ? 'center' : 'left',
                      padding: '10px 14px', fontSize: 10, fontWeight: 600,
                      letterSpacing: '1px', textTransform: 'uppercase',
                      color: C.steelMuted, background: C.surface2,
                      borderBottom: `2px solid ${C.border}`,
                      whiteSpace: 'nowrap',
                      width: i === 0 ? 40 : i === 6 ? 60 : 'auto',
                    }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {stats.entryCount === 0 ? (
                  <tr>
                    <td colSpan={7} style={{ textAlign: 'center', padding: 40, color: C.steelMuted, fontSize: 13 }}>
                      No entries yet. Add subtopics and entries in the Dump tab, or click "+ Add Row" above.
                    </td>
                  </tr>
                ) : (
                  (() => {
                    let rowNum = 0
                    return subtopics.flatMap(s =>
                      s.entries.map(e => {
                        rowNum++
                        return (
                          <tr key={e.id}>
                            <td style={{ padding: '0 8px', borderBottom: `1px solid ${C.border}`, textAlign: 'center', color: C.steelMuted, fontSize: 11, fontWeight: 500, background: C.surface2 }}>
                              {rowNum}
                            </td>
                            <td style={{ padding: '0 14px', borderBottom: `1px solid ${C.border}`, borderRight: `1px solid ${C.border}`, color: C.steel, fontSize: 12, whiteSpace: 'nowrap', fontWeight: 500 }}>
                              <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: 2, background: s.color, marginRight: 8, verticalAlign: 'middle' }} />
                              {escText(s.title) || 'Untitled'}
                            </td>
                            <td style={{ padding: 0, borderBottom: `1px solid ${C.border}`, borderRight: `1px solid ${C.border}` }}>
                              <input
                                value={e.source}
                                onChange={ev => updateEntry(s.id, e.id, 'source', ev.target.value)}
                                placeholder="—"
                                style={{ width: '100%', background: 'none', border: 'none', outline: 'none', color: C.cream, fontSize: 13, fontFamily: 'inherit', padding: '8px 14px', minHeight: 38 }}
                              />
                            </td>
                            <td style={{ padding: 0, borderBottom: `1px solid ${C.border}`, borderRight: `1px solid ${C.border}` }}>
                              <select
                                value={e.sourceType || ''}
                                onChange={ev => updateEntry(s.id, e.id, 'sourceType', ev.target.value)}
                                style={{
                                  width: '100%', background: 'none', border: 'none', outline: 'none',
                                  color: C.cream, fontSize: 12, fontFamily: 'inherit',
                                  padding: '8px 10px', cursor: 'pointer',
                                  WebkitAppearance: 'none', appearance: 'none',
                                }}
                              >
                                {TYPE_OPTIONS.map(t => (
                                  <option key={t} value={t} style={{ background: C.surface2, color: C.cream }}>{t || '—'}</option>
                                ))}
                              </select>
                            </td>
                            <td style={{ padding: 0, borderBottom: `1px solid ${C.border}`, borderRight: `1px solid ${C.border}`, minWidth: 240 }}>
                              <input
                                value={e.info}
                                onChange={ev => updateEntry(s.id, e.id, 'info', ev.target.value)}
                                placeholder="—"
                                style={{ width: '100%', background: 'none', border: 'none', outline: 'none', color: C.cream, fontSize: 13, fontFamily: 'inherit', padding: '8px 14px', minHeight: 38 }}
                              />
                            </td>
                            <td style={{ padding: 0, borderBottom: `1px solid ${C.border}`, borderRight: `1px solid ${C.border}` }}>
                              {e.link ? (
                                <a href={e.link} target="_blank" rel="noopener noreferrer" style={{ color: C.cyan, textDecoration: 'none', fontSize: 12, fontFamily: 'monospace', padding: '8px 14px', display: 'block' }}>
                                  🔗 {truncUrl(e.link)}
                                </a>
                              ) : (
                                <input
                                  value=""
                                  onChange={ev => updateEntry(s.id, e.id, 'link', ev.target.value)}
                                  placeholder="https://..."
                                  style={{ width: '100%', background: 'none', border: 'none', outline: 'none', fontFamily: 'monospace', fontSize: 12, color: C.cyan, padding: '8px 14px', minHeight: 38 }}
                                />
                              )}
                            </td>
                            <td style={{ padding: '0 8px', borderBottom: `1px solid ${C.border}`, textAlign: 'center' }}>
                              <input
                                type="checkbox"
                                checked={e.used || false}
                                onChange={ev => updateEntry(s.id, e.id, 'used', ev.target.checked)}
                                style={{ width: 16, height: 16, cursor: 'pointer', accentColor: C.green }}
                              />
                            </td>
                          </tr>
                        )
                      })
                    )
                  })()
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ════════════════════════════════ NOTES VIEW ════════════════════════════════ */}
      {currentView === 'notes' && (
        <div>
          {[
            { key: 'connections', icon: '🔗', title: 'Connections Between Subtopics', desc: "As you research, you'll start noticing patterns and links between subtopics. Write them down here.", placeholder: "e.g., The data from subtopic 1 on supply chain speed contradicts what I found in subtopic 3 about inventory turnover..." },
            { key: 'findings', icon: '💡', title: 'Potential Original Findings', desc: 'Anything surprising, contradictory, or interesting that could become the core of your analysis.', placeholder: "e.g., ZARA's inventory turnover is actually BELOW industry standard — this challenges the 'fast fashion = fast turnover' narrative..." },
            { key: 'questions', icon: '❓', title: 'Questions I Still Need to Answer', desc: 'Gaps in your research that need filling before you start writing.', placeholder: "e.g., I still need competitor data for H&M's 2023 annual report to compare profit margins..." },
          ].map(section => (
            <div key={section.key} style={{
              background: C.surface, border: `1px solid ${C.border}`,
              borderRadius: 12, padding: 20, marginBottom: 14,
            }}>
              <h3 style={{ fontSize: 14, fontWeight: 600, color: '#fff', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 8 }}>
                {section.icon} {section.title}
              </h3>
              <p style={{ fontSize: 12, color: C.steelMuted, marginBottom: 12 }}>{section.desc}</p>
              <textarea
                value={notes[section.key]}
                onChange={e => setNotes(prev => ({ ...prev, [section.key]: e.target.value }))}
                placeholder={section.placeholder}
                style={{
                  width: '100%', background: C.surface2,
                  border: `1px solid ${C.border}`, borderRadius: 8,
                  padding: 14, color: C.cream, fontSize: 13,
                  fontFamily: 'inherit', outline: 'none', resize: 'vertical',
                  minHeight: 80, lineHeight: 1.6, boxSizing: 'border-box',
                }}
              />
            </div>
          ))}
        </div>
      )}

      {/* ── Action Buttons ── */}
      <div style={{ display: 'flex', gap: 10, marginTop: 24, flexWrap: 'wrap' }}>
        <button onClick={exportAsText} style={{
          padding: '10px 20px', borderRadius: 8, fontSize: 13, fontWeight: 600,
          cursor: 'pointer', border: 'none', fontFamily: 'inherit',
          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: '#fff',
          transition: 'all 0.15s',
        }}>
          📄 Export as Text
        </button>
        <button onClick={exportAsCSV} style={{
          padding: '10px 20px', borderRadius: 8, fontSize: 13, fontWeight: 600,
          cursor: 'pointer', border: `1px solid ${C.border}`, fontFamily: 'inherit',
          background: 'none', color: C.steel, transition: 'all 0.15s',
        }}>
          ⬇ Export CSV
        </button>
        <button ref={saveIndicatorRef} onClick={saveDump} style={{
          padding: '10px 20px', borderRadius: 8, fontSize: 13, fontWeight: 600,
          cursor: 'pointer', border: `1px solid ${C.border}`, fontFamily: 'inherit',
          background: 'none', color: C.steel, transition: 'all 0.15s',
        }}>
          💾 Save Progress
        </button>
        <button onClick={clearAll} style={{
          padding: '10px 20px', borderRadius: 8, fontSize: 13, fontWeight: 600,
          cursor: 'pointer', border: `1px solid rgba(244,63,94,0.2)`, fontFamily: 'inherit',
          background: 'none', color: C.rose, transition: 'all 0.15s',
        }}>
          🗑 Clear All
        </button>
      </div>
    </div>
  )
}
