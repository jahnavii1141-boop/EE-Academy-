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

// ─── Existing block types (extracted from CourseModulePage) ──────────────────

export function Paragraph({ text }) {
  return <p className="text-navy/75 leading-[1.85] mb-5 text-[1.0625rem]">{text}</p>
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
    <div className="my-8 relative pl-6 border-l-[3px] border-navy/30">
      {text.split('\n\n').map((line, i) => (
        <p key={i} className={`font-serif text-navy text-lg leading-relaxed italic ${i > 0 ? 'mt-3' : ''}`}>
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
        <li key={i} className="flex items-start gap-3.5 text-navy/75 leading-relaxed">
          <span className="mt-[0.45rem] w-1.5 h-1.5 rounded-full bg-navy/40 flex-shrink-0" />
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
        <div key={i} className="bg-parchment/40 border border-navy/8 rounded-2xl p-5">
          <div className="flex flex-wrap items-center gap-2 mb-2.5">
            <span className="font-semibold text-navy text-sm">{item.label}</span>
            {item.marks && (
              <span className="text-xs bg-navy/8 text-navy/70 px-2.5 py-0.5 rounded-full font-medium">
                {item.marks}
              </span>
            )}
          </div>
          <p className="text-navy/65 text-sm leading-relaxed">{item.text}</p>
        </div>
      ))}
    </div>
  )
}

export function BeforeAfter({ before, after }) {
  return (
    <div className="my-8 grid sm:grid-cols-2 gap-4">
      <div className="rounded-2xl border-2 border-red-200 bg-red-50/60 p-5">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-red-500 uppercase tracking-wider mb-3">
          <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
          {before.label}
        </span>
        <p className="text-navy/70 text-sm leading-relaxed font-serif italic">{before.text}</p>
      </div>
      <div className="rounded-2xl border-2 border-green-200 bg-green-50/60 p-5">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-green-600 uppercase tracking-wider mb-3">
          <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          {after.label}
        </span>
        <p className="text-navy/70 text-sm leading-relaxed font-serif italic">{after.text}</p>
      </div>
    </div>
  )
}

// ─── NEW visual block types ─────────────────────────────────────────────────

export function IconCard({ icon, title, text }) {
  const Icon = ICON_MAP[icon] || Target
  return (
    <div className="bg-parchment/40 border border-navy/8 rounded-2xl p-5 hover:shadow-md transition-shadow">
      <div className="w-10 h-10 rounded-xl bg-navy/8 flex items-center justify-center mb-3">
        <Icon className="w-5 h-5 text-navy/70" />
      </div>
      <h4 className="font-semibold text-navy text-sm mb-1.5">{title}</h4>
      <p className="text-navy/60 text-sm leading-relaxed">{text}</p>
    </div>
  )
}

export function StatHighlight({ stat, label }) {
  return (
    <div className="bg-navy text-center rounded-2xl p-6">
      <p className="font-serif text-4xl font-bold text-cream mb-1">{stat}</p>
      <p className="text-steel text-sm">{label}</p>
    </div>
  )
}

