import { useState, useCallback, useMemo } from 'react'

const DEFAULT_MILESTONES = [
  { id: 'm1', label: 'Choose EE Subject & Topic Area', type: 'official', weeksBefore: 28, done: false },
  { id: 'm2', label: 'First Meeting with Supervisor', type: 'official', weeksBefore: 26, done: false },
  { id: 'm3', label: 'Submit Draft Research Question', type: 'official', weeksBefore: 24, done: false },
  { id: 'm4', label: 'Complete EE Dump (Research Phase)', type: 'official', weeksBefore: 20, done: false },
  { id: 'm5', label: 'RPPF Reflection 1', type: 'official', weeksBefore: 19, done: false },
  { id: 'm6', label: 'Finalize Research Question', type: 'official', weeksBefore: 18, done: false },
  { id: 'm7', label: 'Complete Essay Structure/Outline', type: 'official', weeksBefore: 16, done: false },
  { id: 'm8', label: 'First Draft — Introduction + Lit Review', type: 'official', weeksBefore: 13, done: false },
  { id: 'm9', label: 'First Draft — Methodology + Analysis', type: 'official', weeksBefore: 11, done: false },
  { id: 'm10', label: 'First Draft — Discussion + Conclusion', type: 'official', weeksBefore: 9, done: false },
  { id: 'm11', label: 'RPPF Reflection 2', type: 'official', weeksBefore: 8, done: false },
  { id: 'm12', label: 'Full Draft to Supervisor', type: 'official', weeksBefore: 7, done: false },
  { id: 'm13', label: 'Receive Supervisor Feedback', type: 'official', weeksBefore: 5, done: false },
  { id: 'm14', label: 'Final Revisions & Formatting', type: 'official', weeksBefore: 3, done: false },
  { id: 'm15', label: 'RPPF Reflection 3 + Viva Voce', type: 'official', weeksBefore: 2, done: false },
  { id: 'm16', label: 'Final Submission', type: 'official', weeksBefore: 0, done: false },
]

const PHASES = [
  { name: 'Research & Planning', color: '#6366f1', startMilestone: 0, endMilestone: 5 },
  { name: 'Structuring', color: '#8b5cf6', startMilestone: 6, endMilestone: 6 },
  { name: 'Writing', color: '#ec4899', startMilestone: 7, endMilestone: 9 },
  { name: 'Review & Polish', color: '#f59e0b', startMilestone: 10, endMilestone: 14 },
  { name: 'Submission', color: '#10b981', startMilestone: 15, endMilestone: 15 },
]

// --- Palette constants (remapped to site theme) ---
const C = {
  cream:      '#F4F3E8',
  steel:      '#9BAAB8',
  steelMuted: 'rgba(155,170,184,0.6)',
  cardBg:     'rgba(244,243,232,0.03)',
  cardBorder: 'rgba(244,243,232,0.08)',
  inputBg:    'rgba(244,243,232,0.06)',
  inputBorder:'rgba(244,243,232,0.12)',
  barBg:      'rgba(244,243,232,0.06)',
}

function getPhaseForMilestone(index) {
  for (const phase of PHASES) {
    if (index >= phase.startMilestone && index <= phase.endMilestone) return phase
  }
  return PHASES[0]
}

