'use client'

import { Download, ExternalLink } from 'lucide-react'

const PDF = '/ib-official-ee-guide.pdf'

export default function IBGuidePage() {
  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-3xl mx-auto px-8 pt-8 pb-16">
        <div className="flex items-center gap-2 mb-2">
          <p className="text-[10px] font-bold text-ink-muted uppercase tracking-widest">Official reference</p>
          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-green-100 text-green-800">FREE</span>
        </div>
        <h1 className="font-serif text-2xl font-bold text-navy mb-1">IB Official Extended Essay Guide</h1>
        <p className="text-sm text-ink-soft mb-6">
          The complete IB Extended Essay guide (First assessment 2027) — the official rules, criteria, and requirements, in full. Read it here or download a copy.
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          <a
            href={PDF}
            download="IB Extended Essay Guide (First assessment 2027).pdf"
            className="inline-flex items-center gap-2 bg-navy text-cream text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-navy/90 transition-colors no-underline"
          >
            <Download className="w-4 h-4" />
            Download the full guide
          </a>
          <a
            href={PDF}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-navy/15 text-navy text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-parchment/30 transition-colors no-underline"
          >
            <ExternalLink className="w-4 h-4" />
            Open in new tab
          </a>
        </div>

        <div className="rounded-2xl border border-navy/10 bg-white/60 overflow-hidden" style={{ height: '80vh' }}>
          <iframe
            src={`${PDF}#view=FitH`}
            title="IB Official Extended Essay Guide"
            className="w-full h-full"
            style={{ border: 'none' }}
          />
        </div>
      </div>
    </div>
  )
}
