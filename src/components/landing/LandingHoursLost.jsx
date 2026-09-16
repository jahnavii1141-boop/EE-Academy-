'use client'

import { useState } from 'react'

// The "____ hrs" blanks from the copy, made real: four inputs that live-total.
// Deliberately low-tech — no tracking, no submit. The number is for the reader.
const ROWS = [
  {
    key: 'rq',
    lead: 'Picking a topic and an RQ.',
    body: 'Sessions you finished with nothing decided. How many research questions have you written and thrown away?',
  },
  {
    key: 'descriptive',
    lead: 'Rewriting descriptive paragraphs.',
    body: 'The ones you wrote, reread, realised were just explaining, and did again.',
  },
  {
    key: 'sources',
    lead: 'Re-finding sources.',
    body: 'Hunting for a quote you know you read somewhere, because you never noted where it came from.',
  },
  {
    key: 'drafts',
    lead: 'Waiting on drafts.',
    body: 'Sent to your supervisor. Waited. Got a comment you didn’t understand. Reworked it. Sent it again.',
  },
]

export default function LandingHoursLost() {
  const [hours, setHours] = useState({})
  const total = ROWS.reduce((sum, r) => sum + (Number(hours[r.key]) || 0), 0)

  const setRow = (key, value) => {
    // Keep it a non-negative number, allow empty while typing.
    if (value === '') return setHours((h) => ({ ...h, [key]: '' }))
    const n = Math.max(0, Number(value))
    if (!Number.isNaN(n)) setHours((h) => ({ ...h, [key]: n }))
  }

  return (
    <section className="bg-parchment/30 px-6 py-20">
      <div className="max-w-2xl mx-auto">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-navy mb-3">
          How many hours have you already lost?
        </h2>
        <p className="text-[1.0625rem] leading-[1.75] text-navy/80 mb-8">
          Be honest. Count only the time that produced nothing you kept.
        </p>

        <div className="rounded-2xl border border-navy/10 bg-white overflow-hidden">
          {ROWS.map((r, i) => (
            <div
              key={r.key}
              className="flex items-start gap-4 px-5 py-5"
              style={{ borderTop: i === 0 ? 'none' : '1px solid rgba(46,50,80,0.07)' }}
            >
              <label htmlFor={`hrs-${r.key}`} className="flex-1 min-w-0 cursor-text">
                <span className="block text-[15px] font-semibold text-navy leading-snug">{r.lead}</span>
                <span className="block text-[13px] leading-snug text-ink-soft mt-1">{r.body}</span>
              </label>
              <div className="flex items-baseline gap-1.5 flex-shrink-0">
                <input
                  id={`hrs-${r.key}`}
                  type="number"
                  min="0"
                  inputMode="numeric"
                  placeholder="0"
                  value={hours[r.key] ?? ''}
                  onChange={(e) => setRow(r.key, e.target.value)}
                  className="w-16 text-right tabular-nums text-lg font-semibold text-navy bg-cream/60 border border-navy/15 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-navy/30"
                  aria-label={`${r.lead} hours`}
                />
                <span className="text-sm text-ink-soft">hrs</span>
              </div>
            </div>
          ))}

          <div className="flex items-center justify-between px-5 py-4 bg-navy">
            <span className="text-[15px] font-semibold text-cream">Total</span>
            <span className="tabular-nums font-serif text-2xl font-bold text-cream">
              {total} <span className="text-base font-sans font-semibold text-cream/70">hrs</span>
            </span>
          </div>
        </div>

        <div className="space-y-4 text-[1.0625rem] leading-[1.75] text-navy/90 mt-8">
          <p>
            Now put that number next to your IAs, your papers, and the mocks you haven&rsquo;t started.
          </p>
          <p>
            That&rsquo;s what this is for. Not getting you an A you could probably scrape anyway.
            Getting you there without spending your Diploma on it.
          </p>
        </div>
      </div>
    </section>
  )
}
