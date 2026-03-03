import { Link } from 'react-router-dom'
import AnimateIn from './ui/AnimateIn'

const FEATURES = [
  {
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
        <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
      </svg>
    ),
    label: 'Paste by subtopic',
    desc: 'Drop sources, quotes, and ideas straight into the right section — no juggling docs.',
  },
  {
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z" clipRule="evenodd" />
      </svg>
    ),
    label: 'Spreadsheet view',
    desc: 'Toggle to a clean table view — sort, scan, and spot gaps in your research at a glance.',
  },
  {
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
      </svg>
    ),
    label: 'Export as CSV or text',
    desc: 'Download your entire dump in one click — ready to paste into Google Docs or Notion.',
  },
  {
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
    ),
    label: 'Saves automatically',
    desc: 'Never lose your work — everything persists locally in your browser between sessions.',
  },
]

// Mini mock cards for the visual preview
const MOCK_ENTRIES = [
  { subtopic: 'Market Entry', text: 'Porter (2008) — competitive dynamics in emerging markets drive first-mover advantage…', tag: 'Theory' },
  { subtopic: 'Case Study', text: 'SHEIN\'s ultra-fast fashion model bypasses traditional supply chains via direct-from-factory…', tag: 'Primary' },
  { subtopic: 'Counterargument', text: 'McKinsey (2022) challenges: margin erosion suggests first-mover advantage is overstated in digital…', tag: 'Counter' },
]

const TAG_COLORS = {
  Theory: 'bg-indigo-100 text-indigo-700',
  Primary: 'bg-emerald-100 text-emerald-700',
  Counter: 'bg-amber-100 text-amber-700',
}

export default function DumpSection() {
  return (
    <section id="dump" className="bg-parchment py-20 px-6 relative overflow-hidden">
      {/* Decorative feather */}
      <img
        src="/feather-md.png"
        alt=""
        className="absolute bottom-8 left-4 h-48 w-auto opacity-[0.05] pointer-events-none select-none rotate-12"
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left: copy + features */}
          <AnimateIn>
            <div className="flex items-center gap-2 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-navy/40" />
              <span className="text-xs font-semibold text-navy/40 uppercase tracking-[0.15em]">Free Tool</span>
            </div>

            <h2 className="font-serif text-3xl md:text-4xl font-bold text-navy leading-tight mb-4">
              Your research, finally organised
            </h2>
            <p className="text-ink-soft leading-relaxed mb-8">
              Stop copy-pasting sources into a chaotic doc. The EE Dump Workspace lets you organise every quote, idea, and citation by subtopic — so when it's time to write, everything is exactly where you need it.
            </p>

            <ul className="space-y-5 mb-10">
              {FEATURES.map(f => (
                <li key={f.label} className="flex items-start gap-4">
                  <span className="w-8 h-8 rounded-xl bg-navy/8 flex items-center justify-center flex-shrink-0 text-navy mt-0.5">
                    {f.icon}
                  </span>
                  <div>
                    <p className="font-semibold text-navy text-sm mb-0.5">{f.label}</p>
                    <p className="text-ink-soft text-sm leading-relaxed">{f.desc}</p>
                  </div>
                </li>
              ))}
            </ul>

            <Link to="/dump" className="btn-primary inline-flex items-center gap-2">
              Open EE Dump Workspace
              <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </AnimateIn>

          {/* Right: visual mockup */}
          <AnimateIn delay={0.15}>
            <div className="rounded-2xl border border-navy/10 bg-cream shadow-lg overflow-hidden">
              {/* Mock toolbar */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-navy/8 bg-cream">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-300" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-300" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-300" />
                </div>
                <span className="text-xs text-navy/30 font-medium">EE Dump Workspace</span>
                <span className="text-xs text-navy/25">3 entries</span>
              </div>

              {/* Mock subtopic tabs */}
              <div className="flex gap-1 px-4 pt-3 pb-2 border-b border-navy/8 overflow-x-auto">
                {['Market Entry', 'Case Study', 'Counterargument', '+ Add'].map((tab, i) => (
                  <span key={tab} className={`text-xs px-3 py-1.5 rounded-lg font-medium whitespace-nowrap flex-shrink-0 ${
                    i === 0 ? 'bg-navy text-cream' : i === 3 ? 'text-navy/30 border border-dashed border-navy/20' : 'text-navy/50 bg-navy/5'
                  }`}>
                    {tab}
                  </span>
                ))}
              </div>

              {/* Mock entries */}
              <div className="p-4 space-y-3">
                {MOCK_ENTRIES.map((entry, i) => (
                  <div key={i} className="rounded-xl bg-parchment/60 border border-navy/8 p-4">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${TAG_COLORS[entry.tag]}`}>
                        {entry.tag}
                      </span>
                      <svg className="w-3.5 h-3.5 text-navy/20 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                      </svg>
                    </div>
                    <p className="text-navy/65 text-xs leading-relaxed line-clamp-2">{entry.text}</p>
                  </div>
                ))}

                {/* Ghost add row */}
                <div className="rounded-xl border border-dashed border-navy/15 p-4 flex items-center gap-2 text-navy/25">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  <span className="text-xs">Paste a source or idea…</span>
                </div>
              </div>
            </div>
          </AnimateIn>

        </div>
      </div>
    </section>
  )
}
