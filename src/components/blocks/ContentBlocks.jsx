'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { COURSE_CATALOG } from '../../data/courseCatalog'

// Anthropic-Academy-style reader (2026-07 rebuild): typography carries the
// hierarchy. Near-black text, one accent (navy) for links only, space and thin
// rules between sections — no cards, no icon badges, no coloured callout chrome.
// Block-type names are unchanged so existing content keeps working; the old
// decorative styles are flattened into plain typography.

const NAVY = '#2E3250'
const INK = '#1a1a1e'

// ─── Placeholder — for [[COPY: …]] / [[IMAGE: …]] / [[GIF: …]] slots ────────────
export function Placeholder({ text }) {
  return (
    <div className="my-6 rounded-md border border-dashed px-4 py-3 text-sm"
      style={{ borderColor: 'rgba(46,50,80,0.35)', background: 'rgba(46,50,80,0.03)', color: 'rgba(46,50,80,0.75)' }}>
      <span className="font-mono text-xs">{text}</span>
    </div>
  )
}

// ─── Objectives / Estimated time (top of lesson) ───────────────────────────────
export function Objectives({ time, items, placeholder }) {
  return (
    <div className="mb-12">
      {time && (
        <p className="text-[1.0625rem] mb-8" style={{ color: INK }}>
          <span className="font-semibold">Estimated time:</span> {time}
        </p>
      )}
      <h2 className="font-serif text-2xl font-semibold mb-4" style={{ color: INK }}>Learning objectives</h2>
      {placeholder ? (
        <Placeholder text={placeholder} />
      ) : (
        <>
          <p className="mb-3" style={{ color: INK }}>By the end of this lesson, you will be able to:</p>
          <ul className="list-disc pl-6 space-y-2 leading-[1.7]" style={{ color: INK }}>
            {(items || []).map((it, i) => <li key={i}>{it}</li>)}
          </ul>
        </>
      )}
    </div>
  )
}

// ─── Paragraph ─────────────────────────────────────────────────────────────────
export function Paragraph({ text }) {
  return <p className="leading-[1.7] mb-6 text-[1.0625rem] break-words" style={{ color: INK }}>{text}</p>
}

// ─── Section heading — with a thin rule above (documentation feel) ─────────────
export function SectionHeading({ text }) {
  return (
    <h2 className="font-serif text-[1.6rem] font-semibold mt-14 mb-5 pt-10 leading-snug"
      style={{ color: INK, borderTop: '1px solid rgba(26,26,30,0.12)' }}>
      {text}
    </h2>
  )
}

// ─── Sub-heading ───────────────────────────────────────────────────────────────
export function SubHeading({ text }) {
  return <h3 className="font-serif text-xl font-semibold mt-10 mb-3 leading-snug" style={{ color: INK }}>{text}</h3>
}

// ─── Bullet list — real bullets, generous spacing ─────────────────────────────
export function BulletList({ items }) {
  return (
    <ul className="my-6 list-disc pl-6 space-y-2.5 leading-[1.7] text-[1.0625rem]" style={{ color: INK }}>
      {items.map((item, i) => <li key={i}>{item}</li>)}
    </ul>
  )
}

// ─── Numbered list ─────────────────────────────────────────────────────────────
export function NumberedSteps({ items }) {
  return (
    <ol className="my-6 list-decimal pl-6 space-y-2.5 leading-[1.7] text-[1.0625rem]" style={{ color: INK }}>
      {items.map((item, i) => <li key={i}>{item}</li>)}
    </ol>
  )
}