export function StepProcess({ steps }) {
  return (
    <div className="my-8 space-y-0">
      {steps.map((step, i) => (
        <div key={i} className="flex gap-4">
          {/* Timeline line + dot */}
          <div className="flex flex-col items-center flex-shrink-0">
            <div className="w-8 h-8 rounded-full bg-navy flex items-center justify-center text-cream font-bold text-xs flex-shrink-0">
              {i + 1}
            </div>
            {i < steps.length - 1 && (
              <div className="w-0.5 flex-1 bg-navy/15 my-1" />
            )}
          </div>
          {/* Content */}
          <div className="pb-6 pt-1 flex-1">
            <h4 className="font-semibold text-navy text-sm mb-1">{step.title}</h4>
            <p className="text-navy/60 text-sm leading-relaxed">{step.text}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export function TipBox({ text }) {
  return (
    <div className="my-6 flex gap-3 bg-emerald-50/80 border border-emerald-200 rounded-2xl p-5">
      <Lightbulb className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
      <div>
        <p className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">Pro Tip</p>
        <p className="text-emerald-900/70 text-sm leading-relaxed">{text}</p>
      </div>
    </div>
  )
}

export function WarningBox({ text }) {
  return (
    <div className="my-6 flex gap-3 bg-amber-50/80 border border-amber-200 rounded-2xl p-5">
      <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
      <div>
        <p className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-1">Watch Out</p>
        <p className="text-amber-900/70 text-sm leading-relaxed">{text}</p>
      </div>
    </div>
  )
}

export function GifBlock({ src, alt, caption }) {
  const isGiphy = src?.includes('giphy.com/embed')
  return (
    <figure className="my-8">
      {isGiphy ? (
        <div className="relative w-full overflow-hidden rounded-xl" style={{ paddingBottom: '56%' }}>
          <iframe
            src={src}
            className="absolute inset-0 w-full h-full"
            frameBorder="0"
            allowFullScreen
            loading="lazy"
            title={alt || 'Animated GIF'}
          />
        </div>
      ) : (
        <img
          src={src}
          alt={alt || ''}
          className="w-full rounded-xl"
          loading="lazy"
        />
      )}
      {caption && (
        <figcaption className="text-center text-navy/50 text-xs mt-2 italic">{caption}</figcaption>
      )}
    </figure>
  )
}

export function NumberedSteps({ items }) {
  return (
    <ol className="my-6 space-y-3">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <span className="w-6 h-6 rounded-full bg-navy/10 text-navy font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
            {i + 1}
          </span>
          <span className="text-navy/75 text-sm leading-relaxed">{item}</span>
        </li>
      ))}
    </ol>
  )
}

export function ComparisonTable({ headers, rows }) {
  return (
    <div className="my-8 overflow-x-auto">
      <table className="w-full text-sm border-collapse rounded-xl overflow-hidden">
        <thead>
          <tr>
            {headers.map((h, i) => (
              <th key={i} className="bg-navy text-cream font-semibold text-left px-4 py-3 first:rounded-tl-xl last:rounded-tr-xl">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} className={ri % 2 === 0 ? 'bg-parchment/30' : 'bg-cream'}>
              {row.map((cell, ci) => (
                <td key={ci} className="px-4 py-3 text-navy/70 border-t border-navy/5">
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
    <div className="my-8 bg-navy-deep rounded-2xl p-6 border border-navy-light/30">
      {title && (
        <p className="text-steel text-xs font-bold uppercase tracking-widest mb-2">{title}</p>
      )}
      <p className="font-serif text-cream text-xl font-bold leading-snug mb-3">{formula}</p>
      {description && (
        <p className="text-steel/80 text-sm leading-relaxed">{description}</p>
      )}
    </div>
  )
}

export function QuoteHighlight({ text, attribution }) {
  return (
    <blockquote className="my-8 bg-parchment/60 border border-navy/8 rounded-2xl p-6 text-center">
      <Quote className="w-6 h-6 text-navy/20 mx-auto mb-3" />
      <p className="font-serif text-navy text-lg italic leading-relaxed mb-2">{text}</p>
      {attribution && (
        <cite className="text-navy/50 text-sm not-italic">-- {attribution}</cite>
      )}
    </blockquote>
  )
}

export function KeyTakeaway({ items }) {
  return (
    <div className="my-8 border-l-4 border-navy bg-parchment/30 rounded-r-2xl p-5">
      <div className="flex items-center gap-2 mb-3">
        <BookmarkCheck className="w-4 h-4 text-navy" />
        <p className="text-xs font-bold text-navy uppercase tracking-widest">Key Takeaways</p>
      </div>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2.5 text-navy/70 text-sm leading-relaxed">
            <Star className="w-3.5 h-3.5 text-navy/40 flex-shrink-0 mt-1" />
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
    <div className="my-8 border border-navy/10 rounded-2xl p-5 bg-cream">
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs font-bold text-navy uppercase tracking-widest">Self-Check</p>
        <span className="text-xs text-navy/50">{pct}% complete</span>
      </div>
      <div className="h-1.5 bg-navy/8 rounded-full mb-4">
        <div
          className="h-full bg-navy/40 rounded-full transition-all duration-300"
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
                className="mt-1 w-4 h-4 rounded border-navy/20 text-navy focus:ring-navy/30 cursor-pointer"
              />
              <span className={`text-sm leading-relaxed transition-colors ${
                checked.includes(i) ? 'text-navy/40 line-through' : 'text-navy/70 group-hover:text-navy'
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
    case 'numbered-steps':  return <NumberedSteps items={block.items} />
    case 'comparison-table': return <ComparisonTable headers={block.headers} rows={block.rows} />
    case 'formula-box':     return <FormulaBox title={block.title} formula={block.formula} description={block.description} />
    case 'quote-highlight': return <QuoteHighlight text={block.text} attribution={block.attribution} />
    case 'key-takeaway':    return <KeyTakeaway items={block.items} />
    case 'progress-check':  return <ProgressCheck moduleId={block.moduleId} items={block.items} />
    default:                return null
  }
}
