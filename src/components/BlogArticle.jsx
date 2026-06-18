'use client'

import Link from 'next/link'
import ContentRenderer from './blocks/ContentRenderer'

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
  } catch { return iso }
}

export default function BlogArticle({ post }) {
  const url = `https://theextendedessay.com/blog/${post.slug}`

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    url,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Person',
      name: 'Gia',
      description: 'Scored 32/34 on the IB Extended Essay. Founder of The Extended Essay Academy.',
      url: 'https://theextendedessay.com/about',
    },
    publisher: { '@type': 'Organization', name: 'The Extended Essay Academy', url: 'https://theextendedessay.com' },
    mainEntityOfPage: url,
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://theextendedessay.com' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://theextendedessay.com/blog' },
      { '@type': 'ListItem', position: 3, name: post.title, item: url },
    ],
  }

  const faqJsonLd = post.faqItems?.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: post.faqItems.map(item => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: { '@type': 'Answer', text: item.answer },
        })),
      }
    : null

  const allJsonLd = [articleJsonLd, breadcrumbJsonLd, ...(faqJsonLd ? [faqJsonLd] : [])]

  return (
    <div className="min-h-screen bg-cream">
      {allJsonLd.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}

      {/* Hero */}
      <div className="bg-navy-deep py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <nav className="flex items-center gap-2 text-steel/60 text-xs mb-6">
            <Link href="/" className="hover:text-steel transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-steel transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-steel truncate">{post.title}</span>
          </nav>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-cream leading-tight">{post.title}</h1>
          <p className="text-steel mt-3 text-lg leading-relaxed">{post.description}</p>
          <p className="text-steel/60 text-sm mt-4">
            {formatDate(post.date)}{post.readMins ? ` · ${post.readMins} min read` : ''}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 pt-12 pb-20">
        <article>
          <ContentRenderer content={post.content} />
        </article>

        {/* Byline */}
        <div className="flex items-center gap-3 mt-10 mb-2 pb-8 border-b border-navy/8">
          <div className="w-10 h-10 rounded-full bg-navy flex items-center justify-center text-cream text-sm font-bold flex-shrink-0">G</div>
          <div>
            <p className="text-sm font-semibold text-navy">Written by Gia</p>
            <p className="text-xs text-navy/50">32/34 IB Extended Essay · The Extended Essay Academy</p>
          </div>
        </div>

        {/* Related */}
        {post.related?.length > 0 && (
          <div className="mt-12">
            <h2 className="font-serif text-xl font-bold text-navy mb-4">Keep reading</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {post.related.map((g, i) => (
                <Link key={i} href={g.href}
                  className="rounded-xl border border-navy/10 hover:border-navy/25 bg-parchment/30 hover:bg-parchment/50 transition-all px-5 py-4">
                  <p className="text-sm font-medium text-navy">{g.title}</p>
                  <p className="text-xs text-navy/50 mt-1">{g.description}</p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* FAQ */}
        {post.faqItems?.length > 0 && (
          <div className="mt-12 rounded-2xl border border-navy/10 bg-white/60 p-6">
            <h2 className="font-serif text-xl font-bold text-navy mb-4">Frequently asked questions</h2>
            <div className="space-y-4">
              {post.faqItems.map((item, i) => (
                <div key={i}>
                  <h3 className="text-sm font-semibold text-navy mb-1">{item.question}</h3>
                  <p className="text-sm text-navy/65 leading-relaxed">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="mt-12 rounded-2xl bg-navy text-center p-8">
          <h3 className="font-serif text-xl font-bold text-cream mb-2">Start your EE for free</h3>
          <p className="text-steel text-sm mb-6 max-w-sm mx-auto">
            5 free modules, a real 32/34 example essay, subject workbooks, and the official IB guide — no card needed.
          </p>
          <Link href="/dashboard/home" className="btn-primary-light text-sm">Open your free workspace</Link>
        </div>
      </div>
    </div>
  )
}
