import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Lightbulb, AlertTriangle, Star, BookmarkCheck, Target, Brain,
  Search, PenLine, FileText, CheckCircle2, Zap, BookOpen,
  GraduationCap, Award, Clipboard, Layout, Quote, ArrowRight, Sparkles,
} from 'lucide-react'

// ─── Icon map ──────────────────────────────────────────────────────────────────

const ICON_MAP = {
  Target, Brain, Search, PenLine, FileText, CheckCircle2, Zap, BookOpen,
  GraduationCap, Award, Clipboard, Layout, Lightbulb, AlertTriangle, Star,
  BookmarkCheck, Quote, ArrowRight,
}

// ─── Paragraph ─────────────────────────────────────────────────────────────────

export function Paragraph({ text }) {
  return (
    <p className="text-[#1a1a1a]/85 leading-[1.9] mb-6 text-[1.0625rem] font-normal">
      {text}
    </p>
  )
}

// ─── Heading ───────────────────────────────────────────────────────────────────

export function SectionHeading({ text }) {
  return (
    <h3 className="font-semibold text-[#0a0a0a] text-xl mt-14 mb-5 leading-snug tracking-[-0.02em]">
      {text}
    </h3>
  )
}

// ─── Callout — monospace code-block style ──────────────────────────────────────

export function Callout({ text }) {
  return (
    <div className="my-8 rounded-xl overflow-hidden border border-[#e8e8e8]">
      {/* header bar */}
      <div className="flex items-center gap-1.5 px-4 py-3 border-b border-[#e8e8e8]" style={{ background: '#f8f8f8' }}>
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#ff5f57' }} />
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#ffbd2e' }} />
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#28ca42' }} />
      </div>
      {/* content */}
      <div className="p-5 bg-white">
        {text.split('\n\n').map((line, i) => (
          <p key={i} className={`font-mono text-[0.875rem] text-[#1a1a1a] leading-[1.8] whitespace-pre-wrap ${i > 0 ? 'mt-4' : ''}`}>
            {line}
          </p>
        ))}
      </div>
    </div>
  )
}

// ─── Bullet list ───────────────────────────────────────────────────────────────

