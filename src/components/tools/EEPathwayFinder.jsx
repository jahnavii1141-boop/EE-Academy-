'use client'

import { useState } from 'react'

// Decision logic adapted from the IB Extended Essay "pathways" framework
// (Figure 5, Extended Essay Guide). Wording is original; credit to the IBO below.

const DP_SUBJECTS = [
  'Biology', 'Business Management', 'Chemistry', 'Computer Science', 'Economics',
  'English A: Literature', 'English A: Language & Literature', 'English B',
  'Environmental Systems & Societies', 'Geography', 'Global Politics', 'History',
  'Language B', 'Mathematics', 'Music', 'Philosophy', 'Physics', 'Psychology',
  'Social & Cultural Anthropology', 'Visual Arts', 'World Studies (interdisciplinary)',
]
// Subjects the IB does not allow on the interdisciplinary pathway
const INTERDISC_EXCLUDED = new Set(['Environmental Systems & Societies', 'Literature & Performance'])

const btn = 'rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors'
const primary = `${btn} bg-navy text-cream hover:bg-navy/90`
const ghost = `${btn} border border-navy/15 text-navy hover:bg-parchment/40`
const field = 'w-full rounded-xl border border-navy/15 bg-cream px-4 py-3 text-sm text-navy placeholder:text-navy/30 focus:outline-none focus:border-navy/40'
const label = 'block text-[11px] font-bold uppercase tracking-widest text-steel mb-2'

function Question({ kicker, title, help, children }) {
  return (
    <div>
      {kicker && <p className="text-[11px] font-bold uppercase tracking-widest text-steel mb-2">{kicker}</p>}
      <h3 className="font-serif text-lg font-bold text-navy mb-1">{title}</h3>
      {help && <p className="text-[13px] text-ink-soft mb-4 leading-relaxed">{help}</p>}
      {children}
    </div>
  )
}

function YesNo({ onYes, onNo }) {
  return (
    <div className="flex gap-2 mt-4">
      <button className={primary} onClick={onYes}>Yes</button>
      <button className={ghost} onClick={onNo}>No</button>
    </div>
  )
}

function Nav({ back, next, nextLabel = 'Continue', nextDisabled }) {
  return (
    <div className="flex justify-between items-center mt-5">
      <button className="text-xs font-semibold text-navy/40 hover:text-navy" onClick={back}>← Back</button>
      {next && <button className={primary} onClick={next} disabled={nextDisabled} style={{ opacity: nextDisabled ? 0.4 : 1 }}>{nextLabel}</button>}
    </div>
  )
}

