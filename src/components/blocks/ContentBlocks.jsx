import { useState, useEffect } from 'react'
import {
  Lightbulb, AlertTriangle, Star, BookmarkCheck, Target, Brain,
  Search, PenLine, FileText, CheckCircle2, Zap, BookOpen,
  GraduationCap, Award, Clipboard, Layout, Quote, ArrowRight,
} from 'lucide-react'

// ─── Icon map for icon-card blocks ─────────────────────────────────────────────

const ICON_MAP = {
  Target, Brain, Search, PenLine, FileText, CheckCircle2, Zap, BookOpen,
  GraduationCap, Award, Clipboard, Layout, Lightbulb, AlertTriangle, Star,
  BookmarkCheck, Quote, ArrowRight,
}

// ─── Base block types ──────────────────────────────────────────────────────────

export function Paragraph({ text }) {
  return <p className="text-navy/90 leading-[1.85] mb-5 text-[1.0625rem]">{text}</p>
}

export function SectionHeading({ text }) {
  return (
    <h3 className="font-serif text-2xl font-bold text-navy mt-12 mb-4 leading-snug">
      {text}
    </h3>
  )
}

export function Callout({ text }) {
  return (
    <div className="my-8 relative pl-6 border-l-[3px] border-navy/20">
      {text.split('\n\n').map((line, i) => (
        <p key={i} className={`font-serif text-navy/90 text-lg leading-relaxed italic ${i > 0 ? 'mt-3' : ''}`}>
          {line}
        </p>
      ))}
    </div>
  )
}

