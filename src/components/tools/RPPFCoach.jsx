'use client'
import { useState } from 'react'

const FIELDS = [
  {
    id: 'r1',
    label: 'First reflection',
    milestone: 'Milestone 1',
    cap: 150,
    rows: 5,
    placeholder: 'Describe your initial understanding of the topic and why you chose it...',
  },
  {
    id: 'r2',
    label: 'Interim reflection',
    milestone: 'Milestone 2',
    cap: 150,
    rows: 5,
    placeholder: 'Reflect on your research progress and any challenges faced...',
  },
  {
    id: 'r3',
    label: 'Final viva voce reflection',
    milestone: 'Milestone 3',
    cap: 200,
    rows: 6,
    placeholder: 'Reflect on what you learned through the EE process and how your thinking evolved...',
  },
]

function countWords(text) {
  return text.trim() ? text.trim().split(/\s+/).filter(Boolean).length : 0
}

export default function RPPFCoach() {
  const [values, setValues] = useState({ r1: '', r2: '', r3: '' })

  const wc = {
    r1: countWords(values.r1),
    r2: countWords(values.r2),
    r3: countWords(values.r3),
  }
  const total = wc.r1 + wc.r2 + wc.r3
  const totalOver = total > 500
  const excess = total - 500

  return (
    <div>
      <div className="flex items-center gap-4 px-4 py-3 rounded-xl bg-cream border border-parchment mb-4">
        <div>
          <p className="text-[11px] font-medium text-steel uppercase tracking-widest">Total word count</p>
          <p className={`text-[22px] font-medium leading-none mt-1 ${totalOver ? 'text-red-500' : 'text-navy'}`}>
            {total} <span className="text-[14px] font-normal text-steel">/ 500</span>
          </p>
        </div>
        {totalOver && (
          <div className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium"
            style={{ background: '#FEF2F2', border: '1px solid #FECACA', color: '#991B1B' }}>
            <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 14 14" fill="none">
              <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.2" />
              <path d="M7 4.5v3M7 9v.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            RPPF hard limit exceeded — trim {excess} word{excess === 1 ? '' : 's'}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-4">
        {FIELDS.map(f => {
          const w = wc[f.id]
          const over = w > f.cap
          return (
            <div key={f.id}>
              <div className="flex items-baseline gap-2 mb-1.5">
                <p className="text-[11px] font-medium text-steel uppercase tracking-widest">{f.label}</p>
                <span className="text-[11px] text-steel/50">{f.milestone}</span>
              </div>
              <textarea
                value={values[f.id]}
                onChange={e => setValues(v => ({ ...v, [f.id]: e.target.value }))}
                placeholder={f.placeholder}
                rows={f.rows}
                className={`w-full border rounded-xl px-3 py-2.5 text-[13px] text-navy leading-relaxed bg-white resize-none focus:outline-none transition-colors ${
                  over
                    ? 'border-amber-300 focus:border-amber-400'
                    : 'border-parchment focus:border-steel'
                }`}
              />
              <div className="flex items-center justify-between mt-1">
                <span className={`text-[12px] ${over ? 'font-medium' : ''}`}
                  style={{ color: over ? '#92400E' : '#9BAAB8' }}>
                  {w} / {f.cap} words{over ? ` — ${w - f.cap} over soft cap` : ''}
                </span>
                {!over && (
                  <span className="text-[11px]" style={{ color: '#B8B4A0' }}>soft cap: {f.cap}</span>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