export default function EEPathwayFinder() {
  const [step, setStep] = useState('topic')
  const [a, setA] = useState({
    topic: '', single: null, combine: null, pathway: null,
    subject1: '', subject2: '', framework: '', concepts: '', focus: '', rq: '',
  })
  const [copied, setCopied] = useState(false)
  const set = (patch) => setA(prev => ({ ...prev, ...patch }))

  const reset = () => {
    setA({ topic: '', single: null, combine: null, pathway: null, subject1: '', subject2: '', framework: '', concepts: '', focus: '', rq: '' })
    setStep('topic')
  }

  const summaryText = () => {
    const lines = [
      `EE Pathway Plan`,
      `Topic: ${a.topic || '—'}`,
      `Pathway: ${a.pathway === 'interdisciplinary' ? 'Interdisciplinary' : 'Subject-focused'}`,
      a.pathway === 'interdisciplinary'
        ? `Subjects: ${a.subject1} + ${a.subject2}${a.framework ? ` (framework: ${a.framework})` : ''}`
        : `Subject: ${a.subject1}`,
      `Concepts / methods that apply: ${a.concepts || '—'}`,
      `Focused topic: ${a.focus || '—'}`,
      `Working research question: ${a.rq || '—'}`,
      ``,
      `Reminder: be prepared to amend and refine your RQ as your research develops.`,
    ]
    return lines.join('\n')
  }
  const copy = () => {
    navigator.clipboard.writeText(summaryText())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div>
      {step === 'topic' && (
        <Question kicker="Start" title="What topic do you want to explore?" help="A broad interest is fine for now. You'll narrow it down as you go.">
          <textarea className={field} rows={2} value={a.topic} placeholder="e.g. the psychology behind why people fall for scams"
            onChange={e => set({ topic: e.target.value })} />
          <Nav back={reset} next={() => setStep('single')} nextDisabled={!a.topic.trim()} />
        </Question>
      )}

      {step === 'single' && (
        <Question kicker="Pathway" title="Could you explore this well through one DP subject?"
          help="If a single subject gives you enough to investigate the topic properly, that's usually the simpler, stronger route.">
          <YesNo
            onYes={() => { set({ single: 'yes', pathway: 'subject' }); setStep('subject-pick') }}
            onNo={() => { set({ single: 'no' }); setStep('combine') }}
          />
          <Nav back={() => setStep('topic')} />
        </Question>
      )}

      {step === 'combine' && (
        <Question kicker="Pathway" title="Would combining two subjects explore it better?"
          help="The interdisciplinary pathway suits topics that genuinely need two different lenses to answer.">
          <YesNo
            onYes={() => { set({ combine: 'yes', pathway: 'interdisciplinary' }); setStep('subjects-pick') }}
            onNo={() => { set({ combine: 'no' }); setStep('reconsider') }}
          />
          <Nav back={() => setStep('single')} />
        </Question>
      )}

      {step === 'reconsider' && (
        <Question kicker="Rethink" title="Your topic may need refining"
          help="If one subject isn't enough and two don't fit either, the topic is often too broad or not yet framed as a real question. Try narrowing it, then pick the pathway that fits.">
          <div className="flex gap-2 mt-4">
            <button className={primary} onClick={() => setStep('topic')}>Refine my topic</button>
            <button className={ghost} onClick={() => { set({ pathway: 'subject' }); setStep('subject-pick') }}>Go subject-focused anyway</button>
          </div>
          <Nav back={() => setStep('combine')} />
        </Question>
      )}

      {step === 'subject-pick' && (
        <Question kicker="Subject-focused pathway" title="Which subject is the best lens for your topic?"
          help="Pick the DP subject whose concepts and methods let you investigate this topic with the most depth.">
          <label className={label}>DP subject</label>
          <select className={field} value={a.subject1} onChange={e => set({ subject1: e.target.value })}>
            <option value="">Choose a subject…</option>
            {DP_SUBJECTS.filter(s => s !== 'World Studies (interdisciplinary)').map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <Nav back={() => setStep('single')} next={() => setStep('concepts')} nextDisabled={!a.subject1} />
        </Question>
      )}

      {step === 'subjects-pick' && (
        <Question kicker="Interdisciplinary pathway" title="Which two subjects could you combine?"
          help="Choose two DP subjects that bring genuinely different perspectives to your topic.">
          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <label className={label}>Subject one</label>
              <select className={field} value={a.subject1} onChange={e => set({ subject1: e.target.value })}>
                <option value="">Choose…</option>
                {DP_SUBJECTS.filter(s => !INTERDISC_EXCLUDED.has(s) && s !== a.subject2).map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className={label}>Subject two</label>
              <select className={field} value={a.subject2} onChange={e => set({ subject2: e.target.value })}>
                <option value="">Choose…</option>
                {DP_SUBJECTS.filter(s => !INTERDISC_EXCLUDED.has(s) && s !== a.subject1).map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
          <div className="mt-3">
            <label className={label}>Interdisciplinary framework <span className="font-normal normal-case tracking-normal text-navy/30">optional</span></label>
            <input className={field} value={a.framework} placeholder="e.g. World Studies theme, or how the two subjects integrate"
              onChange={e => set({ framework: e.target.value })} />
          </div>
          <p className="text-[12px] text-steel mt-3 leading-relaxed">
            Note: Environmental Systems &amp; Societies and Literature &amp; Performance can only be used on the subject-focused pathway, so they're excluded here.
          </p>
          <Nav back={() => setStep('combine')} next={() => setStep('concepts')} nextDisabled={!a.subject1 || !a.subject2} />
        </Question>
      )}

      {step === 'concepts' && (
        <Question kicker="Conceptualize" title="What concepts and methods apply?"
          help={a.pathway === 'interdisciplinary'
            ? 'What concepts, methods, and understandings from both subjects relate to your topic, and how could they be integrated?'
            : 'What concepts, methods, and understandings from this subject relate to your topic?'}>
          <textarea className={field} rows={3} value={a.concepts} placeholder="List the theories, frameworks, or methods you'd actually use…"
            onChange={e => set({ concepts: e.target.value })} />
          <Nav back={() => setStep(a.pathway === 'interdisciplinary' ? 'subjects-pick' : 'subject-pick')} next={() => setStep('refine')} nextDisabled={!a.concepts.trim()} />
        </Question>
      )}

      {step === 'refine' && (
        <Question kicker="Refine" title="Focus it so it fits 4,000 words"
          help="Narrow the topic until you could genuinely answer it in 4,000 words. Specific beats broad every time.">
          <textarea className={field} rows={2} value={a.focus} placeholder="The narrowed-down version of your topic…"
            onChange={e => set({ focus: e.target.value })} />
          <Nav back={() => setStep('concepts')} next={() => setStep('rq')} nextDisabled={!a.focus.trim()} />
        </Question>
      )}

      {step === 'rq' && (
        <Question kicker="Research question" title="Draft a focused research question"
          help="A real question you don't yet know the answer to, that you can investigate and respond to in 4,000 words.">
          <textarea className={field} rows={2} value={a.rq} placeholder="To what extent…"
            onChange={e => set({ rq: e.target.value })} />
          <Nav back={() => setStep('refine')} next={() => setStep('summary')} nextLabel="See my pathway" nextDisabled={!a.rq.trim()} />
        </Question>
      )}

      {step === 'summary' && (
        <div>
          <p className="text-[11px] font-bold uppercase tracking-widest text-steel mb-2">Your plan</p>
          <h3 className="font-serif text-lg font-bold text-navy mb-4">
            {a.pathway === 'interdisciplinary' ? 'Interdisciplinary pathway' : 'Subject-focused pathway'}
          </h3>
          <div className="rounded-xl border border-navy/10 bg-cream divide-y divide-navy/8">
            {[
              ['Topic', a.topic],
              [a.pathway === 'interdisciplinary' ? 'Subjects' : 'Subject', a.pathway === 'interdisciplinary' ? `${a.subject1} + ${a.subject2}` : a.subject1],
              a.pathway === 'interdisciplinary' && a.framework ? ['Framework', a.framework] : null,
              ['Concepts / methods', a.concepts],
              ['Focused topic', a.focus],
              ['Working RQ', a.rq],
            ].filter(Boolean).map(([k, v]) => (
              <div key={k} className="px-4 py-3">
                <p className="text-[10px] font-bold uppercase tracking-widest text-steel">{k}</p>
                <p className="text-sm text-navy mt-0.5 leading-relaxed">{v}</p>
              </div>
            ))}
          </div>
          <div className="rounded-xl bg-parchment/40 border border-navy/8 px-4 py-3 mt-3">
            <p className="text-[13px] text-ink-soft leading-relaxed">
              Be prepared to amend and refine your RQ as your research develops. The first version is rarely the final one.
            </p>
          </div>
          <div className="flex gap-2 mt-4">
            <button className={primary} onClick={copy}>{copied ? '✓ Copied' : 'Copy my plan'}</button>
            <button className={ghost} onClick={reset}>Start over</button>
          </div>
        </div>
      )}

      <p className="text-[11px] text-navy/35 mt-6 pt-4 border-t border-navy/8 leading-relaxed">
        Based on the IB Extended Essay pathways framework (Figure 5, <em>Extended Essay Guide</em>). The Extended Essay and the pathways framework are © International Baccalaureate Organization. This tool is an independent study aid and is not endorsed by the IBO.
      </p>
    </div>
  )
}
