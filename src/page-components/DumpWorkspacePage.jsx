'use client'

export default function DumpWorkspacePage() {
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
