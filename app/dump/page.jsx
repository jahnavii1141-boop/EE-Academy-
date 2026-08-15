'use client'

import Link from 'next/link'
import DumpWorkspacePage from '../../src/page-components/DumpWorkspacePage'

// Public, no-account EE Dump. DumpWorkspacePage runs in localStorage mode for
// signed-out visitors (first 7 sources free, then a paywall) and pulls the real
// saved dump via /api/dump for signed-in users. This route carries only a slim
// header — the tool is the point — while /dashboard/dump renders the same tool
// inside the app shell for signed-in navigation.
export default function Dump() {
  return (
    <div style={{ height: '100dvh', display: 'flex', flexDirection: 'column', background: '#F4F3E8' }}>
      <header
        className="flex-shrink-0 flex items-center justify-between px-5"
        style={{ height: 48, background: '#fff', borderBottom: '1px solid #ececec' }}
      >
        <Link href="/" className="flex items-center gap-2">
          <img src="/feather-nav.png" alt="" style={{ height: 24, width: 'auto' }} />
          <span className="font-serif font-semibold" style={{ fontSize: 14, color: '#2E3250' }}>
            The Extended Essay Academy
          </span>
        </Link>
        <Link href="/course/module-1" style={{ fontSize: 12, fontWeight: 500, color: '#6b7280' }}>
          Read the course →
        </Link>
      </header>

      {/* Absolute-inset content area gives DumpWorkspacePage's h-full a
          definite height to resolve against, independent of parent layout. */}
      <div style={{ position: 'relative', flexGrow: 1, minHeight: 0 }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <DumpWorkspacePage />
        </div>
      </div>
    </div>
  )
}