export function BulletList({ items }) {
  return (
    <ul className="my-6 space-y-3 pl-1">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3 text-[#1a1a1a]/80 leading-relaxed text-[0.9375rem]">
          <span className="mt-[0.55rem] w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#d4d4d4' }} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

// ─── Criteria grid ─────────────────────────────────────────────────────────────

export function CriteriaGrid({ items }) {
  const COLORS = [
    { bg: '#f0f7ff', border: '#bfdbfe', dot: '#3b82f6' },
    { bg: '#f0fdf4', border: '#bbf7d0', dot: '#22c55e' },
    { bg: '#fff7ed', border: '#fed7aa', dot: '#f97316' },
    { bg: '#fdf4ff', border: '#e9d5ff', dot: '#a855f7' },
    { bg: '#fef2f2', border: '#fecaca', dot: '#ef4444' },
  ]
  return (
    <div className="my-8 grid sm:grid-cols-2 gap-3">
      {items.map((item, i) => {
        const c = COLORS[i % COLORS.length]
        return (
          <div key={i} className="rounded-xl p-5 border" style={{ background: c.bg, borderColor: c.border }}>
            <div className="flex items-center gap-2 mb-2.5">
              <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: c.dot }} />
              <span className="font-semibold text-[#0a0a0a] text-sm">{item.label}</span>
              {item.marks && (
                <span className="ml-auto text-xs font-semibold px-2 py-0.5 rounded-full bg-white/70 text-[#555]">
                  {item.marks}
                </span>
              )}
            </div>
            <p className="text-[#1a1a1a]/75 text-sm leading-relaxed">{item.text}</p>
          </div>
        )
      })}
    </div>
  )
}

// ─── Before / After ────────────────────────────────────────────────────────────

export function BeforeAfter({ before, after }) {
  return (
    <div className="my-8 grid sm:grid-cols-2 gap-4">
      {/* Before */}
      <div className="rounded-xl overflow-hidden border border-red-200">
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-red-100" style={{ background: '#fff5f5' }}>
          <svg className="w-3.5 h-3.5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
          <span className="text-xs font-semibold text-red-500 uppercase tracking-wider">{before.label}</span>
        </div>
        <div className="p-4 bg-white">
          <p className="text-[#1a1a1a]/75 text-sm leading-relaxed">{before.text}</p>
        </div>
      </div>
      {/* After */}
      <div className="rounded-xl overflow-hidden border border-green-200">
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-green-100" style={{ background: '#f0fdf4' }}>
          <svg className="w-3.5 h-3.5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          <span className="text-xs font-semibold text-green-600 uppercase tracking-wider">{after.label}</span>
        </div>
        <div className="p-4 bg-white">
          <p className="text-[#1a1a1a]/75 text-sm leading-relaxed">{after.text}</p>
        </div>
      </div>
    </div>
  )
}

// ─── Icon Card ─────────────────────────────────────────────────────────────────

export function IconCard({ icon, title, text }) {
  const Icon = ICON_MAP[icon] || Target
  return (
    <div className="flex items-start gap-4 rounded-xl bg-white border border-[#efefef] px-4 py-4 hover:border-[#d8d8d8] hover:bg-[#fafafa] transition-all group">
      {/* Icon badge */}
      <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 border border-[#e8e8e8] bg-white group-hover:border-[#d0d0d0] transition-colors">
        <Icon className="w-4 h-4" style={{ color: '#0a0a0a' }} strokeWidth={1.75} />
      </div>
      {/* Text */}
      <div className="min-w-0">
        <h4 className="font-semibold text-[#0a0a0a] text-[0.8125rem] mb-0.5 tracking-[-0.01em] leading-snug">{title}</h4>
        <p className="text-[#777] text-[0.8125rem] leading-relaxed">{text}</p>
      </div>
    </div>
  )
}

// ─── Stat Highlight ────────────────────────────────────────────────────────────

export function StatHighlight({ stat, label }) {
  return (
    <div className="relative overflow-hidden rounded-xl bg-[#0a0a0a] px-6 py-7 transition-transform hover:scale-[1.01]">
      {/* subtle background texture */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: 'radial-gradient(circle at 80% 20%, #fff 0%, transparent 60%)' }} />
      <p className="font-bold text-white leading-none mb-2" style={{ fontSize: 42, letterSpacing: '-0.05em' }}>
        {stat}
      </p>
      <div className="w-8 h-px mb-2" style={{ background: 'rgba(255,255,255,0.15)' }} />
      <p className="text-[0.75rem] font-medium" style={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.4 }}>{label}</p>
    </div>
  )
}

// ─── Step Process ──────────────────────────────────────────────────────────────

