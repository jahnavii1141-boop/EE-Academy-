'use client'

import { usePathname } from 'next/navigation'
import Navbar from './Navbar'
import Footer from './Footer'

const NO_SHELL_PATHS = ['/dashboard', '/dump', '/planner', '/sign-in', '/sign-up', '/onboarding', '/sso-callback']

export default function ConditionalShell({ children }) {
  const pathname = usePathname()
  const hideShell = NO_SHELL_PATHS.some(p => pathname?.startsWith(p))

  if (hideShell) {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <Navbar />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  )
}
