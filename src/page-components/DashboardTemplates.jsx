'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown, ChevronUp, Download } from 'lucide-react'
import { useAccess } from '../hooks/useAccess'
import UpgradeGate from '../components/UpgradeGate'

const WORKBOOKS = [
  { slug: 'anthropology',        label: 'Anthropology',        pages: 4 },
  { slug: 'business-management', label: 'Business Management', pages: 4 },
  { slug: 'digital-society',     label: 'Digital Society',     pages: 4 },
  { slug: 'economics',           label: 'Economics',           pages: 4 },
  { slug: 'geography',           label: 'Geography',           pages: 4 },
  { slug: 'global-politics',     label: 'Global Politics',     pages: 4 },
  { slug: 'history',             label: 'History',             pages: 4 },
  { slug: 'language-b',          label: 'Language B',          pages: 8 },
  { slug: 'philosophy',          label: 'Philosophy',          pages: 4 },
  { slug: 'psychology',          label: 'Psychology',          pages: 4 },
  { slug: 'world-religion',      label: 'World Religions',     pages: 4 },
]

const TEMPLATES = [
  {
    id: 'rppf-1',
    label: 'RPPF Reflection 1',
    subtitle: 'Initial reflection — after choosing your topic',
    placeholder: 'Describe how you chose your research question. What initially interested you? What early challenges did you encounter? How did your thinking evolve in the early stages?\n\nAim for ~150–175 words.',
  },
  {
    id: 'rppf-2',
    label: 'RPPF Reflection 2',
    subtitle: 'Mid-process reflection — after research, before writing',
    placeholder: 'Reflect on your research process. What sources proved most useful and why? How has your understanding of the topic deepened or shifted? What problems did you encounter and how did you address them?\n\nAim for ~150–175 words.',
  },
  {
    id: 'rppf-3',
    label: 'RPPF Reflection 3',
    subtitle: 'Final reflection — after completing the essay',
    placeholder: 'Reflect on the completed essay and the entire process. What do you now understand that you didn\'t at the start? What would you do differently? What skills did this develop?\n\nAim for ~150–175 words.',
  },
  {
    id: 'outline',
    label: 'Essay Outline',
    subtitle: 'Section-by-section plan before you write',
    placeholder: 'Introduction (~300–400 words)\n— Hook / context:\n— Research question framing:\n— Scope and limitations:\n— Argument overview:\n\nSection 1 — [Title] (~500–700 words)\n— Main claim:\n— Evidence / sources:\n— Analysis approach:\n\nSection 2 — [Title] (~500–700 words)\n— Main claim:\n— Evidence / sources:\n— Analysis approach:\n\nSection 3 — [Title] (~500–700 words)\n— Main claim:\n— Counter-argument addressed:\n— Evidence / sources:\n\nConclusion (~300–400 words)\n— Direct answer to RQ:\n— Key findings summary:\n— Limitations and implications:',
  },
  {
    id: 'argument-map',
    label: 'Argument Map',
    subtitle: 'Map your central claim and supporting points',
    placeholder: 'CENTRAL CLAIM (answer to your RQ in one sentence):\n\n\nPILLAR 1 — [topic sentence]:\n  Evidence:\n  How it supports the central claim:\n\nPILLAR 2 — [topic sentence]:\n  Evidence:\n  How it supports the central claim:\n\nPILLAR 3 — [topic sentence]:\n  Evidence:\n  How it supports the central claim:\n\nCOUNTER-ARGUMENT:\n  Why it doesn\'t undermine your claim:\n\nCONCLUSION THREAD:\n  How all three pillars combine to answer the RQ:',
  },
]

const STORAGE_KEY = 'ee_templates'

function getStored() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') } catch { return {} }
}

function TemplateBlock({ template }) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState(() => {
    if (typeof window !== 'undefined') return getStored()[template.id] ?? ''
    return ''
  })

  const save = () => {
    const stored = getStored()
    stored[template.id] = value
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stored))
  }

  return (
    <div className="rounded-2xl border border-navy/10 bg-white/60 overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-parchment/20 transition-colors"
      >
        <div>
          <p className="text-sm font-bold text-navy">{template.label}</p>
          <p className="text-xs text-navy/50 mt-0.5">{template.subtitle}</p>
        </div>
        {open ? <ChevronUp className="w-4 h-4 text-navy/40 flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-navy/40 flex-shrink-0" />}
      </button>
      {open && (
        <div className="px-5 pb-5 border-t border-navy/8">
          <textarea
            value={value}
            onChange={e => setValue(e.target.value)}
            onBlur={save}
            placeholder={template.placeholder}
            rows={12}
            className="w-full mt-4 rounded-xl border border-navy/12 bg-cream px-4 py-3 text-sm text-navy placeholder:text-navy/25 focus:outline-none focus:border-navy/30 resize-y font-mono leading-relaxed"
          />
          <div className="flex justify-end mt-2">
            <button onClick={save} className="text-xs font-semibold text-navy/60 hover:text-navy transition-colors">
              Save draft
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default function DashboardTemplates() {
  const { hasPremium, loading } = useAccess()

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="w-6 h-6 rounded-full border-2 border-navy/20 border-t-navy/60 animate-spin" />
      </div>
    )
  }

  if (!hasPremium) {
    return <UpgradeGate requiredTier="premium" toolName="Templates & SOPs" />
  }

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-2xl mx-auto px-8 pt-8 pb-16">
        <p className="text-[10px] font-bold text-ink-muted uppercase tracking-widest mb-2">Templates</p>
        <h1 className="font-serif text-2xl font-bold text-navy mb-1">Templates</h1>
        <p className="text-sm text-ink-soft mb-8">
          Fillable SOPs — click to expand, type directly, auto-saved to your browser.
        </p>

        <div className="space-y-3">
          {TEMPLATES.map(t => <TemplateBlock key={t.id} template={t} />)}
        </div>

        <div className="mt-10 rounded-xl border border-navy/10 bg-parchment/30 px-5 py-4">
          <p className="text-xs text-navy/50">Templates are saved locally in your browser. Cloud sync coming soon.</p>
        </div>

        {/* ── Subject Planning Workbooks ── */}
        <div className="mt-12">
          <p className="text-[10px] font-bold text-ink-muted uppercase tracking-widest mb-1">Subject workbooks</p>
          <h2 className="font-serif text-xl font-bold text-navy mb-1">EE Planning Workbooks</h2>
          <p className="text-sm text-ink-soft mb-6">
            Subject-specific planning templates — download, print, and fill in alongside your research.
          </p>

          <div className="grid grid-cols-2 gap-3">
            {WORKBOOKS.map(wb => (
              <a
                key={wb.slug}
                href={`/templates/workbooks/${wb.slug}.pdf`}
                download={`IB EE Planning Workbook — ${wb.label}.pdf`}
                className="group flex items-center justify-between rounded-2xl border border-navy/10 bg-white/60 px-5 py-4 hover:bg-parchment/20 transition-colors no-underline"
              >
                <div>
                  <p className="text-sm font-bold text-navy group-hover:text-navy transition-colors">{wb.label}</p>
                  <p className="text-xs text-navy/40 mt-0.5">{wb.pages}-page workbook · PDF</p>
                </div>
                <Download className="w-4 h-4 text-navy/30 group-hover:text-navy/60 transition-colors flex-shrink-0" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