function formatDate(date) {
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

function addWeeks(date, weeks) {
  const d = new Date(date)
  d.setDate(d.getDate() + weeks * 7)
  return d
}

export default function EEPlanner() {
  const [submissionDate, setSubmissionDate] = useState('')
  const [milestones, setMilestones] = useState(DEFAULT_MILESTONES)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newLabel, setNewLabel] = useState('')
  const [newWeeksBefore, setNewWeeksBefore] = useState(10)
  const [view, setView] = useState('timeline')

  const parsedDate = submissionDate ? new Date(submissionDate + 'T00:00:00') : null

  const toggleDone = useCallback((id) => {
    setMilestones(prev => prev.map(m => m.id === id ? { ...m, done: !m.done } : m))
  }, [])

  const addCustomMilestone = useCallback(() => {
    if (!newLabel.trim()) return
    const id = 'custom_' + Date.now()
    setMilestones(prev => [...prev, { id, label: newLabel, type: 'custom', weeksBefore: newWeeksBefore, done: false }])
    setNewLabel('')
    setNewWeeksBefore(10)
    setShowAddForm(false)
  }, [newLabel, newWeeksBefore])

  const removeMilestone = useCallback((id) => {
    setMilestones(prev => prev.filter(m => m.id !== id))
  }, [])

  const progress = useMemo(() => {
    const done = milestones.filter(m => m.done).length
    return Math.round((done / milestones.length) * 100)
  }, [milestones])

  const sortedMilestones = useMemo(() => {
    return [...milestones].sort((a, b) => b.weeksBefore - a.weeksBefore)
  }, [milestones])

  const today = new Date()
  const daysUntilSubmission = parsedDate ? Math.ceil((parsedDate - today) / (1000 * 60 * 60 * 24)) : null

  return (
    <div style={{ color: C.cream, fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif" }}>
      {/* Date picker + countdown */}
      <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end', flexWrap: 'wrap', marginBottom: 28 }}>
        <div>
          <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: C.steelMuted, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 6 }}>
            Final Submission Date
          </label>
          <input
            type="date"
            value={submissionDate}
            onChange={e => setSubmissionDate(e.target.value)}
            style={{
              padding: '10px 14px', borderRadius: 9999, border: `1px solid ${C.inputBorder}`,
              background: C.inputBg, color: '#fff', fontSize: 14, outline: 'none',
              width: 200,
            }}
          />
        </div>
        {daysUntilSubmission !== null && (
          <div style={{
            padding: '10px 16px', borderRadius: 8,
            background: daysUntilSubmission < 30 ? 'rgba(239,68,68,0.15)' : daysUntilSubmission < 90 ? 'rgba(245,158,11,0.15)' : 'rgba(16,185,129,0.15)',
            border: `1px solid ${daysUntilSubmission < 30 ? 'rgba(239,68,68,0.3)' : daysUntilSubmission < 90 ? 'rgba(245,158,11,0.3)' : 'rgba(16,185,129,0.3)'}`,
          }}>
            <span style={{
              fontSize: 20, fontWeight: 700,
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              color: daysUntilSubmission < 30 ? '#ef4444' : daysUntilSubmission < 90 ? '#f59e0b' : '#10b981',
            }}>
              {daysUntilSubmission}
            </span>
            <span style={{ fontSize: 12, color: C.steel, marginLeft: 6 }}>days left</span>
          </div>
        )}
      </div>

      {/* Progress Bar */}
      {parsedDate && (
        <div style={{ marginBottom: 28 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: C.steel }}>OVERALL PROGRESS</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: progress === 100 ? '#10b981' : '#6366f1' }}>{progress}%</span>
          </div>
          <div style={{ height: 8, background: C.barBg, borderRadius: 4, overflow: 'hidden' }}>
            <div style={{
              height: '100%', borderRadius: 4,
              background: progress === 100 ? 'linear-gradient(90deg, #10b981, #34d399)' : 'linear-gradient(90deg, #6366f1, #ec4899)',
              width: `${progress}%`, transition: 'width 0.5s ease',
            }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
            <span style={{ fontSize: 11, color: C.steelMuted }}>{milestones.filter(m => m.done).length} of {milestones.length} tasks complete</span>
          </div>
        </div>
      )}

      {/* View Toggle + Add */}
      {parsedDate && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
          <div style={{ display: 'flex', background: C.cardBg, borderRadius: 8, overflow: 'hidden', border: `1px solid ${C.cardBorder}` }}>
            {['timeline', 'checklist'].map(v => (
              <button key={v} onClick={() => setView(v)} style={{
                padding: '8px 18px', border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600,
                background: view === v ? 'rgba(221,217,196,0.15)' : 'transparent',
                color: view === v ? '#DDD9C4' : C.steelMuted, transition: 'all 0.2s',
              }}>
                {v === 'timeline' ? '📅 Timeline' : '✅ Checklist'}
              </button>
            ))}
          </div>
          <button onClick={() => setShowAddForm(!showAddForm)} style={{
            padding: '8px 16px', borderRadius: 9999, border: 'none',
            background: C.cream, color: '#2E3250', fontSize: 13, fontWeight: 600,
            cursor: 'pointer', transition: 'all 0.2s',
          }}>
            + Add Deadline
          </button>
        </div>
      )}

      {/* Add Form */}
      {showAddForm && parsedDate && (
        <div style={{
          padding: 20, borderRadius: 12, marginBottom: 20,
          background: C.cardBg, border: `1px solid ${C.cardBorder}`,
        }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: 200 }}>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: C.steelMuted, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 6 }}>
                Task Name
              </label>
              <input
                value={newLabel}
                onChange={e => setNewLabel(e.target.value)}
                placeholder="e.g., College app deadline"
                style={{
                  width: '100%', padding: '10px 14px', borderRadius: 9999,
                  border: `1px solid ${C.inputBorder}`, background: C.inputBg,
                  color: '#fff', fontSize: 14, outline: 'none', boxSizing: 'border-box',
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: C.steelMuted, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 6 }}>
                Weeks Before
              </label>
              <input
                type="number" min={0} max={52} value={newWeeksBefore}
                onChange={e => setNewWeeksBefore(parseInt(e.target.value) || 0)}
                style={{
                  width: 80, padding: '10px 14px', borderRadius: 9999,
                  border: `1px solid ${C.inputBorder}`, background: C.inputBg,
                  color: '#fff', fontSize: 14, outline: 'none',
                }}
              />
            </div>
            <button onClick={addCustomMilestone} style={{
              padding: '10px 20px', borderRadius: 9999, border: 'none',
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: '#fff',
              fontSize: 13, fontWeight: 600, cursor: 'pointer',
            }}>
              Add
            </button>
          </div>
          {parsedDate && newWeeksBefore > 0 && (
            <p style={{ fontSize: 12, color: C.steelMuted, marginTop: 8, marginBottom: 0 }}>
              This task will be due on {formatDate(addWeeks(parsedDate, -newWeeksBefore))}
            </p>
          )}
        </div>
      )}

      {/* No Date Selected */}
      {!parsedDate && (
        <div style={{
          textAlign: 'center', padding: '80px 24px',
          border: `1px dashed ${C.cardBorder}`, borderRadius: 16, marginTop: 20,
        }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>📅</div>
          <p style={{ fontSize: 16, color: C.steel, marginBottom: 4 }}>Set your submission date above to generate your timeline</p>
          <p style={{ fontSize: 13, color: C.steelMuted }}>Everything builds backwards from your final deadline</p>
        </div>
      )}

      {/* Timeline View */}
      {parsedDate && view === 'timeline' && (
        <div>
          {/* Phase Legend */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
            {PHASES.map(p => (
              <div key={p.name} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: C.steel }}>
                <div style={{ width: 10, height: 10, borderRadius: 3, background: p.color }} />
                {p.name}
              </div>
            ))}
          </div>
          {sortedMilestones.map((m, i) => {
            const milestoneDate = addWeeks(parsedDate, -m.weeksBefore)
            const isThisWeek = Math.abs(milestoneDate - today) < 7 * 24 * 60 * 60 * 1000
            const originalIndex = DEFAULT_MILESTONES.findIndex(d => d.id === m.id)
            const phase = m.type === 'custom' ? { color: '#06b6d4', name: 'Custom' } : getPhaseForMilestone(originalIndex)
            return (
              <div key={m.id} style={{ display: 'flex', gap: 16, marginBottom: 4 }}>
                {/* Timeline line */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 20, flexShrink: 0 }}>
                  <div style={{
                    width: 14, height: 14, borderRadius: '50%', flexShrink: 0,
                    background: m.done ? '#10b981' : isThisWeek ? phase.color : 'rgba(244,243,232,0.1)',
                    border: isThisWeek && !m.done ? `2px solid ${phase.color}` : '2px solid transparent',
                    boxShadow: isThisWeek ? `0 0 12px ${phase.color}40` : 'none',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 8, color: '#fff',
                  }}>
                    {m.done && '✓'}
                  </div>
                  {i < sortedMilestones.length - 1 && (
                    <div style={{ width: 2, flex: 1, minHeight: 32, background: 'rgba(244,243,232,0.06)' }} />
                  )}
                </div>
                {/* Card */}
                <div style={{
                  flex: 1, padding: '14px 18px', borderRadius: 10, marginBottom: 8,
                  background: isThisWeek ? `${phase.color}10` : C.cardBg,
                  border: `1px solid ${isThisWeek ? phase.color + '30' : C.cardBorder}`,
                  opacity: m.done ? 0.5 : 1, transition: 'all 0.2s',
                  cursor: 'pointer',
                }}
                onClick={() => toggleDone(m.id)}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                        {isThisWeek && !m.done && (
                          <span style={{
                            fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px',
                            padding: '2px 8px', borderRadius: 4, background: `${phase.color}25`, color: phase.color,
                          }}>
                            This Week
                          </span>
                        )}
                        {m.type === 'custom' && (
                          <span style={{
                            fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px',
                            padding: '2px 8px', borderRadius: 4, background: 'rgba(6,182,212,0.15)', color: '#06b6d4',
                          }}>
                            Custom
                          </span>
                        )}
                      </div>
                      <p style={{
                        fontSize: 14, fontWeight: 500, margin: 0,
                        color: m.done ? C.steelMuted : C.cream,
                        textDecoration: m.done ? 'line-through' : 'none',
                      }}>
                        {m.label}
                      </p>
                      <p style={{ fontSize: 12, color: C.steelMuted, margin: '4px 0 0 0' }}>
                        {formatDate(milestoneDate)} · {m.weeksBefore === 0 ? 'Submission day' : `${m.weeksBefore}w before deadline`}
                      </p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 8, height: 8, borderRadius: 2, background: phase.color, flexShrink: 0 }} />
                      {m.type === 'custom' && (
                        <button
                          onClick={e => { e.stopPropagation(); removeMilestone(m.id) }}
                          style={{
                            background: 'none', border: 'none', color: C.steelMuted, cursor: 'pointer',
                            fontSize: 16, padding: '0 4px', lineHeight: 1,
                          }}
                        >
                          ×
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Checklist View */}
      {parsedDate && view === 'checklist' && (
        <div>
          {PHASES.map(phase => {
            const phaseMilestones = sortedMilestones.filter(m => {
              if (m.type === 'custom') return false
              const idx = DEFAULT_MILESTONES.findIndex(d => d.id === m.id)
              return idx >= phase.startMilestone && idx <= phase.endMilestone
            })
            const doneCount = phaseMilestones.filter(m => m.done).length
            return (
              <div key={phase.name} style={{ marginBottom: 24 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                  <div style={{ width: 12, height: 12, borderRadius: 3, background: phase.color }} />
                  <span style={{ fontSize: 13, fontWeight: 700, color: C.cream, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    {phase.name}
                  </span>
                  <span style={{ fontSize: 11, color: C.steelMuted }}>{doneCount}/{phaseMilestones.length}</span>
                </div>
                {phaseMilestones.map(m => {
                  const milestoneDate = addWeeks(parsedDate, -m.weeksBefore)
                  return (
                    <div key={m.id} onClick={() => toggleDone(m.id)} style={{
                      display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px',
                      borderRadius: 8, marginBottom: 4, cursor: 'pointer',
                      background: m.done ? 'rgba(16,185,129,0.04)' : C.cardBg,
                      border: `1px solid ${m.done ? 'rgba(16,185,129,0.15)' : C.cardBorder}`,
                    }}>
                      <div style={{
                        width: 20, height: 20, borderRadius: 6, flexShrink: 0,
                        background: m.done ? '#10b981' : 'transparent',
                        border: `2px solid ${m.done ? '#10b981' : 'rgba(244,243,232,0.2)'}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 11, color: '#fff', fontWeight: 700,
                      }}>
                        {m.done && '✓'}
                      </div>
                      <div style={{ flex: 1 }}>
                        <p style={{
                          fontSize: 14, margin: 0, fontWeight: 500,
                          color: m.done ? C.steelMuted : C.cream,
                          textDecoration: m.done ? 'line-through' : 'none',
                        }}>
                          {m.label}
                        </p>
                      </div>
                      <span style={{ fontSize: 12, color: C.steelMuted, flexShrink: 0 }}>{formatDate(milestoneDate)}</span>
                    </div>
                  )
                })}
              </div>
            )
          })}
          {/* Custom deadlines section */}
          {sortedMilestones.some(m => m.type === 'custom') && (
            <div style={{ marginBottom: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <div style={{ width: 12, height: 12, borderRadius: 3, background: '#06b6d4' }} />
                <span style={{ fontSize: 13, fontWeight: 700, color: C.cream, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Your Deadlines
                </span>
              </div>
              {sortedMilestones.filter(m => m.type === 'custom').map(m => {
                const milestoneDate = addWeeks(parsedDate, -m.weeksBefore)
                return (
                  <div key={m.id} onClick={() => toggleDone(m.id)} style={{
                    display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px',
                    borderRadius: 8, marginBottom: 4, cursor: 'pointer',
                    background: m.done ? 'rgba(16,185,129,0.04)' : C.cardBg,
                    border: `1px solid ${m.done ? 'rgba(16,185,129,0.15)' : C.cardBorder}`,
                  }}>
                    <div style={{
                      width: 20, height: 20, borderRadius: 6, flexShrink: 0,
                      background: m.done ? '#10b981' : 'transparent',
                      border: `2px solid ${m.done ? '#10b981' : 'rgba(244,243,232,0.2)'}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 11, color: '#fff', fontWeight: 700,
                    }}>
                      {m.done && '✓'}
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{
                        fontSize: 14, margin: 0, fontWeight: 500,
                        color: m.done ? C.steelMuted : C.cream,
                        textDecoration: m.done ? 'line-through' : 'none',
                      }}>
                        {m.label}
                      </p>
                    </div>
                    <span style={{ fontSize: 12, color: C.steelMuted, flexShrink: 0 }}>{formatDate(milestoneDate)}</span>
                    <button
                      onClick={e => { e.stopPropagation(); removeMilestone(m.id) }}
                      style={{
                        background: 'none', border: 'none', color: C.steelMuted, cursor: 'pointer',
                        fontSize: 16, padding: '0 4px', lineHeight: 1,
                      }}
                    >
                      ×
                    </button>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}

      {/* How to use footer */}
      {parsedDate && (
        <div style={{
          marginTop: 32, padding: '16px 20px', borderRadius: 10,
          background: C.cardBg, border: `1px solid ${C.cardBorder}`,
          fontSize: 12, color: C.steelMuted, lineHeight: 1.6,
        }}>
          <strong style={{ color: C.steel }}>How to use:</strong> Click any task to mark it complete. Add your own deadlines (college apps, exams, personal milestones) with the "+ Add Deadline" button. The timeline automatically adjusts based on your submission date.
        </div>
      )}
    </div>
  )
}
