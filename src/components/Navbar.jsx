import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { SignedIn, UserButton } from '@clerk/clerk-react'

const ANCHOR_LINKS = [
  { label: "What You'll Learn", href: '#learn' },
  { label: 'Curriculum', href: '#curriculum' },
  { label: 'EE Planner', href: '#planner' },
  { label: 'EE Dump', href: '#dump' },
  { label: 'Pricing', href: '#pricing' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'
  const isCourses = location.pathname === '/courses'

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
        <Link to="/" className="flex items-center gap-2.5">
          <img src="/feather-nav.png" alt="" className="h-8 w-auto" />
          <span className="font-serif text-lg font-semibold text-navy tracking-tight leading-tight">
            The Extended Essay Academy
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            to="/about"
            className={`text-sm font-medium tracking-wide transition-colors duration-200 ${
              location.pathname === '/about' ? 'text-navy' : 'text-ink-soft hover:text-navy'
            }`}
          >
            About
          </Link>
          <Link
            to="/courses"
            className={`text-sm font-medium tracking-wide transition-colors duration-200 ${
              isCourses ? 'text-navy' : 'text-ink-soft hover:text-navy'
            }`}
          >
            All Courses
          </Link>
          {!isHome && (
            <Link
              to="/planner"
              className={`text-sm font-medium tracking-wide transition-colors duration-200 ${
                location.pathname === '/planner' ? 'text-navy' : 'text-ink-soft hover:text-navy'
              }`}
            >
              EE Planner
            </Link>
          )}
          {!isHome && (
            <Link
              to="/dump"
              className={`text-sm font-medium tracking-wide transition-colors duration-200 ${
                location.pathname === '/dump' ? 'text-navy' : 'text-ink-soft hover:text-navy'
              }`}
            >
              EE Dump
            </Link>
          )}
          {isHome &&
            ANCHOR_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium tracking-wide text-ink-soft hover:text-navy transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <SignedIn>
            <UserButton
              appearance={{
                elements: { avatarBox: { width: 32, height: 32 } },
              }}
            />
          </SignedIn>
          {isHome ? (
            <a href="#pricing" className="btn-primary text-sm">
              Enroll Now
            </a>
          ) : (
            <Link to="/" className="btn-primary text-sm">
              Get Started
            </Link>
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
          <Link to="/about" onClick={() => setMenuOpen(false)} className="text-sm font-medium text-ink-soft hover:text-navy">
            About
          </Link>
          <Link to="/courses" onClick={() => setMenuOpen(false)} className="text-sm font-medium text-ink-soft hover:text-navy">
            All Courses
          </Link>
          {!isHome && (
            <Link to="/planner" onClick={() => setMenuOpen(false)} className="text-sm font-medium text-ink-soft hover:text-navy">
              EE Planner
            </Link>
          )}
          {!isHome && (
            <Link to="/dump" onClick={() => setMenuOpen(false)} className="text-sm font-medium text-ink-soft hover:text-navy">
              EE Dump
            </Link>
          )}
          {isHome &&
            ANCHOR_LINKS.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)} className="text-sm font-medium text-ink-soft hover:text-navy">
                {link.label}
              </a>
            ))}
          <SignedIn>
            <div className="flex items-center gap-2">
              <UserButton appearance={{ elements: { avatarBox: { width: 28, height: 28 } } }} />
              <span className="text-sm text-ink-soft">Account</span>
            </div>
          </SignedIn>
          {isHome ? (
            <a href="#pricing" className="btn-primary text-sm text-center">Enroll Now</a>
          ) : (
            <Link to="/" className="btn-primary text-sm text-center">Get Started</Link>
          )}
        </div>
      )}
    </header>
  )
}
