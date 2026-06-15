'use client'

import Link from 'next/link'
import { Lock, FileText, Download, Check } from 'lucide-react'
import { useAccess } from '../hooks/useAccess'

const PREVIEW_PAGES = [1, 2, 3, 4]
const TOTAL_PAGES = 28

export default function SampleEEPage() {
  const { hasPremium, loading } = useAccess()

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="w-6 h-6 rounded-full border-2 border-navy/20 border-t-navy/60 animate-spin" />
      </div>
    )
  }

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-2xl mx-auto px-8 pt-8 pb-16">
        <p className="text-[10px] font-bold text-ink-muted uppercase tracking-widest mb-2">Example essay</p>
        <h1 className="font-serif text-2xl font-bold text-navy mb-1">A Real 32/34 Extended Essay</h1>
        <p className="text-sm text-ink-soft mb-2">
          Business Management HL · &ldquo;ZARA: The Importance of Product Portfolio and Marketing Influence&rdquo;
        </p>
        <p className="text-sm text-ink-soft mb-8">
          Read the opening pages free. The full {TOTAL_PAGES}-page essay — title page, introduction, analysis, conclusion, and bibliography — is included with a paid plan.
        </p>

        {/* Free preview */}
        <div className="rounded-2xl border border-navy/10 bg-white/60 p-2 mb-3">
          <div className="space-y-2">
            {PREVIEW_PAGES.map(n => (
              <img
                key={n}
                src={`/sample-ee/page-${n}.png`}
                alt={`Extended Essay page ${n}`}
                className="w-full rounded-lg border border-navy/8"
                loading="lazy"
              />
            ))}
          </div>
        </div>
        <p className="text-center text-xs text-navy/40 mb-8">Pages 1–{PREVIEW_PAGES.length} of {TOTAL_PAGES} · free preview</p>

        {/* Gated full essay */}
        {hasPremium ? (
          <div className="rounded-2xl border border-green-200 bg-green-50 px-6 py-6">
            <div className="flex items-center gap-2 mb-1.5">
              <Check className="w-5 h-5 text-green-700" />
              <h2 className="font-serif text-lg font-bold text-green-900">Full essay unlocked</h2>
            </div>
            <p className="text-sm text-green-800/70 leading-relaxed mb-4">
              You have access to the complete {TOTAL_PAGES}-page essay. Open it to read or download the full PDF.
            </p>
            <a
              href="/api/sample-ee"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-navy text-cream text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-navy/90 transition-colors no-underline"
            >
              <Download className="w-4 h-4" />
              Open full essay (PDF)
            </a>
          </div>
        ) : (
          <div className="rounded-2xl border border-navy/10 bg-parchment/30 px-6 py-10">
            <div className="max-w-sm w-full mx-auto text-center">
              <div className="w-12 h-12 rounded-full bg-navy/6 flex items-center justify-center mx-auto mb-4">
                <Lock className="w-5 h-5 text-navy/40" />
              </div>
              <h2 className="font-serif text-lg font-bold text-navy mb-2">
                Read the full {TOTAL_PAGES}-page essay
              </h2>
              <p className="text-sm text-ink-soft leading-relaxed mb-5">
                You&rsquo;ve read pages 1–{PREVIEW_PAGES.length}. The remaining {TOTAL_PAGES - PREVIEW_PAGES.length} pages — full introduction, analysis, conclusion, and bibliography — are included with a paid plan.
              </p>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 bg-navy text-cream text-sm font-semibold px-6 py-2.5 rounded-xl hover:bg-navy/90 transition-colors no-underline"
              >
                <FileText className="w-4 h-4" />
                Unlock the full essay
              </Link>
              <p className="text-xs text-navy/30 mt-4">30-day money-back guarantee</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