export function BulletList({ items }) {
  return (
    <ul className="my-5 space-y-3">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3.5 text-navy/85 leading-relaxed">
          <span className="mt-[0.45rem] w-1.5 h-1.5 rounded-full bg-navy/30 flex-shrink-0" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

export function CriteriaGrid({ items }) {
  return (
    <div className="my-8 grid sm:grid-cols-2 gap-3">
      {items.map((item, i) => (
        <div key={i} className="border border-navy/8 rounded-xl p-5">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="font-semibold text-navy text-sm">{item.label}</span>
            {item.marks && (
              <span className="text-xs bg-navy/6 text-navy/60 px-2.5 py-0.5 rounded-full font-medium">
                {item.marks}
              </span>
            )}
          </div>
          <p className="text-navy/80 text-sm leading-relaxed">{item.text}</p>
        </div>
      ))}
    </div>
  )
}

export function BeforeAfter({ before, after }) {
  return (
    <div className="my-8 grid sm:grid-cols-2 gap-4">
      <div className="rounded-xl border border-red-200/80 bg-red-50/40 p-5">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-400 uppercase tracking-wider mb-3">
          <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
          {before.label}
        </span>
        <p className="text-navy/80 text-sm leading-relaxed italic">{before.text}</p>
      </div>
      <div className="rounded-xl border border-green-200/80 bg-green-50/40 p-5">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-green-500 uppercase tracking-wider mb-3">
          <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          {after.label}
        </span>
        <p className="text-navy/80 text-sm leading-relaxed italic">{after.text}</p>
      </div>
    </div>
  )
}

// ─── Visual block types (toned down, course-like) ──────────────────────────────

export function IconCard({ icon, title, text }) {
  const Icon = ICON_MAP[icon] || Target
  return (
    <div className="border border-navy/8 rounded-xl p-5 transition-colors hover:bg-parchment/20">
      <div className="flex items-start gap-3.5">
        <Icon className="w-4.5 h-4.5 text-navy/40 flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="font-semibold text-navy text-sm mb-1">{title}</h4>
          <p className="text-navy/80 text-sm leading-relaxed">{text}</p>
        </div>
      </div>
    </div>
  )
}

export function StatHighlight({ stat, label }) {
  return (
    <div className="text-center py-5 px-4">
      <p className="font-serif text-3xl font-bold text-navy mb-1">{stat}</p>
      <div className="w-8 h-px bg-navy/15 mx-auto mb-2" />
      <p className="text-navy/75 text-sm">{label}</p>
    </div>
  )
}

export function StepProcess({ steps }) {
  return (
    <div className="my-8 space-y-0">
      {steps.map((step, i) => (
        <div key={i} className="flex gap-4">
          {/* Timeline */}
          <div className="flex flex-col items-center flex-shrink-0">
            <div className="w-7 h-7 rounded-full border-2 border-navy/20 bg-cream flex items-center justify-center text-navy/60 font-semibold text-xs flex-shrink-0">
              {i + 1}
            </div>
            {i < steps.length - 1 && (
              <div className="w-px flex-1 bg-navy/10 my-1" />
            )}
          </div>
          {/* Content */}
          <div className="pb-6 pt-0.5 flex-1">
            <h4 className="font-semibold text-navy text-sm mb-1">{step.title}</h4>
            <p className="text-navy/80 text-sm leading-relaxed">{step.text}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export function TipBox({ text }) {
  return (
    <div className="my-6 flex gap-3 border-l-2 border-emerald-400/60 pl-5 py-3">
      <Lightbulb className="w-4 h-4 text-emerald-500/70 flex-shrink-0 mt-0.5" />
      <div>
        <p className="text-xs font-semibold text-emerald-600/80 uppercase tracking-wider mb-1">Tip</p>
        <p className="text-navy/80 text-sm leading-relaxed">{text}</p>
      </div>
    </div>
  )
}

export function WarningBox({ text }) {
  return (
    <div className="my-6 flex gap-3 border-l-2 border-amber-400/60 pl-5 py-3">
      <AlertTriangle className="w-4 h-4 text-amber-500/70 flex-shrink-0 mt-0.5" />
      <div>
        <p className="text-xs font-semibold text-amber-600/80 uppercase tracking-wider mb-1">Note</p>
        <p className="text-navy/80 text-sm leading-relaxed">{text}</p>
      </div>
    </div>
  )
}

export function GifBlock({ src, alt, caption }) {
  const isGiphy = src?.includes('giphy.com/embed')
  return (
    <figure className="my-8">
      {isGiphy ? (
        <div className="relative w-full overflow-hidden rounded-lg" style={{ paddingBottom: '56%' }}>
          <iframe
            src={src}
            className="absolute inset-0 w-full h-full"
            frameBorder="0"
            allow="autoplay"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer"
            title={alt || 'Animated GIF'}
          />
        </div>
      ) : (
        <img
          src={src}
          alt={alt || ''}
          className="w-full rounded-lg"
          loading="lazy"
        />
      )}
      {caption && (
        <figcaption className="text-center text-navy/60 text-xs mt-2.5 italic">{caption}</figcaption>
      )}
    </figure>
  )
}

export function ImageBlock({ src, alt, caption, maxWidth }) {
  return (
    <figure className="my-8">
      <img
        src={src}
        alt={alt || ''}
        className="w-full rounded-lg"
        style={maxWidth ? { maxWidth } : undefined}
        loading="lazy"
      />
      {caption && (
        <figcaption className="text-center text-navy/60 text-xs mt-2.5 italic">{caption}</figcaption>
      )}
    </figure>
  )
}

export function NumberedSteps({ items }) {
  return (
    <ol className="my-6 space-y-3">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <span className="w-5 h-5 rounded-full border border-navy/15 text-navy/50 font-semibold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
            {i + 1}
          </span>
          <span className="text-navy/85 text-sm leading-relaxed">{item}</span>
        </li>
      ))}
    </ol>
  )
}

export function ComparisonTable({ headers, rows }) {
  return (
    <div className="my-8 overflow-x-auto">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr>
            {headers.map((h, i) => (
              <th key={i} className="bg-navy/5 font-semibold text-navy text-left px-4 py-3 border-b border-navy/10 first:rounded-tl-lg last:rounded-tr-lg">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri}>
              {row.map((cell, ci) => (
                <td key={ci} className="px-4 py-3 text-navy/80 border-b border-navy/5">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function FormulaBox({ title, formula, description }) {
  return (
    <div className="my-8 bg-parchment/40 rounded-xl p-6 border-l-3 border-navy/25">
      {title && (
        <p className="text-navy/45 text-xs font-semibold uppercase tracking-widest mb-2">{title}</p>
      )}
      <p className="font-serif text-navy text-lg font-semibold leading-snug mb-2">{formula}</p>
      {description && (
        <p className="text-navy/75 text-sm leading-relaxed">{description}</p>
      )}
    </div>
  )
}

export function QuoteHighlight({ text, attribution }) {
  return (
    <blockquote className="my-8 pl-6 border-l-2 border-navy/15">
      <p className="font-serif text-navy/90 text-lg italic leading-relaxed mb-2">{text}</p>
      {attribution && (
        <cite className="text-navy/60 text-sm not-italic">— {attribution}</cite>
      )}
    </blockquote>
  )
}

export function KeyTakeaway({ items }) {
  return (
    <div className="my-8 border-l-3 border-navy/20 bg-parchment/20 rounded-r-xl pl-5 pr-5 py-5">
      <div className="flex items-center gap-2 mb-3">
        <BookmarkCheck className="w-4 h-4 text-navy/40" />
        <p className="text-xs font-semibold text-navy/50 uppercase tracking-widest">Key Takeaways</p>
      </div>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2.5 text-navy/80 text-sm leading-relaxed">
            <span className="mt-[0.45rem] w-1 h-1 rounded-full bg-navy/30 flex-shrink-0" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function ProgressCheck({ moduleId, items }) {
  const storageKey = `ee_check_${moduleId}`
  const [checked, setChecked] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(storageKey) || '[]')
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(checked))
  }, [checked, storageKey])

  const toggle = (idx) => {
    setChecked(prev =>
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    )
  }

  const pct = items.length ? Math.round((checked.length / items.length) * 100) : 0

  return (
    <div className="my-8 border border-navy/8 rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs font-semibold text-navy/50 uppercase tracking-widest">Self-Check</p>
        <span className="text-xs text-navy/40">{pct}%</span>
      </div>
      <div className="h-1 bg-navy/6 rounded-full mb-4">
        <div
          className="h-full bg-navy/25 rounded-full transition-all duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
      <ul className="space-y-2.5">
        {items.map((item, i) => (
          <li key={i}>
            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={checked.includes(i)}
                onChange={() => toggle(i)}
                className="mt-0.5 w-4 h-4 rounded border-navy/15 text-navy/50 focus:ring-navy/20 cursor-pointer"
              />
              <span className={`text-sm leading-relaxed transition-colors ${
                checked.includes(i) ? 'text-navy/45 line-through' : 'text-navy/80'
              }`}>
                {item}
              </span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  )
}

// ─── Master switch renderer ─────────────────────────────────────────────────

export default function ContentBlock({ block }) {
  switch (block.type) {
    case 'heading':         return <SectionHeading text={block.text} />
    case 'paragraph':       return <Paragraph text={block.text} />
    case 'callout':         return <Callout text={block.text} />
    case 'list':            return <BulletList items={block.items} />
    case 'criteria':        return <CriteriaGrid items={block.items} />
    case 'before-after':    return <BeforeAfter before={block.before} after={block.after} />
    case 'icon-card':       return <IconCard icon={block.icon} title={block.title} text={block.text} />
    case 'stat-highlight':  return <StatHighlight stat={block.stat} label={block.label} />
    case 'step-process':    return <StepProcess steps={block.steps} />
    case 'tip-box':         return <TipBox text={block.text} />
    case 'warning-box':     return <WarningBox text={block.text} />
    case 'gif':             return <GifBlock src={block.src} alt={block.alt} caption={block.caption} />
    case 'image':           return <ImageBlock src={block.src} alt={block.alt} caption={block.caption} maxWidth={block.maxWidth} />
    case 'numbered-steps':  return <NumberedSteps items={block.items} />
    case 'comparison-table': return <ComparisonTable headers={block.headers} rows={block.rows} />
    case 'formula-box':     return <FormulaBox title={block.title} formula={block.formula} description={block.description} />
    case 'quote-highlight': return <QuoteHighlight text={block.text} attribution={block.attribution} />
    case 'key-takeaway':    return <KeyTakeaway items={block.items} />
    case 'progress-check':  return <ProgressCheck moduleId={block.moduleId} items={block.items} />
    default:                return null
  }
}
