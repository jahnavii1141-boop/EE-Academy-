'use client'

import { useUser, useAuth } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  Home, Database, Calendar, FileText, BookOpen, Share2, PenLine,
} from 'lucide-react'
import { getTheme } from '@/lib/subjectThemes'

const NAV = [
  { id: 'home',      label: 'Home',        icon: Home,      href: '/dashboard/home' },
  { id: 'modules',   label: 'Modules',     icon: BookOpen,  href: '/dashboard/modules' },
  { id: 'essay',     label: 'My Essay',    icon: PenLine,   href: '/dashboard/essay' },
  { id: 'dump',      label: 'Citations',   icon: Database,  href: '/dump' },
  { id: 'planner',   label: 'Planner',     icon: Calendar,  href: '/planner' },
  { id: 'templates', label: 'Templates',   icon: FileText,  href: '/dashboard/templates' },
  { id: 'share',     label: 'Share',       icon: Share2,    href: '/dashboard/share' },
]

export default function DashboardLayout({ children }) {
  const { user } = useUser()
  const { isSignedIn } = useAuth()
  const pathname = usePathname()
  const firstName = user?.firstName || 'Your'
  const [subject, setSubject] = useState('')
  const [isPremium, setIsPremium] = useState(false)

  useEffect(() => {
    if (!isSignedIn) return
    fetch('/api/workspace')
      .then(r => r.json())
      .then(({ workspace }) => {
        setSubject(workspace?.subject || '')
        setIsPremium(!!workspace?.has_paid && workspace?.tier === 'premium')
      })
      .catch(() => {})
  }, [isSignedIn])

  const theme = getTheme(subject)

  const activeId = NAV.find(n => pathname === n.href || pathname.startsWith(n.href + '/'))?.id
    ?? (pathname === '/dashboard' ? 'home' : null)

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: '#fafafa', color: '#0a0a0a' }}>

      {/* Sidebar */}
      <aside style={{ width: 220, borderRight: '1px solid #e5e5e5', background: '#fff' }}
        className="flex-shrink-0 flex flex-col h-full">

        {/* Brand + subject badge */}
        <div className="px-5 pt-5 pb-4" style={{ borderBottom: '1px solid #f0f0f0' }}>
          <Link href="/dashboard" className="block">
            <p className="font-medium text-xs tracking-tight mb-0.5" style={{ color: '#999' }}>EE Academy</p>
            <p className="font-semibold text-sm leading-tight truncate" style={{ color: '#0a0a0a', letterSpacing: '-0.01em' }}>
              {firstName}&apos;s workspace
            </p>
          </Link>
          {subject && (
            <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium"
              style={{ background: theme.light, color: theme.color }}>
              <span>{theme.emoji}</span>
              <span>{subject}</span>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-2 py-3">
          <p className="text-[10px] font-semibold uppercase tracking-widest px-3 mb-2" style={{ color: '#bbb' }}>Menu</p>
          {NAV.map(item => {
            const Icon = item.icon
            const active = activeId === item.id
            return (
              <Link
                key={item.id}
                href={item.href}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all mb-0.5"
                style={{
                  background: active ? '#0a0a0a' : 'transparent',
                  color: active ? '#fff' : '#555',
                  fontWeight: active ? 500 : 400,
                }}
                onMouseEnter={e => { if (!active) { e.currentTarget.style.background = '#f5f5f5'; e.currentTarget.style.color = '#0a0a0a' } }}
                onMouseLeave={e => { if (!active) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#555' } }}
              >
                <Icon className="flex-shrink-0" size={14} strokeWidth={active ? 2 : 1.75} />
                <span>{item.label}</span>
              </Link>
            )
          })}

        </nav>

        {/* Bottom */}
        <div className="px-2 pb-4 pt-3" style={{ borderTop: '1px solid #f0f0f0' }}>
          {!isPremium && (
            <Link
              href="/pricing"
              className="flex items-center justify-center w-full text-xs font-semibold py-2 rounded-lg mb-2 transition-all"
              style={{ background: '#0a0a0a', color: '#fff', letterSpacing: '-0.01em' }}
            >
              Upgrade plan
            </Link>
          )}
          <Link
            href="/"
            className="flex items-center justify-center w-full text-xs py-1.5 rounded-lg transition-all"
            style={{ color: '#aaa' }}
          >
            ← Back to site
          </Link>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto" style={{ background: '#fafafa' }}>
        {children}
      </main>
    </div>
  )
}
