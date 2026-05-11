'use client'

import Link from 'next/link'
import SEOHead from './SEOHead'
import ContentRenderer from './blocks/ContentRenderer'
import PostModuleGate from './PostModuleGate'

export default function GuidePage({
  title,
  description,
  canonical,
  content = [],
  relatedGuides = [],
  faqItems = [],
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    author: { '@type': 'Organization', name: 'The Extended Essay Academy', url: 'https://theextendedessay.com' },
    publisher: { '@type': 'Organization', name: 'The Extended Essay Academy', url: 'https://theextendedessay.com' },
    datePublished: '2026-03-29',
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

  return (
    <div className="min-h-screen bg-cream">
      <SEOHead
        title={title}
        description={description}
        canonical={canonical}
        jsonLd={faqJsonLd ? [jsonLd, faqJsonLd] : jsonLd}
      />

      {/* Hero */}
      <div className="bg-navy-deep py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <nav className="flex items-center gap-2 text-steel/60 text-xs mb-6">
            <Link href="/" className="hover:text-steel transition-colors">Home</Link>
            <span>/</span>
            <Link href="/guides/extended-essay-introduction" className="hover:text-steel transition-colors">Guides</Link>
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
          <ContentRenderer content={content} />
        </article>

        {/* Author byline */}
        <div className="flex items-center gap-3 mt-10 mb-2 pb-8 border-b border-navy/8">
          <div className="w-10 h-10 rounded-full bg-navy flex items-center justify-center text-cream text-sm font-bold flex-shrink-0">
            G
          </div>
          <div>
            <p className="text-sm font-semibold text-navy">Written by Gia</p>
            <p className="text-xs text-navy/50">32/34 IB Extended Essay · The Extended Essay Academy</p>
          </div>
        </div>

        {/* Waitlist CTA */}
        <PostModuleGate />

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

        {/* Internal hub links */}
        <div className="mt-12 flex flex-col sm:flex-row gap-3">
          <Link
            href="/curriculum"
            className="flex-1 rounded-xl border border-navy/12 bg-parchment/40 hover:bg-parchment/70 transition-colors px-5 py-4 text-center"
          >
            <p className="text-sm font-semibold text-navy">See the full 14-module curriculum →</p>
            <p className="text-xs text-navy/50 mt-1">Every topic, every module, mapped to IB criteria</p>
          </Link>
          <Link
            href="/pricing"
            className="flex-1 rounded-xl border border-navy/20 bg-navy/5 hover:bg-navy/10 transition-colors px-5 py-4 text-center"
          >
            <p className="text-sm font-semibold text-navy">Get full access →</p>
            <p className="text-xs text-navy/50 mt-1">From $89 · 30-day money-back guarantee</p>
          </Link>
        </div>

        {/* Resource Lab CTA */}
        <div className="mt-8 rounded-2xl bg-navy text-center p-8">
          <h3 className="font-serif text-xl font-bold text-cream mb-2">Ready to go deeper?</h3>
          <p className="text-steel text-sm mb-6 max-w-sm mx-auto">
            This guide covers the basics. The full Resource Lab gives you the complete system, tools, and templates to get an A.
          </p>
          <Link href="/courses" className="btn-primary-light text-sm">
            Explore the Resource Lab
          </Link>
        </div>
      </div>
    </div>
  )
}
