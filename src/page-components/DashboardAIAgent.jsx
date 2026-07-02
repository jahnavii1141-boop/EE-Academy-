'use client'

import { Sparkles } from 'lucide-react'

export default function DashboardAIAgent() {
  return (
    <div className="h-full flex items-center justify-center px-6">
      <div className="text-center max-w-sm">
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-6"
          style={{ background: '#EAE8DC' }}>
          <Sparkles size={22} style={{ color: '#aaa' }} strokeWidth={1.5} />
        </div>
        <p className="text-[11px] font-bold uppercase tracking-widest mb-3" style={{ color: '#ccc' }}>
          Coming Soon
        </p>
        <h2 className="font-semibold mb-2" style={{ fontSize: 20, color: '#2E3250', letterSpacing: '-0.02em' }}>
          EE Mentor
        </h2>
        <p className="text-sm leading-relaxed" style={{ color: '#888' }}>
          An AI tutor that knows your subject, research question, and IB criteria. Launching soon.
        </p>
      </div>
    </div>
  )
}