// ─── Note / callout — flat, single left rule (replaces tip/warning/callout) ────
function Note({ text, label }) {
  return (
    <div className="my-6 pl-5" style={{ borderLeft: `2px solid rgba(46,50,80,0.35)` }}>
      {label && <p className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: 'rgba(26,26,30,0.5)' }}>{label}</p>}
      <p className="leading-[1.7] text-[1.0625rem]" style={{ color: INK }}>{text}</p>
    </div>
  )
}
export const TipBox = ({ text }) => <Note text={text} />
export const WarningBox = ({ text }) => <Note text={text} />
export const Callout = ({ text }) => (
  <div className="my-6 pl-5" style={{ borderLeft: `2px solid rgba(46,50,80,0.35)` }}>
    {text.split('\n\n').map((line, i) => (
      <p key={i} className={`leading-[1.7] text-[1.0625rem] break-words ${i > 0 ? 'mt-3' : ''}`} style={{ color: INK }}>{line}</p>
    ))}
  </div>
)

// ─── Quote — simple left rule, italic (no black box) ──────────────────────────
export function QuoteHighlight({ text, attribution }) {
  return (
    <blockquote className="my-8 pl-6 italic" style={{ borderLeft: `3px solid ${NAVY}` }}>
      <p className="font-serif text-xl leading-[1.6]" style={{ color: INK }}>{text}</p>
      {attribution && <cite className="block mt-3 text-sm not-italic" style={{ color: 'rgba(26,26,30,0.55)' }}>— {attribution}</cite>}
    </blockquote>
  )
}

// ─── Key takeaways — plain heading + bullet list ──────────────────────────────
export function KeyTakeaway({ items }) {
  return (
    <div className="my-10 pt-10" style={{ borderTop: '1px solid rgba(26,26,30,0.12)' }}>
      <h2 className="font-serif text-[1.6rem] font-semibold mb-4" style={{ color: INK }}>Key takeaways</h2>
      <ul className="list-disc pl-6 space-y-2.5 leading-[1.7] text-[1.0625rem]" style={{ color: INK }}>
        {items.map((item, i) => <li key={i}>{item}</li>)}
      </ul>
    </div>
  )
}

// ─── Criteria — plain definition list (no coloured cards) ─────────────────────
export function CriteriaGrid({ items }) {
  return (
    <ul className="my-6 space-y-4 leading-[1.7] text-[1.0625rem]" style={{ color: INK }}>
      {items.map((item, i) => (
        <li key={i}>
          <span className="font-semibold">{item.label}{item.marks ? ` (${item.marks})` : ''}.</span> {item.text}
        </li>
      ))}
    </ul>
  )
}

// ─── Steps — plain numbered list with bold titles ─────────────────────────────
export function StepProcess({ steps }) {
  return (
    <ol className="my-6 list-decimal pl-6 space-y-3 leading-[1.7] text-[1.0625rem]" style={{ color: INK }}>
      {steps.map((step, i) => (
        <li key={i}><span className="font-semibold">{step.title}.</span> {step.text}</li>
      ))}
    </ol>
  )
}

// ─── Before / after — plain labelled lines ────────────────────────────────────
export function BeforeAfter({ before, after }) {
  return (
    <div className="my-6 space-y-3 leading-[1.7] text-[1.0625rem]" style={{ color: INK }}>
      <p><span className="font-semibold">{before.label}:</span> {before.text}</p>
      <p><span className="font-semibold">{after.label}:</span> {after.text}</p>
    </div>
  )
}

// ─── Icon card — icon dropped; plain bold-lead paragraph ──────────────────────
export function IconCard({ title, text }) {
  return <p className="my-3 leading-[1.7] text-[1.0625rem]" style={{ color: INK }}><span className="font-semibold">{title}.</span> {text}</p>
}

// ─── Stat highlight — plain large number, no black box ────────────────────────
export function StatHighlight({ stat, label }) {
  return (
    <p className="my-6 text-[1.0625rem]" style={{ color: INK }}>
      <span className="font-serif font-bold text-3xl mr-2" style={{ color: INK }}>{stat}</span>{label}
    </p>
  )
}

