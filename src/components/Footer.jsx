'use client'

import Link from 'next/link'

const COURSE_LINKS = [
  { label: 'Dashboard', href: '/dashboard', internal: true },
  { label: 'Curriculum', href: '/curriculum', internal: true },
  { label: 'Plans', href: '/pricing', internal: true },
]
const COMPANY_LINKS = [
  { label: 'About', href: '/about', internal: true },
  { label: 'Blog', href: '#' },
  { label: 'Contact', href: '#' },
]
const GUIDE_LINKS = [
  { label: 'How to Get an A in Extended Essay', href: '/guides/how-to-get-an-a-in-extended-essay' },
  { label: 'How to Write an EE Introduction', href: '/guides/extended-essay-introduction' },
  { label: 'EE Structure Template', href: '/guides/extended-essay-structure' },
  { label: 'Research Question Examples', href: '/guides/research-question-examples' },
  { label: 'RPPF Guide', href: '/guides/rppf-guide' },
]

export default function Footer() {
  return (
    <footer className="bg-navy text-steel">
      <div className="w-16 h-px bg-gradient-to-r from-transparent via-parchment/40 to-transparent mx-auto" />

      <div className="max-w-7xl mx-auto px-6 py-14 grid sm:grid-cols-2 md:grid-cols-5 gap-10">
        <div className="sm:col-span-2 md:col-span-1">
          <a href="#" className="flex items-center gap-2.5">
            <img src="/feather-nav.png" alt="" className="h-8 w-auto opacity-80" />
            <span className="font-serif text-lg font-semibold text-cream tracking-tight leading-tight">
              The Extended Essay Academy
            </span>
          </a>
          <p className="mt-3 text-sm text-steel leading-relaxed">
            Expert guidance for IB students who want to master their Extended Essay and earn top marks.
          </p>
        </div>

        <div>
          <h3 className="font-serif text-cream font-semibold text-sm mb-4">Resources</h3>
          <ul className="space-y-3">
            {COURSE_LINKS.map(link => (
              <li key={link.label}>
                {link.internal
                  ? <Link href={link.href} className="text-sm text-steel hover:text-cream transition-colors">{link.label}</Link>
                  : <a href={link.href} className="text-sm text-steel hover:text-cream transition-colors">{link.label}</a>
                }
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-serif text-cream font-semibold text-sm mb-4">Company</h3>
          <ul className="space-y-3">
            {COMPANY_LINKS.map(link => (
              <li key={link.label}>
                {link.internal
                  ? <Link href={link.href} className="text-sm text-steel hover:text-cream transition-colors">{link.label}</Link>
                  : <a href={link.href} className="text-sm text-steel hover:text-cream transition-colors">{link.label}</a>
                }
              </li>
            ))}
          </ul>
        </div>

        <div className="hidden md:block">
          <h3 className="font-serif text-cream font-semibold text-sm mb-4">Free Guides</h3>
          <ul className="space-y-3">
            {GUIDE_LINKS.map(link => (
              <li key={link.label}>
                <Link href={link.href} className="text-sm text-steel hover:text-cream transition-colors">{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-serif text-cream font-semibold text-sm mb-4">Stay Updated</h3>
          <p className="text-sm text-steel mb-3">EE tips and resource updates in your inbox.</p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 bg-navy/50 text-cream text-sm rounded-full px-4 py-2 border border-steel/20 focus:outline-none focus:ring-2 focus:ring-parchment/30 focus:border-parchment/40 placeholder-steel/50 transition-all"
            />
            <button className="bg-cream hover:bg-parchment text-navy text-sm font-medium px-4 py-2 rounded-full transition-colors flex-shrink-0">
              →
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-steel/15">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-steel/60">
          <p>© {new Date().getFullYear()} <span className="font-serif">The Extended Essay Academy</span>. All rights reserved.</p>
          <div className="flex gap-5">
            <Link href="/privacy" className="hover:text-cream transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-cream transition-colors">Terms of Service</Link>
            <Link href="/refund" className="hover:text-cream transition-colors">Refund Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