export function StepProcess({ steps }) {
  return (
    <div className="my-8 rounded-xl border border-[#e8e8e8] overflow-hidden divide-y divide-[#f5f5f5]">
      {steps.map((step, i) => (
        <div key={i} className="flex items-start gap-4 px-5 py-4 bg-white hover:bg-[#fafafa] transition-colors">
          {/* Number badge */}
          <span
            className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold mt-0.5"
            style={{ background: '#0a0a0a', color: '#fff', minWidth: 24 }}>
            {i + 1}
          </span>
          {/* Content */}
          <div>
            <h4 className="font-semibold text-[#0a0a0a] text-sm mb-0.5 tracking-[-0.01em]">{step.title}</h4>
            <p className="text-[#666] text-sm leading-relaxed">{step.text}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

// ─── Tip Box ───────────────────────────────────────────────────────────────────

export function TipBox({ text }) {
  return (
    <div className="my-6 rounded-xl border border-[#d1fae5] overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[#d1fae5]" style={{ background: '#ecfdf5' }}>
        <Lightbulb className="w-3.5 h-3.5 text-emerald-600" />
        <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">Tip</span>
      </div>
      <div className="p-4 bg-white">
        <p className="text-[#1a1a1a]/80 text-sm leading-relaxed">{text}</p>
      </div>
    </div>
  )
}

// ─── CTA Box ───────────────────────────────────────────────────────────────────

export function CtaBox({ label, text, href, buttonText }) {
  return (
    <div className="my-6 rounded-xl overflow-hidden" style={{ border: '1px solid #e8e8e8', background: '#fafafa' }}>
      <div className="flex items-center justify-between gap-4 px-5 py-4">
        <div className="flex items-start gap-3 min-w-0">
          <div className="mt-0.5 flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: '#0a0a0a' }}>
            <Sparkles className="w-3.5 h-3.5 text-white" />
          </div>
          <div className="min-w-0">
            {label && <p className="text-[10px] font-semibold uppercase tracking-widest mb-0.5" style={{ color: '#aaa' }}>{label}</p>}
            <p className="text-sm font-medium leading-snug" style={{ color: '#0a0a0a' }}>{text}</p>
          </div>
        </div>
        {href && (
          <Link
            href={href}
            className="flex-shrink-0 inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-lg transition-all"
            style={{ background: '#0a0a0a', color: '#fff', whiteSpace: 'nowrap', textDecoration: 'none' }}
          >
            {buttonText || 'Try it free'} <ArrowRight className="w-3 h-3" />
          </Link>
        )}
      </div>
    </div>
  )
}

// ─── Warning Box ───────────────────────────────────────────────────────────────

export function WarningBox({ text }) {
  return (
    <div className="my-6 rounded-xl border border-[#fde68a] overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[#fde68a]" style={{ background: '#fffbeb' }}>
        <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
        <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider">Watch out</span>
      </div>
      <div className="p-4 bg-white">
        <p className="text-[#1a1a1a]/80 text-sm leading-relaxed">{text}</p>
      </div>
    </div>
  )
}

// ─── GIF ───────────────────────────────────────────────────────────────────────

export function GifBlock({ src, alt, caption }) {
  const isGiphy = src?.includes('giphy.com/embed')
  return (
    <figure className="my-8 rounded-xl overflow-hidden border border-[#e8e8e8]">
      {isGiphy ? (
        <div className="relative w-full" style={{ paddingBottom: '56%' }}>
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
        <img src={src} alt={alt || ''} className="w-full" loading="lazy" />
      )}
      {caption && (
        <figcaption className="text-center text-[#888] text-xs py-2.5 px-4 border-t border-[#f0f0f0]" style={{ background: '#fafafa' }}>
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

// ─── Image ─────────────────────────────────────────────────────────────────────

export function ImageBlock({ src, alt, caption, maxWidth }) {
  return (
    <figure className="my-8 rounded-xl overflow-hidden border border-[#e8e8e8]">
      <img
        src={src}
        alt={alt || ''}
        className="w-full"
        style={maxWidth ? { maxWidth } : undefined}
        loading="lazy"
      />
      {caption && (
        <figcaption className="text-center text-[#888] text-xs py-2.5 px-4 border-t border-[#f0f0f0]" style={{ background: '#fafafa' }}>
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

// ─── Numbered Steps ────────────────────────────────────────────────────────────

export function NumberedSteps({ items }) {
  return (
    <ol className="my-6 space-y-3 pl-1">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <span
            className="w-5 h-5 rounded flex items-center justify-center font-semibold text-xs flex-shrink-0 mt-0.5 border"
            style={{ background: '#f5f5f5', borderColor: '#e0e0e0', color: '#555' }}
          >
            {i + 1}
          </span>
          <span className="text-[#1a1a1a]/80 text-sm leading-relaxed">{item}</span>
        </li>
      ))}
    </ol>
  )
}

// ─── Comparison Table ──────────────────────────────────────────────────────────

export function ComparisonTable({ headers, rows }) {
  return (
    <div className="my-8 overflow-x-auto rounded-xl border border-[#e8e8e8]">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr style={{ background: '#f8f8f8' }}>
            {headers.map((h, i) => (
              <th key={i} className="font-semibold text-[#0a0a0a] text-left px-4 py-3 border-b border-[#e8e8e8] text-xs uppercase tracking-wide">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-[#f0f0f0]">
          {rows.map((row, ri) => (
            <tr key={ri} className="hover:bg-[#fafafa] transition-colors">
              {row.map((cell, ci) => (
                <td key={ci} className="px-4 py-3 text-[#1a1a1a]/75 text-sm leading-relaxed">
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

// ─── Formula Box ───────────────────────────────────────────────────────────────

export function FormulaBox({ title, formula, description }) {
  return (
    <div className="my-8 rounded-xl overflow-hidden" style={{ border: '1px solid #e8e8e8', borderLeft: '3px solid #0a0a0a' }}>
      {title && (
        <div className="px-5 py-2.5 border-b border-[#e8e8e8]" style={{ background: '#f8f8f8' }}>
          <p className="text-[10px] font-semibold text-[#999] uppercase tracking-widest">{title}</p>
        </div>
      )}
      <div className="px-5 py-5 bg-white">
        <p className="font-mono text-[#0a0a0a] text-[1rem] font-semibold leading-snug" style={{ letterSpacing: '-0.02em' }}>
          {formula}
        </p>
        {description && (
          <p className="text-[#666] text-sm leading-relaxed mt-3 pt-3 border-t border-[#f5f5f5]">{description}</p>
        )}
      </div>
    </div>
  )
}

// ─── Quote Highlight ───────────────────────────────────────────────────────────

export function QuoteHighlight({ text, attribution }) {
  return (
    <div className="my-10 -mx-2 sm:mx-0 rounded-2xl overflow-hidden" style={{ background: '#0a0a0a' }}>
      {/* top accent line */}
      <div className="h-[3px] w-full" style={{ background: 'linear-gradient(90deg, #fff 0%, rgba(255,255,255,0.1) 100%)' }} />
      <div className="px-7 py-8">
        {/* big quote mark */}
        <span className="block font-serif text-6xl leading-none mb-2 select-none" style={{ color: 'rgba(255,255,255,0.12)', marginLeft: -4 }}>
          &ldquo;
        </span>
        <blockquote>
          <p className="font-serif text-white text-xl leading-[1.65] tracking-[-0.01em]">
            {text}
          </p>
          {attribution && (
            <cite className="block mt-4 text-xs font-medium not-italic" style={{ color: 'rgba(255,255,255,0.4)' }}>
              — {attribution}
            </cite>
          )}
        </blockquote>
      </div>
    </div>
  )
}

// ─── Key Takeaway ──────────────────────────────────────────────────────────────

export function KeyTakeaway({ items }) {
  return (
    <div className="my-10 rounded-xl overflow-hidden border border-[#e8e8e8]">
      <div className="flex items-center gap-2.5 px-5 py-3.5 border-b border-[#e8e8e8]" style={{ background: '#0a0a0a' }}>
        <BookmarkCheck className="w-3.5 h-3.5" style={{ color: 'rgba(255,255,255,0.6)' }} />
        <p className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.6)' }}>
          Key Takeaways
        </p>
      </div>
      <div className="p-5 bg-white">
        <ul className="space-y-3">
          {items.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-[#1a1a1a]/80 leading-relaxed">
              <svg className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#22c55e' }} viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

// ─── Progress Check (legacy, kept for compatibility) ───────────────────────────

export function ProgressCheck({ moduleId, items }) {
  const storageKey = `ee_check_${moduleId}`
  const [checked, setChecked] = useState(() => {
    try { return JSON.parse(localStorage.getItem(storageKey) || '[]') } catch { return [] }
  })
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(checked))
  }, [checked, storageKey])
  const toggle = (idx) => setChecked(prev => prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx])
  return (
    <div className="my-8 rounded-xl border border-[#e8e8e8] p-5 bg-white">
      <p className="text-xs font-semibold text-[#999] uppercase tracking-widest mb-4">Self-Check</p>
      <ul className="space-y-2.5">
        {items.map((item, i) => (
          <li key={i}>
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" checked={checked.includes(i)} onChange={() => toggle(i)}
                className="mt-0.5 w-4 h-4 rounded border-[#ddd] cursor-pointer" />
              <span className={`text-sm leading-relaxed ${checked.includes(i) ? 'line-through text-[#bbb]' : 'text-[#1a1a1a]/80'}`}>
                {item}
              </span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  )
}

// ─── Master switch renderer ────────────────────────────────────────────────────

export default function ContentBlock({ block }) {
  switch (block.type) {
    case 'heading':          return <SectionHeading text={block.text} />
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
    default:                 return null
  }
}
