import { Link } from 'react-router-dom'
import AnimateIn from '../components/ui/AnimateIn'

const LEGAL_LINKS = [
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Refund Policy', href: '/refund' },
]

export default function LegalPage({ title, updated, sections }) {
  return (
    <main className="bg-cream min-h-screen">

      {/* Header */}
      <section className="bg-navy py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <AnimateIn>
            <div className="flex items-center gap-2 mb-4">
              <Link to="/" className="text-steel/60 hover:text-cream text-sm transition-colors">Home</Link>
              <span className="text-steel/30 text-sm">/</span>
              <span className="text-steel/60 text-sm">{title}</span>
            </div>
            <h1 className="font-serif text-3xl lg:text-4xl font-bold text-cream mb-3">{title}</h1>
            <p className="text-steel text-sm">The Extended Essay Academy · Last updated: {updated}</p>
          </AnimateIn>
        </div>
      </section>

      {/* Side nav + content */}
      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-[200px_1fr] gap-12">

          {/* Sidebar — other legal pages */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <p className="text-xs font-bold text-navy/40 uppercase tracking-[0.15em] mb-4">Legal</p>
              <ul className="space-y-2">
                {LEGAL_LINKS.map(l => (
                  <li key={l.href}>
                    <Link
                      to={l.href}
                      className={`text-sm transition-colors block py-1 ${
                        l.label === title
                          ? 'text-navy font-semibold'
                          : 'text-ink-soft hover:text-navy'
                      }`}
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Body */}
          <article className="space-y-10">
            {sections.map((s) => (
              <AnimateIn key={s.number}>
                <div className="border-b border-navy/8 pb-10 last:border-0 last:pb-0">
                  <div className="flex items-baseline gap-3 mb-3">
                    <span className="text-xs font-bold text-navy/30 font-mono w-5 flex-shrink-0">{s.number}.</span>
                    <h2 className="font-serif text-lg font-bold text-navy">{s.title}</h2>
                  </div>

                  <div className="ml-8 space-y-3">
                    {s.callout && s.body && (
                      <div className="rounded-xl bg-parchment border border-navy/10 px-5 py-4">
                        <p className="text-navy/80 text-sm leading-relaxed">{s.body}</p>
                      </div>
                    )}

                    {!s.callout && s.body && (
                      <p className="text-ink-soft text-sm leading-relaxed">{s.body}</p>
                    )}

                    {s.bullets && (
                      <ul className="space-y-2">
                        {s.bullets.map((b, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-sm text-ink-soft">
                            <span className="w-1.5 h-1.5 rounded-full bg-navy/30 mt-2 flex-shrink-0" />
                            {b}
                          </li>
                        ))}
                      </ul>
                    )}

                    {s.bodyAfter && (
                      <p className="text-ink-soft text-sm leading-relaxed">{s.bodyAfter}</p>
                    )}

                    {s.contact && (
                      <p className="text-ink-soft text-sm leading-relaxed">
                        {s.contactPrefix}{' '}
                        <a href={`mailto:${s.contact}`} className="text-navy font-medium underline underline-offset-2 hover:opacity-75 transition-opacity">
                          {s.contact}
                        </a>
                        {s.contactSuffix ? ` ${s.contactSuffix}` : '.'}
                      </p>
                    )}
                  </div>
                </div>
              </AnimateIn>
            ))}

            {/* Mobile legal nav */}
            <div className="lg:hidden pt-4 border-t border-navy/10">
              <p className="text-xs font-bold text-navy/40 uppercase tracking-[0.15em] mb-3">Other legal pages</p>
              <div className="flex flex-wrap gap-3">
                {LEGAL_LINKS.filter(l => l.label !== title).map(l => (
                  <Link key={l.href} to={l.href} className="text-sm text-navy underline underline-offset-2">
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
          </article>

        </div>
      </div>
    </main>
  )
}
