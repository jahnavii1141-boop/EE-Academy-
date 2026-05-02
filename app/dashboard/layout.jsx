'use client'

import { useUser } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import {
  Home, Database, Calendar, FileText, BookOpen, Share2,
  PenLine, ChevronRight, Lock,
} from 'lucide-react'

const NAV = [
  { id: 'home',      label: 'Home',      icon: Home,      href: '/dashboard/home',      tag: 'Start here' },
  { id: 'essay',     label: 'My Essay',  icon: PenLine,   href: '/dashboard/essay',     tag: null },
  { id: 'dump',      label: 'EE Dump',   icon: Database,  href: '/dump',                tag: null },
  { id: 'planner',   label: 'Planner',   icon: Calendar,  href: '/planner',             tag: null },
  { id: 'templates', label: 'Templates', icon: FileText,  href: '/dashboard/templates', tag: null },
  { id: 'modules',   label: 'Modules',   icon: BookOpen,  href: '/dashboard/modules',   tag: null },
  { id: 'share',     label: 'Share',     icon: Share2,    href: '/dashboard/share',     tag: null },
]

export default function DashboardLayout({ children }) {
  const { user } = useUser()
  const pathname = usePathname()
  const firstName = user?.firstName || 'Your'

  const activeId = NAV.find(n => pathname === n.href || pathname.startsWith(n.href + '/'))?.id
    ?? (pathname === '/dashboard' ? 'home' : null)

  return (
    <div className="flex h-screen overflow-hidden bg-cream text-navy">

      {/* Sidebar */}
      <aside className="w-56 flex-shrink-0 border-r border-navy/10 flex flex-col bg-cream h-full">

        {/* Brand */}
        <div className="px-5 pt-6 pb-4 border-b border-navy/8">
          <Link href="/dashboard" className="block">
            <p className="text-[9px] font-bold text-ink-muted uppercase tracking-[0.2em] mb-0.5">EE HQ</p>
            <p className="font-serif text-base font-bold text-navy leading-tight truncate">
              {firstName}&apos;s workspace
            </p>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
          <p className="text-[9px] font-bold text-ink-muted uppercase tracking-widest px-2 mb-2">Spaces</p>
          {NAV.map(item => {
            const Icon = item.icon
            const active = activeId === item.id
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm font-medium transition-all ${
                  active
                    ? 'bg-navy text-cream'
                    : 'text-ink-soft hover:text-navy hover:bg-parchment/60'
                }`}
              >
                <Icon className="w-3.5 h-3.5 flex-shrink-0" strokeWidth={active ? 2 : 1.8} />
                <span>{item.label}</span>
                {item.tag && !active && (
                  <span className="ml-auto text-[8px] font-bold text-ink-muted bg-parchment px-1.5 py-0.5 rounded-full uppercase tracking-wide">
                    {item.tag}
                  </span>
                )}
              </Link>
            )
          })}
        </nav>

        {/* Bottom */}
        <div className="px-3 pb-5 pt-3 border-t border-navy/8 space-y-2">
          <Link
            href="/pricing"
            className="flex items-center justify-center gap-1.5 w-full text-xs font-bold text-cream bg-navy hover:bg-navy-light px-3 py-2.5 rounded-xl transition-colors"
          >
            Upgrade
          </Link>
          <Link
            href="/"
            className="flex items-center justify-center w-full text-[10px] text-ink-muted hover:text-navy transition-colors"
          >
            ← Back to site
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}
