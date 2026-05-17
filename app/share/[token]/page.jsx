'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'

function Section({ title, children }) {
  return (
    <div className="mb-8">
      <h2 className="font-serif text-lg font-bold text-navy mb-4">{title}</h2>
      {children}
    </div>
  )
}

export default function ShareViewPage() {
  const { token } = useParams()
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/share-view?token=${token}`)
      .then(r => r.json())
      .then(d => {
        if (d.error) setError(d.error)
        else setData(d)
      })
      .catch(() => setError('Failed to load'))
      .finally(() => setLoading(false))
  }, [token])

  if (loading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="w-7 h-7 rounded-full border-[3px] border-navy/15 border-t-navy/50" style={{ animation: 'spin 0.8s linear infinite' }} />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center px-6">
        <div className="text-center">
          <p className="font-serif text-xl font-bold text-navy mb-2">Link not found</p>
          <p className="text-sm text-ink-soft mb-6">This share link may have been revoked or never existed.</p>
          <Link href="/" className="text-sm font-semibold text-navy underline underline-offset-2">Go to The Extended Essay Academy</Link>
        </div>
      </div>
    )
  }

  const { workspace, dump, planner } = data

  // Group dump entries by subtopic
  const subtopicMap = {}
  for (const entry of dump) {
    if (!subtopicMap[entry.subtopic]) subtopicMap[entry.subtopic] = []
    subtopicMap[entry.subtopic].push(entry)
  }

  // Group planner by phase
  const phaseMap = {}
  for (const m of planner) {
    if (!phaseMap[m.phase]) phaseMap[m.phase] = []
    phaseMap[m.phase].push(m)
  }

  const completedCount = planner.filter(m => m.completed).length

  return (
    <div className="min-h-screen bg-cream">
      <style>{`
        .share-essay { font-family: Georgia, serif; font-size: 15px; line-height: 1.85; color: #1a1a1a; }
        .share-essay p { margin: 0 0 1em; }
        .share-essay h1 { font-size: 1.5em; font-weight: 700; margin: 1.4em 0 0.5em; }
        .share-essay h2 { font-size: 1.2em; font-weight: 700; margin: 1.2em 0 0.4em; }
        .share-essay h3 { font-size: 1.05em; font-weight: 700; margin: 1em 0 0.3em; }
        .share-essay ul, .share-essay ol { padding-left: 1.4em; margin: 0 0 1em; }
        .share-essay li { margin-bottom: 0.25em; }
        .share-essay blockquote { border-left: 3px solid #0a0a0a; margin: 1.2em 0; padding: 0.3em 0 0.3em 1em; color: #555; font-style: italic; }
        .share-essay hr { border: none; border-top: 1px solid #e8e8e8; margin: 1.8em 0; }
        .share-essay strong { font-weight: 700; }
        .share-essay em { font-style: italic; }
      `}</style>
      {/* Header */}
      <div className="bg-navy py-8 px-6 mb-10">
        <div className="max-w-3xl mx-auto">
          <span className="text-xs font-bold text-cream/50 uppercase tracking-widest mb-2 block">View-only · EE HQ</span>
          <h1 className="font-serif text-2xl font-bold text-cream mb-1">
            {workspace?.research_question || 'Extended Essay Workspace'}
          </h1>
          <div className="flex flex-wrap gap-4 mt-3 text-xs text-steel">
            {workspace?.subject && <span>Subject: {workspace.subject}</span>}
            {workspace?.supervisor_name && <span>Supervisor: {workspace.supervisor_name}</span>}
            {workspace?.submission_deadline && (
              <span>Deadline: {new Date(workspace.submission_deadline).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 pb-20">
        {/* Planner summary */}
        {planner.length > 0 && (
          <Section title="Planner">
            <div className="mb-3 text-sm text-navy/60">{completedCount} of {planner.length} milestones complete</div>
            <div className="h-2 bg-navy/10 rounded-full overflow-hidden mb-4">
              <div className="h-full bg-navy/40 rounded-full" style={{ width: `${Math.round((completedCount / planner.length) * 100)}%` }} />
            </div>
            {Object.entries(phaseMap).map(([phase, milestones]) => (
              <div key={phase} className="mb-4">
                <p className="text-xs font-semibold text-navy/40 uppercase tracking-widest mb-2">{phase}</p>
                <div className="space-y-2">
                  {milestones.map((m, i) => (
                    <div key={i} className={`flex items-center gap-3 text-sm ${m.completed ? 'text-navy/40 line-through' : 'text-navy'}`}>
                      <span className={`w-4 h-4 rounded-full border flex-shrink-0 flex items-center justify-center ${m.completed ? 'bg-green-500 border-green-500' : 'border-navy/20'}`}>
                        {m.completed && <svg viewBox="0 0 10 10" className="w-2.5 h-2.5 text-white" fill="none"><path d="M2 5l2.5 2.5L8 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                      </span>
                      <span className="flex-1">{m.label}</span>
                      {m.due_date && <span className="text-xs text-navy/40">{new Date(m.due_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</span>}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </Section>
        )}

        {/* EE Dump */}
        {dump.length > 0 && (
          <Section title="EE Dump — Research Sources">
            {Object.entries(subtopicMap).map(([subtopic, entries]) => (
              <div key={subtopic} className="mb-6">
                <p className="text-xs font-bold text-navy/50 uppercase tracking-widest mb-2">{subtopic}</p>
                <div className="space-y-3">
                  {entries.map((e, i) => (
                    <div key={i} className="rounded-xl border border-navy/10 bg-white/60 px-4 py-3">
                      <div className="flex items-start justify-between gap-3 mb-1">
                        <p className="text-sm font-semibold text-navy">{e.source_name}</p>
                        <span className="text-xs text-navy/40 flex-shrink-0">{e.source_type}</span>
                      </div>
                      {e.key_info && <p className="text-xs text-navy/65 leading-relaxed">{e.key_info}</p>}
                      {e.link && (
                        <a href={e.link} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline mt-1 block truncate">{e.link}</a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </Section>
        )}

        {/* Essay draft */}
        {workspace?.essay_text && workspace.essay_text !== '<p></p>' && (
          <Section title="Essay Draft">
            <div
              className="share-essay rounded-xl border border-navy/10 bg-white/60 px-7 py-6"
              dangerouslySetInnerHTML={{ __html: workspace.essay_text }}
            />
            {workspace.essay_updated_at && (
              <p className="text-xs text-navy/30 mt-2">
                Last updated {new Date(workspace.essay_updated_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
            )}
          </Section>
        )}

        {dump.length === 0 && planner.length === 0 && !workspace?.essay_text && (
          <p className="text-center text-sm text-navy/40 py-20">No data added yet.</p>
        )}

        <p className="text-center text-xs text-navy/30 mt-12">
          Powered by <a href="https://theextendedessay.com" className="underline hover:text-navy/50">The Extended Essay Academy</a>
        </p>
      </div>
    </div>
  )
}