// ─── CTA — plain text link ────────────────────────────────────────────────────
export function CtaBox({ text, href, buttonText }) {
  return (
    <p className="my-6 leading-[1.7] text-[1.0625rem]" style={{ color: INK }}>
      {text}{' '}
      {href && <Link href={href} className="font-semibold underline underline-offset-2" style={{ color: NAVY }}>{buttonText || 'Start free'} →</Link>}
    </p>
  )
}

// ─── Formula — plain, mono, left rule ─────────────────────────────────────────
export function FormulaBox({ title, formula, description }) {
  return (
    <div className="my-6 pl-5" style={{ borderLeft: `2px solid rgba(46,50,80,0.35)` }}>
      {title && <p className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: 'rgba(26,26,30,0.5)' }}>{title}</p>}
      <p className="font-mono text-[1rem] font-semibold" style={{ color: INK }}>{formula}</p>
      {description && <p className="mt-2 leading-[1.7] text-[1.0625rem]" style={{ color: INK }}>{description}</p>}
    </div>
  )
}

// ─── Comparison / table — minimal, no shadows ─────────────────────────────────
export function ComparisonTable({ headers, rows }) {
  return (
    <div className="my-8 overflow-x-auto">
      <table className="w-full text-[0.95rem] border-collapse">
        <thead>
          <tr>
            {headers.map((h, i) => (
              <th key={i} className="text-left font-semibold py-2 pr-6" style={{ color: INK, borderBottom: '2px solid rgba(26,26,30,0.2)' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri}>
              {row.map((cell, ci) => (
                <td key={ci} className="py-2.5 pr-6 align-top leading-[1.6]" style={{ color: INK, borderBottom: '1px solid rgba(26,26,30,0.1)' }}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ─── GIF — minimal frame, caption below (kept per owner: personality stays) ───
export function GifBlock({ src, alt, caption }) {
  if (!src) return <Placeholder text={`[[GIF: ${alt || caption || 'add gif'}]]`} />
  const isGiphy = src.includes('giphy.com/embed')
  return (
    <figure className="my-8">
      {isGiphy ? (
        <div className="relative w-full rounded-lg overflow-hidden" style={{ paddingBottom: '56%' }}>
          <iframe src={src} className="absolute inset-0 w-full h-full" frameBorder="0" allow="autoplay" allowFullScreen loading="lazy" referrerPolicy="no-referrer" title={alt || 'GIF'} />
        </div>
      ) : (
        <img src={src} alt={alt || ''} className="w-full rounded-lg" loading="lazy" />
      )}
      {caption && <figcaption className="text-sm mt-2" style={{ color: 'rgba(26,26,30,0.55)' }}>{caption}</figcaption>}
    </figure>
  )
}

// ─── Image — minimal frame, caption below ─────────────────────────────────────
export function ImageBlock({ src, alt, caption, maxWidth }) {
  if (!src) return <Placeholder text={`[[IMAGE: ${alt || caption || 'add image'}]]`} />
  return (
    <figure className="my-8">
      <img src={src} alt={alt || ''} className="w-full rounded-lg" style={maxWidth ? { maxWidth } : undefined} loading="lazy" />
      {caption && <figcaption className="text-sm mt-2" style={{ color: 'rgba(26,26,30,0.55)' }}>{caption}</figcaption>}
    </figure>
  )
}

// ─── Progress check — kept minimal ─────────────────────────────────────────────
export function ProgressCheck({ moduleId, items }) {
  const storageKey = `ee_check_${moduleId}`
  const [checked, setChecked] = useState(() => {
    try { return JSON.parse(localStorage.getItem(storageKey) || '[]') } catch { return [] }
  })
  useEffect(() => { localStorage.setItem(storageKey, JSON.stringify(checked)) }, [checked, storageKey])
  const toggle = (idx) => setChecked(prev => prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx])
  return (
    <div className="my-8">
      <p className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: 'rgba(26,26,30,0.5)' }}>Self-check</p>
      <ul className="space-y-2.5">
        {items.map((item, i) => (
          <li key={i}>
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" checked={checked.includes(i)} onChange={() => toggle(i)} className="mt-1 w-4 h-4 cursor-pointer" />
              <span className={`leading-[1.7] text-[1.0625rem] ${checked.includes(i) ? 'line-through opacity-50' : ''}`} style={{ color: INK }}>{item}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  )
}

// ─── Code / copyable prompt — mono, boxed, preserves line breaks ──────────────
export function CodeBlock({ text }) {
  return (
    <pre
      className="my-6 rounded-lg p-4 overflow-x-auto text-[0.9rem] leading-[1.6] whitespace-pre-wrap break-words font-mono"
      style={{ background: '#f5f5f2', border: '1px solid rgba(26,26,30,0.1)', color: INK }}
    >{text}</pre>
  )
}

// ─── Lesson cards — little clickable cards, one per course lesson ─────────────
export function LessonCards() {
  return (
    <div className="my-8 grid grid-cols-2 sm:grid-cols-3 gap-2.5">
      {COURSE_CATALOG.map((m) => (
        <Link
          key={m.id}
          href={`/course/${m.id}`}
          className="block rounded-xl border px-3.5 py-3 no-underline transition-colors hover:bg-[rgba(46,50,80,0.03)]"
          style={{ borderColor: 'rgba(26,26,30,0.12)', color: INK }}
        >
          <span className="block text-[0.7rem] font-semibold" style={{ color: 'rgba(26,26,30,0.45)' }}>
            Guide {m.number}{m.free ? ' · Free' : ''}
          </span>
          <span className="block text-[0.9rem] font-medium leading-snug mt-1">{m.title}</span>
        </Link>
      ))}
    </div>
  )
}

// ─── Master switch ─────────────────────────────────────────────────────────────
export default function ContentBlock({ block }) {
  switch (block.type) {
    case 'objectives':       return <Objectives time={block.time} items={block.items} placeholder={block.placeholder} />
    case 'placeholder':      return <Placeholder text={block.text} />
    case 'heading':          return <SectionHeading text={block.text} />
    case 'subheading':       return <SubHeading text={block.text} />
    case 'paragraph':        return <Paragraph text={block.text} />
    case 'callout':          return <Callout text={block.text} />
    case 'list':             return <BulletList items={block.items} />
    case 'criteria':         return <CriteriaGrid items={block.items} />
    case 'before-after':     return <BeforeAfter before={block.before} after={block.after} />
    case 'icon-card':        return <IconCard icon={block.icon} title={block.title} text={block.text} />
    case 'stat-highlight':   return <StatHighlight stat={block.stat} label={block.label} />
    case 'step-process':     return <StepProcess steps={block.steps} />
    case 'tip-box':          return <TipBox text={block.text} />
    case 'warning-box':      return <WarningBox text={block.text} />
    case 'cta-box':          return <CtaBox label={block.label} text={block.text} href={block.href} buttonText={block.buttonText} />
    case 'gif':              return <GifBlock src={block.src} alt={block.alt} caption={block.caption} />
    case 'image':            return <ImageBlock src={block.src} alt={block.alt} caption={block.caption} maxWidth={block.maxWidth} />
    case 'numbered-steps':   return <NumberedSteps items={block.items} />
    case 'comparison-table': return <ComparisonTable headers={block.headers} rows={block.rows} />
    case 'formula-box':      return <FormulaBox title={block.title} formula={block.formula} description={block.description} />
    case 'quote-highlight':  return <QuoteHighlight text={block.text} attribution={block.attribution} />
    case 'key-takeaway':     return <KeyTakeaway items={block.items} />
    case 'progress-check':   return <ProgressCheck moduleId={block.moduleId} items={block.items} />
    case 'code':             return <CodeBlock text={block.text} />
    case 'lesson-cards':     return <LessonCards />
    default:                 return null
  }
}
