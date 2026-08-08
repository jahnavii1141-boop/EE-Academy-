'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { UserButton, useUser } from '@clerk/nextjs'
import StartFreeButton from './StartFreeButton'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const { isSignedIn } = useUser()
  const isCourses = pathname === '/courses'
  const isDashboard = pathname.startsWith('/dashboard')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-cream/90 backdrop-blur-md shadow-sm border-b border-navy/8'
          : 'bg-cream'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Brand with feather logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <img src="/feather-nav.png" alt="" className="h-8 w-auto" />
          <span className="font-serif text-lg font-semibold text-navy tracking-tight leading-tight">
            The Extended Essay Academy
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/about"
            className={`text-sm font-medium tracking-wide transition-colors duration-200 ${
              pathname === '/about' ? 'text-navy' : 'text-ink-soft hover:text-navy'
            }`}
          >
            About
          </Link>
          <Link
            href="/courses"
            className={`text-sm font-medium tracking-wide transition-colors duration-200 ${
              isCourses ? 'text-navy' : 'text-ink-soft hover:text-navy'
            }`}
          >
            Resource Lab
          </Link>
          <Link
            href="/blog"
            className={`text-sm font-medium tracking-wide transition-colors duration-200 ${
              pathname.startsWith('/blog') ? 'text-navy' : 'text-ink-soft hover:text-navy'
            }`}
          >
            Blog
          </Link>
          <Link
            href="/pricing"
            className={`text-sm font-medium tracking-wide transition-colors duration-200 ${
              pathname === '/pricing' ? 'text-navy' : 'text-ink-soft hover:text-navy'
            }`}
          >
            Pricing
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          {isSignedIn ? (
            <>
              <UserButton appearance={{ elements: { avatarBox: { width: 32, height: 32 } } }} />
              <Link href="/dashboard/home" className="btn-primary text-sm">Go to dashboard</Link>
            </>
          ) : (
            <>
              <Link href="/sign-in" className="text-sm font-medium text-ink-soft hover:text-navy transition-colors">
                Sign in
              </Link>
              <StartFreeButton className="btn-primary text-sm" label="Start free" />
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-ink-soft"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-cream/95 backdrop-blur-md border-t border-navy/10 px-6 py-5 flex flex-col gap-5">
          <Link href="/about" onClick={() => setMenuOpen(false)} className="text-sm font-medium text-ink-soft hover:text-navy">
            About
          </Link>
          <Link href="/courses" onClick={() => setMenuOpen(false)} className="text-sm font-medium text-ink-soft hover:text-navy">
            Resource Lab
          </Link>
          <Link href="/blog" onClick={() => setMenuOpen(false)} className="text-sm font-medium text-ink-soft hover:text-navy">
            Blog
          </Link>
          <Link href="/pricing" onClick={() => setMenuOpen(false)} className="text-sm font-medium text-ink-soft hover:text-navy">
            Pricing
          </Link>
          {isSignedIn ? (
            <>
              <div className="flex items-center gap-2">
                <UserButton appearance={{ elements: { avatarBox: { width: 28, height: 28 } } }} />
                <span className="text-sm text-ink-soft">Account</span>
              </div>
              <Link href="/dashboard/home" onClick={() => setMenuOpen(false)} className="btn-primary text-sm text-center">Go to dashboard</Link>
            </>
          ) : (
            <>
              <Link href="/sign-in" onClick={() => setMenuOpen(false)} className="text-sm font-medium text-ink-soft hover:text-navy">Sign in</Link>
              <StartFreeButton className="btn-primary text-sm text-center" label="Start free" onNavigate={() => setMenuOpen(false)} />
            </>
          )}
        </div>
      )}
    </header>
  )
}
