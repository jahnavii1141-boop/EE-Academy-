'use client'

import { usePathname } from 'next/navigation'
import Navbar from './Navbar'
import Footer from './Footer'
import ExitIntentPopup from './ExitIntentPopup'

export default function ConditionalShell({ children }) {
  const pathname = usePathname()
  const isDashboard = pathname?.startsWith('/dashboard') || pathname?.startsWith('/dump') || pathname?.startsWith('/planner')

  if (isDashboard) {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <Navbar />
      <div className="flex-1">{children}</div>
      <Footer />
      <ExitIntentPopup />
    </div>
  )
}
