'use client'

import Link from 'next/link'
import ContentRenderer from './blocks/ContentRenderer'

export default function GuidePage({
  title,
  description,
  canonical,
  content = [],
  relatedGuides = [],
  faqItems = [],
}) {
  const canonicalUrl = canonical || 'https://theextendedessay.com/guides'

  // One CTA per guide, at the very end — nothing mid-read. Session replays showed
  // people reading deeply, and inline boxes pulled them out mid-paragraph. Strip
  // any inline cta-box blocks and reuse their intent to pick the single end CTA:
  // research-oriented guides send the reader into the EE Dump (which works with
  // no account — first sources free), the rest into free lesson 1.
  const articleContent = content.filter((b) => b?.type !== 'cta-box')
  const ctaToDump = content.some(
    (b) => b?.type === 'cta-box' && (b.href || '').includes('dump'),
  )
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url: canonicalUrl,
    author: {
      '@type': 'Organization',
      name: 'The Extended Essay Academy',
      description: 'A self-study IB Extended Essay platform built from a real 32/34 Extended Essay.',
      url: 'https://theextendedessay.com',
    },
    publisher: { '@type': 'Organization', name: 'The Extended Essay Academy', url: 'https://theextendedessay.com' },
    datePublished: '2026-03-29',
    dateModified: new Date().toISOString().split('T')[0],
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://theextendedessay.com' },
      { '@type': 'ListItem', position: 2, name: 'Guides', item: 'https://theextendedessay.com/guides' },
      { '@type': 'ListItem', position: 3, name: title, item: canonicalUrl },
    ],
  }
  const faqJsonLd = faqItems.length > 0
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqItems.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      }
    : null

  const allJsonLd = [jsonLd, breadcrumbJsonLd, ...(faqJsonLd ? [faqJsonLd] : [])]

  return (
    <div className="min-h-screen bg-cream">
      {/* Structured data — Google parses JSON-LD in body as well as head */}
      {allJsonLd.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      {/* Hero */}
      <div className="bg-navy-deep py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <nav className="flex items-center gap-2 text-steel/60 text-xs mb-6">
            <Link href="/" className="hover:text-steel transition-colors">Home</Link>
            <span>/</span>
            <Link href="/guides" className="hover:text-steel transition-colors">Guides</Link>
            <span>/</span>
            <span className="text-steel">{title}</span>
          </nav>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-cream leading-tight">
            {title}
          </h1>
          <p className="text-steel mt-3 text-lg leading-relaxed">{description}</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 pt-12 pb-20">
        <article>
          <ContentRenderer content={articleContent} />
        </article>

        {/* Author byline */}
        <div className="flex items-center gap-3 mt-10 mb-2 pb-8 border-b border-navy/8">
          <div className="w-10 h-10 rounded-full bg-navy flex items-center justify-center text-cream text-xs font-bold flex-shrink-0">
            EE
          </div>
          <div>
            <p className="text-sm font-semibold text-navy">The Extended Essay Academy</p>
            <p className="text-xs text-navy/50">Built from a real 32/34 IB Extended Essay</p>
          </div>
        </div>

        {/* The single end-of-article CTA — no account required either way. */}
        {ctaToDump ? (
          <div className="my-10 rounded-2xl bg-navy text-center p-8">
            <h3 className="font-serif text-xl font-bold text-cream mb-2">Build your research dump — free</h3>
            <p className="text-steel text-sm mb-6 max-w-md mx-auto">
              The tool behind a 32/34 essay: paste a quote, tag the subtopic, note the source — it builds your MLA bibliography as you go. Your first sources are free, no account needed.
            </p>
            <Link href="/dump" className="btn-primary-light text-sm">Open the EE Dump →</Link>
          </div>
        ) : (
          <div className="my-10 rounded-2xl bg-navy text-center p-8">
            <h3 className="font-serif text-xl font-bold text-cream mb-2">Read the course, free</h3>
            <p className="text-steel text-sm mb-6 max-w-sm mx-auto">
              The first five lessons are open — no account needed. Start with lesson 1 and follow one real essay from research question to final draft.
            </p>
            <Link href="/course/module-1" className="btn-primary-light text-sm">Start lesson 1 →</Link>
          </div>
        )}

        {/* Related Guides */}
        {relatedGuides.length > 0 && (
          <div className="mt-16 border-t border-navy/8 pt-8">
            <h2 className="font-serif text-xl font-bold text-navy mb-4">Related Guides</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {relatedGuides.map((g, i) => (
                <Link
                  key={i}
                  href={g.href}
                  className="rounded-xl border border-navy/10 hover:border-navy/25 bg-parchment/30 hover:bg-parchment/50 transition-all px-5 py-4"
                >
                  <p className="text-sm font-medium text-navy">{g.title}</p>
                  <p className="text-xs text-navy/50 mt-1">{g.description}</p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* FAQ */}
        {faqItems.length > 0 && (
          <div className="mt-12 rounded-2xl border border-navy/10 bg-white/60 p-6">
            <h2 className="font-serif text-xl font-bold text-navy mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqItems.map((item, i) => (
                <div key={i}>
                  <h3 className="text-sm font-semibold text-navy mb-1">{item.question}</h3>
                  <p className="text-sm text-navy/65 leading-relaxed">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Internal link — the full curriculum (navigation, not a sales CTA) */}
        <div className="mt-12">
          <Link
            href="/curriculum"
            className="block rounded-xl border border-navy/12 bg-parchment/40 hover:bg-parchment/70 transition-colors px-5 py-4 text-center"
          >
            <p className="text-sm font-semibold text-navy">See the full 14-lesson curriculum →</p>
            <p className="text-xs text-navy/50 mt-1">Every topic, every lesson, mapped to IB criteria</p>
          </Link>
        </div>
      </div>
    </div>
  )
}
