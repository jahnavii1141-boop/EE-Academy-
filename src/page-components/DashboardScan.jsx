'use client'

import { ScanLine } from 'lucide-react'

export default function DashboardScan() {
  return (
    <div className="h-full flex items-center justify-center px-6">
      <div className="text-center max-w-sm">
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-6"
          style={{ background: '#EAE8DC' }}>
          <ScanLine size={22} style={{ color: '#aaa' }} />
        </div>
        <p className="text-[11px] font-bold uppercase tracking-widest mb-3" style={{ color: '#ccc' }}>
          Coming Soon
        </p>
        <h2 className="font-semibold mb-2" style={{ fontSize: 20, color: '#2E3250', letterSpacing: '-0.02em' }}>
          EE Grade Scan
        </h2>
        <p className="text-sm leading-relaxed" style={{ color: '#888' }}>
          Paste your draft and get criterion-by-criterion examiner feedback. Launching soon.
        </p>
      </div>
    </div>
  )
}
