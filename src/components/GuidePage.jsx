import { Link } from 'react-router-dom'
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
    author: { '@type': 'Organization', name: 'The Extended Essay Academy' },
    publisher: { '@type': 'Organization', name: 'The Extended Essay Academy' },
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
            <Link to="/" className="hover:text-steel transition-colors">Home</Link>
            <span>/</span>
            <Link to="/guides/extended-essay-introduction" className="hover:text-steel transition-colors">Guides</Link>
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
                  to={g.href}
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

        {/* Resource Lab CTA */}
        <div className="mt-12 rounded-2xl bg-navy text-center p-8">
          <h3 className="font-serif text-xl font-bold text-cream mb-2">Ready to go deeper?</h3>
          <p className="text-steel text-sm mb-6 max-w-sm mx-auto">
            This guide covers the basics. The full Resource Lab gives you the complete system, tools, and templates to get an A.
          </p>
          <Link to="/courses" className="btn-primary-light text-sm">
            Explore the Resource Lab
          </Link>
        </div>
      </div>
    </div>
  )
}
