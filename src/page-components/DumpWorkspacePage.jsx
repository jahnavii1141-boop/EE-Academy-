'use client'

import { useAccess } from '../hooks/useAccess'
import UpgradeGate from '../components/UpgradeGate'

export default function DumpWorkspacePage() {
  const { hasPremium, loading } = useAccess()

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="w-6 h-6 rounded-full border-2 border-navy/20 border-t-navy/60 animate-spin" />
      </div>
    )
  }

  if (!hasPremium) {
    return <UpgradeGate requiredTier="premium" toolName="EE Dump Workspace" />
  }

  return (
    <div className="flex flex-col" style={{ minHeight: 'calc(100vh - 56px)' }}>
      <iframe
        src="/tools/ee-dump.html"
        title="EE Dump Workspace"
        className="flex-1 w-full border-0"
        style={{ minHeight: 'calc(100vh - 56px)' }}
      />
    </div>
  )
}
